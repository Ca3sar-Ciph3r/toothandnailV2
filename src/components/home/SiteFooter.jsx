const FOOTER_LINKS = {
  Studio: [
    { label: 'Tattoos',       href: '/tattoos'   },
    { label: 'Piercings',     href: '/piercings' },
    { label: 'Artists',       href: '/artists'   },
    { label: 'Aftercare',     href: '/tattoos#aftercare' },
    { label: 'Placement Editor', href: '/tattoo-editor' },
  ],
  Company: [
    { label: 'About Us',     href: '/#about'   },
    { label: 'FAQ',          href: '/faq'      },
    { label: 'Blog',         href: '/blog'     },
    { label: 'Contact',      href: '/#contact' },
    { label: 'Gift Vouchers',href: '/#gift'    },
  ],
  Legal: [
    { label: 'Privacy Policy',   href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy',    href: '#' },
  ],
};

const LOCATIONS = [
  { name: 'City Studio', address: '123 Inkwell Lane, Arts District' },
  { name: 'East Side',   address: '456 Brushstroke Ave, East Quarter' },
];

export default function SiteFooter() {
  return (
    <footer className="bg-black border-t border-zinc-900" id="contact">

      {/* ── Marquee ── */}
      <div className="overflow-hidden border-b border-zinc-900/80 py-4 select-none">
        <div
          className="whitespace-nowrap inline-flex"
          style={{ animation: 'marquee 35s linear infinite' }}
        >
          {[0, 1].map((n) => (
            <span
              key={n}
              className="text-[48px] md:text-[64px] font-black tracking-tighter text-zinc-900 uppercase"
              style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
            >
              Tooth &amp; Nail&ensp;
              <span className="text-red-900/50">•</span>
              &ensp;Premium Studio&ensp;
              <span className="text-red-900/50">•</span>
              &ensp;Tattoo &amp; Piercing&ensp;
              <span className="text-red-900/50">•</span>
              &ensp;By Appointment Only&ensp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-14 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">

          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center">
                <span className="text-[11px] font-black text-white/70">T&amp;N</span>
              </div>
              <div>
                <p className="text-[11px] font-black text-white/80 tracking-[0.18em] uppercase">Tooth &amp; Nail</p>
                <p className="text-[9px] text-zinc-600 tracking-[0.18em] uppercase">Tattoo · Piercing</p>
              </div>
            </div>
            <div className="h-px w-8 bg-red-700/30 mb-4" />
            <p className="text-zinc-600 text-[12px] font-light leading-relaxed mb-5">
              Permanent. Visceral. Premium.<br />By appointment only.
            </p>

            {/* Socials */}
            <div className="flex gap-2">
              {[
                { label: 'IG', title: 'Instagram' },
                { label: 'FB', title: 'Facebook'  },
                { label: 'TT', title: 'TikTok'    },
              ].map(({ label, title }) => (
                <a
                  key={label}
                  href="#"
                  title={title}
                  className="w-9 h-9 border border-zinc-800 flex items-center justify-center text-zinc-600 text-[9px] font-bold tracking-wider hover:border-red-700/50 hover:text-red-500 hover:bg-red-600/5 transition-all"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[9px] font-mono text-zinc-600 tracking-[0.4em] uppercase mb-6">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-zinc-500 text-[12px] hover:text-red-400 transition-colors group inline-flex items-center gap-1.5"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Locations */}
          <div>
            <h4 className="text-[9px] font-mono text-zinc-600 tracking-[0.4em] uppercase mb-6">
              Locations
            </h4>
            <ul className="space-y-5">
              {LOCATIONS.map(({ name, address }) => (
                <li key={name}>
                  <p className="text-[11px] font-bold text-zinc-400 tracking-[0.1em] uppercase mb-1">{name}</p>
                  <p className="text-zinc-600 text-[11px] font-light leading-snug">{address}</p>
                </li>
              ))}
              <li>
                <a href="mailto:hello@toothandnail.ink" className="text-zinc-600 text-[11px] hover:text-red-400 transition-colors">
                  hello@toothandnail.ink
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-zinc-900 gap-3">
          <span className="text-[9px] font-mono text-zinc-700 tracking-[0.25em] uppercase">
            © {new Date().getFullYear()} Tooth &amp; Nail Studio. All Rights Reserved.
          </span>
          <span className="text-[9px] font-mono text-zinc-800 tracking-[0.2em] uppercase">
            Crafted with precision
          </span>
        </div>
      </div>
    </footer>
  );
}
