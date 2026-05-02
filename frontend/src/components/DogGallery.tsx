import FlipPolaroid, { type FlipMessage } from './FlipPolaroid'

export type GalleryItem = {
  src: string
  alt?: string
  flipMessage?: FlipMessage
}

type DogGalleryProps = {
  items: GalleryItem[]
}

const FRAME_COLORS = ['border-teal', 'border-yellow', 'border-purple', 'border-red', 'border-pink']

export default function DogGallery({ items }: DogGalleryProps) {
  if (items.length === 0) return null

  return (
    <ul
      className="flex flex-wrap justify-center items-end gap-6 sm:gap-8 list-none m-0 p-0 w-full"
      aria-label="Galeria de cães e gatos do SAAU"
    >
      {items.map((item, i) => {
        const tilt = i % 2 === 0 ? '-rotate-2' : 'rotate-2'
        const frame = FRAME_COLORS[i % FRAME_COLORS.length]

        if (item.flipMessage) {
          return (
            <FlipPolaroid
              key={`${item.src}-${i}`}
              src={item.src}
              alt={item.alt}
              flipMessage={item.flipMessage}
              frameClass={frame}
              tiltClass={tilt}
            />
          )
        }

        return (
          <li
            key={`${item.src}-${i}`}
            className={`shrink-0 bg-white pt-3 px-3 pb-9 shadow-[0_10px_24px_rgba(30,30,30,0.18)] ${tilt} transition-transform duration-300 hover:rotate-0 hover:scale-[1.03]`}
          >
            <div className={`overflow-hidden border-4 ${frame} w-[170px] h-[210px] sm:w-[200px] sm:h-[240px]`}>
              <img
                src={item.src}
                alt={item.alt ?? ''}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
