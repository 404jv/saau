type TapeStripProps = {
  color?: 'yellow' | 'teal' | 'pink'
  width?: 'sm' | 'md' | 'lg'
  rotate?: number
  className?: string
}

const colorClass = {
  yellow: 'bg-yellow/80',
  teal: 'bg-teal/65',
  pink: 'bg-pink/60',
}

const widthClass = {
  sm: 'w-10 h-3',
  md: 'w-14 h-3.5',
  lg: 'w-20 h-4',
}

export default function TapeStrip({ color = 'yellow', width = 'md', rotate = 3, className = '' }: TapeStripProps) {
  return (
    <span
      aria-hidden="true"
      className={`block ${colorClass[color]} ${widthClass[width]} rounded-sm shadow-sm ${className}`}
      style={{ transform: `rotate(${rotate}deg) translateX(${className.includes('-translate-x-1/2') ? '-50%' : '0'})` }}
    />
  )
}
