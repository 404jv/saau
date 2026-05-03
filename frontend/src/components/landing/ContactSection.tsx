import SectionHeading from '../primitives/SectionHeading'
import SocialSticker from '../primitives/SocialSticker'
import PaperCard from '../primitives/PaperCard'
import MarginNote from '../primitives/MarginNote'
import HardShadowButton from '../primitives/HardShadowButton'
import { siteConfig, whatsappLink } from '../../lib/site-config'

function PinIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
      <path d="M16 30 C 16 30 6 18 6 13 a10 10 0 1 1 20 0 c0 5 -10 17 -10 17 z" fill="var(--color-yellow)" stroke="var(--color-dark)" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="16" cy="13" r="3.5" fill="var(--color-paper)" stroke="var(--color-dark)" strokeWidth="2" />
    </svg>
  )
}

export default function ContactSection() {
  return (
    <section id="contato" className="relative py-16 sm:py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="06 · Contato"
          title="Vem conversar com a gente."
          subtitle="Manda um oi, segue, compartilha. Qualquer porta vale."
          accent="red"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-12 mt-10 sm:mt-12 items-start">
          <PaperCard bg="white" border="solid" shadow="md" rounded="lg" padding="lg" tape="top-left" tapeColor="yellow" tilt={-0.8}>
            <div className="flex items-start gap-3">
              <PinIcon />
              <div>
                <p className="font-main text-xl text-dark m-0">Onde a gente fica</p>
                <p className="font-body text-base text-dark/85 mt-2 leading-relaxed m-0">
                  {siteConfig.address.street}<br />
                  {siteConfig.address.district} · {siteConfig.address.city}/{siteConfig.address.state}<br />
                  CEP {siteConfig.address.zip}
                </p>
                <p className="font-body text-sm text-dark/65 mt-3 m-0">{siteConfig.hours}</p>
                <HardShadowButton as="a" href={siteConfig.address.mapsUrl} variant="yellow" size="sm" className="mt-4" target="_blank" rel="noopener noreferrer">
                  Abrir no mapa →
                </HardShadowButton>
              </div>
            </div>
          </PaperCard>

          <div className="relative">
            <MarginNote
              text="respondemos rapidinho 💌"
              arrow="down-right"
              color="pink"
              rotate={-8}
              className="absolute -top-6 left-2 sm:left-4 z-10"
            />
            <PaperCard bg="paper" border="solid" shadow="md" rounded="lg" padding="lg" tilt={1}>
              <p className="font-main text-xl text-dark m-0 mb-5">Redes</p>
              <div className="flex items-center gap-5 sm:gap-6">
                <SocialSticker kind="whatsapp" href={whatsappLink('Olá, SAAU!')} size="lg" rotate={5} label={`WhatsApp ${siteConfig.social.whatsapp.display}`} />
                <SocialSticker kind="instagram" href={siteConfig.social.instagram.url} size="lg" rotate={-4} label={`Instagram ${siteConfig.social.instagram.handle}`} />
                <SocialSticker kind="facebook" href={siteConfig.social.facebook.url} size="lg" rotate={3} label={`Facebook ${siteConfig.social.facebook.handle}`} />
              </div>
              <ul className="list-none m-0 p-0 mt-6 flex flex-col gap-2 font-body text-sm text-dark/85">
                <li><span className="text-dark/55">WhatsApp · </span>{siteConfig.social.whatsapp.display}</li>
                <li><span className="text-dark/55">Instagram · </span>{siteConfig.social.instagram.handle}</li>
                <li><span className="text-dark/55">Facebook · </span>{siteConfig.social.facebook.handle}</li>
              </ul>
            </PaperCard>
          </div>
        </div>
      </div>
    </section>
  )
}
