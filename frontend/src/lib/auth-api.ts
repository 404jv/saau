export type LoginInput = { email: string; password: string }
export type RegisterInput = { name: string; email: string; password: string; gender: string }

export type AuthSuccess = { access_token: string }
export type UserResponse = { id: string; name: string; email: string; gender: string; isAdmin?: boolean }

export type FieldKey = 'name' | 'email' | 'password' | 'gender'

export type BannerVariant =
  | 'invalid_credentials'
  | 'duplicate_email'
  | 'oauth_cancelled'
  | 'oauth_failed'
  | 'network'
  | 'validation'
  | 'server'
  | 'unknown'

export type ParsedError = {
  banner?: { variant: BannerVariant; heading: string; message: string }
  fields?: Partial<Record<FieldKey, string>>
}

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ParsedError }

const FIELD_KEYS: readonly FieldKey[] = ['name', 'email', 'password', 'gender']

// `zod-validation-error` (v5) formats one or more issues as a single string:
//   `Validation error: <msg> at "<path>"; <msg> at "<path>"; ...`
// The backend wraps that whole string in a single-element `errors` array.
// We strip the prefix, split on the segment separator, and parse each
// "<msg> at \"<path>\"" segment into a field key + message.
function parseValidationSegment(segment: string): { field?: FieldKey; message: string } {
  const trimmed = segment.trim()
  const match = trimmed.match(/^(.+?)\s+at\s+"([^"]+)"$/)
  if (!match) return { message: trimmed }
  const [, message, pathRaw] = match
  const root = pathRaw.split('.')[0].toLowerCase() as FieldKey
  if (FIELD_KEYS.includes(root)) return { field: root, message: message.trim() }
  return { message: message.trim() }
}

function expandValidationLines(rawLines: string[]): string[] {
  const out: string[] = []
  for (const line of rawLines) {
    const stripped = line.replace(/^Validation error:\s*/i, '')
    for (const seg of stripped.split(/\s*;\s*/)) {
      const s = seg.trim()
      if (s) out.push(s)
    }
  }
  return out
}

function mapBackendError(status: number, body: { message?: string; errors?: string[] } | null): ParsedError {
  if (status === 0 || body === null) {
    return {
      banner: {
        variant: 'network',
        heading: 'Sem conexão com o servidor',
        message: 'Confira sua internet e tente novamente.',
      },
    }
  }

  if (status === 401) {
    if (typeof body.message === 'string' && /google/i.test(body.message)) {
      return {
        banner: {
          variant: 'oauth_failed',
          heading: 'Algo deu errado com o Google',
          message: 'Não conseguimos completar o login. Tente outra vez ou use seu e-mail.',
        },
      }
    }
    return {
      banner: {
        variant: 'invalid_credentials',
        heading: 'Credenciais não conferem',
        message: 'Verifique seu e-mail e senha e tente de novo.',
      },
    }
  }

  if (status === 409) {
    return {
      fields: { email: 'Este e-mail já está cadastrado. Tente entrar.' },
    }
  }

  if (status === 400) {
    const fields: Partial<Record<FieldKey, string>> = {}
    const unknownMessages: string[] = []
    for (const segment of expandValidationLines(body.errors ?? [])) {
      const parsed = parseValidationSegment(segment)
      if (parsed.field) {
        if (!fields[parsed.field]) fields[parsed.field] = parsed.message
      } else {
        unknownMessages.push(parsed.message)
      }
    }
    const fieldCount = Object.keys(fields).length
    if (fieldCount === 0) {
      return {
        banner: {
          variant: 'validation',
          heading: 'Verifique os dados',
          message: unknownMessages[0] || body.message || 'Algum campo está incorreto. Confira e tente novamente.',
        },
      }
    }
    const result: ParsedError = { fields }
    if (fieldCount >= 2 || unknownMessages.length > 0) {
      result.banner = {
        variant: 'validation',
        heading: 'Verifique os dados',
        message: 'Alguns campos precisam de atenção.',
      }
    }
    return result
  }

  if (status >= 500) {
    return {
      banner: {
        variant: 'server',
        heading: 'Algo deu errado por aqui',
        message: 'Tente novamente em alguns instantes.',
      },
    }
  }

  return {
    banner: {
      variant: 'unknown',
      heading: 'Algo deu errado',
      message: body.message || 'Tente novamente.',
    },
  }
}

async function postJson<T>(path: string, payload: unknown): Promise<ApiResult<T>> {
  let res: Response
  try {
    res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    return { ok: false, error: mapBackendError(0, null) }
  }

  let body: { message?: string; errors?: string[] } | null = null
  try {
    body = (await res.json()) as { message?: string; errors?: string[] }
  } catch {
    body = null
  }

  if (!res.ok) {
    return { ok: false, error: mapBackendError(res.status, body) }
  }

  return { ok: true, data: body as unknown as T }
}

export async function login(input: LoginInput): Promise<ApiResult<AuthSuccess>> {
  return postJson<AuthSuccess>('/api/v1/auth/login', input)
}

export async function register(input: RegisterInput): Promise<ApiResult<UserResponse>> {
  return postJson<UserResponse>('/api/v1/users', input)
}

const TOKEN_KEY = 'saau:access_token'
export const tokenStorage = {
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  get: () => localStorage.getItem(TOKEN_KEY),
  clear: () => localStorage.removeItem(TOKEN_KEY),
}
