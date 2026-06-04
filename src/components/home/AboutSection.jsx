import Image from 'next/image';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full"
      style={{ background: 'linear-gradient(180deg,#0a0a0a 0%,#111 100%)' }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-14 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Mission + image ── */}
          <div>
            <p
              className="text-zinc-600 uppercase mb-8"
              style={{
                fontFamily: 'var(--font-source-sans), sans-serif',
                fontWeight: 400,
                fontSize: '11px',
                letterSpacing: '0.4em',
              }}
            >
              — Our Philosophy
            </p>
            <blockquote
              className="text-white leading-[1.2] mb-8"
              style={{
                fontFamily: 'var(--font-oswald), sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(26px, 3.2vw, 40px)',
                letterSpacing: '0.04em',
              }}
            >
              "IT&apos;S OUR GOAL TO PROVIDE OUTSTANDING ARTIST–CLIENT EXPERIENCES &amp; SET A NEW STANDARD IN PREMIUM BODY ART."
            </blockquote>

            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-px bg-red-700/40" />
              <span
                className="text-zinc-600 uppercase"
                style={{
                  fontFamily: 'var(--font-source-sans), sans-serif',
                  fontWeight: 400,
                  fontSize: '10px',
                  letterSpacing: '0.3em',
                }}
              >
                Tooth &amp; Nail Studio
              </span>
            </div>

            {/* Image placeholder */}
            <div
              className="w-full aspect-[4/3] relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg,#1a0808 0%,#2a1010 50%,#120505 100%)' }}
            >
              <Image
                src="/hero-arm-tattoo.jpg"
                alt="Tattoo artist at work"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>

          {/* ── Right: Stats + image + text ── */}
          <div className="flex flex-col gap-10">

            {/* Stat highlight */}
            <div
              className="border border-zinc-800 p-8"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <p
                className="text-white leading-none mb-2"
                style={{
                  fontFamily: 'var(--font-oswald), sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(44px, 5vw, 64px)',
                  letterSpacing: '0.04em',
                }}
              >
                2,500+
              </p>
              <p
                className="text-zinc-400 uppercase"
                style={{
                  fontFamily: 'var(--font-source-sans), sans-serif',
                  fontWeight: 600,
                  fontSize: '13px',
                  letterSpacing: '0.2em',
                }}
              >
                Hours of Tattoos
              </p>
              <div className="w-8 h-px bg-red-700/40 mt-4 mb-4" />
              <p
                className="text-zinc-500 leading-relaxed"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px' }}
              >
                We&apos;re committed to constantly improving our craft and delivering exceptional work — every single time.
              </p>
            </div>

            {/* Image */}
            <div
              className="w-full aspect-[3/2] relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg,#050510 0%,#0d0d25 50%,#050508 100%)' }}
            >
              <Image
                src="/hero-piercing.jpg"
                alt="Piercing service"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Text block */}
            <div>
              <h3
                className="text-white leading-[1.1] mb-5 uppercase"
                style={{
                  fontFamily: 'var(--font-oswald), sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(20px, 2.2vw, 28px)',
                  letterSpacing: '0.04em',
                }}
              >
                Experience unparalleled tattooing and piercing services, and an extensive range of premium body jewellery
              </h3>
              <p
                className="text-zinc-500 leading-relaxed mb-6"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px' }}
              >
                We&apos;ve got something for everyone — whether you&apos;re seeking your first tattoo or adding to a collection. Our artists specialise across styles from fine line to bold traditional.
              </p>
              <a
                href="/artists"
                className="inline-flex items-center gap-2 group"
                style={{
                  fontFamily: 'var(--font-source-sans), sans-serif',
                  fontWeight: 600,
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(161,161,170,1)',
                  borderBottom: '1px solid rgba(63,63,70,1)',
                  paddingBottom: '2px',
                }}
              >
                More About Us
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
