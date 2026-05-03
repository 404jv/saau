import SocialSticker from '../primitives/SocialSticker'
import { siteConfig, whatsappLink } from '../../lib/site-config'

export default function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative mt-16">
      <svg
        viewBox="0 0 1200 32"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="block w-full h-6 -mb-px"
      >
        <path
          d="M0 32 L0 18 Q40 6 80 14 T160 12 T240 18 T320 8 T400 16 T480 6 T560 14 T640 18 T720 8 T800 16 T880 6 T960 18 T1040 12 T1120 16 T1200 10 L1200 32 Z"
          fill="var(--color-dark)"
        />
      </svg>
      <div className="bg-dark text-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-main text-2xl text-white m-0 leading-tight">{siteConfig.name}</p>
            <p className="font-body text-sm text-white/70 mt-2 max-w-xs leading-relaxed">
              {siteConfig.fullName}.<br />
              Cuidando das patinhas das ruas de {siteConfig.address.city}.
            </p>
          </div>

          <div>
            <p className="font-main text-xs uppercase tracking-[0.22em] text-white/55 m-0 mb-3">Visite</p>
            <ul className="list-none m-0 p-0 flex flex-col gap-2 font-body text-sm text-white/85">
              <li><a href="#quem-somos" className="hover:text-yellow transition-colors no-underline">Quem somos</a></li>
              <li><a href="#doar" className="hover:text-yellow transition-colors no-underline">Como doar</a></li>
              <li><a href="#bazar" className="hover:text-yellow transition-colors no-underline">Bazar</a></li>
              <li><a href="#adotar" className="hover:text-yellow transition-colors no-underline">Adotar</a></li>
              <li><a href="#tutor-virtual" className="hover:text-yellow transition-colors no-underline">Tutor virtual</a></li>
              <li><a href="#contato" className="hover:text-yellow transition-colors no-underline">Contato</a></li>
            </ul>
          </div>

          <div>
            <p className="font-main text-xs uppercase tracking-[0.22em] text-white/55 m-0 mb-3">Encontre a gente</p>
            <div className="flex items-center gap-3 mb-4">
              <SocialSticker kind="instagram" href={siteConfig.social.instagram.url} rotate={-4} />
              <SocialSticker kind="facebook" href={siteConfig.social.facebook.url} rotate={2} />
              <SocialSticker kind="whatsapp" href={whatsappLink('Olá, SAAU! Vim pelo site.')} rotate={5} />
            </div>
            <p className="font-body text-sm text-white/75 leading-relaxed m-0">
              {siteConfig.address.street}<br />
              {siteConfig.address.district} · {siteConfig.address.city}/{siteConfig.address.state}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10">
          <p className="max-w-6xl mx-auto px-5 sm:px-8 py-4 text-center text-xs text-white/55 font-body m-0">
            © {year} {siteConfig.name} · Feito com 🐾 em {siteConfig.address.city}
          </p>
        </div>
      </div>
    </footer>
  )
}
