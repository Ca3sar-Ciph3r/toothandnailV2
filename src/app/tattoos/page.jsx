import Image from 'next/image';
import SiteNav            from '@/components/home/SiteNav';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import SiteFooter          from '@/components/home/SiteFooter';
import TattoosFAQ          from '@/components/tattoos/TattoosFAQ';

export const metadata = {
  title: 'Tattoos — Tooth & Nail Studio',
  description: 'Professional tattoo studio. Custom designs, all styles. Book your free consultation today at Tooth & Nail.',
};

const PROCESS_STEPS = [
  { num: '01', title: 'Health & Consent Form',   body: 'Before anything else, you\'ll complete a health and consent form. Any medical conditions, medications, or allergies must be disclosed at this stage.' },
  { num: '02', title: 'Design Consultation',      body: 'Sit down with your artist to finalise the design, placement, sizing, and any modifications. This is your chance to ask questions and get comfortable.' },
  { num: '03', title: 'Private Room Prep',        body: 'Your artist prepares a private workstation — cleaning and shaving the area, arranging sterile supplies, and setting up fresh ink in disposable containers.' },
  { num: '04', title: 'Stencil Application',      body: 'A stencil of the design is applied to your skin. You\'ll review the placement and sizing, and approve it before any tattooing begins.' },
  { num: '05', title: 'Tattooing Session',        body: 'Your artist gets to work. Feel free to take breaks as needed. The studio environment is clean, private, and designed for your comfort throughout.' },
  { num: '06', title: 'Wrap & Aftercare Briefing', body: 'Once complete, the tattoo is cleaned and wrapped. Your artist will walk you through written aftercare instructions before you leave.' },
];

const HYGIENE_POINTS = [
  'Single-use sterile needles opened in front of every client, every session',
  'Hospital-grade autoclave sterilisation for all reusable equipment',
  'Sterile single-use gloves worn throughout the entire procedure',
  'Fresh ink dispensed into disposable containers — never double-dipped',
  'Clear plastic barrier protection on all surfaces and equipment',
  'Hospital-strength germicidal disinfectant for all non-autoclavable items',
  'Disposable razors for site preparation — discarded after single use',
  'Certified bio-hazard and sharps disposal on all studio premises',
  'Artists trained in bloodborne pathogen prevention (BBP certified)',
];

const AFTERCARE_STEPS = [
  { step: '01', title: 'Keep It Clean',       body: 'Wash gently with fragrance-free antibacterial soap 2–3 times daily using clean hands. Pat dry with a clean paper towel — never rub.' },
  { step: '02', title: 'Moisturise',           body: 'Apply a thin layer of unscented, dye-free moisturiser 3–4 times daily once the initial wash phase is complete. Less is more.' },
  { step: '03', title: 'Avoid Sun & Water',    body: 'Stay out of direct sunlight and avoid soaking — no baths, pools, or the ocean — for at least 3–4 weeks while the skin heals.' },
  { step: '04', title: "Don't Pick or Scratch", body: 'Peeling and mild itching are completely normal. Never pick or scratch. Lifting the peeling skin removes ink and causes patchy healing.' },
  { step: '05', title: 'Long-Term Care',       body: 'Once healed, keep the tattoo moisturised and apply SPF 50+ sunscreen whenever exposed to sunlight to preserve colour and line quality.' },
];

const MEDICAL_PRECAUTIONS = [
  'Diabetes',
  'Haemophilia or bleeding disorders',
  'Auto-immune disorders',
  'Blood-thinning medications',
  'Organ or bone marrow transplant recipients',
  'Medical or skin conditions affecting wound healing',
  'Known metal or ink allergies (must be disclosed in advance)',
];

