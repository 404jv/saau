import SiteNav from '../components/landing/SiteNav'
import SiteFooter from '../components/landing/SiteFooter'
import SectionHeading from '../components/primitives/SectionHeading'
import HardShadowButton from '../components/primitives/HardShadowButton'

export default function BazarPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-[100dvh] flex flex-col items-center justify-center px-5 py-32 text-center gap-6">
        <p className="font-main text-sm tracking-[0.3em] uppercase text-teal m-0">Bazar SAAU</p>
        <SectionHeading
          title={<>Bazar completo <span className="text-yellow">em breve</span> 🐾</>}
          subtitle="Estamos preparando uma vitrine bonita para os itens do bazar. Volte em breve, ou converse com a gente pra doar um item."
          accent="red"
        />
        <HardShadowButton as="link" to="/" variant="red" size="lg">
          Voltar para o início
        </HardShadowButton>
      </main>
      <SiteFooter />
    </>
  )
}
