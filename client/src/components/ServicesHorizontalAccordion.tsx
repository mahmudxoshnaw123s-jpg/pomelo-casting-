import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { services } from '../data/content'
import { serviceVisuals } from '../data/serviceVisuals'

const grade = 'grayscale(0.85) contrast(1.08) brightness(0.92)'

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
    <div className="mx-auto max-w-6xl px-6 sm:px-10">
      <div className="flex h-[30rem] gap-1.5 overflow-hidden xl:h-[34rem]">
        {items.map((item, i) => {
          const isActive = active === i
          const meta = serviceVisuals[item.icon as keyof typeof serviceVisuals]

          return (
            <div
              key={item.slug}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              onClick={() => setActive(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="group relative cursor-pointer overflow-hidden outline-none"
              style={{ flexGrow: isActive ? 6 : 1, flexBasis: 0, transition: 'flex-grow 0.7s cubic-bezier(0.16,1,0.3,1)' }}
            >
              <img
                src={meta.image}
                alt={meta.imageAlt}
                loading="lazy"
                style={{ objectPosition: meta.imageObjectPosition, filter: grade }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

              <div
                className="absolute inset-0 flex items-end justify-start p-5 sm:p-6"
                style={{ opacity: isActive ? 0 : 1, transition: 'opacity 0.4s ease' }}
              >
                <span
                  className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.3em] text-white/85"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {item.title}
                </span>
              </div>

              <div
                className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10"
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: `opacity 0.5s ease ${isActive ? '0.25s' : '0s'}`,
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
                  className="mt-5 inline-block w-fit text-sm text-white/70 underline decoration-white/30 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-white/70"
                >
                  Enquire about this service
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
