'use client';
import { useState } from 'react';

const TESTIMONIALS = [
  { id: 0, name: 'Sarah M.', detail: 'Realism sleeve — 3 sessions', quote: "Absolutely blown away by the attention to detail and the overall experience. The studio is immaculate, the artists are world-class, and my piece looks better than I could have imagined." },
  { id: 1, name: 'Jake R.', detail: 'Fine line floral — inner forearm', quote: "I was nervous for my first tattoo but the team made me feel completely at ease. The consultation process was thorough and the final result exceeded every expectation." },
  { id: 2, name: 'Priya K.', detail: 'Blackwork geometric — shoulder', quote: "Third tattoo here and I wouldn't go anywhere else. Consistently excellent work, a sterile and welcoming environment, and artists who truly care about their craft." },
  { id: 3, name: 'Tom W.', detail: 'Industrial piercing + jewellery', quote: "The piercing service was exceptional — super hygienic, they walked me through everything and the jewellery selection is premium. Healed perfectly." },
  { id: 4, name: 'Mirandah H.', detail: 'Multiple visits — tattoos & piercings', quote: "I've been to this shop on numerous occasions and cannot say enough great things. Always a safe, welcoming, and incredibly professional experience." },
  { id: 5, name: 'Taylor W.', detail: 'Tattoos + piercings — ongoing client', quote: "I always leave happy. The atmosphere is second to none and the quality of work keeps me coming back. Highly recommend to anyone." },
  { id: 6, name: 'Kristen R.', detail: 'Six piercings — various placements', quote: "Had six piercings done across two visits. Every single one healed amazingly. The piercers are knowledgeable, patient and incredibly skilled." },
  { id: 7, name: 'Arthur B.', detail: 'First tattoo — full back piece start', quote: "First time at the studio and the artist support was stellar. They made a potentially daunting first experience feel relaxed and exciting." },
  { id: 8, name: 'Emma L.', detail: 'Returning customer — 4+ pieces', quote: "Been coming back for years. Every artist brings something unique to their work and the studio just keeps getting better. It's my favourite place." },
  { id: 9, name: 'Grace C.', detail: 'Conch + helix piercings', quote: "Had my conch and helix done here — both healed without any issues. The aftercare advice was clear and the jewellery quality is genuinely premium." },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent(c => (c + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[current];

  return (
    <section
      className="relative w-full py-24 md:py-32 overflow-hidden border-t border-zinc-900"
      style={{ background: 'linear-gradient(180deg,#111 0%,#0a0a0a 100%)' }}
    >
      {/* Background word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span
          className="text-white/[0.015] leading-none uppercase"
          style={{
            fontFamily: 'var(--font-oswald), sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(80px, 18vw, 220px)',
            letterSpacing: '0.1em',
          }}
        >
          REVIEWS
        </span>
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-8 md:px-14 text-center">

        <p
          className="text-zinc-600 uppercase mb-3"
          style={{
            fontFamily: 'var(--font-source-sans), sans-serif',
            fontWeight: 400,
            fontSize: '11px',
            letterSpacing: '0.4em',
          }}
        >
          — Client Stories
        </p>
        <h2
          className="text-white uppercase leading-none mb-14"
          style={{
            fontFamily: 'var(--font-oswald), sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            letterSpacing: '0.08em',
          }}
        >
          What Our Clients Say
        </h2>

        {/* Stars */}
        <div className="flex justify-center gap-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <svg key={i} viewBox="0 0 20 20" fill="#dc2626" className="w-4 h-4">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          ))}
        </div>

        {/* Quote */}
        <div className="relative min-h-[160px] flex flex-col items-center justify-center">
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-white/[0.06] leading-none select-none" style={{ fontSize: '80px', fontFamily: 'Georgia, serif' }} aria-hidden="true">&ldquo;</span>
          <blockquote
            key={current}
            className="text-zinc-300 leading-[1.7] max-w-2xl mx-auto px-4"
            style={{
              fontFamily: 'var(--font-source-sans), sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              animation: 'fadeIn 0.4s ease',
            }}
          >
            {t.quote}
          </blockquote>
          <div className="mt-7">
            <p
              className="text-white uppercase"
              style={{
                fontFamily: 'var(--font-oswald), sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                letterSpacing: '0.15em',
              }}
            >
              {t.name}
            </p>
            <p
              className="text-zinc-600 mt-1"
              style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '11px', letterSpacing: '0.1em' }}
            >
              {t.detail}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="w-11 h-11 border border-zinc-700 text-zinc-500 hover:border-white hover:text-white transition-all flex items-center justify-center"
            aria-label="Previous"
            style={{ fontSize: '22px' }}
          >
            ‹
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Testimonial ${i + 1}`}
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === current ? 'white' : 'rgba(255,255,255,0.15)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-11 h-11 border border-zinc-700 text-zinc-500 hover:border-white hover:text-white transition-all flex items-center justify-center"
            aria-label="Next"
            style={{ fontSize: '22px' }}
          >
            ›
          </button>
        </div>

        {/* Count */}
        <p
          className="mt-5 text-zinc-700"
          style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '11px', letterSpacing: '0.2em' }}
        >
          {String(current + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
        </p>
      </div>
    </section>
  );
}
