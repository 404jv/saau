import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import GoogleButton from '../components/GoogleButton'
import DogGallery, { type GalleryItem } from '../components/DogGallery'

const galleryItems: GalleryItem[] = [
  { src: '/assets/photos/dog-2.webp', alt: 'Cachorro disponível para adoção' },
  { src: '/assets/photos/cat-1.webp', alt: 'Gato disponível para adoção' },
  {
    src: '/assets/photos/luna.webp',
    alt: 'Luna',
    flipMessage: {
      heading: '✨ Você encontrou algo especial.',
      body: 'Luna ainda corre por aí… só que agora entre as estrelas. 🐾',
      hint: '',
    },
  },
  { src: '/assets/photos/dog-3.webp', alt: 'Cachorro disponível para adoção' },
  { src: '/assets/photos/cat-2.webp', alt: 'Gato disponível para adoção' },
  { src: '/assets/photos/dog-4.webp', alt: 'Cachorro disponível para adoção' },
  { src: '/assets/photos/cat-3.webp', alt: 'Gatinho disponível para adoção' },
]

type InitialBanner = {
  variant: 'oauth_cancelled' | 'oauth_failed' | 'unknown'
  heading: string
  message: string
} | null

function bannerFromError(code: string | null): InitialBanner {
  if (!code) return null
  if (code === 'oauth_cancelled' || code === 'google_cancelled') {
    return {
      variant: 'oauth_cancelled',
      heading: 'Login com Google cancelado',
      message: 'Você fechou a janela do Google. Tente de novo ou use seu e-mail.',
    }
  }
  if (code === 'oauth_failed' || code === 'google_failed' || code === 'google') {
    return {
      variant: 'oauth_failed',
      heading: 'Algo deu errado com o Google',
      message: 'Não conseguimos completar o login. Tente outra vez ou use seu e-mail.',
    }
  }
  return {
    variant: 'unknown',
    heading: 'Algo deu errado',
    message: 'Tente novamente.',
  }
}

export default function LoginPage() {
  const [params, setParams] = useSearchParams()
  const errorCode = params.get('error')
  const [initialBanner] = useState<InitialBanner>(() => bannerFromError(errorCode))

  // Strip the ?error= param from the URL once we've consumed it, so a refresh doesn't re-show the banner.
  useEffect(() => {
    if (!errorCode) return
    const next = new URLSearchParams(params)
    next.delete('error')
    setParams(next, { replace: true })
  }, [errorCode, params, setParams])

  const banner = useMemo(() => initialBanner, [initialBanner])

  return (
    <main className="min-h-[100dvh] flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 gap-10 sm:gap-12">
      <section className="relative w-full max-w-[480px]">
        <div className="absolute -top-4 left-8 w-28 h-6 bg-teal/70 rotate-[-6deg] rounded-sm shadow-sm" aria-hidden="true" />
        <div className="absolute -top-3 right-10 w-20 h-6 bg-yellow/80 rotate-[5deg] rounded-sm shadow-sm" aria-hidden="true" />

        <div className="relative bg-white border-2 border-dark rounded-3xl px-6 sm:px-9 py-7 sm:py-9 shadow-[10px_10px_0_var(--color-dark)]">
          <header className="flex flex-col items-center gap-1 mb-5">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-dark/55 font-main text-center leading-tight">
              Sociedade de Amparo aos Animais de Umuarama
            </p>
            <div className="flex items-center justify-center gap-3 mt-0.5">
              <img src="/assets/icons/info.svg" alt="" className="w-9 h-9" aria-hidden="true" />
              <h1 className="font-main text-2xl sm:text-[28px] text-red m-0 leading-tight text-center">
                ENTRAR NA SUA CONTA
              </h1>
            </div>
          </header>

          <div className="flex flex-col items-center">
            <LoginForm initialBanner={banner} />

            <div className="my-5 flex items-center gap-3 w-full max-w-[440px] text-dark/60">
              <span className="h-px flex-1 bg-dark/20" />
              <span className="font-main text-xs tracking-widest">OU</span>
              <span className="h-px flex-1 bg-dark/20" />
            </div>

            <GoogleButton />
          </div>
        </div>
      </section>

      <section className="w-full max-w-6xl flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <img
            src="/assets/icons/bone.svg"
            alt=""
            className="w-20 sm:w-24 lg:w-28 h-auto rotate-[-10deg] drop-shadow-[4px_4px_0_rgba(30,30,30,0.1)]"
            aria-hidden="true"
          />
          <h2 className="font-main text-3xl sm:text-4xl lg:text-[42px] text-red leading-none m-0">
            A GENTE TE AGUARDA
          </h2>
        </div>

        <DogGallery items={galleryItems} />
      </section>
    </main>
  )
}
