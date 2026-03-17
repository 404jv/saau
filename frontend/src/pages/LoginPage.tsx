import { useState } from 'react'
import './LoginPage.css'

function LoginPage() {
  const [isRegister, setIsRegister] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: integrate with backend
  }

  return (
    <div className="login-page">
      <div className="login-title">
        <img src="/assets/info.svg" alt="Info" className="info-icon" />
        <h1>{isRegister ? 'CRIAR SUA CONTA' : 'ENTRAR NA SUA CONTA'}</h1>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        {isRegister && (
          <div className="field">
            <label htmlFor="name">Nome:</label>
            <input id="name" type="text" name="name" />
          </div>
        )}
        <div className="field">
          <label htmlFor="email">E-mail:</label>
          <input id="email" type="email" name="email" />
        </div>
        <div className="field">
          <label htmlFor="password">Senha:</label>
          <input id="password" type="password" name="password" />
        </div>
        <button type="submit" className="btn-submit">ENVIAR</button>
      </form>

      <p className="toggle-link">
        {isRegister ? (
          <>
            Já tem conta?{' '}
            <button onClick={() => setIsRegister(false)}>Entre aqui.</button>
          </>
        ) : (
          <>
            Não tem conta?{' '}
            <button onClick={() => setIsRegister(true)}>Cadastre-se aqui.</button>
          </>
        )}
      </p>

      <a className="btn-google" href="/api/v1/auth/google">
        <svg viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 1 12c0 1.94.46 3.77 1.18 5.07l3.66-2.98z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Login com Google
      </a>

      <div className="dogs-section">
        <div className="dogs-title-wrapper">
          <h2 className="dogs-title">A GENTE TE AGUARDA</h2>
          <img src="/assets/chewing-bone-for-dog 1.svg" alt="" className="bone-icon" />
        </div>
        <div className="dogs-gallery">
          <div className="dog-card dog-card--teal">
            <img src="/assets/dog-4.png" alt="Cachorro" />
          </div>
          <div className="dog-card dog-card--yellow">
            <img src="/assets/dog-2.png" alt="Cachorro" />
          </div>
          <div className="dog-card dog-card--purple">
            <img src="/assets/dog-3.png" alt="Cachorro" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
