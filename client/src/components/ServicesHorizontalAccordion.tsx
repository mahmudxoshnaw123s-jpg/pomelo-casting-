import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { services } from '../data/content'
import { serviceVisuals } from '../data/serviceVisuals'

const grade = 'grayscale(0.35) contrast(1.04) brightness(1.03)'

export default function ServicesHorizontalAccordion() {
  const [active, setActive] = useState(0)
  const items = services.items

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActive(i)
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 xl:max-w-7xl 2xl:max-w-[96rem]">
      <div className="flex h-[28rem] gap-1.5 overflow-hidden rounded-2xl xl:h-[32rem] 2xl:h-[38rem]">
        {items.map((item, i) => {
          const isActive = active === i
          const meta = serviceVisuals[item.icon as keyof typeof serviceVisuals]

          return (
            <div
              key={item.slug}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="group relative cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pomelo-blue/70"
              style={{ flexGrow: isActive ? 6 : 1, flexBasis: 0, transition: 'flex-grow 1.1s cubic-bezier(0.4,0,0.2,1)' }}
            >
              <img
                src={meta.image}
                alt={meta.imageAlt}
                loading="lazy"
                style={{ objectPosition: meta.imageObjectPosition, filter: grade }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-in-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />

              {/* collapsed state — vertical label + index, brightens on hover */}
              <div
                className="absolute inset-0 flex flex-col items-start justify-between p-5 transition-opacity duration-300 sm:p-6"
                style={{ opacity: isActive ? 0 : 1, pointerEvents: isActive ? 'none' : 'auto' }}
              >
                <span className="font-display text-lg italic text-white/50 transition-colors duration-300 group-hover:text-white/90">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition-colors duration-300 group-hover:text-white"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {item.title}
                </span>
              </div>

              {/* expanded state — details */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10"
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: `opacity 0.5s ease ${isActive ? '0.2s' : '0s'}`,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">{meta.kicker}</p>
                <h3 className="mt-3 max-w-md text-balance font-display text-2xl italic leading-tight text-white sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-sm text-white/70">{item.description}</p>
                <a
                  href="#contact"
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm text-white/70 underline decoration-white/30 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-white/70"
                >
                  Enquire about this service
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
