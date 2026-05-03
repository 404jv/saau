import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'

type Variant = 'red' | 'teal' | 'yellow' | 'purple' | 'pink' | 'whatsapp' | 'dark' | 'outline'
type Size = 'sm' | 'md' | 'lg'

const variantClass: Record<Variant, string> = {
  red:      'bg-red text-white border-2 border-dark hover:bg-pink',
  teal:     'bg-teal text-white border-2 border-dark hover:brightness-110',
  yellow:   'bg-yellow text-dark border-2 border-dark hover:brightness-105',
  purple:   'bg-purple text-white border-2 border-dark hover:brightness-110',
  pink:     'bg-pink text-white border-2 border-dark hover:bg-red',
  whatsapp: 'bg-[#25D366] text-white border-2 border-dark hover:brightness-105',
  dark:     'bg-dark text-white border-2 border-dark hover:bg-dark/90',
  outline:  'bg-transparent text-dark border-2 border-dark hover:bg-dark/5',
}

const sizeClass: Record<Size, string> = {
  sm: 'py-2 px-4 text-sm rounded-lg shadow-[3px_3px_0_var(--color-dark)] active:not-disabled:translate-x-[1px] active:not-disabled:translate-y-[1px] active:not-disabled:shadow-[1px_1px_0_var(--color-dark)]',
  md: 'py-3 px-6 text-base rounded-xl shadow-[5px_5px_0_var(--color-dark)] active:not-disabled:translate-x-[2px] active:not-disabled:translate-y-[2px] active:not-disabled:shadow-[2px_2px_0_var(--color-dark)]',
  lg: 'py-3.5 px-8 text-lg rounded-xl shadow-[6px_6px_0_var(--color-dark)] active:not-disabled:translate-x-[3px] active:not-disabled:translate-y-[3px] active:not-disabled:shadow-[2px_2px_0_var(--color-dark)]',
}

const baseClass = 'inline-flex items-center justify-center gap-2 font-main no-underline cursor-pointer transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-dark/40 disabled:hover:bg-dark/40 leading-tight whitespace-nowrap'

type Common = {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  pulse?: boolean
  className?: string
  children: ReactNode
}

type ButtonProps = Common & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
type AnchorProps = Common & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & { as: 'a'; href: string }
type RouterLinkProps = Common & Omit<LinkProps, 'children'> & { as: 'link'; to: string }

export type HardShadowButtonProps = ButtonProps | AnchorProps | RouterLinkProps

export default function HardShadowButton(props: HardShadowButtonProps) {
  const { variant = 'red', size = 'md', fullWidth, iconLeft, iconRight, pulse, className = '', children, as = 'button', ...rest } = props as Common & { as?: 'button' | 'a' | 'link' } & Record<string, unknown>

  const cls = [
    baseClass,
    variantClass[variant],
    sizeClass[size],
    fullWidth ? 'w-full' : '',
    pulse ? 'animate-[saau-pulse_2.4s_ease-in-out_infinite]' : '',
    className,
  ].filter(Boolean).join(' ')

  const inner = (
    <>
      {iconLeft && <span className="inline-flex items-center" aria-hidden="true">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="inline-flex items-center" aria-hidden="true">{iconRight}</span>}
    </>
  )

  if (as === 'a') {
    return <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>{inner}</a>
  }
  if (as === 'link') {
    return <Link className={cls} {...(rest as Omit<LinkProps, 'children'>)}>{inner}</Link>
  }
  return <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>{inner}</button>
}