export default function TattoosPage() {
  return (
    <>
      <SiteNav />
      <main>

        {/* ── Hero ── */}
        <section
          className="relative w-full flex items-end overflow-hidden"
          style={{ minHeight: 'clamp(420px, 60vw, 700px)' }}
        >
          <Image
            src="/hero-arm-tattoo.jpg"
            alt="Tattoo artist at work"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0.25) 0%,rgba(0,0,0,0.75) 100%)' }} />

          {/* Large background text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
            <span
              className="text-white/[0.06] leading-none uppercase"
              style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(100px,22vw,280px)', letterSpacing: '0.06em' }}
            >
              TATTOOS
            </span>
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-14 pb-16 pt-24">
            <p
              className="text-red-400/80 uppercase mb-4"
              style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
            >
              — Premium Tattoo Studio
            </p>
            <h1
              className="text-white uppercase leading-none mb-4"
              style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(44px,8vw,100px)', letterSpacing: '0.04em' }}
            >
              Tattoos
            </h1>
            <p
              className="text-zinc-300 uppercase mb-2"
              style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 500, fontSize: 'clamp(14px,1.8vw,20px)', letterSpacing: '0.12em' }}
            >
              Our Tattoo Studio
            </p>
            <p
              className="text-zinc-400 max-w-lg mb-10 leading-relaxed"
              style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '15px', lineHeight: '1.65' }}
            >
              A curated environment for serious tattooing. Our artists specialise in realism, fine line, blackwork,
              neo-traditional, and fully custom illustrative work. We offer free consultations to discuss your concept,
              sizing, placement, and pricing — every piece is drawn fresh, never re-used.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/artists"
                className="inline-flex items-center bg-white text-black hover:bg-zinc-100 transition-colors px-8 py-3.5"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                View All Tattoo Artists
              </a>
              <a
                href="#book"
                className="inline-flex items-center border border-white/50 text-white hover:bg-white/10 transition-colors px-8 py-3.5"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </section>

        {/* ── Stats bar ── */}
        <section className="w-full py-16 md:py-20" style={{ background: '#f0ebe0' }}>
          <div className="max-w-[1400px] mx-auto px-8 md:px-14">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-lg">
                <p
                  className="text-[#1a1a1a] leading-[1.3] uppercase"
                  style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(18px,2vw,24px)', letterSpacing: '0.04em' }}
                >
                  We&apos;re committed to constantly improving our craft and delivering exceptional work — every single time.
                </p>
              </div>
              <div className="hidden md:block w-px self-stretch bg-[#1a1a1a]/10" />
              <div className="flex flex-col sm:flex-row gap-12 md:gap-16 text-center md:text-left">
                {[
                  { value: '2,500+', label: 'Hours Tattooed',    sub: 'and counting'  },
                  { value: '12+',    label: 'Years Experience',  sub: 'combined'       },
                  { value: '0',      label: 'Re-used Designs',   sub: 'all custom'     },
                ].map(({ value, label, sub }) => (
                  <div key={label}>
                    <p
                      className="text-[#1a1a1a] leading-none"
                      style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: '48px', letterSpacing: '0.02em' }}
                    >
                      {value}
                    </p>
                    <p
                      className="text-[#1a1a1a]/70 uppercase mt-2"
                      style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.2em' }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-[#8a7a6a] uppercase mt-0.5"
                      style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '10px', letterSpacing: '0.1em' }}
                    >
                      {sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Age & Consent ── */}
        <section className="w-full bg-zinc-950 py-24 md:py-32 border-y border-zinc-900">
          <div className="max-w-[1400px] mx-auto px-8 md:px-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

              <div>
                <p
                  className="text-zinc-500 uppercase mb-4"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
                >
                  — Legal Requirements
                </p>
                <h2
                  className="text-white uppercase leading-none mb-6"
                  style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(24px,2.8vw,38px)', letterSpacing: '0.06em' }}
                >
                  Age &amp;<br />Consent Policy
                </h2>
                <div className="w-8 h-px bg-red-700/40 mb-6" />
                <div className="space-y-4" style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', color: 'rgba(161,161,170,1)', lineHeight: '1.7' }}>
                  <p>
                    You must be <strong className="text-white">18 years of age or older</strong> to receive a tattoo at
                    Tooth &amp; Nail, without exception. Valid government-issued photo identification is required at every
                    appointment — no ID, no service.
                  </p>
                  <p>
                    We do not tattoo anyone under the influence of alcohol or controlled substances, regardless of consent.
                    We reserve the right to refuse any service if client safety or studio standards are a concern.
                  </p>
                  <p>
                    All clients must complete a health and consent form prior to their session. Medical conditions,
                    current medications, and known allergies must be disclosed in full before work begins.
                  </p>
                </div>
              </div>

              <div>
                <p
                  className="text-zinc-500 uppercase mb-4"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
                >
                  — Accepted ID
                </p>
                <h2
                  className="text-white uppercase leading-none mb-6"
                  style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(24px,2.8vw,38px)', letterSpacing: '0.06em' }}
                >
                  Valid Forms<br />of Identification
                </h2>
                <div className="w-8 h-px bg-red-700/40 mb-6" />
                <ul className="space-y-3 mb-6">
                  {[
                    "Passport (current or within 2 years of expiry)",
                    "Driver's licence (full or provisional)",
                    "National identity card",
                    "Birth certificate + supporting secondary ID",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3" style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', color: 'rgba(161,161,170,1)' }}>
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-600/60 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '12px', color: 'rgba(82,82,91,1)', lineHeight: '1.65' }}>
                  If you are unsure whether your ID is acceptable, contact us before your appointment. We cannot proceed
                  without valid ID regardless of booking status.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── The Process ── */}
        <section className="w-full bg-black py-24 md:py-32">
          <div className="max-w-[1400px] mx-auto px-8 md:px-14">
            <div className="max-w-2xl mb-16">
              <p
                className="text-zinc-500 uppercase mb-4"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
              >
                — What to Expect
              </p>
              <h2
                className="text-white uppercase leading-none mb-4"
                style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(28px,3.5vw,52px)', letterSpacing: '0.06em' }}
              >
                Your Appointment,<br />Step by Step
              </h2>
              <div className="w-10 h-px bg-red-700/40 mb-5" />
              <p
                className="text-zinc-400 leading-relaxed"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '15px', lineHeight: '1.65' }}
              >
                First time? Here&apos;s exactly what happens from the moment you arrive to the moment you leave.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900">
              {PROCESS_STEPS.map(({ num, title, body }) => (
                <div key={num} className="bg-black p-8 hover:bg-zinc-950 transition-colors">
                  <p
                    className="text-red-600/50 uppercase mb-5"
                    style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: '36px', letterSpacing: '0.04em', lineHeight: 1 }}
                  >
                    {num}
                  </p>
                  <h3
                    className="text-white uppercase mb-3"
                    style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: '18px', letterSpacing: '0.06em' }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-zinc-500 leading-relaxed"
                    style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px', lineHeight: '1.7' }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p
                className="text-zinc-600"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px' }}
              >
                Multiple sessions may be required for larger pieces — a minimum of 2 weeks healing is needed between sittings.
              </p>
            </div>
          </div>
        </section>

        {/* ── Health & Hygiene ── */}
        <section className="w-full bg-zinc-950 py-24 md:py-32 border-t border-zinc-900">
          <div className="max-w-[1400px] mx-auto px-8 md:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              <div>
                <p
                  className="text-zinc-500 uppercase mb-4"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
                >
                  — Studio Standards
                </p>
                <h2
                  className="text-white uppercase leading-none mb-4"
                  style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(26px,3vw,44px)', letterSpacing: '0.06em' }}
                >
                  Our Commitment to<br /><span className="text-red-600">Health &amp; Hygiene</span>
                </h2>
                <div className="w-10 h-px bg-red-700/40 mb-6" />
                <p
                  className="text-zinc-400 leading-relaxed mb-8"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', lineHeight: '1.7' }}
                >
                  The safety of our clients is non-negotiable. Tooth &amp; Nail operates in full compliance with
                  public health guidelines. Every precaution is taken to ensure a sterile, clinical-grade environment
                  for every single session — without exception.
                </p>
                <ul className="space-y-3">
                  {HYGIENE_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-1.5 w-4 h-4 border border-red-600/40 flex items-center justify-center flex-shrink-0">
                        <span className="w-1.5 h-1.5 bg-red-600" />
                      </span>
                      <span
                        className="text-zinc-300"
                        style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px', lineHeight: '1.6' }}
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden lg:sticky lg:top-24">
                <Image
                  src="/services-tattoos.jpg"
                  alt="Tattoo artist at work"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,transparent 50%,rgba(0,0,0,0.6) 100%)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Full-width photo break ── */}
        <div className="w-full relative overflow-hidden" style={{ height: 'clamp(280px, 35vw, 500px)' }}>
          <Image
            src="/hero-arm-tattoo.jpg"
            alt="Close-up tattoo detail"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)' }} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
            <span
              className="text-white/[0.07] leading-none uppercase"
              style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(60px,14vw,180px)', letterSpacing: '0.1em' }}
            >
              PERMANENT
            </span>
          </div>
        </div>

        {/* ── Aftercare ── */}
        <section id="aftercare" className="w-full bg-black py-24 md:py-32">
          <div className="max-w-[1400px] mx-auto px-8 md:px-14">

            <div className="max-w-3xl mx-auto text-center mb-16">
              <p
                className="text-zinc-500 uppercase mb-4"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
              >
                — Post Session
              </p>
              <h2
                className="text-white uppercase leading-none mb-4"
                style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(28px,3.5vw,52px)', letterSpacing: '0.06em' }}
              >
                Tattoo Aftercare
              </h2>
              <div className="w-10 h-px bg-red-700/40 mx-auto mb-5" />
              <p
                className="text-zinc-400 leading-relaxed"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', lineHeight: '1.7' }}
              >
                Proper aftercare is what separates a vibrant, long-lasting tattoo from a faded disappointment.
                Follow your artist&apos;s instructions carefully — and don&apos;t rush the process.
              </p>
            </div>

            {/* Aftercare steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {AFTERCARE_STEPS.map(({ step, title, body }) => (
                <div
                  key={step}
                  className="p-6 border border-zinc-800 bg-zinc-900/40 hover:border-zinc-600 transition-colors"
                >
                  <p
                    className="text-red-600/50 uppercase mb-4"
                    style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.3em' }}
                  >
                    {step}
                  </p>
                  <h3
                    className="text-white uppercase mb-3"
                    style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: '18px', letterSpacing: '0.06em' }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-zinc-400 leading-relaxed"
                    style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px', lineHeight: '1.7' }}
                  >
                    {body}
                  </p>
                </div>
              ))}

              {/* Aftercare products card */}
              <div className="p-6 border border-red-900/30 bg-red-950/10 hover:border-red-700/40 transition-colors sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
                <div>
                  <p
                    className="text-red-500/50 uppercase mb-4"
                    style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.3em' }}
                  >
                    Recommended
                  </p>
                  <h3
                    className="text-white uppercase mb-3"
                    style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: '18px', letterSpacing: '0.06em' }}
                  >
                    Aftercare Products
                  </h3>
                  <p
                    className="text-zinc-400 leading-relaxed mb-5"
                    style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px', lineHeight: '1.7' }}
                  >
                    We stock artist-approved aftercare products in studio. Ask your artist for their personal
                    recommendations at the end of your session.
                  </p>
                </div>
                <a
                  href="#"
                  className="text-red-400 hover:text-red-300 transition-colors self-start"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  + Shop Aftercare Products
                </a>
              </div>
            </div>

            {/* Health precautions */}
            <div className="border border-zinc-800 p-8 md:p-10 bg-zinc-950">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <div>
                  <h3
                    className="text-white uppercase mb-4"
                    style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(20px,2vw,28px)', letterSpacing: '0.06em' }}
                  >
                    Health Precautions
                  </h3>
                  <p
                    className="text-zinc-400 leading-relaxed mb-6"
                    style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', lineHeight: '1.7' }}
                  >
                    Before booking, please consult your physician if you have or have had any of the following conditions,
                    as they may affect your suitability for tattooing or the healing process:
                  </p>
                  <ul className="space-y-2">
                    {MEDICAL_PRECAUTIONS.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600/60 flex-shrink-0" />
                        <span
                          className="text-zinc-300"
                          style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px' }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-zinc-700 p-6 bg-zinc-900/50">
                  <p
                    className="text-red-400 uppercase mb-3"
                    style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.3em' }}
                  >
                    Important Notice
                  </p>
                  <p
                    className="text-zinc-300 leading-relaxed mb-4"
                    style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', lineHeight: '1.7' }}
                  >
                    <strong>We do not tattoo clients who are pregnant.</strong> If you are nursing, please consult your
                    physician before booking. Your safety and the safety of your baby are our absolute priority —
                    there will always be an opportunity to come back.
                  </p>
                  <a
                    href="/faq"
                    className="inline-flex items-center gap-2 text-white hover:text-red-400 transition-colors"
                    style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '2px' }}
                  >
                    + Learn More About Tattoo Aftercare
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Testimonials ── */}
        <TestimonialsSection />

        {/* ── FAQs ── */}
        <TattoosFAQ />

        {/* ── Book CTA ── */}
        <section
          className="w-full py-24 md:py-32 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#0d0000 0%,#1a0a0a 50%,#0a0a0a 100%)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 50% 80% at 50% 50%,rgba(180,20,20,0.15) 0%,transparent 70%)' }}
          />
          <div className="relative z-10 max-w-[700px] mx-auto px-8 text-center">
            <p
              className="text-red-500/60 uppercase mb-5"
              style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
            >
              — Ready to Start?
            </p>
            <h2
              className="text-white uppercase leading-none mb-6"
              style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(32px,5vw,64px)', letterSpacing: '0.06em' }}
            >
              Book Your<br /><span className="text-red-600">Consultation</span>
            </h2>
            <div className="w-10 h-px bg-red-700/40 mx-auto mb-6" />
            <p
              className="text-zinc-400 leading-relaxed mb-10 max-w-sm mx-auto"
              style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', lineHeight: '1.65' }}
            >
              All custom tattoos begin with a free consultation. Bring your ideas — we&apos;ll bring the expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#book"
                className="px-8 py-3.5 bg-red-600 text-white hover:bg-red-500 transition-colors"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                Book a Consultation
              </a>
              <a
                href="/tattoo-editor"
                className="px-8 py-3.5 border border-white/20 text-white hover:border-white/50 transition-colors"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                Try Placement Tool
              </a>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
