import SectionHeading from '../primitives/SectionHeading'
import HardShadowButton from '../primitives/HardShadowButton'
import MarginNote from '../primitives/MarginNote'
import { whatsappLink } from '../../lib/site-config'

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17 14.5c-.3-.2-1.7-.9-1.9-1-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1s-1.2-.4-2.3-1.4c-.8-.7-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.6-.9-2.1-.2-.5-.5-.5-.7-.5h-.5c-.2 0-.5.1-.7.4-.3.3-1.1 1-1.1 2.4 0 1.4 1.1 2.7 1.2 3 .2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.1-1.4-.1-.2-.3-.3-.5-.4z"
      />
      <path
        fill="currentColor"
        d="M20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.7 1.4h.1c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.3zM12 21.7h-.1c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.4-1.5-5.2 0-5.4 4.4-9.9 9.9-9.9 2.6 0 5.1 1 7 2.9 1.9 1.9 2.9 4.4 2.9 7 0 5.4-4.4 9.9-9.9 9.9z"
      />
    </svg>
  )
}

const ADOPT_MESSAGE = 'Olá, SAAU! Vi o site e gostaria de saber mais sobre adoção. Pode me ajudar?'

export default function AdoptionSection() {
  return (
    <section id="adotar" className="relative py-16 sm:py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center bg-[color-mix(in_srgb,var(--color-pink)_10%,var(--color-paper))] border-2 border-dark rounded-3xl shadow-[10px_10px_0_var(--color-dark)] p-6 sm:p-10">
          <span aria-hidden="true" className="absolute -top-3 left-12 w-24 h-5 bg-teal/70 rotate-[-6deg] rounded-sm shadow-sm" />
          <span aria-hidden="true" className="absolute -top-2 right-16 w-16 h-5 bg-yellow/80 rotate-[5deg] rounded-sm shadow-sm" />

          <div className="relative flex justify-center">
            <figure className="relative bg-white pt-3 px-3 pb-9 shadow-[0_14px_30px_rgba(30,30,30,0.22)] rotate-[-3deg]">
              <span className="block overflow-hidden border-4 border-pink w-[200px] h-[240px] sm:w-[240px] sm:h-[290px]">
                <img src="/assets/photos/dog-2.webp" alt="Cachorro disponível para adoção" loading="lazy" decoding="async" className="block w-full h-full object-cover" />
              </span>
              <figcaption className="absolute bottom-1.5 left-0 right-0 text-center font-main text-xs text-dark/65">
                "Me leva para casa?"
              </figcaption>
            </figure>
            <MarginNote
              text="✨ pronto pra ir hoje"
              arrow="down-right"
              color="red"
              rotate={-10}
              className="absolute -top-4 -left-2 sm:-left-6"
            />
          </div>

          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="04 · Adoção"
              title="Quer um amigo pra vida toda?"
              align="left"
              accent="red"
            />
            <p className="font-body text-base sm:text-lg text-dark/85 leading-relaxed m-0">
              A gente te ajuda a encontrar o bichinho certo pra sua casa, seu ritmo,
              sua família. Sem pressa, sem burocracia exagerada. Só conversa,
              cuidado, e o compromisso de quem leva pra sempre.
            </p>
            <p className="font-body text-sm text-dark/70 m-0">
              Manda um oi pelo WhatsApp e a gente combina uma visita.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <HardShadowButton
                as="a"
                href={whatsappLink(ADOPT_MESSAGE)}
                variant="whatsapp"
                size="lg"
                pulse
                iconLeft={<WhatsAppGlyph />}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </HardShadowButton>
              <a href="#tutor-virtual" className="font-main text-sm text-teal underline underline-offset-2 hover:text-pink transition-colors">
                Conhecer todos os candidatos →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
