import { useState } from 'react'
import SectionHeading from '../primitives/SectionHeading'
import PaperCard from '../primitives/PaperCard'
import HardShadowButton from '../primitives/HardShadowButton'
import MarginNote from '../primitives/MarginNote'
import { siteConfig } from '../../lib/site-config'

function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-4 h-4" aria-hidden="true">
      <rect x="3" y="2" width="9" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="6" y="5" width="9" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function PinIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 30 C 16 30 6 18 6 13 a10 10 0 1 1 20 0 c0 5 -10 17 -10 17 z" fill="var(--color-yellow)" stroke="var(--color-dark)" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="16" cy="13" r="3.5" fill="var(--color-paper)" stroke="var(--color-dark)" strokeWidth="2" />
    </svg>
  )
}

function PixGlyph() {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
      <g fill="none" stroke="var(--color-teal)" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M8 8 L16 16 L24 8" />
        <path d="M8 24 L16 16 L24 24" />
        <path d="M4 16 L9 11 M4 16 L9 21" />
        <path d="M28 16 L23 11 M28 16 L23 21" />
      </g>
    </svg>
  )
}

function BankIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
      <path d="M3 12 L16 4 L29 12 Z" fill="var(--color-purple)" stroke="var(--color-dark)" strokeWidth="2" strokeLinejoin="round" />
      <rect x="6" y="14" width="3" height="10" fill="var(--color-paper)" stroke="var(--color-dark)" strokeWidth="2" />
      <rect x="13.5" y="14" width="3" height="10" fill="var(--color-paper)" stroke="var(--color-dark)" strokeWidth="2" />
      <rect x="21" y="14" width="3" height="10" fill="var(--color-paper)" stroke="var(--color-dark)" strokeWidth="2" />
      <rect x="3" y="25" width="26" height="3" fill="var(--color-purple)" stroke="var(--color-dark)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

function FakeQrCode() {
  // Decorative QR-like grid (not a real scannable code).
  // Real QR for the production PIX key would be generated/imported as an asset.
  const cells = Array.from({ length: 21 * 21 }, (_, i) => {
    // pseudo-random pattern based on index
    const r = ((i * 2654435761) >>> 0) % 100
    return r > 55 ? 1 : 0
  })
  // finder squares (corners): force-fill
  function setSquare(x: number, y: number) {
    for (let dy = 0; dy < 7; dy++) for (let dx = 0; dx < 7; dx++) {
      const i = (y + dy) * 21 + (x + dx)
      if (i < cells.length) {
        const onEdge = dx === 0 || dy === 0 || dx === 6 || dy === 6
        const inner = dx >= 2 && dy >= 2 && dx <= 4 && dy <= 4
        cells[i] = onEdge || inner ? 1 : 0
      }
    }
  }
  setSquare(0, 0); setSquare(14, 0); setSquare(0, 14)
  return (
    <svg viewBox="0 0 21 21" className="block w-full h-full" aria-hidden="true">
      <rect width="21" height="21" fill="white" />
      {cells.map((c, i) => c ? (
        <rect key={i} x={i % 21} y={Math.floor(i / 21)} width="1" height="1" fill="var(--color-dark)" />
      ) : null)}
    </svg>
  )
}

