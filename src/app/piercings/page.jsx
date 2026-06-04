import Image from 'next/image';
import SiteNav            from '@/components/home/SiteNav';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import SiteFooter          from '@/components/home/SiteFooter';
import PiercingsFAQ        from '@/components/piercings/PiercingsFAQ';

export const metadata = {
  title: 'Piercings — Tooth & Nail Studio',
  description: 'Professional body and ear piercing services. Sterile environment, implant-grade jewellery, certified piercers.',
};

const WHY_POINTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-7 h-7">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    title: 'Safe, Comfortable Environment',
    body: 'Sterilised tools, single-use sterile needles, and full clinical-grade barrier protection for every piercing — no exceptions. Our studio is designed to be calm and welcoming, and we\'ll provide detailed aftercare instructions and products before you leave.',
    cta: { label: 'Meet Our Piercers', href: '/artists' },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-7 h-7">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/>
      </svg>
    ),
    title: 'Skilled Piercers',
    body: 'Our piercers are experienced across the full range of ear, facial, and body placements. Every piercer holds current bloodborne pathogen certification and completes ongoing advanced training. Expect clear guidance, precision, and personalised aftercare advice.',
    cta: { label: 'Meet Our Piercers', href: '/artists' },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-7 h-7">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'High-Quality Body Jewellery',
    body: 'We exclusively stock implant-grade titanium (ASTM F136), implant-grade steel (ASTM F138), solid 14k/18k gold, and niobium for all new piercings. Once healed, we offer an extensive range of intricate jewellery to suit your style.',
    cta: { label: 'Shop Body Jewellery', href: '#jewelry' },
  },
];

const EAR_PIERCINGS = [
  { name: 'Lobe',          desc: 'Traditional and multiple lobe piercings. Fast healing and suitable for almost all jewellery styles.' },
  { name: 'Helix',         desc: 'Upper ear cartilage, including forward helix and double helix configurations.' },
  { name: 'Tragus',        desc: 'The small cartilage flap in front of the ear canal. Subtle, stylish, and suits a flatback stud perfectly.' },
  { name: 'Anti-Tragus',   desc: 'The raised fold of cartilage opposite the tragus, just above the lobe. Edgy and distinctive.' },
  { name: 'Conch',         desc: 'The large inner bowl of the ear. Ideal for statement flatbacks or ring styles.' },
  { name: 'Daith',         desc: 'The innermost cartilage fold above the ear canal. Works beautifully with seamless hoops.' },
  { name: 'Rook',          desc: 'The cartilage ridge in the upper inner ear. A striking placement suited to curved barbells.' },
  { name: 'Industrial',    desc: 'Two cartilage piercings connected by a single barbell. Bold and architectural.' },
];

const FACIAL_PIERCINGS = [
  { name: 'Nostril',       desc: 'One of the most popular facial piercings. Suits dainty studs and small hoops equally well.' },
  { name: 'Septum',        desc: 'Through the soft tissue between the nostrils. Instantly transformative — can be flipped up when needed.' },
  { name: 'Eyebrow',       desc: 'A surface piercing through or above the eyebrow ridge. Sharp, defined, and attention-grabbing.' },
];

const ORAL_PIERCINGS = [
  { name: 'Tongue',        desc: 'Central tongue piercing with a straight barbell. Discreet when healed and relatively fast to heal.' },
  { name: 'Lip / Labret',  desc: 'Various placements around the lip area including labret, Monroe, and Medusa styles.' },
];

const BODY_PIERCINGS = [
  { name: 'Navel',          desc: 'Belly button piercing. Curved barbells and dainty gem pieces are most popular for initial jewellery.' },
  { name: 'Nipple',         desc: 'Horizontal or vertical placement. Must be 18+ for this service.' },
  { name: 'Surface',        desc: 'Anatomy-dependent surface anchors. Placement suitability is assessed at consultation.' },
  { name: 'Dermal Anchors', desc: 'Single-point piercings with a small anchor beneath the skin. Highly versatile placement options.' },
];

