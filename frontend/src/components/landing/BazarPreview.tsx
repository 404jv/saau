import SectionHeading from '../primitives/SectionHeading'
import HardShadowButton from '../primitives/HardShadowButton'
import MarginNote from '../primitives/MarginNote'

type BazarItem = {
  name: string
  price: string
  description: string
  emoji: string
  bg: string
  ribbon: string
  tilt: number
}

const ITEMS: BazarItem[] = [
  {
    name: 'Ração 5KG',
    price: 'R$ 35',
    description: 'Premium, lacrada. Doada por nossa rede de apoio.',
    emoji: '🥣',
    bg: 'bg-[color-mix(in_srgb,var(--color-teal)_18%,var(--color-paper))]',
    ribbon: 'bg-teal',
    tilt: -1.5,
  },
  {
    name: 'Cobertor',
    price: 'R$ 12',
    description: 'Macio, lavado, pronto pra acolher uma noite fria.',
    emoji: '🧶',
    bg: 'bg-[color-mix(in_srgb,var(--color-yellow)_28%,var(--color-paper))]',
    ribbon: 'bg-yellow',
    tilt: 1.2,
  },
  {
    name: 'Brinquedos',
    price: 'R$ 8',
    description: 'Para os filhotes que ainda não sabem viver sem morder.',
    emoji: '🎾',
    bg: 'bg-[color-mix(in_srgb,var(--color-pink)_15%,var(--color-paper))]',
    ribbon: 'bg-pink',
    tilt: -0.8,
  },
]

function PriceTag({ price, color }: { price: string; color: string }) {
  return (
    <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-10 rotate-[12deg]">
      <span aria-hidden="true" className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-3 bg-dark/80 rounded-sm" />
      <div className={`relative ${color} text-white border-2 border-dark rounded-lg px-3 py-1.5 shadow-[3px_3px_0_var(--color-dark)] flex items-center gap-1`}>
        <svg viewBox="0 0 8 8" className="w-1.5 h-1.5" aria-hidden="true"><circle cx="4" cy="4" r="2.5" fill="white" /></svg>
        <span className="font-main text-base sm:text-lg leading-none">{price}</span>
      </div>
    </div>
  )
}

export default function BazarPreview() {
  return (
    <section id="bazar" className="relative py-16 sm:py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="03 · Bazar solidário"
          title="Compre, doe, ou faça as duas coisas."
          subtitle="100% do valor vira cuidado para os animais do abrigo. Itens novos e usados em ótimo estado."
          accent="red"
        />

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 sm:mt-12">
          <MarginNote
            text="tudo doado pelo carinho"
            arrow="down-left"
            color="teal"
            rotate={-6}
            className="hidden lg:block absolute -top-10 right-[8%] z-10"
          />

          {ITEMS.map((item) => (
            <article
              key={item.name}
              className={`relative ${item.bg} border-2 border-dark rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0_var(--color-dark)] flex flex-col gap-3 transition-transform duration-300 hover:rotate-0 hover:-translate-y-1`}
              style={{ transform: `rotate(${item.tilt}deg)` }}
            >
              <PriceTag price={item.price} color={item.ribbon} />
              <div className="text-5xl sm:text-6xl mb-1 select-none" aria-hidden="true">{item.emoji}</div>
              <h3 className="font-main text-2xl text-dark m-0 leading-none">{item.name}</h3>
              <p className="font-body text-sm sm:text-base text-dark/75 leading-relaxed m-0">{item.description}</p>
              <HardShadowButton as="link" to="/bazar" variant="dark" size="sm" className="mt-2 self-start">
                Ver detalhes
              </HardShadowButton>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-10 sm:mt-12">
          <HardShadowButton as="link" to="/bazar" variant="outline" size="lg">
            Ver bazar completo →
          </HardShadowButton>
        </div>
      </div>
    </section>
  )
}
