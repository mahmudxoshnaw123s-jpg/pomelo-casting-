export const sectionClass = 'min-h-screen bg-gradient-to-b from-[#0b0713] via-[#130b21] to-[#0a0f1a] px-6 py-16'

export const cardClass = 'rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8'

export const fieldClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-white/25 focus:border-pomelo-blue focus:shadow-[0_0_0_4px_rgba(0,178,226,0.18)]'

export function formatDate(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' +
    d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}
