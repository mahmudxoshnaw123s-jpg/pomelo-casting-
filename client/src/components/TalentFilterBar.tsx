import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { ReactNode } from 'react'
import type { TalentModel } from '../lib/models'
import { IconChevronDown, IconGenderFemale, IconGenderMale, IconRuler, IconSliders } from './icons'

const ease = [0.16, 1, 0.3, 1] as const
const spring = { type: 'spring' as const, stiffness: 420, damping: 26 }

const GENDERS = ['Female', 'Male'] as const
const HAIR_COLORS = ['Black', 'Brown', 'Blonde', 'Red', 'Gray'] as const
const EYE_COLORS = ['Brown', 'Blue', 'Green', 'Hazel', 'Gray'] as const

const HAIR_SWATCHES: Record<string, string> = {
  Black: '#1e1c1f',
  Brown: '#6b4226',
  Blonde: '#d9b783',
  Red: '#a8452f',
  Gray: '#a3a3ab',
}

const EYE_SWATCHES: Record<string, string> = {
  Brown: '#6b4226',
  Blue: '#4f8fc0',
  Green: '#5c8a5c',
  Hazel: '#9c8148',
  Gray: '#a3a3ab',
}

const GENDER_ICONS: Record<string, typeof IconGenderFemale> = {
  Female: IconGenderFemale,
  Male: IconGenderMale,
}

const HEIGHT_BUCKETS = [
  { key: 'under-160', label: 'Under 160 cm', test: (cm: number) => cm < 160 },
  { key: '160-170', label: '160–170 cm', test: (cm: number) => cm >= 160 && cm < 170 },
  { key: '170-180', label: '170–180 cm', test: (cm: number) => cm >= 170 && cm < 180 },
  { key: '180-plus', label: '180+ cm', test: (cm: number) => cm >= 180 },
] as const

export interface TalentFilters {
  gender: string[]
  height: string[]
  hairColor: string[]
  eyeColor: string[]
}

export const EMPTY_FILTERS: TalentFilters = { gender: [], height: [], hairColor: [], eyeColor: [] }

export function hasActiveFilters(filters: TalentFilters): boolean {
  return filters.gender.length > 0 || filters.height.length > 0 || filters.hairColor.length > 0 || filters.eyeColor.length > 0
}

function activeCount(filters: TalentFilters): number {
  return filters.gender.length + filters.height.length + filters.hairColor.length + filters.eyeColor.length
}

function parseHeightCm(height: string): number | null {
  const match = height.match(/\d+(\.\d+)?/)
  return match ? parseFloat(match[0]) : null
}

function matchesList(value: string, selected: string[]): boolean {
  if (selected.length === 0) return true
  const v = value.trim().toLowerCase()
  return selected.some((s) => v.startsWith(s.toLowerCase()))
}

export function matchesFilters(model: TalentModel, filters: TalentFilters): boolean {
  if (!matchesList(model.gender, filters.gender)) return false
  if (!matchesList(model.hairColor, filters.hairColor)) return false
  if (!matchesList(model.eyeColor, filters.eyeColor)) return false
  if (filters.height.length > 0) {
    const cm = parseHeightCm(model.height)
    const inBucket = HEIGHT_BUCKETS.some((b) => filters.height.includes(b.key) && cm !== null && b.test(cm))
    if (!inBucket) return false
  }
  return true
}

type FilterKey = keyof TalentFilters

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

/** A small glowing glass badge that hosts either a color swatch or an icon glyph — the glow intensifies when its pill is active. */
function IconBadge({ active, swatch, children }: { active: boolean; swatch?: string; children?: ReactNode }) {
  return (
    <motion.span
      animate={{
        boxShadow: active
          ? '0 0 0 1px rgba(255,255,255,0.35), 0 0 12px 2px rgba(0,178,226,0.55)'
          : '0 0 0 1px rgba(255,255,255,0.16), 0 0 0px 0px rgba(0,178,226,0)',
      }}
      transition={{ duration: 0.35, ease }}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
      style={{ background: swatch ?? 'linear-gradient(135deg, rgba(0,178,226,0.4), rgba(137,81,147,0.4))' }}
    >
      {children}
    </motion.span>
  )
}

function FilterPill({
  label,
  active,
  onClick,
  swatch,
  Icon,
}: {
  label: string
  active: boolean
  onClick: () => void
  swatch?: string
  Icon?: typeof IconRuler
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileHover={{ scale: 1.045, y: -1 }}
      whileTap={{ scale: 0.94 }}
      transition={spring}
      animate={{
        boxShadow: active ? '0 6px 20px -4px rgba(0,178,226,0.5)' : '0 0px 0px 0px rgba(0,178,226,0)',
      }}
      className={`inline-flex items-center gap-2 rounded-full border py-1.5 pl-2 pr-4 text-sm font-medium transition-colors duration-300 ${
        active
          ? 'border-transparent bg-gradient-to-r from-pomelo-blue to-pomelo-purple text-white'
          : 'border-white/12 bg-white/[0.03] text-white/60 hover:border-white/25 hover:bg-white/[0.06] hover:text-white/90'
      }`}
    >
      <IconBadge active={active} swatch={swatch}>
        {Icon && <Icon className="h-3.5 w-3.5 text-white" />}
      </IconBadge>
      {label}
    </motion.button>
  )
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string
  options: readonly { key: string; label: string; swatch?: string; Icon?: typeof IconRuler }[]
  selected: string[]
  onToggle: (key: string) => void
}) {
  return (
    <div>
      <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-white/40">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <FilterPill
            key={opt.key}
            label={opt.label}
            swatch={opt.swatch}
            Icon={opt.Icon}
            active={selected.includes(opt.key)}
            onClick={() => onToggle(opt.key)}
          />
        ))}
      </div>
    </div>
  )
}

