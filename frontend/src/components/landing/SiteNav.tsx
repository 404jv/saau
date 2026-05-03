import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import HardShadowButton from '../primitives/HardShadowButton'
import { siteConfig } from '../../lib/site-config'

const SECTIONS: Array<{ id: string; label: string }> = [
  { id: 'quem-somos', label: 'Quem somos' },
  { id: 'doar', label: 'Doar' },
  { id: 'bazar', label: 'Bazar' },
  { id: 'adotar', label: 'Adotar' },
  { id: 'tutor-virtual', label: 'Tutor virtual' },
  { id: 'contato', label: 'Contato' },
]

function PawMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g fill="var(--color-red)">
        <ellipse cx="16" cy="22" rx="6.5" ry="5" />
        <ellipse cx="7.5" cy="14" rx="2.6" ry="3.6" transform="rotate(-18 7.5 14)" />
        <ellipse cx="24.5" cy="14" rx="2.6" ry="3.6" transform="rotate(18 24.5 14)" />
        <ellipse cx="12.5" cy="9" rx="2" ry="2.6" />
        <ellipse cx="19.5" cy="9" rx="2" ry="2.6" />
      </g>
    </svg>
  )
}

export default function SiteNav() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const location = useLocation()
  const onHome = location.pathname === '/'

  useEffect(() => {
    let lastY = window.scrollY
    function onScroll() {
      const y = window.scrollY
      if (y < 80) { setHidden(false); lastY = y; return }
      const diff = y - lastY
      if (diff > 6) setHidden(true)
      else if (diff < -6) setHidden(false)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!onHome) { setActiveId(''); return }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [onHome])

  useEffect(() => { setOpen(false) }, [location.pathname])

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  function linkHref(id: string) {
    return onHome ? `#${id}` : `/#${id}`
  }

  const headerHidden = hidden && !open

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${headerHidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="bg-[color-mix(in_srgb,var(--color-paper)_92%,transparent)] backdrop-blur-md border-b border-dashed border-dark/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 no-underline group" aria-label="SAAU, início">
              <PawMark className="w-7 h-7 transition-transform duration-300 group-hover:rotate-[-10deg]" />
              <span className="font-main text-base sm:text-lg text-dark tracking-[0.18em] uppercase">{siteConfig.name}</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
              {SECTIONS.map((s) => {
                const active = activeId === s.id
                return (
                  <a
                    key={s.id}
                    href={linkHref(s.id)}
                    className={`relative font-body text-[15px] text-dark/80 hover:text-dark transition-colors no-underline ${active ? 'text-dark' : ''}`}
                  >
                    {s.label}
                    {active && (
                      <span aria-hidden="true" className="saau-wavy absolute -bottom-1 left-0 right-0 h-[4px]" />
                    )}
                  </a>
                )
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Link to="/login" className="font-main text-sm text-teal underline underline-offset-2 hover:text-pink transition-colors">
                Entrar
              </Link>
              <HardShadowButton as="link" to="/login" variant="red" size="sm">
                Cadastre-se
              </HardShadowButton>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              className="lg:hidden relative z-[60] inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-dark/5 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
                {open ? (
                  <g stroke="var(--color-dark)" strokeWidth="2.4" strokeLinecap="round">
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </g>
                ) : (
                  <g stroke="var(--color-dark)" strokeWidth="2.4" strokeLinecap="round">
                    <line x1="4" y1="8" x2="20" y2="8" />
                    <line x1="4" y1="14" x2="20" y2="14" />
                    <line x1="4" y1="20" x2="20" y2="20" />
                  </g>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/*
        Mobile sheet rendered as a portal so the header's transform doesn't
        contain it (transformed parents become the containing block for fixed
        descendants, which collapses the sheet to the header's small height).
      */}
      {createPortal(
        <div
          aria-hidden={!open}
          className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="absolute inset-0 bg-[var(--color-paper)]" />

          <div className="relative h-full flex flex-col">
            <div className="h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between border-b border-dashed border-dark/20">
              <div className="flex items-center gap-2">
                <PawMark className="w-7 h-7" />
                <span className="font-main text-base sm:text-lg text-dark tracking-[0.18em] uppercase">{siteConfig.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-dark/5 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
                  <g stroke="var(--color-dark)" strokeWidth="2.4" strokeLinecap="round">
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </g>
                </svg>
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto px-6 py-8 flex flex-col gap-7">
              <span aria-hidden="true" className="self-center w-32 h-4 bg-yellow/80 rotate-[3deg] rounded-sm shadow-sm" />

              <nav className="flex flex-col gap-5">
                {SECTIONS.map((s, i) => (
                  <a
                    key={s.id}
                    href={linkHref(s.id)}
                    onClick={() => setOpen(false)}
                    className={`font-main text-3xl text-dark hover:text-red transition-colors no-underline ${open ? 'animate-[saau-rise_350ms_ease-out_both]' : ''}`}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {s.label}
                  </a>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 pt-4">
                <Link to="/login" onClick={() => setOpen(false)} className="self-center font-main text-base text-teal underline underline-offset-2">
                  Entrar
                </Link>
                <HardShadowButton as="link" to="/login" variant="red" size="md" fullWidth>
                  Cadastre-se
                </HardShadowButton>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
