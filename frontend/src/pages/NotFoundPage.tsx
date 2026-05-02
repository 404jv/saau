import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-5">
      <p className="font-main text-7xl sm:text-8xl text-purple leading-none">4🐶4</p>
      <h1 className="font-main text-3xl sm:text-4xl text-red">Página não encontrada</h1>
      <p className="max-w-md text-base text-dark/75 font-body">
        Esta página fugiu pelo portão. Vamos te levar de volta para o caminho.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center gap-2 py-3 px-6 bg-teal text-white border-2 border-dark rounded-xl font-main text-base no-underline shadow-[5px_5px_0_var(--color-dark)] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--color-dark)] hover:brightness-105"
      >
        Voltar para o início
      </Link>
    </main>
  )
}
