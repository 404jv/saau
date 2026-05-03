import SectionHeading from '../primitives/SectionHeading'
import HardShadowButton from '../primitives/HardShadowButton'
import MarginNote from '../primitives/MarginNote'

type Candidate = {
  name: string
  age: string
  src: string
  frame: 'teal' | 'yellow' | 'purple' | 'pink' | 'red'
  trait: string
  monthly: number
  tilt: number
}

const CANDIDATES: Candidate[] = [
  { name: 'Mel',     age: '3 anos',  src: '/assets/photos/cat-2.webp', frame: 'teal',   trait: 'discreta, gosta de colo no fim do dia', monthly: 30, tilt: -3 },
  { name: 'Zico',    age: '5 anos',  src: '/assets/photos/dog-3.webp', frame: 'yellow', trait: 'sambinha quando chega ração',           monthly: 40, tilt: 2  },
  { name: 'Pretinha',age: '8 meses', src: '/assets/photos/cat-3.webp', frame: 'purple', trait: 'pequenininha, cheia de personalidade',  monthly: 25, tilt: -1.5 },
]

const frameMap: Record<Candidate['frame'], string> = {
  teal: 'border-teal',
  yellow: 'border-yellow',
  purple: 'border-purple',
  pink: 'border-pink',
  red: 'border-red',
}

export default function TutorVirtualPreview() {
  return (
    <section id="tutor-virtual" className="relative py-16 sm:py-24 px-5 sm:px-8 bg-[color-mix(in_srgb,var(--color-teal)_8%,transparent)]">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="05 · Tutor virtual"
          title="Apadrinhe um bichinho à distância."
          subtitle="Ainda não tem espaço em casa? Você pode ajudar mensalmente um animal específico: paga o cuidado, recebe fotos, vê crescer."
          accent="red"
        />

        <div className="relative mt-10 sm:mt-12">
          <MarginNote
            text="R$ 30 = ração de 1 mês"
            arrow="down-left"
            color="red"
            rotate={6}
            className="hidden md:block absolute -top-8 right-[6%] z-10"
          />

          <ul className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {CANDIDATES.map((c) => (
              <li key={c.name}>
                <article
                  className="bg-white border-2 border-dark rounded-2xl p-4 shadow-[6px_6px_0_var(--color-dark)] flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-1"
                  style={{ transform: `rotate(${c.tilt}deg)` }}
                >
                  <div className={`overflow-hidden border-4 ${frameMap[c.frame]} aspect-[4/5] rounded-sm`}>
                    <img src={c.src} alt={c.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-main text-2xl text-dark m-0 leading-none">{c.name}</h3>
                    <span className="font-body text-xs text-dark/55">{c.age}</span>
                  </div>
                  <p className="font-body text-sm text-dark/75 leading-snug m-0 italic">"{c.trait}"</p>
                  <HardShadowButton
                    as="link"
                    to="/tutor-virtual"
                    variant="pink"
                    size="md"
                    fullWidth
                    className="mt-2"
                  >
                    Apadrinhar · R$ {c.monthly}/mês
                  </HardShadowButton>
                </article>
              </li>
            ))}
          </ul>

          <div className="flex justify-center mt-10 sm:mt-12">
            <HardShadowButton as="link" to="/tutor-virtual" variant="outline" size="lg">
              Conhecer todos os afilhados →
            </HardShadowButton>
          </div>
        </div>
      </div>
    </section>
  )
}
