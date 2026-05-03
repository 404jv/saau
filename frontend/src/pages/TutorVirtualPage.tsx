import SiteNav from '../components/landing/SiteNav'
import SiteFooter from '../components/landing/SiteFooter'
import SectionHeading from '../components/primitives/SectionHeading'
import HardShadowButton from '../components/primitives/HardShadowButton'

export default function TutorVirtualPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-[100dvh] flex flex-col items-center justify-center px-5 py-32 text-center gap-6">
        <p className="font-main text-sm tracking-[0.3em] uppercase text-teal m-0">Tutor virtual</p>
        <SectionHeading
          title={<>Lista de afilhados <span className="text-pink">em breve</span> 🐾</>}
          subtitle="Estamos montando o sistema de apadrinhamento mensal. Em breve você poderá escolher seu afilhado e acompanhar sua história."
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
