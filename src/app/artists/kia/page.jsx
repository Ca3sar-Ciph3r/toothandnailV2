import Link  from 'next/link';
import SiteNav    from '@/components/home/SiteNav';
import SiteFooter from '@/components/home/SiteFooter';

export const metadata = {
  title: 'Kia Fenton — Tooth & Nail Studio',
  description: 'Portfolio of Kia Fenton — tattoo artist at Tooth & Nail Studio.',
};

export default function KiaPage() {
  return (
    <>
      <SiteNav />
      <main style={{ background: '#0a0a0a', minHeight: '100dvh' }}>

        {/* ── Back breadcrumb ── */}
        <div className="px-6 md:px-12 lg:px-16 pt-8">
          <Link
            href="/artists"
            className="inline-flex items-center gap-2 text-zinc-600 hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="16" height="16">
              <path d="M19 12H5M11 6l-6 6 6 6"/>
            </svg>
            All Artists
          </Link>
        </div>

        {/* ── Artist hero ── */}
        <section
          className="relative w-full flex items-end overflow-hidden"
          style={{ minHeight: 'clamp(280px,38vw,460px)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden"
            aria-hidden="true"
          >
            <span
              className="text-white/[0.025] leading-none uppercase"
              style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(80px,16vw,200px)', letterSpacing: '0.08em' }}
            >
              KF
            </span>
          </div>
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 50% 60% at 40% 50%,rgba(30,30,120,0.15) 0%,transparent 70%)' }}
          />
          <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 pb-14 pt-10">
            <p
              className="text-red-500/60 uppercase mb-3"
              style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '10px', letterSpacing: '0.4em' }}
            >
              — Tattoo Artist
            </p>
            <h1
              className="text-white uppercase leading-none mb-5"
              style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(48px,8vw,100px)', letterSpacing: '0.06em' }}
            >
              Kia<br /><span className="text-red-600">Fenton</span>
            </h1>
            <p
              className="text-zinc-500 max-w-lg"
              style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '14px', lineHeight: '1.75' }}
            >
              Kia&apos;s bold, colour-rich style draws from illustration and contemporary tattooing. Known for expressive character work, vibrant neo-traditional florals, and deeply personal custom pieces. Her work is as colourful as the clients who wear it.
            </p>
          </div>
        </section>

        {/* ── Portfolio coming soon ── */}
        <div className="border-t border-zinc-900 px-6 md:px-12 lg:px-16 py-32 flex flex-col items-start gap-4">
          <p
            className="text-zinc-700 uppercase"
            style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '10px', letterSpacing: '0.4em' }}
          >
            — Portfolio
          </p>
          <h2
            className="text-zinc-800 uppercase leading-none"
            style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(36px,5vw,64px)', letterSpacing: '0.06em' }}
          >
            Coming Soon
          </h2>
          <p
            className="text-zinc-700 max-w-sm mt-2"
            style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '13px', lineHeight: '1.75' }}
          >
            Kia&apos;s portfolio gallery is on its way. In the meantime, reach out to book a consultation or follow her work on Instagram.
          </p>
        </div>

        {/* ── Book CTA ── */}
        <section className="w-full py-24 border-t border-zinc-900 text-center">
          <p
            className="text-red-500/60 uppercase mb-5"
            style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '11px', letterSpacing: '0.4em' }}
          >
            — Book with Kia
          </p>
          <h2
            className="text-white uppercase leading-none mb-4"
            style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(28px,4vw,52px)', letterSpacing: '0.06em' }}
          >
            Start Your Project
          </h2>
          <a
            href="/#book"
            className="inline-flex items-center bg-red-600 text-white hover:bg-red-500 transition-colors px-8 py-3.5"
            style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            Book Now
          </a>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
