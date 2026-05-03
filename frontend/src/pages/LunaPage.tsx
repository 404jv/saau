import SiteNav from '../components/landing/SiteNav'
import SiteFooter from '../components/landing/SiteFooter'
import FlipPolaroid from '../components/FlipPolaroid'
import HardShadowButton from '../components/primitives/HardShadowButton'

const LUNA_MESSAGE = {
  heading: '✨ Você encontrou algo especial.',
  body: 'Luna ainda corre por aí… só que agora entre as estrelas. 🐾',
}

function PawWatermark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g fill="currentColor">
        <ellipse cx="16" cy="22" rx="6.5" ry="5" />
        <ellipse cx="7.5" cy="14" rx="2.6" ry="3.6" transform="rotate(-18 7.5 14)" />
        <ellipse cx="24.5" cy="14" rx="2.6" ry="3.6" transform="rotate(18 24.5 14)" />
        <ellipse cx="12.5" cy="9" rx="2" ry="2.6" />
        <ellipse cx="19.5" cy="9" rx="2" ry="2.6" />
      </g>
    </svg>
  )
}

export default function LunaPage() {
  return (
    <>
      <SiteNav />

      <main className="relative min-h-[100dvh] pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 px-5 sm:px-8">
        <PawWatermark className="hidden sm:block absolute top-32 left-[6%] w-16 h-16 text-pink/15 -rotate-12 pointer-events-none" />
        <PawWatermark className="hidden sm:block absolute bottom-32 right-[8%] w-20 h-20 text-purple/12 rotate-[18deg] pointer-events-none" />

        <article className="max-w-[640px] mx-auto flex flex-col items-center text-center gap-8 sm:gap-10">
          <header className="flex flex-col items-center gap-2">
            <p className="font-main text-[11px] sm:text-xs uppercase tracking-[0.32em] text-teal m-0">
              Em memória de
            </p>
            <h1 className="font-main text-5xl sm:text-6xl lg:text-7xl text-red leading-[0.95] m-0">
              Luna
            </h1>
            <p className="font-main text-sm sm:text-base text-dark/55 tracking-[0.22em] uppercase mt-2 m-0">
              2021 · 2025
            </p>
          </header>

          <ul className="list-none m-0 p-0 flex justify-center" aria-label="Galeria em memória da Luna">
            <FlipPolaroid
              src="/assets/photos/luna.webp"
              alt="Luna"
              flipMessage={LUNA_MESSAGE}
              frameClass="border-pink"
              tiltClass="-rotate-2"
            />
          </ul>

          <div className="flex flex-col gap-4 font-body text-base sm:text-[17px] text-dark/85 leading-relaxed">
            <p className="m-0">
              A Luna chegou pelas ruas, como tantos outros bichinhos
              que passam pela SAAU. Pequena, faminta, e ainda assim, confiante de
              que alguém ia parar.
            </p>
            <p className="m-0">
              Alguém parou. Ela foi adotada, virou parte da casa, e provou todos
              os dias que toda patinha tem um nome. Foi boa menina até o último
              dia.
            </p>
            <p className="m-0 text-dark/70 italic">
              Esta página existe porque ela existiu. Obrigado, Luninha.
            </p>
          </div>

          <HardShadowButton as="link" to="/" variant="red" size="lg">
            Voltar para o início
          </HardShadowButton>
        </article>
      </main>

      <SiteFooter />
    </>
  )
}
