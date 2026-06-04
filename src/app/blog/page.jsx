import SiteNav from '@/components/home/SiteNav';
import SiteFooter from '@/components/home/SiteFooter';

export const metadata = {
  title: 'Blog — Tooth & Nail Studio',
  description: 'Aftercare guides, style inspiration, and studio news from the artists at Tooth & Nail.',
};

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
    tags: ['Education', 'Piercings'],
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
  {
    id: 7,
    date: 'May 10, 2024',
    readTime: '5 min',
    title: 'How to Prepare for Your First Tattoo Session',
    excerpt: 'Sleep well, eat a good meal, and stay hydrated. What you do in the 24 hours before your appointment can significantly impact the experience.',
    category: 'Tattoos',
    tags: ['Tattoos', 'Aftercare'],
    bg: 'linear-gradient(135deg,#100808 0%,#1a0d0d 100%)',
  },
  {
    id: 8,
    date: 'April 3, 2024',
    readTime: '4 min',
    title: 'Understanding Implant-Grade Jewellery',
    excerpt: "Not all body jewellery is created equal. We explain the difference between implant-grade and what to avoid — and why it matters for healing.",
    category: 'Jewelry',
    tags: ['Jewelry', 'Piercings'],
    bg: 'linear-gradient(135deg,#080810 0%,#0d0d1a 100%)',
  },
  {
    id: 9,
    date: 'February 14, 2024',
    readTime: '3 min',
    title: 'The Art of Ear Curation',
    excerpt: 'Building a cohesive, intentional ear project takes planning. We walk you through how we approach multi-piercing curation for your unique anatomy.',
    category: 'Piercings',
    tags: ['Piercings'],
    bg: 'linear-gradient(135deg,#050515 0%,#0a0a1a 100%)',
  },
];

const CATEGORIES = ['All', 'Tattoos', 'Piercings', 'Aftercare', 'Education', 'Jewelry'];

const TAG_COLORS = {
  Aftercare: 'bg-emerald-900/40 text-emerald-400',
  Tattoos:   'bg-red-900/40 text-red-400',
  Piercings: 'bg-indigo-900/40 text-indigo-400',
  Education: 'bg-amber-900/40 text-amber-400',
  Jewelry:   'bg-zinc-800 text-zinc-400',
};

function PostCard({ post }) {
  return (
    <article className="group cursor-pointer bg-[#0d0d0d] hover:bg-zinc-900 transition-colors duration-300 border border-zinc-900 hover:border-zinc-700">
      <div
        className="w-full h-[180px] relative overflow-hidden"
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

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-zinc-600"
            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '11px' }}
          >
            {post.date}
          </span>
          <span className="text-zinc-700">·</span>
          <span
            className="text-zinc-600"
            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '11px' }}
          >
            {post.readTime} read
          </span>
        </div>

        <h3
          className="text-white uppercase leading-[1.15] mb-3 group-hover:text-red-400 transition-colors"
          style={{
            fontFamily: 'var(--font-oswald), sans-serif',
            fontWeight: 600,
            fontSize: '18px',
            letterSpacing: '0.04em',
          }}
        >
          {post.title}
        </h3>

        <p
          className="text-zinc-500 leading-relaxed mb-4"
          style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '13px' }}
        >
          {post.excerpt}
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
      </div>
    </article>
  );
}

export default function BlogPage() {
  return (
    <>
      <SiteNav />
      <main>

        {/* Hero */}
        <section
          className="relative w-full flex items-end overflow-hidden"
          style={{ minHeight: 'clamp(300px, 40vw, 480px)', background: 'linear-gradient(160deg,#0d0d0d 0%,#1a1a1a 100%)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
            <span
              className="text-white/[0.025] leading-none uppercase"
              style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(80px,18vw,220px)', letterSpacing: '0.08em' }}
            >
              JOURNAL
            </span>
          </div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-14 pb-14 pt-20">
            <p
              className="text-red-500/60 uppercase mb-4"
              style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
            >
              — Knowledge &amp; Inspiration
            </p>
            <h1
              className="text-white uppercase leading-none mb-4"
              style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(44px,7vw,88px)', letterSpacing: '0.06em' }}
            >
              The T&amp;N<br />Journal
            </h1>
            <p
              className="text-zinc-400 max-w-md"
              style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '15px', lineHeight: '1.6' }}
            >
              Aftercare guides, style inspiration, artist spotlights, and everything you need to know about tattoos and piercings.
            </p>
          </div>
        </section>

        {/* Category filter bar */}
        <div className="w-full bg-zinc-950 border-b border-zinc-800 overflow-x-auto">
          <div className="max-w-[1200px] mx-auto px-8 flex gap-0">
            {CATEGORIES.map((cat) => (
              <a
                key={cat}
                href={`#${cat.toLowerCase()}`}
                className="flex-shrink-0 px-5 py-4 border-r border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >
                {cat}
              </a>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        <div className="w-full bg-black py-20 md:py-28">
          <div className="max-w-[1300px] mx-auto px-8 md:px-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {POSTS.map(post => <PostCard key={post.id} post={post} />)}
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <section className="w-full py-20 bg-zinc-950 border-t border-zinc-900 text-center">
          <p
            className="text-zinc-600 uppercase mb-4"
            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
          >
            — Stay in the loop
          </p>
          <h2
            className="text-white uppercase leading-none mb-4"
            style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(24px,3vw,40px)', letterSpacing: '0.06em' }}
          >
            Never Miss a Post
          </h2>
          <p
            className="text-zinc-400 max-w-sm mx-auto mb-8"
            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', lineHeight: '1.6' }}
          >
            New guides, artist features, and studio updates — delivered straight to your inbox.
          </p>
          <a
            href="mailto:hello@toothandnail.ink"
            className="inline-flex items-center bg-white text-black hover:bg-zinc-200 transition-colors px-8 py-3.5"
            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 600, fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            Get in Touch
          </a>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
