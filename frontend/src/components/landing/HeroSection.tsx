import HardShadowButton from '../primitives/HardShadowButton'
import MarginNote from '../primitives/MarginNote'
import { siteConfig } from '../../lib/site-config'

const HERO_PHOTOS: Array<{ src: string; tilt: number; frame: string; alt: string; delayMs: number; pos: string }> = [
  {
    src: '/assets/photos/dog-3.webp',
    tilt: -8,
    frame: 'border-teal',
    alt: 'Cachorro disponível para adoção',
    delayMs: 0,
    pos: 'top-2 left-[2%] sm:left-[6%]',
  },
  {
    src: '/assets/photos/cat-1.webp',
    tilt: 4,
    frame: 'border-yellow',
    alt: 'Gato disponível para adoção',
    delayMs: 110,
    pos: 'top-[44%] left-1/2 -translate-x-1/2 sm:top-[38%]',
  },
  {
    src: '/assets/photos/dog-4.webp',
    tilt: -6,
    frame: 'border-purple',
    alt: 'Cachorro esperando uma família',
    delayMs: 220,
    pos: 'bottom-2 right-[2%] sm:right-[6%]',
  },
]

export default function HeroSection() {
  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-12 items-center">
        <div className="order-2 lg:order-1 flex flex-col gap-5 sm:gap-6 animate-[saau-rise_500ms_ease-out_both]">
          <p className="font-main text-xs sm:text-sm tracking-[0.32em] uppercase text-teal m-0">
            {siteConfig.name} · {siteConfig.city}
          </p>
          <h1 className="font-main text-[44px] sm:text-6xl lg:text-7xl leading-[0.95] text-red m-0 text-balance">
            Aqui ninguém{' '}
            <span className="relative inline-block">
              fica para trás.
              <span aria-hidden="true" className="saau-wavy absolute -bottom-1 left-0 right-0 h-[5px]" />
            </span>
          </h1>
          <p className="font-body text-lg sm:text-xl text-dark/80 max-w-xl leading-relaxed m-0">
            Resgate, cuidado e uma família para cada patinha das ruas de {siteConfig.address.city}.
            Há mais de uma década, a {siteConfig.name} cuida de quem ninguém viu.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-2">
            <HardShadowButton as="a" href="#tutor-virtual" variant="red" size="lg">
              Ver os adotáveis
            </HardShadowButton>
            <HardShadowButton as="a" href="#doar" variant="outline" size="lg">
              Como ajudar →
            </HardShadowButton>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative">
          <MarginNote
            text="♥ todos esperam você"
            arrow="down-right"
            color="pink"
            rotate={-12}
            className="absolute -top-4 left-2 sm:left-6 lg:top-0 lg:left-4 z-20"
          />

          {/* Mobile / tablet: simple wrapped row, 2 per line on small, 3 on tablet */}
          <ul className="lg:hidden list-none m-0 p-0 flex flex-wrap justify-center items-end gap-4 sm:gap-6 pt-10 pb-2">
            {HERO_PHOTOS.map((p) => (
              <li key={p.src}>
                <figure
                  className="bg-white pt-3 px-3 pb-9 shadow-[0_14px_30px_rgba(30,30,30,0.22)] cursor-pointer transition-all duration-300 ease-out hover:!rotate-0 hover:scale-[1.05] hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(30,30,30,0.26)] animate-[saau-pop_500ms_cubic-bezier(.34,1.56,.64,1)_both]"
                  style={{ transform: `rotate(${p.tilt}deg)`, animationDelay: `${p.delayMs}ms` }}
                >
                  <span className={`block overflow-hidden border-4 ${p.frame} w-[130px] h-[160px] sm:w-[150px] sm:h-[180px]`}>
                    <img src={p.src} alt={p.alt} loading="eager" decoding="async" className="block w-full h-full object-cover" />
                  </span>
                </figure>
              </li>
            ))}
          </ul>

          {/* Desktop: artistic absolute fan */}
          <div className="hidden lg:block relative h-[520px]">
            {HERO_PHOTOS.map((p) => (
              <figure
                key={p.src}
                className={`absolute ${p.pos} bg-white pt-3 px-3 pb-9 shadow-[0_14px_30px_rgba(30,30,30,0.22)] cursor-pointer transition-all duration-300 ease-out hover:!rotate-0 hover:scale-[1.06] hover:-translate-y-2 hover:shadow-[0_22px_40px_rgba(30,30,30,0.28)] hover:z-30 animate-[saau-pop_500ms_cubic-bezier(.34,1.56,.64,1)_both]`}
                style={{ transform: `rotate(${p.tilt}deg)`, animationDelay: `${p.delayMs}ms` }}
              >
                <span className={`block overflow-hidden border-4 ${p.frame} w-[170px] h-[200px]`}>
                  <img src={p.src} alt={p.alt} loading="eager" decoding="async" className="block w-full h-full object-cover" />
                </span>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
