type Direction = 'down-left' | 'down-right' | 'up-left' | 'up-right' | 'none'
type Color = 'red' | 'pink' | 'teal' | 'purple'

type MarginNoteProps = {
  text: string
  arrow?: Direction
  color?: Color
  rotate?: number
  className?: string
}

const colorClass: Record<Color, string> = {
  red: 'text-red',
  pink: 'text-pink',
  teal: 'text-teal',
  purple: 'text-purple',
}

const arrowPaths: Record<Exclude<Direction, 'none'>, string> = {
  // hand-drawn squiggle arrows in 60x60 viewBox
  'down-left':  'M50 6 q-10 14 -22 22 q-12 8 -22 22 M6 50 l4 -10 M6 50 l10 -2',
  'down-right': 'M10 6 q10 14 22 22 q12 8 22 22 M54 50 l-4 -10 M54 50 l-10 -2',
  'up-left':    'M50 54 q-10 -14 -22 -22 q-12 -8 -22 -22 M6 10 l4 10 M6 10 l10 2',
  'up-right':   'M10 54 q10 -14 22 -22 q12 -8 22 -22 M54 10 l-4 10 M54 10 l-10 2',
}

export default function MarginNote({
  text,
  arrow = 'none',
  color = 'pink',
  rotate = -6,
  className = '',
}: MarginNoteProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none flex flex-col gap-1 ${colorClass[color]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <p className="font-main text-sm sm:text-base leading-tight whitespace-nowrap m-0">
        {text}
      </p>
      {arrow !== 'none' && (
        <svg viewBox="0 0 60 60" className="w-12 h-12 sm:w-14 sm:h-14 self-start" aria-hidden="true">
          <path
            d={arrowPaths[arrow]}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  )
}
