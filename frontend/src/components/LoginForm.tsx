import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register, tokenStorage, type ParsedError } from '../lib/auth-api'
import FormBanner from './FormBanner'
import FieldError from './FieldError'

type Mode = 'login' | 'register'
type FieldErrors = Partial<Record<'name' | 'email' | 'password' | 'gender', string>>
type Banner = NonNullable<ParsedError['banner']> | { variant: 'success'; heading: string; message: string }

const baseInputClass =
  'w-full py-3.5 px-4 border-2 rounded-[10px] bg-white/70 text-dark font-body text-base outline-none transition-all duration-200 shadow-[inset_2px_2px_0_rgba(0,0,0,0.04)] focus:bg-white placeholder:text-dark/40 disabled:opacity-60 disabled:cursor-not-allowed'

const inputOk = `${baseInputClass} border-dark focus:border-red focus:shadow-[inset_2px_2px_0_rgba(255,49,49,0.12)]`
const inputError = `${baseInputClass} border-red focus:border-red focus:shadow-[inset_2px_2px_0_rgba(255,49,49,0.18)] saau-field-shake`

const labelClass = 'text-base font-bold text-dark tracking-wide font-body'

const GENDER_OPTIONS = [
  { value: '', label: 'Selecione...' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'masculino', label: 'Masculino' },
  { value: 'outro', label: 'Outro' },
  { value: 'prefiro-nao-dizer', label: 'Prefiro não dizer' },
]

type LoginFormProps = {
  initialBanner?: Banner | null
}

