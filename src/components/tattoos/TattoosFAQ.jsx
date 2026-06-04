'use client';
import { useState } from 'react';

const FAQS = [
  {
    q: 'Can I work out after getting a tattoo?',
    a: 'We recommend avoiding strenuous exercise for at least 24–48 hours after your session. Sweat introduces bacteria to a fresh wound, and skin stretching from physical activity can distort or damage healing linework. Light walking is fine, but hold off on the gym until the surface has begun to settle.',
  },
  {
    q: 'What should I do to prepare for my tattoo appointment?',
    a: 'Get a full night\'s sleep, eat a substantial meal within 2 hours of your appointment, and stay well hydrated. Avoid alcohol for at least 24 hours prior — it thins the blood and affects healing. Wear comfortable, loose clothing that allows easy access to the area being tattooed. Arrive with clean, moisturised skin and avoid fake tan, heavy oils, or lotions on the area.',
  },
  {
    q: 'How long does it take for a tattoo to heal?',
    a: 'Surface healing typically takes 2–4 weeks with proper aftercare. Full deep-layer healing — where the skin completely regenerates below the surface — can take 3–6 months depending on placement, skin type, and how well aftercare instructions are followed. The tattoo may look fully healed before it actually is, so continue your aftercare routine throughout.',
  },
  {
    q: 'Is getting a tattoo painful?',
    a: 'Pain tolerance varies widely between individuals, and the sensation depends heavily on placement. Bony areas (ribs, spine, knees, ankles) and areas with thin skin are generally more intense than fleshy areas. Most clients describe it as a scratching or burning sensation — uncomfortable, but very manageable. Your artist will work at a pace that keeps you comfortable and will take breaks as needed.',
  },
  {
    q: 'How do I take care of my new tattoo?',
    a: 'Keep the area clean by washing gently with fragrance-free antibacterial soap 2–3 times daily. Apply a thin layer of unscented moisturiser regularly. Avoid soaking in baths, pools, or the ocean, and stay out of direct sunlight for at least 4 weeks. Do not pick, scratch, or peel the skin. Your artist will provide you with a full written aftercare guide at the end of your session.',
  },
  {
    q: 'How do I book an appointment?',
    a: 'All custom tattoo work begins with a free consultation — in person or via email — where we discuss your concept, sizing, placement, and pricing. Contact us through the website, by phone, or visit us in studio. A non-refundable deposit is required to confirm your booking.',
  },
  {
    q: 'Can you replicate another artist\'s tattoo?',
    a: 'We do not copy another tattoo artist\'s original work — it is both ethically wrong and legally problematic. We are happy to create a piece in a similar style or draw on the elements you like as reference. All designs created at Tooth & Nail are original and drawn fresh for each client.',
  },
  {
    q: 'What if I need to cancel or reschedule?',
    a: 'We require a minimum of 48 hours notice for cancellations or rescheduling. Deposits are non-refundable but can be transferred once to a rescheduled appointment if sufficient notice is given. Last-minute cancellations and no-shows will forfeit the deposit in full.',
  },
];

export default function TattoosFAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="w-full bg-black py-24 md:py-32 border-t border-zinc-900">
      <div className="max-w-[900px] mx-auto px-8 md:px-14">

        <div className="text-center mb-14">
          <p className="text-[9px] font-mono text-zinc-500 tracking-[0.4em] uppercase mb-4">— Common Questions</p>
          <h2
            className="text-[clamp(28px,3.5vw,48px)] font-black text-white leading-[1.0] tracking-[-0.02em] uppercase"
            style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
          >
            Tattoo FAQs
          </h2>
        </div>

        <div className="divide-y divide-zinc-800/60">
          {FAQS.map(({ q, a }, i) => (
            <div key={i}>
              <button
                className="w-full text-left py-5 flex items-center justify-between gap-4 group"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-[14px] font-bold text-zinc-200 group-hover:text-white transition-colors leading-snug pr-4">
                  {q}
                </span>
                <span
                  className={`flex-shrink-0 w-7 h-7 border border-zinc-700 flex items-center justify-center text-zinc-500 text-[18px] leading-none transition-all duration-200 group-hover:border-zinc-500 ${open === i ? 'rotate-45 border-red-700/60 text-red-500' : ''}`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <p className="pb-6 text-[13px] text-zinc-400 leading-relaxed pr-12" style={{ animation: 'fadeIn 0.2s ease' }}>
                  {a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
