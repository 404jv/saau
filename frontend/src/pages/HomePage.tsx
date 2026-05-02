import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6">
      <p className="font-main text-sm tracking-[0.3em] text-teal uppercase">SAAU · Umuarama, PR</p>
      <h1 className="font-main text-5xl sm:text-6xl text-red leading-none">Em breve 🐾</h1>
      <p className="max-w-md text-lg text-dark/80 font-body">
        Estamos preparando o lar digital da Sociedade de Amparo aos Animais de Umuarama.
        Volte logo para conhecer nossos amigos peludos.
      </p>
      <Link
        to="/login"
        className="mt-2 inline-flex items-center gap-2 py-3 px-7 bg-red text-white border-2 border-dark rounded-xl font-main text-base no-underline shadow-[5px_5px_0_var(--color-dark)] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--color-dark)] hover:bg-pink"
      >
        Entrar na sua conta
      </Link>
    </main>
  )
}
