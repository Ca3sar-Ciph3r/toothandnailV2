const POSTS = [
  {
    id: 1,
    date: 'March 5, 2025',
    readTime: '4 min',
    title: "The Do's and Don'ts of Tattoo Aftercare",
    excerpt: "How to take care of your new tattoo and what to avoid. Proper aftercare makes the difference between vibrant, long-lasting ink and a faded disappointment.",
    category: 'Aftercare',
    tags: ['Aftercare', 'Tattoos'],
    bg: 'linear-gradient(135deg,#1a0808 0%,#0d0d0d 100%)',
  },
  {
    id: 2,
    date: 'January 8, 2025',
    readTime: '5 min',
    title: 'Our Favourite Piercing Styles of 2025',
    excerpt: "From constellation ear piercings to bold industrial bars — the styles our piercers are loving this year. Our favourite looks of 2025.",
    category: 'Piercings',
    tags: ['Piercings'],
    bg: 'linear-gradient(135deg,#050510 0%,#0a0a20 100%)',
  },
  {
    id: 3,
    date: 'September 4, 2024',
    readTime: '3 min',
    title: 'Piercing 101: Microdermals',
    excerpt: 'Surface anchors are gaining popularity fast. We break down placement, pain levels and healing time. All about microdermals!',
    category: 'Education',
    tags: ['Aftercare', 'Piercings'],
    bg: 'linear-gradient(135deg,#050a05 0%,#0a1505 100%)',
  },
  {
    id: 4,
    date: 'August 20, 2024',
    readTime: '4 min',
    title: 'Traditional & Floating Navel Piercings',
    excerpt: "Every body is different, so it only makes sense that piercings would be too! We explore traditional vs. floating navel placements.",
    category: 'Piercings',
    tags: ['Piercings'],
    bg: 'linear-gradient(135deg,#0a0500 0%,#1a1000 100%)',
  },
  {
    id: 5,
    date: 'July 15, 2024',
    readTime: '6 min',
    title: 'Choosing Your First Tattoo Style',
    excerpt: 'Fine line, blackwork, neo-traditional or Japanese — breaking down the major tattoo styles to help you find your perfect match.',
    category: 'Tattoos',
    tags: ['Tattoos'],
    bg: 'linear-gradient(135deg,#0d0505 0%,#1a0808 100%)',
  },
  {
    id: 6,
    date: 'June 2, 2024',
    readTime: '3 min',
    title: 'Lab-Grown vs. Natural Diamonds in Body Jewellery',
    excerpt: "What's the difference? We break down the pros and cons of lab-grown and natural diamonds for your body jewellery.",
    category: 'Jewelry',
    tags: ['Jewelry'],
    bg: 'linear-gradient(135deg,#08080d 0%,#10101a 100%)',
  },
];

const TAG_COLORS = {
  Aftercare: 'bg-emerald-900/40 text-emerald-400',
  Tattoos:   'bg-red-900/40 text-red-400',
  Piercings: 'bg-indigo-900/40 text-indigo-400',
  Education: 'bg-amber-900/40 text-amber-400',
  Jewelry:   'bg-zinc-800 text-zinc-400',
};

export default function BlogSection() {
  return (
    <section className="w-full bg-[#0d0d0d] py-20 md:py-28 border-t border-zinc-900" id="blog">
      <div className="max-w-[1300px] mx-auto px-8 md:px-14">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p
              className="text-zinc-600 uppercase mb-3"
              style={{
                fontFamily: 'var(--font-source-sans), sans-serif',
                fontWeight: 400,
                fontSize: '11px',
                letterSpacing: '0.4em',
              }}
            >
              — Knowledge &amp; Inspiration
            </p>
            <h2
              className="text-white uppercase leading-none"
              style={{
                fontFamily: 'var(--font-oswald), sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(32px, 4vw, 52px)',
                letterSpacing: '0.08em',
              }}
            >
              The T&amp;N Journal
            </h2>
          </div>
          <a
            href="/blog"
            className="self-start md:self-end inline-flex items-center gap-2 border border-zinc-700 text-zinc-400 hover:border-white hover:text-white transition-all px-6 py-2.5"
            style={{
              fontFamily: 'var(--font-source-sans), sans-serif',
              fontWeight: 600,
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            View All Posts →
          </a>
        </div>

        {/* 6-post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
          {POSTS.map((post) => (
            <article
              key={post.id}
              className="group cursor-pointer bg-[#0d0d0d] hover:bg-zinc-900 transition-colors duration-300 p-6"
            >
              {/* Colour swatch + tags */}
              <div
                className="w-full h-[140px] mb-5 relative overflow-hidden"
                style={{ background: post.bg }}
              >
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {post.tags.map(t => (
                    <span
                      key={t}
                      className={`text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 ${TAG_COLORS[t] || 'bg-zinc-800 text-zinc-400'}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-zinc-600" style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '11px' }}>
                  {post.date}
                </span>
                <span className="text-zinc-700">·</span>
                <span className="text-zinc-600" style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '11px' }}>
                  {post.readTime} read
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-white uppercase leading-[1.15] mb-3 group-hover:text-red-400 transition-colors"
                style={{
                  fontFamily: 'var(--font-oswald), sans-serif',
                  fontWeight: 600,
                  fontSize: '17px',
                  letterSpacing: '0.04em',
                }}
              >
                {post.title}
              </h3>
              <p
                className="text-zinc-500 leading-relaxed mb-4"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px' }}
              >
                {post.excerpt.length > 100 ? post.excerpt.slice(0, 100) + '…' : post.excerpt}
              </p>
              <div
                className="flex items-center gap-1 text-zinc-500 group-hover:text-red-400 transition-colors"
                style={{
                  fontFamily: 'var(--font-source-sans), sans-serif',
                  fontWeight: 600,
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                Read More
                <span className="transform group-hover:translate-x-1 transition-transform ml-1">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