interface TalentFilterBarProps {
  filters: TalentFilters
  onChange: (filters: TalentFilters) => void
  resultCount: number
}

export default function TalentFilterBar({ filters, onChange, resultCount }: TalentFilterBarProps) {
  const [open, setOpen] = useState(false)
  const count = activeCount(filters)
  const active = hasActiveFilters(filters)

  const toggle = (key: FilterKey, value: string) => {
    onChange({ ...filters, [key]: toggleValue(filters[key], value) })
  }

  const remove = (key: FilterKey, value: string) => {
    onChange({ ...filters, [key]: filters[key].filter((v) => v !== value) })
  }

  const clearAll = () => onChange(EMPTY_FILTERS)

  const chipLabel = (key: FilterKey, value: string): string => {
    if (key === 'height') return HEIGHT_BUCKETS.find((b) => b.key === value)?.label ?? value
    if (key === 'hairColor') return `${value} Hair`
    if (key === 'eyeColor') return `${value} Eyes`
    return value
  }

  const chipSwatch = (key: FilterKey, value: string): string | undefined => {
    if (key === 'hairColor') return HAIR_SWATCHES[value]
    if (key === 'eyeColor') return EYE_SWATCHES[value]
    return undefined
  }

  const chipIcon = (key: FilterKey, value: string): typeof IconRuler | undefined => {
    if (key === 'gender') return GENDER_ICONS[value]
    if (key === 'height') return IconRuler
    return undefined
  }

  const chips: { key: FilterKey; value: string }[] = [
    ...filters.gender.map((v) => ({ key: 'gender' as const, value: v })),
    ...filters.height.map((v) => ({ key: 'height' as const, value: v })),
    ...filters.hairColor.map((v) => ({ key: 'hairColor' as const, value: v })),
    ...filters.eyeColor.map((v) => ({ key: 'eyeColor' as const, value: v })),
  ]

  return (
    <div className="mb-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={spring}
          className="group inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] py-2 pl-2 pr-5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-colors duration-300 hover:border-pomelo-blue/40 hover:bg-white/[0.06] hover:text-white"
        >
          <motion.span
            animate={{
              boxShadow: open
                ? '0 0 0 1px rgba(0,178,226,0.55), 0 0 20px 3px rgba(0,178,226,0.4)'
                : '0 0 0 1px rgba(255,255,255,0.14), 0 0 0px 0px rgba(0,178,226,0)',
            }}
            transition={{ duration: 0.45, ease }}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-pomelo-blue/40 to-pomelo-purple/40"
          >
            <IconSliders className="h-3.5 w-3.5 text-white" />
          </motion.span>

          <span>Filter</span>

          <AnimatePresence mode="popLayout">
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={spring}
                className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-pomelo-blue to-pomelo-purple px-1.5 text-[0.65rem] font-bold text-white"
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>

          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={spring}>
            <IconChevronDown className="h-3.5 w-3.5" />
          </motion.span>
        </motion.button>

        <p className="text-sm text-white/45">
          <span className="font-semibold text-white/85">{resultCount}</span> Talent{resultCount === 1 ? '' : 's'} Found
        </p>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.55, ease }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.08, ease }}
              className="mt-6 grid gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:grid-cols-2 sm:p-8 lg:grid-cols-4"
            >
              <FilterGroup
                title="Gender"
                options={GENDERS.map((g) => ({ key: g, label: g, Icon: GENDER_ICONS[g] }))}
                selected={filters.gender}
                onToggle={(v) => toggle('gender', v)}
              />
              <FilterGroup
                title="Height"
                options={HEIGHT_BUCKETS.map((b) => ({ key: b.key, label: b.label, Icon: IconRuler }))}
                selected={filters.height}
                onToggle={(v) => toggle('height', v)}
              />
              <FilterGroup
                title="Hair Color"
                options={HAIR_COLORS.map((c) => ({ key: c, label: c, swatch: HAIR_SWATCHES[c] }))}
                selected={filters.hairColor}
                onToggle={(v) => toggle('hairColor', v)}
              />
              <FilterGroup
                title="Eye Color"
                options={EYE_COLORS.map((c) => ({ key: c, label: c, swatch: EYE_SWATCHES[c] }))}
                selected={filters.eyeColor}
                onToggle={(v) => toggle('eyeColor', v)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease }}
            className="mt-6 flex flex-wrap items-center gap-2"
          >
            <AnimatePresence mode="popLayout">
              {chips.map(({ key, value }) => {
                const ChipIcon = chipIcon(key, value)
                return (
                  <motion.button
                    key={`${key}-${value}`}
                    layout
                    type="button"
                    onClick={() => remove(key, value)}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.92 }}
                    transition={spring}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] py-1.5 pl-2 pr-2 text-xs font-medium text-white/75 transition-colors duration-300 hover:border-pomelo-blue/40 hover:text-white"
                  >
                    <IconBadge active swatch={chipSwatch(key, value)}>
                      {ChipIcon && <ChipIcon className="h-3.5 w-3.5 text-white" />}
                    </IconBadge>
                    {chipLabel(key, value)}
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-[0.6rem] leading-none transition-colors duration-300 group-hover:bg-pomelo-blue/40">
                      ✕
                    </span>
                  </motion.button>
                )
              })}
            </AnimatePresence>
            <motion.button
              type="button"
              onClick={clearAll}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              transition={spring}
              className="ml-1 text-xs font-semibold uppercase tracking-widest text-white/40 underline decoration-white/20 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-white/60"
            >
              Clear all
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
