import Image from 'next/image';

const SERVICES = [
  {
    id: 'tattoos',
    label: 'Tattoos',
    description: 'Fine line, realism, traditional & more',
    image: '/services-tattoos.jpg',
    href: '/tattoos',
  },
  {
    id: 'piercings',
    label: 'Piercings',
    description: 'Body, ear & surface piercings',
    image: '/services-piercings.jpg',
    href: '/piercings',
  },
  {
    id: 'jewelry',
    label: 'Jewelry',
    description: 'Premium body jewellery & accessories',
    image: '/services-jewelry.jpg',
    href: '#shop',
  },
  {
    id: 'locations',
    label: 'Locations',
    description: 'Find your nearest studio',
    image: null,
    href: '/#contact',
  },
];

export default function ServicesGrid() {
  return (
    <section className="w-full" id="services">
      <div className="grid grid-cols-2 lg:grid-cols-4" style={{ height: 'clamp(240px, 28vw, 340px)' }}>
        {SERVICES.map((s, i) => (
          <a
            key={s.id}
            href={s.href}
            className="group relative block overflow-hidden"
            style={{ borderRight: i < 3 ? '2px solid #000' : 'none' }}
          >
            {/* Photo or dark fallback */}
            {s.image ? (
              <Image
                src={s.image}
                alt={s.label}
                fill
                sizes="25vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(160deg,#060a06 0%,#0d160d 60%,#060a06 100%)' }}
              />
            )}

            {/* Dark overlay — always present, deeper at bottom */}
            <div
              className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.10) 100%)',
              }}
            />

            {/* Content — bottom left */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 z-10">
              <p
                className="text-white/50 uppercase mb-1.5 hidden md:block"
                style={{
                  fontFamily: 'var(--font-source-sans), sans-serif',
                  fontWeight: 400,
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                }}
              >
                {s.description}
              </p>
              <h3
                className="text-white uppercase leading-none mb-2"
                style={{
                  fontFamily: 'var(--font-oswald), sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(20px, 2.2vw, 30px)',
                  letterSpacing: '0.04em',
                }}
              >
                {s.label}
              </h3>
              <div
                className="flex items-center gap-1.5 text-white/50 group-hover:text-white transition-colors duration-300"
                style={{
                  fontFamily: 'var(--font-source-sans), sans-serif',
                  fontWeight: 400,
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                <span>View</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
