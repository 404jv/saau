import SectionHeading from '../primitives/SectionHeading'
import PaperCard from '../primitives/PaperCard'
import { siteConfig } from '../../lib/site-config'

// Drop the volunteer count stat: now we show the volunteers themselves below.
const STATS = siteConfig.stats.filter((s) => !/volunt/i.test(s.label))

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

export default function AboutSection() {
  return (
    <section id="quem-somos" className="relative py-16 sm:py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-start">
        <div className="relative">
          <SectionHeading
            eyebrow="01 · Quem somos"
            title="Uma casa para quem ninguém viu"
            align="left"
            accent="red"
          />
          <div className="mt-6 flex flex-col gap-4 font-body text-base sm:text-[17px] text-dark/85 leading-relaxed max-w-2xl">
            <p className="m-0">
              A <strong className="font-semibold">{siteConfig.fullName}</strong> nasceu da
              vontade de uma turma de voluntários de {siteConfig.address.city}{' '}
              <span className="bg-yellow/55 px-1.5 -mx-0.5 rounded-sm">
                que não conseguia mais passar reto
              </span>{' '}
              por um cachorro abandonado.
            </p>
            <p className="m-0">
              Hoje somos um abrigo independente, mantido por doações e pelo trabalho de quem aparece
              todo fim de semana com ração, cobertor e tempo. Resgatamos, vacinamos, castramos e
              acompanhamos cada bichinho até encontrar um lar definitivo.
            </p>
            <p className="m-0 text-dark/70 italic">
              Não vivemos de mágica. Vivemos de gente que se importa.
            </p>
          </div>

          <PawWatermark className="hidden lg:block absolute -bottom-6 right-2 w-12 h-12 text-purple/15 rotate-[14deg] pointer-events-none" />
        </div>

        <div className="relative">
          <figure
            className="relative bg-white pt-3 px-3 pb-9 shadow-[0_14px_30px_rgba(30,30,30,0.22)] transition-transform duration-500 hover:rotate-0 [will-change:transform] [backface-visibility:hidden]"
            style={{ transform: 'rotate(-2deg) translateZ(0)' }}
          >
            <span aria-hidden="true" className="absolute -top-3 -left-2 w-20 h-5 bg-yellow/85 rotate-[-8deg] rounded-sm shadow-sm" />
            <div className="overflow-hidden border-4 border-teal aspect-[16/9] [transform:translateZ(0)]">
              <img
                src="/assets/photos/volunteers.webp"
                alt="Voluntários do SAAU em um evento, segurando bichinhos para adoção"
                loading="lazy"
                decoding="async"
                className="block w-full h-full object-cover"
              />
            </div>
          </figure>

          <ul className="list-none m-0 p-0 mt-6 grid grid-cols-2 gap-3 sm:gap-4">
            {STATS.map((stat, i) => {
              const tones: Array<'yellow-tint' | 'pink-tint'> = ['yellow-tint', 'pink-tint']
              const tapes: Array<'yellow' | 'pink'> = ['yellow', 'pink']
              const tilts = [-1.5, 1.8]
              return (
                <li key={stat.label}>
                  <PaperCard
                    bg={tones[i % tones.length]}
                    border="solid"
                    shadow="sm"
                    rounded="lg"
                    padding="sm"
                    tape="top-right"
                    tapeColor={tapes[i % tapes.length]}
                    tilt={tilts[i % tilts.length]}
                  >
                    <p className="font-main text-2xl sm:text-3xl text-red m-0 leading-none">{stat.value}</p>
                    <p className="font-body text-xs sm:text-sm text-dark/75 mt-1 m-0">{stat.label}</p>
                  </PaperCard>
                </li>
              )
            })}
          </ul>

        </div>
      </div>
    </section>
  )
}
