import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow?: string
  icon?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  accent?: 'red' | 'teal' | 'yellow' | 'purple' | 'pink' | 'dark'
  className?: string
}

const accentText: Record<NonNullable<SectionHeadingProps['accent']>, string> = {
  red: 'text-red',
  teal: 'text-teal',
  yellow: 'text-yellow',
  purple: 'text-purple',
  pink: 'text-pink',
  dark: 'text-dark',
}

export default function SectionHeading({
  eyebrow,
  icon,
  title,
  subtitle,
  align = 'center',
  accent = 'red',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <header className={`flex flex-col gap-2 ${alignClass} ${className}`}>
      {eyebrow && (
        <p className={`font-main text-[11px] sm:text-xs uppercase tracking-[0.28em] m-0 leading-none text-teal`}>
          {eyebrow}
        </p>
      )}
      <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        {icon && <span aria-hidden="true" className="shrink-0 inline-flex items-center">{icon}</span>}
        <h2 className={`font-main text-3xl sm:text-4xl lg:text-[42px] m-0 leading-tight ${accentText[accent]}`}>
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="font-body text-base sm:text-lg text-dark/75 max-w-2xl m-0 leading-relaxed">
          {subtitle}
        </p>
      )}
    </header>
  )
}
