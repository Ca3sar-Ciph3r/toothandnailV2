import SiteNav   from '@/components/home/SiteNav';
import SiteFooter from '@/components/home/SiteFooter';

export const metadata = {
  title: 'Artists — Tooth & Nail Studio',
  description: 'Meet Ethan Gunn and Kia Fenton — the tattoo artists behind Tooth & Nail Studio.',
};

const ARTISTS = [
  {
    id: 'ethan',
    name: 'Ethan Gunn',
    role: 'Tattoo Artist',
    specialty: 'Black & Grey · Fine Line · Realism',
    bio: 'Ethan brings a meticulous eye for detail to every piece. Specialising in photorealistic black and grey work, his portfolio ranges from delicate fine line botanicals to full sleeve compositions. Every piece is drawn fresh — Ethan doesn\'t re-use designs.',
    accent: '#1a0808',
    socials: {
      instagram: 'https://instagram.com/',
      facebook:  'https://facebook.com/',
      tiktok:    'https://tiktok.com/',
    },
  },
  {
    id: 'kia',
    name: 'Kia Fenton',
    role: 'Tattoo Artist',
    specialty: 'Neo-Traditional · Illustrative · Colour',
    bio: 'Kia\'s bold, colour-rich style draws from illustration and contemporary tattooing. Known for expressive character work, vibrant neo-traditional florals, and deeply personal custom pieces. Her work is as colourful as the clients who wear it.',
    accent: '#05050e',
    socials: {
      instagram: 'https://instagram.com/',
      facebook:  'https://facebook.com/',
      tiktok:    'https://tiktok.com/',
    },
  },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[18px] h-[18px]">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[18px] h-[18px]">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
    </svg>
  );
}

function ArtistCard({ artist }) {
  return (
    <div className="relative flex flex-col overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-colors group bg-[#0d0d0d]">

      {/* Photo area */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '4/5', background: `linear-gradient(160deg,${artist.accent} 0%,#111 100%)` }}
      >
        {/* Subtle diagonal texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 12px,rgba(255,255,255,0.5) 12px,rgba(255,255,255,0.5) 13px)' }}
        />

        {/* Large initial watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span
            className="text-white/[0.04] leading-none uppercase"
            style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(80px,12vw,140px)', letterSpacing: '0.04em' }}
          >
            {artist.name.split(' ')[0][0]}{artist.name.split(' ')[1][0]}
          </span>
        </div>

        {/* Hover book button */}
        <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href="#book"
            className="w-full py-3 text-center bg-white text-black hover:bg-zinc-100 transition-colors"
            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            Book with {artist.name.split(' ')[0]}
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1">
        <p
          className="text-red-500/70 uppercase mb-1"
          style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 600, fontSize: '10px', letterSpacing: '0.28em' }}
        >
          {artist.role}
        </p>
        <h3
          className="text-white uppercase leading-none mb-2"
          style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(22px,2.5vw,30px)', letterSpacing: '0.06em' }}
        >
          {artist.name}
        </h3>
        <p
          className="text-zinc-500 mb-4"
          style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '12px', letterSpacing: '0.08em' }}
        >
          {artist.specialty}
        </p>
        <p
          className="text-zinc-600 leading-relaxed mb-6 flex-1"
          style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px', lineHeight: '1.7' }}
        >
          {artist.bio}
        </p>

        {/* Social icons + Book button row */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <div className="flex items-center gap-1">
            <a
              href={artist.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="w-9 h-9 flex items-center justify-center border border-zinc-800 text-zinc-500 hover:border-zinc-500 hover:text-white transition-all"
            >
              <InstagramIcon />
            </a>
            <a
              href={artist.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              className="w-9 h-9 flex items-center justify-center border border-zinc-800 text-zinc-500 hover:border-zinc-500 hover:text-white transition-all"
            >
              <FacebookIcon />
            </a>
            <a
              href={artist.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              title="TikTok"
              className="w-9 h-9 flex items-center justify-center border border-zinc-800 text-zinc-500 hover:border-zinc-500 hover:text-white transition-all"
            >
              <TikTokIcon />
            </a>
          </div>
          <a
            href="#book"
            className="text-white hover:text-red-400 transition-colors"
            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '2px' }}
          >
            Book Now →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ArtistsPage() {
  return (
    <>
      <SiteNav />
      <main>

        {/* Hero */}
        <section
          className="relative w-full flex items-end overflow-hidden"
          style={{ minHeight: 'clamp(320px, 45vw, 520px)', background: 'linear-gradient(160deg,#0d0d0d 0%,#1a1a1a 100%)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
            <span
              className="text-white/[0.025] leading-none uppercase"
              style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(80px,18vw,220px)', letterSpacing: '0.08em' }}
            >
              ARTISTS
            </span>
          </div>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 60% at 60% 50%,rgba(180,20,20,0.12) 0%,transparent 70%)' }} />
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-14 pb-14 pt-20">
            <p
              className="text-red-500/60 uppercase mb-4"
              style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
            >
              — Our Roster
            </p>
            <h1
              className="text-white uppercase leading-none mb-4"
              style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(44px,7vw,88px)', letterSpacing: '0.06em' }}
            >
              Meet the<br /><span className="text-red-600">Artists</span>
            </h1>
            <p
              className="text-zinc-400 max-w-md"
              style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '15px', lineHeight: '1.6' }}
            >
              Tooth &amp; Nail is home to two exceptionally talented tattoo artists. Each brings a distinct vision, a unique style, and an uncompromising commitment to their craft.
            </p>
          </div>
        </section>

        {/* Artists grid */}
        <section className="w-full bg-black py-20 md:py-28">
          <div className="max-w-[1400px] mx-auto px-8 md:px-14">
            <div className="flex items-center gap-5 mb-12">
              <div className="w-1 h-8 bg-red-600" />
              <h2
                className="text-white uppercase"
                style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(22px,2.5vw,32px)', letterSpacing: '0.08em' }}
              >
                Tattoo Artists
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[860px]">
              {ARTISTS.map(a => <ArtistCard key={a.id} artist={a} />)}
            </div>
          </div>
        </section>

        {/* Book CTA */}
        <section className="w-full py-20 bg-zinc-950 border-t border-zinc-900 text-center">
          <p
            className="text-red-500/60 uppercase mb-5"
            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
          >
            — Ready to Begin?
          </p>
          <h2
            className="text-white uppercase leading-none mb-4"
            style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(28px,4vw,52px)', letterSpacing: '0.06em' }}
          >
            Book a Consultation
          </h2>
          <p
            className="text-zinc-400 max-w-sm mx-auto mb-8"
            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', lineHeight: '1.6' }}
          >
            Free consultations available for all custom tattoo work. Get in touch and let&apos;s bring your vision to life.
          </p>
          <a
            href="#book"
            className="inline-flex items-center bg-red-600 text-white hover:bg-red-500 transition-colors px-8 py-3.5"
            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            Book Now
          </a>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