const AFTERCARE_STEPS = [
  {
    num: '01',
    title: 'Cleaning Your Piercing',
    body: 'Gently cleanse the area twice daily with a sterile saline solution (0.9% NaCl). This is essential for preventing infection and supporting healthy healing. Use non-woven gauze or allow to air dry — do not use cotton wool.',
  },
  {
    num: '02',
    title: 'Avoiding Irritation',
    body: 'Minimise touching the piercing with unwashed hands. Do not twist, rotate, or move the jewellery — this causes micro-tears and delays healing. Keep hairspray, perfume, makeup, and lotions away from the site.',
  },
  {
    num: '03',
    title: 'Monitoring for Infection',
    body: 'Some redness, swelling, and clear or white discharge is completely normal in the first weeks. Watch for signs of infection: unusual spreading redness, increasing pain, hot-to-touch skin, or thick coloured discharge. Contact us or your GP if concerned.',
  },
  {
    num: '04',
    title: 'Activity Restrictions',
    body: 'Limit activities that could stress the piercing area. Avoid swimming in pools, hot tubs, lakes, or the ocean until fully healed. For oral piercings, avoid alcohol, spicy food, and smoking during initial healing.',
  },
];

const RECOMMENDED_PRODUCTS = [
  {
    name: 'Sterile Saline Solution',
    brand: 'NeilMed or equivalent',
    desc: 'A pre-mixed sterile 0.9% NaCl wound wash spray is the gold standard for piercing aftercare. Easy to apply without touching the site.',
  },
  {
    name: 'Gentle Fragrance-Free Cleanser',
    brand: 'Cetaphil or equivalent',
    desc: 'For oral piercings or when additional cleansing is recommended, a mild fragrance-free cleanser is suitable. Designed to protect and promote healing without irritation.',
  },
];

const MEDICAL_PRECAUTIONS = [
  'Diabetes',
  'Haemophilia or bleeding disorders',
  'Auto-immune disorders',
  'Blood-thinning medications',
  'Organ or bone marrow transplant recipients',
  'Any condition that affects wound healing',
  'Known metal allergies or sensitivities',
];

