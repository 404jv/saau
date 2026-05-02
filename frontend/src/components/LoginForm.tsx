import { useState } from 'react'

type Mode = 'login' | 'register'

const inputClass =
  'w-full py-3.5 px-4 border-2 border-dark rounded-[10px] bg-white/70 text-dark font-body text-base outline-none transition-all duration-200 shadow-[inset_2px_2px_0_rgba(0,0,0,0.04)] focus:border-red focus:bg-white focus:shadow-[inset_2px_2px_0_rgba(255,49,49,0.12)] placeholder:text-dark/40 disabled:opacity-60 disabled:cursor-not-allowed'

const labelClass = 'text-base font-bold text-dark tracking-wide font-body'

export default function LoginForm() {
  const [mode, setMode] = useState<Mode>('login')
  const isRegister = mode === 'register'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const trimmedEmail = email.trim()
  const isValid = trimmedEmail.length > 0 && password.length > 0 && (!isRegister || name.trim().length > 0)
  const isDisabled = !isValid || isSubmitting

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isDisabled) return
    setIsSubmitting(true)
    // TODO: integrate with backend
    setTimeout(() => setIsSubmitting(false), 1500)
  }

  const switchMode = (next: Mode) => {
    if (isSubmitting) return
    setMode(next)
  }

  const submitLabel = isSubmitting
    ? isRegister
      ? 'CADASTRANDO...'
      : 'ENVIANDO...'
    : isRegister
    ? 'CADASTRAR'
    : 'ENVIAR'

  return (
    <>
      <form className="w-full max-w-[440px] flex flex-col gap-5 mb-3" onSubmit={handleSubmit} noValidate>
        {isRegister && (
          <div className="flex flex-col gap-1.5 animate-[fade-in_0.25s_ease-out]">
            <label htmlFor="name" className={labelClass}>Nome:</label>
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              required
              disabled={isSubmitting}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Seu nome"
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelClass}>E-mail:</label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            required
            disabled={isSubmitting}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="voce@exemplo.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className={labelClass}>Senha:</label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            required
            disabled={isSubmitting}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            placeholder="••••••••"
          />
        </div>

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
    </>
  )
}