export default function LoginForm({ initialBanner = null }: LoginFormProps) {
  const navigate = useNavigate()

  const [mode, setMode] = useState<Mode>('login')
  const isRegister = mode === 'register'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [banner, setBanner] = useState<Banner | null>(initialBanner)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [shakeKey, setShakeKey] = useState(0)

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const genderRef = useRef<HTMLSelectElement>(null)

  // Apply initialBanner if it changes (e.g. URL param updated by parent)
  useEffect(() => {
    if (initialBanner) setBanner(initialBanner)
  }, [initialBanner])

  const trimmedEmail = email.trim()
  const trimmedName = name.trim()
  const isValid =
    trimmedEmail.length > 0 &&
    password.length > 0 &&
    (!isRegister || (trimmedName.length > 0 && gender.length > 0))
  const isDisabled = !isValid || isSubmitting

  function clearFieldError(key: keyof FieldErrors) {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
    if (banner) setBanner(null)
  }

  function switchMode(next: Mode) {
    if (isSubmitting) return
    setMode(next)
    setFieldErrors({})
    setBanner(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isDisabled) return
    setIsSubmitting(true)
    setFieldErrors({})
    setBanner(null)

    const result = isRegister
      ? await register({ name: trimmedName, email: trimmedEmail, password, gender })
      : await login({ email: trimmedEmail, password })

    setIsSubmitting(false)

    if (result.ok) {
      if (isRegister) {
        // Backend returns the new user (no token). Switch to login mode with email pre-filled.
        setMode('login')
        setName('')
        setGender('')
        setPassword('')
        setBanner({
          variant: 'success',
          heading: 'Conta criada!',
          message: 'Agora faça login com seu e-mail e senha.',
        })
        passwordRef.current?.focus()
      } else {
        const token = (result.data as { access_token?: string }).access_token
        if (token) tokenStorage.set(token)
        setBanner({ variant: 'success', heading: 'Boas-vindas! 🐾', message: 'Entrando…' })
        setTimeout(() => navigate('/'), 600)
      }
      return
    }

    const { banner: errBanner, fields } = result.error
    if (fields) setFieldErrors(fields)
    if (errBanner) setBanner(errBanner)
    setShakeKey((k) => k + 1)

    // Move focus to the first invalid field, or to the banner.
    const focusOrder: Array<[keyof FieldErrors, React.RefObject<HTMLElement | null>]> = [
      ['name', nameRef as React.RefObject<HTMLElement | null>],
      ['email', emailRef as React.RefObject<HTMLElement | null>],
      ['password', passwordRef as React.RefObject<HTMLElement | null>],
      ['gender', genderRef as React.RefObject<HTMLElement | null>],
    ]
    const target = focusOrder.find(([key]) => fields?.[key])?.[1]?.current
    if (target) target.focus()
  }

  const submitLabel = isSubmitting
    ? isRegister
      ? 'CADASTRANDO…'
      : 'ENVIANDO…'
    : isRegister
    ? 'CADASTRAR'
    : 'ENVIAR'

  return (
    <div className="w-full max-w-[440px]">
      {banner && (
        <FormBanner
          variant={banner.variant}
          heading={banner.heading}
          message={banner.message}
          onDismiss={() => setBanner(null)}
        />
      )}

      <form className="flex flex-col gap-5 mb-3" onSubmit={handleSubmit} noValidate>
        {isRegister && (
          <div className="flex flex-col gap-1.5 animate-[fade-in_0.25s_ease-out]">
            <label htmlFor="name" className={labelClass}>Nome:</label>
            <input
              ref={nameRef}
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              required
              disabled={isSubmitting}
              value={name}
              onChange={(e) => { setName(e.target.value); clearFieldError('name') }}
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? 'name-error' : undefined}
              className={`${fieldErrors.name ? inputError : inputOk}`}
              data-shake-key={fieldErrors.name ? shakeKey : undefined}
              placeholder="Seu nome"
            />
            <FieldError id="name-error" message={fieldErrors.name} />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelClass}>E-mail:</label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            required
            disabled={isSubmitting}
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearFieldError('email') }}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            className={`${fieldErrors.email ? inputError : inputOk}`}
            data-shake-key={fieldErrors.email ? shakeKey : undefined}
            placeholder="voce@exemplo.com"
          />
          <FieldError id="email-error" message={fieldErrors.email} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className={labelClass}>Senha:</label>
          <input
            ref={passwordRef}
            id="password"
            type="password"
            name="password"
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            required
            disabled={isSubmitting}
            value={password}
            onChange={(e) => { setPassword(e.target.value); clearFieldError('password') }}
            aria-invalid={!!fieldErrors.password}
            aria-describedby={fieldErrors.password ? 'password-error' : undefined}
            className={`${fieldErrors.password ? inputError : inputOk}`}
            data-shake-key={fieldErrors.password ? shakeKey : undefined}
            placeholder="••••••••"
          />
          <FieldError id="password-error" message={fieldErrors.password} />
        </div>

        {isRegister && (
          <div className="flex flex-col gap-1.5 animate-[fade-in_0.25s_ease-out]">
            <label htmlFor="gender" className={labelClass}>Gênero:</label>
            <select
              ref={genderRef}
              id="gender"
              name="gender"
              required
              disabled={isSubmitting}
              value={gender}
              onChange={(e) => { setGender(e.target.value); clearFieldError('gender') }}
              aria-invalid={!!fieldErrors.gender}
              aria-describedby={fieldErrors.gender ? 'gender-error' : undefined}
              className={`${fieldErrors.gender ? inputError : inputOk} appearance-none bg-[url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 16 16%27><path d=%27M3 6 l5 5 l5 -5%27 stroke=%27%231E1E1E%27 stroke-width=%272%27 fill=%27none%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/></svg>")] bg-no-repeat bg-[right_1rem_center] pr-12`}
            >
              {GENDER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                  {opt.label}
                </option>
              ))}
            </select>
            <FieldError id="gender-error" message={fieldErrors.gender} />
          </div>
        )}

        <button
          type="submit"
          disabled={isDisabled}
          aria-busy={isSubmitting}
          className="self-center mt-2 py-3.5 px-14 bg-red text-white border-2 border-dark rounded-xl font-main text-lg cursor-pointer shadow-[6px_6px_0_var(--color-dark)] transition-all duration-150 hover:bg-pink active:not-disabled:translate-x-[3px] active:not-disabled:translate-y-[3px] active:not-disabled:shadow-[2px_2px_0_var(--color-dark)] disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-dark/40 disabled:hover:bg-dark/40"
        >
          {submitLabel}
        </button>
      </form>

      <p className="mt-1 text-base text-dark text-center">
        {isRegister ? (
          <>
            Já tem conta?{' '}
            <button
              type="button"
              onClick={() => switchMode('login')}
              disabled={isSubmitting}
              className="bg-transparent border-none text-teal font-main text-sm cursor-pointer underline underline-offset-2 hover:text-pink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Entre aqui.
            </button>
          </>
        ) : (
          <>
            Não tem conta?{' '}
            <button
              type="button"
              onClick={() => switchMode('register')}
              disabled={isSubmitting}
              className="bg-transparent border-none text-teal font-main text-sm cursor-pointer underline underline-offset-2 hover:text-pink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cadastre-se aqui.
            </button>
          </>
        )}
      </p>
    </div>
  )
}
