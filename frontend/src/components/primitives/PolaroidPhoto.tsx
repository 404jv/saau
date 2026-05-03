type Size = 'sm' | 'md' | 'lg'
type Frame = 'teal' | 'yellow' | 'purple' | 'red' | 'pink'

type PolaroidPhotoProps = {
  src: string
  alt?: string
  caption?: string
  frame?: Frame
  tilt?: number
  size?: Size
  className?: string
  loading?: 'eager' | 'lazy'
}

const frameClass: Record<Frame, string> = {
  teal: 'border-teal',
  yellow: 'border-yellow',
  purple: 'border-purple',
  red: 'border-red',
  pink: 'border-pink',
}

const sizeClass: Record<Size, string> = {
  sm: 'w-[140px] h-[170px] sm:w-[160px] sm:h-[195px]',
  md: 'w-[170px] h-[210px] sm:w-[200px] sm:h-[240px]',
  lg: 'w-[220px] h-[270px] sm:w-[260px] sm:h-[310px]',
}

export default function PolaroidPhoto({
  src,
  alt = '',
  caption,
  frame = 'teal',
  tilt = 0,
  size = 'md',
  className = '',
  loading = 'lazy',
}: PolaroidPhotoProps) {
  return (
    <figure
      className={`inline-block bg-white pt-3 px-3 pb-9 shadow-[0_10px_24px_rgba(30,30,30,0.18)] transition-transform duration-300 hover:rotate-0 hover:scale-[1.03] ${className}`}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined }}
    >
      <div className={`overflow-hidden border-4 ${frameClass[frame]} ${sizeClass[size]}`}>
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="absolute bottom-1.5 left-0 right-0 text-center font-main text-[12px] text-dark/70 px-2 truncate">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
