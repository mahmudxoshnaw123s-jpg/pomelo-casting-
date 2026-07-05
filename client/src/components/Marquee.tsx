interface MarqueeProps {
  items: string[]
}

export default function Marquee({ items }: MarqueeProps) {
  const loop = [...items, ...items]

  return (
    <div className="relative overflow-hidden border-y border-line bg-pomelo-blue py-4" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-on-accent)]"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-on-accent)]" />
          </span>
        ))}
      </div>
    </div>
  )
}
