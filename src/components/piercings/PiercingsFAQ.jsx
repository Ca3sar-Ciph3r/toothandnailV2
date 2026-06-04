'use client';
import { useState } from 'react';

const FAQS = [
  {
    q: 'How much do piercings hurt?',
    a: 'Pain levels vary by piercing location and individual tolerance. Generally, piercings cause a brief, sharp sensation followed by mild discomfort — the actual piercing itself takes only a second or two. Cartilage piercings tend to feel more intense than soft tissue placements. Our piercers will walk you through what to expect before beginning.',
  },
  {
    q: 'How long does it take for a piercing to heal?',
    a: 'Healing times vary significantly by placement. Earlobes typically heal in 6–8 weeks; cartilage piercings (helix, conch, daith, rook, tragus) take 6–12 months; nostril 4–6 months; septum 6–8 weeks; navel 6–12 months; tongue 4–6 weeks. These are guidelines — some piercings take longer depending on individual healing rates and aftercare quality.',
  },
  {
    q: 'What is the best aftercare for a new piercing?',
    a: 'Clean your piercing twice daily with a sterile saline solution (0.9% NaCl wound wash). Avoid touching or rotating the jewellery — this is outdated advice that causes micro-tears and delays healing. Do not use alcohol, hydrogen peroxide, or harsh chemicals. Your piercer will provide full written aftercare instructions at your appointment.',
  },
  {
    q: 'Can I swim with a new piercing?',
    a: 'No. Avoid swimming in pools, hot tubs, lakes, rivers, and the ocean until your piercing is fully healed. These environments expose your piercing to bacteria and chemicals that significantly increase the risk of infection and irritation.',
  },
  {
    q: 'What should I do if my piercing looks infected?',
    a: 'Do not remove the jewellery — this can cause the hole to close and trap the infection. Continue gentle saline cleaning. Contact us or a healthcare provider if you notice spreading redness, increasing pain, hot skin, or thick coloured discharge. Note: many reactions that look like infections are actually irritation bumps, which are common and manageable with correct aftercare.',
  },
  {
    q: 'When can I change my piercing jewellery?',
    a: 'Only once your piercing is fully healed and your piercer has confirmed it is ready. Changing jewellery too early can cause trauma, introduce bacteria, and significantly delay healing. If you are unsure, book a check-up with us — we can assess the healing and change the jewellery safely.',
  },
  {
    q: 'What type of body jewellery is best for new piercings?',
    a: 'Use only implant-grade, biocompatible materials: ASTM F136 titanium, implant-grade steel (ASTM F138), solid 14k or 18k gold, or niobium. These are the only materials proven safe for healing tissue. Avoid acrylic, plated jewellery, mystery metals, and anything not certified as implant-grade.',
  },
  {
    q: 'How should I clean a new piercing?',
    a: 'Use a sterile saline solution or a gentle, non-alcoholic wound wash spray. Apply to the piercing and surrounding area, then allow to air dry or use non-woven gauze to pat dry. Do not use cotton balls or cotton-tipped swabs as fibres can snag the jewellery. Clean twice daily — no more, as over-cleaning can cause irritation.',
  },
  {
    q: 'Can I get a piercing if I have a medical condition?',
    a: 'Some conditions can affect healing or increase the risks associated with piercing. Consult your physician before booking if you have diabetes, a bleeding disorder, auto-immune conditions, or are taking blood-thinning medications. Always disclose any relevant health conditions to your piercer at your appointment.',
  },
  {
    q: 'What should I avoid during the healing process?',
    a: 'Avoid touching or rotating the jewellery, sleeping directly on the piercing, over-cleaning, and exposing the site to dirty environments, beauty products, or harsh chemicals. Avoid swimming and intense physical activity that puts stress on the area. For ear piercings, change your pillowcase every 2 days and consider using a travel pillow.',
  },
];

export default function PiercingsFAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="w-full bg-zinc-950 py-24 md:py-32 border-t border-zinc-900">
      <div className="max-w-[900px] mx-auto px-8 md:px-14">

        <div className="text-center mb-14">
          <p className="text-[9px] font-mono text-zinc-500 tracking-[0.4em] uppercase mb-4">— Common Questions</p>
          <h2
            className="text-[clamp(28px,3.5vw,48px)] font-black text-white leading-[1.0] tracking-[-0.02em] uppercase"
            style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
          >
            Piercing FAQs
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
