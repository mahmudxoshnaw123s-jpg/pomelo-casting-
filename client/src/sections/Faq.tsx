import FaqAccordion from '../components/FaqAccordion'
import Reveal from '../components/Reveal'
import { IconWhatsapp } from '../components/icons'
import { contact, faqSection } from '../data/content'

export default function Faq() {
  return (
    <section id="faq" className="relative overflow-hidden bg-base py-28 sm:py-36">
      <span
        className="pointer-events-none absolute -left-10 top-10 select-none text-[11rem] font-extrabold leading-none text-pomelo-blue/10 sm:text-[16rem]"
        aria-hidden="true"
      >
        05
      </span>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-pomelo-blue">
                <span className="h-px w-8 bg-pomelo-blue" />
                {faqSection.label}
              </p>
              <h2 className="text-balance text-3xl font-bold leading-tight text-ink sm:text-4xl">
                {faqSection.heading}
              </h2>
              <p className="mt-5 text-lg text-ink-soft">{faqSection.subhead}</p>

              <div className="mt-10 rounded-3xl border border-line bg-base-soft p-6">
                <p className="font-semibold text-ink">Still have questions?</p>
                <p className="mt-1.5 text-sm text-ink-soft">
                  We're happy to walk through your brief directly — usually the fastest way to get a straight answer.
                </p>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  <IconWhatsapp className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <FaqAccordion items={faqSection.items} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
