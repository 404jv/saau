import type { HTMLAttributes, ReactNode } from 'react'
import TapeStrip from './TapeStrip'

type Bg = 'white' | 'paper' | 'teal-tint' | 'yellow-tint' | 'purple-tint' | 'pink-tint'
type Shadow = 'none' | 'sm' | 'md' | 'lg'
type Border = 'solid' | 'dashed' | 'none'
type Padding = 'none' | 'sm' | 'md' | 'lg'
type TapePos = 'none' | 'top' | 'top-left' | 'top-right'

type PaperCardProps = HTMLAttributes<HTMLDivElement> & {
  bg?: Bg
  border?: Border
  shadow?: Shadow
  tilt?: number
  padding?: Padding
  tape?: TapePos
  tapeColor?: 'yellow' | 'teal' | 'pink'
  rounded?: 'sm' | 'md' | 'lg' | 'xl'
  children: ReactNode
}

const bgClass: Record<Bg, string> = {
  white: 'bg-white',
  paper: 'bg-[var(--color-paper)]',
  'teal-tint': 'bg-[color-mix(in_srgb,var(--color-teal)_15%,var(--color-paper))]',
  'yellow-tint': 'bg-[color-mix(in_srgb,var(--color-yellow)_25%,var(--color-paper))]',
  'purple-tint': 'bg-[color-mix(in_srgb,var(--color-purple)_12%,var(--color-paper))]',
  'pink-tint': 'bg-[color-mix(in_srgb,var(--color-pink)_15%,var(--color-paper))]',
}

const shadowClass: Record<Shadow, string> = {
  none: '',
  sm: 'shadow-[4px_4px_0_var(--color-dark)]',
  md: 'shadow-[6px_6px_0_var(--color-dark)]',
  lg: 'shadow-[10px_10px_0_var(--color-dark)]',
}

const borderClass: Record<Border, string> = {
  solid: 'border-2 border-dark',
  dashed: 'border-2 border-dashed border-dark',
  none: '',
}

const paddingClass: Record<Padding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6 sm:p-7',
  lg: 'p-7 sm:p-9',
}

const roundedClass = {
  sm: 'rounded-md',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-3xl',
}

const tapePositionClass: Record<TapePos, string> = {
  none: '',
  top: 'absolute -top-2 left-1/2 -translate-x-1/2',
  'top-left': 'absolute -top-2 left-6',
  'top-right': 'absolute -top-2 right-6',
}

export default function PaperCard({
  bg = 'white',
  border = 'solid',
  shadow = 'md',
  tilt,
  padding = 'md',
  tape = 'none',
  tapeColor = 'yellow',
  rounded = 'lg',
  children,
  className = '',
  style,
  ...rest
}: PaperCardProps) {
  const cls = [
    'relative',
    bgClass[bg],
    borderClass[border],
    shadowClass[shadow],
    paddingClass[padding],
    roundedClass[rounded],
    className,
  ].filter(Boolean).join(' ')

  const tiltStyle = tilt ? { transform: `rotate(${tilt}deg)`, ...style } : style

  return (
    <div className={cls} style={tiltStyle} {...rest}>
      {tape !== 'none' && (
        <TapeStrip color={tapeColor} className={tapePositionClass[tape]} rotate={tape === 'top-right' ? 8 : tape === 'top-left' ? -8 : 3} />
      )}
      {children}
    </div>
  )
}