function CopyableLine({ value, ariaLabel }: { value: string; ariaLabel: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // ignore: clipboard may be unavailable
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${ariaLabel} - copiar`}
      className="inline-flex items-center justify-between gap-3 w-full bg-white border-2 border-dark rounded-lg px-3 py-2 text-left hover:bg-paper transition-colors"
    >
      <span className="font-mono text-[13px] sm:text-sm text-dark truncate">{value}</span>
      <span className={`shrink-0 inline-flex items-center gap-1 font-main text-xs ${copied ? 'text-teal' : 'text-dark/55'}`}>
        <CopyIcon />
        {copied ? 'copiado!' : 'copiar'}
      </span>
    </button>
  )
}

export default function DonateSection() {
  return (
    <section id="doar" className="relative py-16 sm:py-24 px-5 sm:px-8 bg-[color-mix(in_srgb,var(--color-yellow)_8%,transparent)]">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="02 · Como doar"
          title="Cada gesto vira ração, vacina, abraço."
          subtitle="Escolha a forma que combina com você. Toda doação chega rapidinho aqui no abrigo."
          accent="red"
        />

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-10 sm:mt-12">
          <MarginNote
            text="menos de 1 minuto!"
            arrow="down-right"
            color="red"
            rotate={-10}
            className="hidden md:block absolute -top-10 left-[6%] z-10"
          />

          {/* PIX */}
          <PaperCard bg="teal-tint" border="solid" shadow="md" rounded="lg" padding="md" tape="top" tapeColor="teal" tilt={-1}>
            <div className="flex items-center gap-2 mb-3">
              <PixGlyph />
              <p className="font-main text-xl text-dark m-0">PIX</p>
            </div>

            <div className="relative bg-white border-2 border-dark rounded-lg p-3 mx-auto w-[180px] aspect-square shadow-[3px_3px_0_var(--color-dark)] rotate-[-2deg]">
              <FakeQrCode />
              <span aria-hidden="true" className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-yellow/80 rotate-3 rounded-sm shadow-sm" />
              <span aria-hidden="true" className="absolute -bottom-2 right-2 font-main text-[11px] text-pink rotate-[-4deg]">obrigada ♥</span>
            </div>

            <p className="font-body text-xs text-dark/65 mt-4 mb-1.5">Chave PIX ({siteConfig.donate.pix.keyType})</p>
            <CopyableLine value={siteConfig.donate.pix.key} ariaLabel="Chave PIX" />
          </PaperCard>

          {/* Bank / TED */}
          <PaperCard bg="purple-tint" border="solid" shadow="md" rounded="lg" padding="md" tape="top" tapeColor="pink" tilt={1.5}>
            <div className="flex items-center gap-2 mb-3">
              <BankIcon />
              <p className="font-main text-xl text-dark m-0">TED · {siteConfig.donate.bank.name}</p>
            </div>

            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 font-body text-sm text-dark/85 mb-4">
              <dt className="text-dark/55">Agência</dt><dd className="font-mono">{siteConfig.donate.bank.agency}</dd>
              <dt className="text-dark/55">Conta</dt><dd className="font-mono">{siteConfig.donate.bank.account}</dd>
              <dt className="text-dark/55">Tipo</dt><dd>{siteConfig.donate.bank.type}</dd>
              <dt className="text-dark/55">CNPJ</dt><dd className="font-mono">{siteConfig.donate.bank.cnpj}</dd>
            </dl>

            <p className="font-body text-xs text-dark/65 mb-1.5">Em nome de</p>
            <CopyableLine value={siteConfig.donate.bank.holder} ariaLabel="Nome do titular" />
          </PaperCard>

          {/* Address / drop-off */}
          <PaperCard bg="yellow-tint" border="solid" shadow="md" rounded="lg" padding="md" tape="top" tapeColor="yellow" tilt={-1.2}>
            <div className="flex items-center gap-2 mb-3">
              <PinIcon />
              <p className="font-main text-xl text-dark m-0">Doação física</p>
            </div>

            <p className="font-body text-sm text-dark/85 leading-relaxed mb-1">
              Aceite ração, cobertor, areia, brinquedos, remédios. Toda ajuda vira sorriso.
            </p>

            <div className="bg-white border-2 border-dark rounded-lg p-3 my-4 leading-relaxed">
              <p className="font-body text-sm text-dark m-0">{siteConfig.address.street}</p>
              <p className="font-body text-sm text-dark/75 m-0">
                {siteConfig.address.district} · {siteConfig.address.city}/{siteConfig.address.state}
              </p>
              <p className="font-body text-xs text-dark/55 mt-1 m-0">{siteConfig.hours}</p>
            </div>

            <HardShadowButton as="a" href={siteConfig.address.mapsUrl} variant="yellow" size="sm" fullWidth>
              Como chegar →
            </HardShadowButton>
          </PaperCard>
        </div>
      </div>
    </section>
  )
}
