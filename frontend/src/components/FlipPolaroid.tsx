import { useState } from 'react'

export type FlipMessage = {
  heading: string
  body: string
  hint?: string
}

type FlipPolaroidProps = {
  src: string
  alt?: string
  flipMessage: FlipMessage
  frameClass: string
  tiltClass: string
}

export default function FlipPolaroid({ src, alt, flipMessage, frameClass, tiltClass }: FlipPolaroidProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <li
      className={`shrink-0 [perspective:1200px] ${tiltClass} transition-transform duration-300 hover:rotate-0 hover:scale-[1.03]`}
    >
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={flipped ? 'Voltar para a foto' : alt ? `Conhecer ${alt}` : 'Conhecer esta amiga'}
        data-flipped={flipped}
        className="relative block bg-transparent border-0 p-0 cursor-pointer w-[194px] h-[258px] sm:w-[224px] sm:h-[288px] [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(.65,.05,.36,1)] data-[flipped=true]:[transform:rotateY(180deg)]"
      >
        <span className="absolute inset-0 [backface-visibility:hidden] bg-white pt-3 px-3 pb-9 shadow-[0_10px_24px_rgba(30,30,30,0.18)]">
          <span className={`block overflow-hidden border-4 ${frameClass} w-[170px] h-[210px] sm:w-[200px] sm:h-[240px]`}>
            <img
              src={src}
              alt={alt ?? ''}
              loading="eager"
              decoding="async"
              className="block w-full h-full object-cover"
            />
          </span>
        </span>

        <span className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[var(--color-paper)] shadow-[0_10px_24px_rgba(30,30,30,0.18)] flex flex-col">
          <span aria-hidden="true" className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-yellow/80 rotate-3 rounded-sm shadow-sm" />

          <span className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-5 gap-3 sm:gap-4">
            <span className="font-main text-[17px] sm:text-xl text-red leading-tight text-balance">
              {flipMessage.heading}
            </span>
            <span className="block w-10 h-px bg-dark/20" aria-hidden="true" />
            <span className="font-body text-[14px] sm:text-[15px] text-dark/85 leading-relaxed whitespace-pre-line text-balance">
              {flipMessage.body}
            </span>
            {flipMessage.hint && flipMessage.hint.trim().length > 0 && (
              <span className="mt-1 font-main text-[10px] uppercase tracking-[0.22em] text-dark/45">
                {flipMessage.hint}
              </span>
            )}
          </span>

          <span aria-hidden="true" className="shrink-0 pb-2.5 text-center text-[11px] font-main text-dark/45 uppercase tracking-[0.22em]">
            ← virar
          </span>
        </span>
      </button>
    </li>
  )
}
