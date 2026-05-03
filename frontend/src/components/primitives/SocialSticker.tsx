type Kind = 'instagram' | 'facebook' | 'whatsapp'

type SocialStickerProps = {
  kind: Kind
  href: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  rotate?: number
  className?: string
}

const sizeClass = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-16 h-16',
}

const labelMap: Record<Kind, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  whatsapp: 'WhatsApp',
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-3/5 h-3/5" aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFD600" />
          <stop offset="50%" stopColor="#FF1744" />
          <stop offset="100%" stopColor="#651FFF" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="52" height="52" rx="14" fill="url(#ig-grad)" />
      <rect x="14" y="14" width="36" height="36" rx="10" fill="none" stroke="#fff" strokeWidth="3" />
      <circle cx="32" cy="32" r="8" fill="none" stroke="#fff" strokeWidth="3" />
      <circle cx="44" cy="20" r="2.4" fill="#fff" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-3/5 h-3/5" aria-hidden="true">
      <rect x="6" y="6" width="52" height="52" rx="14" fill="#1877F2" />
      <path
        d="M36 22h4v-7h-5c-4 0-7 3-7 7v4h-4v6h4v17h6V32h5l1-6h-6v-3c0-.7.5-1 1-1z"
        fill="#fff"
      />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-3/5 h-3/5" aria-hidden="true">
      <rect x="6" y="6" width="52" height="52" rx="14" fill="#25D366" />
      <path
        fill="#fff"
        d="M44 36.5c-.6-.3-3.6-1.8-4.2-2-.5-.2-.9-.3-1.3.3-.4.6-1.5 1.9-1.8 2.3-.4.4-.7.4-1.3.1-.6-.3-2.5-.9-4.7-2.9-1.7-1.6-2.9-3.5-3.3-4.1-.4-.6 0-.9.2-1.2.3-.3.6-.7.9-1 .3-.4.4-.6.6-1 .2-.4.1-.7-.1-1-.1-.3-1.3-3.2-1.9-4.4-.5-1.1-1-1-1.4-1h-1.2c-.4 0-1.1.2-1.6.7-.5.6-2.1 2-2.1 4.9 0 2.9 2.1 5.7 2.4 6.1.3.4 4.2 6.4 10.2 9 1.4.6 2.5 1 3.4 1.3 1.4.4 2.7.4 3.7.2 1.1-.2 3.6-1.5 4.1-2.9.5-1.4.5-2.6.4-2.9-.1-.3-.5-.4-1-.7z"
      />
    </svg>
  )
}

const iconMap = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsAppIcon,
} as const

export default function SocialSticker({
  kind,
  href,
  label,
  size = 'md',
  rotate = 0,
  className = '',
}: SocialStickerProps) {
  const Icon = iconMap[kind]
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ?? labelMap[kind]}
      className={`inline-flex items-center justify-center bg-white border-2 border-dark rounded-full shadow-[4px_4px_0_var(--color-dark)] transition-transform duration-300 hover:scale-110 hover:[transform:rotate(0deg)_scale(1.1)] ${sizeClass[size]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <Icon />
    </a>
  )
}