export default function PiercingsPage() {
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
            src="/hero-piercing.jpg"
            alt="Professional piercing service at Tooth & Nail Studio"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.8) 100%)' }} />

          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
            <span
              className="text-white/[0.05] leading-none uppercase"
              style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(80px,18vw,240px)', letterSpacing: '0.06em' }}
            >
              PIERCING
            </span>
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-14 pb-16 pt-24">
            <p
              className="text-red-400/80 uppercase mb-4"
              style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
            >
              — Body &amp; Ear Piercing
            </p>
            <h1
              className="text-white uppercase leading-none mb-3"
              style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(44px,8vw,100px)', letterSpacing: '0.04em' }}
            >
              Piercings
            </h1>
            <p
              className="text-zinc-300 uppercase mb-6"
              style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 500, fontSize: 'clamp(14px,1.8vw,20px)', letterSpacing: '0.12em' }}
            >
              Our Body and Ear Piercing Services
            </p>
            <p
              className="text-zinc-400 max-w-lg mb-10 leading-relaxed"
              style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '15px', lineHeight: '1.65' }}
            >
              Expert ear and body piercing performed by certified piercers in a sterile, welcoming studio.
              We stock a full range of implant-grade jewellery and provide comprehensive aftercare support.
              Walk-ins welcome — appointments recommended for curated ear projects.
            </p>

            {/* Anchor jump links */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Requirements',    href: '#requirements'   },
                { label: 'Piercing Types',  href: '#types'          },
                { label: 'Aftercare',       href: '#aftercare'      },
                { label: 'FAQs',            href: '#faqs'           },
                { label: 'Body Jewellery',  href: '#jewelry'        },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="border border-white/30 text-white/70 hover:border-white hover:text-white transition-all px-4 py-2"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Tooth & Nail ── */}
        <section className="w-full bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-[1400px] mx-auto px-8 md:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">

              {/* 3-column why grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
                {WHY_POINTS.map(({ icon, title, body, cta }) => (
                  <div key={title} className="flex flex-col p-8 md:p-10">
                    <div className="text-red-500/70 mb-5">{icon}</div>
                    <h3
                      className="text-white uppercase mb-3"
                      style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: '18px', letterSpacing: '0.06em' }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-zinc-400 leading-relaxed mb-6 flex-1"
                      style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px', lineHeight: '1.7' }}
                    >
                      {body}
                    </p>
                    <a
                      href={cta.href}
                      className="text-white hover:text-red-400 transition-colors self-start"
                      style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '2px' }}
                    >
                      {cta.label} →
                    </a>
                  </div>
                ))}
              </div>

              {/* Right photo */}
              <div className="relative hidden lg:block min-h-[400px] border-l border-zinc-800 overflow-hidden">
                <Image
                  src="/hero-piercing.jpg"
                  alt="Piercing in progress"
                  fill
                  sizes="25vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.3)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Requirements ── */}
        <section id="requirements" className="w-full bg-black py-24 md:py-32">
          <div className="max-w-[1400px] mx-auto px-8 md:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              <div>
                <p
                  className="text-zinc-500 uppercase mb-4"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
                >
                  — Before You Book
                </p>
                <h2
                  className="text-white uppercase leading-none mb-4"
                  style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(26px,3vw,44px)', letterSpacing: '0.06em' }}
                >
                  Piercing<br />Requirements
                </h2>
                <div className="w-8 h-px bg-red-700/40 mb-8" />

                <div className="space-y-6">

                  {/* Age */}
                  <div className="p-6 border border-zinc-800 bg-zinc-900/30">
                    <p
                      className="text-red-400/80 uppercase mb-2"
                      style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.3em' }}
                    >
                      Age Requirements
                    </p>
                    <p
                      className="text-zinc-300 leading-relaxed mb-3"
                      style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', lineHeight: '1.7' }}
                    >
                      You must be <strong className="text-white">18 or older</strong> with valid government-issued photo ID for all standard piercings.
                      Clients under 18 may be seen for select ear piercings with a parent or legal guardian present — both must provide valid ID and the guardian must sign the consent form.
                    </p>
                    <p
                      className="text-zinc-500 leading-relaxed"
                      style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px', lineHeight: '1.6' }}
                    >
                      <strong className="text-zinc-400">18+ only:</strong> nipple, genital, surface, and dermal anchor piercings. Please contact us if you have questions about eligibility.
                    </p>
                  </div>

                  {/* Preparation */}
                  <div className="flex gap-4">
                    <div className="w-1 flex-shrink-0 bg-red-700/30 rounded-full" />
                    <div>
                      <p
                        className="text-white uppercase mb-1"
                        style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em' }}
                      >
                        Preparation
                      </p>
                      <p
                        className="text-zinc-400 leading-relaxed"
                        style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px', lineHeight: '1.7' }}
                      >
                        Eat a substantial meal within 2 hours of your appointment and stay well hydrated. Avoid alcohol for 24 hours prior. Wear comfortable clothing that allows easy access to the area being pierced.
                      </p>
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="flex gap-4">
                    <div className="w-1 flex-shrink-0 bg-red-700/30 rounded-full" />
                    <div>
                      <p
                        className="text-white uppercase mb-1"
                        style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em' }}
                      >
                        Waiver &amp; Consent
                      </p>
                      <p
                        className="text-zinc-400 leading-relaxed"
                        style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px', lineHeight: '1.7' }}
                      >
                        All clients complete a health and consent form on arrival for legal and medical purposes. You'll have a chance to ask questions and discuss the procedure with your piercer before anything begins.
                      </p>
                    </div>
                  </div>

                  {/* Restrictions */}
                  <div className="flex gap-4">
                    <div className="w-1 flex-shrink-0 bg-red-700/30 rounded-full" />
                    <div>
                      <p
                        className="text-white uppercase mb-1"
                        style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em' }}
                      >
                        Restrictions
                      </p>
                      <p
                        className="text-zinc-400 leading-relaxed"
                        style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px', lineHeight: '1.7' }}
                      >
                        We will not pierce clients who are intoxicated, pregnant, nursing, or unable to provide informed consent. We reserve the right to decline any piercing based on anatomy or piercer discretion.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/services-piercings.jpg"
                  alt="Piercing studio environment"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,transparent 40%,rgba(0,0,0,0.7) 100%)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Types of Piercings ── */}
        <section id="types" className="w-full bg-zinc-950 py-24 md:py-32 border-t border-zinc-900">
          <div className="max-w-[1400px] mx-auto px-8 md:px-14">

            <div className="mb-14">
              <p
                className="text-zinc-500 uppercase mb-4"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
              >
                — What We Offer
              </p>
              <h2
                className="text-white uppercase leading-none"
                style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(28px,3.5vw,52px)', letterSpacing: '0.06em' }}
              >
                Types of Piercings We Offer
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

              {/* Ear Piercings */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-1 h-8 bg-red-600 flex-shrink-0" />
                  <h3
                    className="text-white uppercase"
                    style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: '22px', letterSpacing: '0.08em' }}
                  >
                    Ear Piercings
                  </h3>
                </div>
                <div className="space-y-2">
                  {EAR_PIERCINGS.map(({ name, desc }) => (
                    <div key={name} className="flex gap-4 p-4 border border-zinc-800/60 hover:border-zinc-600 transition-colors bg-zinc-900/20 hover:bg-zinc-900/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600/60 flex-shrink-0 mt-2" />
                      <div>
                        <p
                          className="text-white uppercase mb-0.5"
                          style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em' }}
                        >
                          {name}
                        </p>
                        <p
                          className="text-zinc-500 leading-relaxed"
                          style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '12px', lineHeight: '1.6' }}
                        >
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facial + Oral + Body */}
              <div className="space-y-10">

                {/* Facial */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-1 h-8 bg-red-600 flex-shrink-0" />
                    <h3
                      className="text-white uppercase"
                      style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: '22px', letterSpacing: '0.08em' }}
                    >
                      Facial Piercings
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {FACIAL_PIERCINGS.map(({ name, desc }) => (
                      <div key={name} className="flex gap-4 p-4 border border-zinc-800/60 hover:border-zinc-600 transition-colors bg-zinc-900/20 hover:bg-zinc-900/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600/60 flex-shrink-0 mt-2" />
                        <div>
                          <p
                            className="text-white uppercase mb-0.5"
                            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em' }}
                          >
                            {name}
                          </p>
                          <p
                            className="text-zinc-500 leading-relaxed"
                            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '12px', lineHeight: '1.6' }}
                          >
                            {desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Oral */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-1 h-8 bg-red-600 flex-shrink-0" />
                    <h3
                      className="text-white uppercase"
                      style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: '22px', letterSpacing: '0.08em' }}
                    >
                      Oral Piercings
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {ORAL_PIERCINGS.map(({ name, desc }) => (
                      <div key={name} className="flex gap-4 p-4 border border-zinc-800/60 hover:border-zinc-600 transition-colors bg-zinc-900/20 hover:bg-zinc-900/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600/60 flex-shrink-0 mt-2" />
                        <div>
                          <p
                            className="text-white uppercase mb-0.5"
                            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em' }}
                          >
                            {name}
                          </p>
                          <p
                            className="text-zinc-500 leading-relaxed"
                            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '12px', lineHeight: '1.6' }}
                          >
                            {desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Body */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-1 h-8 bg-red-600 flex-shrink-0" />
                    <h3
                      className="text-white uppercase"
                      style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: '22px', letterSpacing: '0.08em' }}
                    >
                      Body Piercings
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {BODY_PIERCINGS.map(({ name, desc }) => (
                      <div key={name} className="flex gap-4 p-4 border border-zinc-800/60 hover:border-zinc-600 transition-colors bg-zinc-900/20 hover:bg-zinc-900/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600/60 flex-shrink-0 mt-2" />
                        <div>
                          <p
                            className="text-white uppercase mb-0.5"
                            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em' }}
                          >
                            {name}
                          </p>
                          <p
                            className="text-zinc-500 leading-relaxed"
                            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '12px', lineHeight: '1.6' }}
                          >
                            {desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Shop Jewellery CTA */}
            <div className="text-center">
              <a
                href="#jewelry"
                className="inline-flex items-center bg-white text-black hover:bg-zinc-200 transition-colors px-10 py-3.5"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                Shop Body Jewellery
              </a>
            </div>

            {/* Piercing image collage */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-16">
              {[
                { label: 'Lobe',       accent: '#1a0a0a' },
                { label: 'Helix',      accent: '#0a0a1a' },
                { label: 'Conch',      accent: '#0a1a0a' },
                { label: 'Septum',     accent: '#1a0a14' },
                { label: 'Navel',      accent: '#0a0d1a' },
                { label: 'Daith',      accent: '#14100a' },
              ].map(({ label, accent }) => (
                <div
                  key={label}
                  className="relative aspect-square overflow-hidden group cursor-pointer"
                  style={{ background: `linear-gradient(135deg,${accent} 0%,#111 100%)` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(220,38,38,0.08)' }} />
                  <div className="absolute inset-0 flex items-end p-4">
                    <p
                      className="text-white/30 group-hover:text-white/60 transition-colors uppercase"
                      style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 600, fontSize: '10px', letterSpacing: '0.3em' }}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Aftercare ── */}
        <section id="aftercare" className="w-full bg-black py-24 md:py-32 border-t border-zinc-900">
          <div className="max-w-[1400px] mx-auto px-8 md:px-14">

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 mb-20">
              {/* Sticky heading */}
              <div className="lg:sticky lg:top-24 self-start">
                <p
                  className="text-zinc-500 uppercase mb-4"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
                >
                  — Post Piercing
                </p>
                <h2
                  className="text-white uppercase leading-none mb-4"
                  style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(26px,3vw,44px)', letterSpacing: '0.06em' }}
                >
                  Body Piercing<br />Aftercare
                </h2>
                <div className="w-8 h-px bg-red-700/40 mb-5" />
                <p
                  className="text-zinc-400 leading-relaxed mb-6"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', lineHeight: '1.7' }}
                >
                  Good aftercare is what separates a great piercing from a problematic one. These instructions apply to most piercings — your piercer will give you specific guidance at your appointment.
                </p>
                <a
                  href="/faq#piercing-aftercare"
                  className="text-red-400 hover:text-red-300 transition-colors"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
                >
                  + Full Aftercare Guide
                </a>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {AFTERCARE_STEPS.map(({ num, title, body }) => (
                  <div key={num} className="flex gap-6 p-6 border border-zinc-800 bg-zinc-900/30 hover:border-zinc-600 transition-colors">
                    <div className="flex-shrink-0">
                      <span
                        className="text-red-600/30 leading-none"
                        style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: '32px' }}
                      >
                        {num}
                      </span>
                    </div>
                    <div>
                      <h3
                        className="text-white uppercase mb-2"
                        style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: '17px', letterSpacing: '0.06em' }}
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
                  </div>
                ))}
              </div>
            </div>

            {/* Aftercare Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <div className="border border-zinc-800 bg-zinc-950 p-8">
                <p
                  className="text-red-400/80 uppercase mb-5"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.3em' }}
                >
                  Recommended Products
                </p>
                <div className="space-y-5">
                  {RECOMMENDED_PRODUCTS.map(({ name, brand, desc }) => (
                    <div key={name} className="border-b border-zinc-800 pb-5 last:border-0 last:pb-0">
                      <p
                        className="text-white uppercase mb-0.5"
                        style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: '16px', letterSpacing: '0.06em' }}
                      >
                        {name}
                      </p>
                      <p
                        className="text-red-400/70 uppercase mb-2"
                        style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 600, fontSize: '10px', letterSpacing: '0.2em' }}
                      >
                        {brand}
                      </p>
                      <p
                        className="text-zinc-400 leading-relaxed"
                        style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px', lineHeight: '1.6' }}
                      >
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-zinc-800 bg-zinc-950 p-8">
                <p
                  className="text-red-400/80 uppercase mb-5"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.3em' }}
                >
                  Products to Avoid
                </p>
                <p
                  className="text-zinc-300 leading-relaxed mb-4"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', lineHeight: '1.7' }}
                >
                  Avoid harsh chemicals on or near healing piercings. These disrupt the skin's natural healing process and can cause irritation, chemical burns, or delayed healing:
                </p>
                <ul className="space-y-2">
                  {['Alcohol (rubbing alcohol, alcoholic hand gels)', 'Hydrogen peroxide', 'Antibacterial ointments (Neosporin, Bactroban)', 'Tea tree oil — too harsh for open wounds', 'Fragranced soaps, gels, or washes'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600/60 flex-shrink-0" />
                      <span
                        className="text-zinc-400"
                        style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px' }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center">
              <a
                href="#jewelry"
                className="inline-flex items-center border border-white/20 text-white hover:border-white/50 hover:bg-white/5 transition-all px-8 py-3.5"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                Shop Aftercare Products →
              </a>
            </div>

          </div>
        </section>

        {/* ── Body Jewellery ── */}
        <section id="jewelry" className="w-full grid grid-cols-1 md:grid-cols-2 border-t border-zinc-900">

          {/* Text panel */}
          <div
            className="flex flex-col justify-center px-10 md:px-16 py-20"
            style={{ background: 'linear-gradient(135deg,#0a0a0a 0%,#141414 100%)' }}
          >
            <p
              className="text-red-500/60 uppercase mb-5"
              style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.35em' }}
            >
              — Premium Selection
            </p>
            <h2
              className="text-white uppercase leading-none mb-5"
              style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(28px,3.5vw,48px)', letterSpacing: '0.06em' }}
            >
              Body Jewellery<br />Worth Wearing
            </h2>
            <div className="w-10 h-px bg-white/20 mb-5" />
            <p
              className="text-zinc-400 leading-relaxed max-w-sm mb-4"
              style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', lineHeight: '1.7' }}
            >
              When your piercing heals, it's time to swap out the starter jewellery for something special. We carry an extensive selection of implant-grade and premium pieces for:
            </p>
            <p
              className="text-zinc-600 text-[12px] mb-8 leading-relaxed"
              style={{ fontFamily: 'var(--font-source-sans), sans-serif' }}
            >
              Belly button · Conch · Daith · Earlobe · Eyebrow · Helix · Nipple · Nostril · Rook · Septum · Tongue
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 group self-start text-white hover:text-red-400 transition-colors"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '2px' }}
              >
                Browse Jewellery
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="#book"
                className="text-zinc-600 hover:text-zinc-400 transition-colors"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}
              >
                Book a jewellery change
              </a>
            </div>
          </div>

          {/* Jewellery photo */}
          <div className="relative min-h-[400px] overflow-hidden">
            <Image
              src="/services-jewelry.jpg"
              alt="Premium body jewellery selection"
              fill
              sizes="50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.25)' }} />
          </div>
        </section>

        {/* ── Testimonials ── */}
        <TestimonialsSection />

        {/* ── FAQs ── */}
        <div id="faqs">
          <PiercingsFAQ />
        </div>

        {/* ── Medical Precautions ── */}
        <section className="w-full bg-black py-24 md:py-28 border-t border-zinc-900">
          <div className="max-w-[1400px] mx-auto px-8 md:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              <div>
                <p
                  className="text-zinc-500 uppercase mb-4"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
                >
                  — Health Considerations
                </p>
                <h2
                  className="text-white uppercase leading-none mb-4"
                  style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(22px,2.5vw,36px)', letterSpacing: '0.06em' }}
                >
                  Piercing Precautions
                </h2>
                <div className="w-8 h-px bg-red-700/40 mb-6" />
                <p
                  className="text-zinc-400 leading-relaxed mb-6"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', lineHeight: '1.7' }}
                >
                  Please consult your physician before booking if you have or have had any of the following conditions, as they may affect healing or suitability:
                </p>
                <ul className="space-y-2 mb-6">
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
                <p
                  className="text-zinc-500 leading-relaxed"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px', lineHeight: '1.6' }}
                >
                  We do not pierce clients who are pregnant or nursing. Please contact us in advance if you have any questions about your eligibility.
                </p>
              </div>

              <div className="border border-zinc-800 p-8 bg-zinc-950">
                <p
                  className="text-red-400/80 uppercase mb-4"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.3em' }}
                >
                  Oral Piercing Note
                </p>
                <h3
                  className="text-white uppercase mb-4"
                  style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: '20px', letterSpacing: '0.06em' }}
                >
                  A Note on Oral Piercings
                </h3>
                <p
                  className="text-zinc-400 leading-relaxed mb-4"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', lineHeight: '1.7' }}
                >
                  Oral piercings can affect teeth and gums if the correct jewellery isn't selected. Initial jewellery is intentionally longer to accommodate post-procedure swelling.
                </p>
                <p
                  className="text-zinc-400 leading-relaxed mb-6"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', lineHeight: '1.7' }}
                >
                  Once fully healed, it's important to switch to a shorter, properly fitted piece to prevent ongoing contact with teeth and gums. Your piercer will guide you through this process.
                </p>
                <a
                  href="#book"
                  className="inline-flex items-center bg-white text-black hover:bg-zinc-200 transition-colors px-6 py-3"
                  style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
                >
                  Visit Us for a Walk-In Appointment
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Book CTA ── */}
        <section
          className="w-full py-24 md:py-32 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#08080d 0%,#0d0a14 50%,#0a0a0a 100%)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 50% 80% at 50% 50%,rgba(100,50,200,0.08) 0%,transparent 70%)' }}
          />
          <div className="relative z-10 max-w-[700px] mx-auto px-8 text-center">
            <p
              className="text-red-500/60 uppercase mb-5"
              style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
            >
              — Ready to Go?
            </p>
            <h2
              className="text-white uppercase leading-none mb-6"
              style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(32px,5vw,64px)', letterSpacing: '0.06em' }}
            >
              Book Your<br /><span className="text-red-600">Piercing</span>
            </h2>
            <div className="w-10 h-px bg-red-700/40 mx-auto mb-6" />
            <p
              className="text-zinc-400 leading-relaxed mb-10 max-w-sm mx-auto"
              style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', lineHeight: '1.65' }}
            >
              All piercing appointments include a complimentary jewellery consultation so you leave with exactly the look you want. Walk-ins welcome, subject to availability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#book"
                className="px-10 py-3.5 bg-red-600 text-white hover:bg-red-500 transition-colors"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                Book a Piercing
              </a>
              <a
                href="/artists"
                className="px-10 py-3.5 border border-white/20 text-white hover:border-white/50 transition-colors"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                Meet Our Piercers
              </a>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
