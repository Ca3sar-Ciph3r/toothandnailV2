import SiteNav   from '@/components/home/SiteNav';
import SiteFooter from '@/components/home/SiteFooter';
import FaqAccordion from '@/components/faq/FaqAccordion';

export const metadata = {
  title: 'FAQ — Tooth & Nail Studio',
  description: 'Everything you need to know about tattoos, piercings, aftercare, appointments, and pricing at Tooth & Nail Studio.',
};

const FAQ_CATEGORIES = [
  {
    id: 'health',
    title: 'Pain, Safety & Health',
    icon: '🛡',
    questions: [
      { q: 'How much does it hurt?', a: 'Pain tolerance varies widely between individuals and placement locations. Bony areas (ribs, spine, ankles) tend to be more intense than fleshy areas. Most clients describe the sensation as a scratching or burning feeling. Your artist will work with you to ensure your comfort throughout.' },
      { q: 'Is tattooing / piercing safe?', a: 'Absolutely, when performed in a professional studio with proper sterilisation protocols. We use single-use sterile needles, hospital-grade autoclave sterilisation for all reusable equipment, and medical-grade barrier protection on all surfaces. Every precaution is taken to ensure a safe experience.' },
      { q: 'Do you use numbing cream?', a: 'We can accommodate topical numbing creams. Please discuss this with your artist or piercer when booking. Note that numbing products can occasionally affect the way skin takes ink — your artist will advise on the best approach for your specific piece.' },
      { q: 'Can I get tattooed or pierced if I\'m pregnant or nursing?', a: 'We do not perform tattoo or piercing services on clients who are pregnant. Clients who are nursing should consult their physician before booking. Your and your baby\'s safety is our priority — there will always be an opportunity to come back.' },
      { q: 'What if I have a medical condition or take medication?', a: 'Please disclose any medical conditions, blood disorders, skin conditions, or medications (including blood thinners and immunosuppressants) before booking. Some conditions may affect your suitability for tattooing or piercing. When in doubt, consult your GP first.' },
    ],
  },
  {
    id: 'appointments',
    title: 'Appointments & Policies',
    icon: '📅',
    questions: [
      { q: 'How do I book an appointment?', a: 'All tattoo appointments begin with a free consultation — in person or via email — to discuss your concept, sizing, placement, and pricing. Piercings can be booked directly. Contact us through our website, by phone, or visit the studio in person.' },
      { q: 'Do I need a deposit?', a: 'Yes. A non-refundable deposit is required to secure your appointment. This is deducted from the total cost of your tattoo. Deposits can be transferred once to a rescheduled date provided 48+ hours notice is given.' },
      { q: 'What is your cancellation policy?', a: 'We require a minimum of 48 hours notice for cancellations or rescheduling. Cancellations with less than 48 hours notice will forfeit the deposit. Last-minute no-shows may be charged the full session cost.' },
      { q: 'Can I bring a friend?', a: 'One support person is welcome to accompany you. Due to studio space, we ask that no more than one guest attends. Guests must remain seated and be mindful of the working environment.' },
      { q: 'What are your age restrictions?', a: 'You must be 18 years or older for all tattoo and most piercing services. Valid government-issued photo ID is required at every appointment, no exceptions. We reserve the right to refuse service if identification cannot be provided.' },
    ],
  },
  {
    id: 'tattoo-aftercare',
    title: 'Tattoo Services & Aftercare',
    icon: '🖋',
    questions: [
      { q: 'How do I care for my new tattoo?', a: 'Keep the area clean with fragrance-free antibacterial soap 2–3 times daily. Apply a thin layer of unscented moisturiser regularly. Avoid submerging in water, direct sun exposure, and picking or scratching for at least 4 weeks. Your artist will provide detailed written aftercare instructions.' },
      { q: 'How long does healing take?', a: 'Surface healing typically takes 2–4 weeks. Full deep-layer healing can take 3–6 months depending on placement and individual healing rates. Follow aftercare instructions throughout the full healing period, not just the first few weeks.' },
      { q: 'Can I get a tattoo covered up or reworked?', a: 'Yes — cover-up and rework consultations are welcome. Our artists will assess the existing tattoo (size, saturation, placement) and advise on the best approach. Not all tattoos can be directly covered without laser lightening first — we will be honest with you in the consultation.' },
      { q: 'How long will my session take?', a: 'Session length depends on the complexity and size of the piece. A small simple design might take 1–2 hours; larger custom work can take multiple sessions of 4–6 hours each. Your artist will give you a realistic time estimate during consultation.' },
      { q: 'Do you offer touch-ups?', a: 'Yes. Touch-ups are offered at a discounted rate for tattoos done at our studio once the piece is fully healed (minimum 3 months). Touch-ups for work done elsewhere are available at standard rates.' },
    ],
  },
  {
    id: 'piercing-aftercare',
    title: 'Piercing Services & Aftercare',
    icon: '💎',
    questions: [
      { q: 'How do I care for a new piercing?', a: 'Clean with sterile saline solution (0.9% NaCl) 2–3 times daily using non-woven gauze or allow to air dry. Do not twist or rotate jewellery. Avoid touching the piercing with unwashed hands, and keep hairspray, makeup, and perfume away from the site.' },
      { q: 'How long do piercings take to heal?', a: 'Healing times vary significantly by placement: lobes 6–8 weeks; cartilage 6–12 months; nostril 4–6 months; septum 6–8 weeks; navel 6–12 months; tongue 4–6 weeks. Do not change jewellery before your piercer confirms full healing.' },
      { q: 'What jewellery do you use for new piercings?', a: 'We exclusively use implant-grade materials: ASTM F136 titanium, implant-grade steel (ASTM F138), solid 14k/18k gold, and niobium. These are the only metals proven safe for healing tissue. We do not use acrylic, plated, or mystery-metal jewellery.' },
      { q: 'My piercing looks red and swollen — is it infected?', a: 'Some redness, swelling, and clear or white discharge is completely normal in the first few weeks. A raised bump near the piercing (irritation bump) is also common and manageable with correct aftercare. Signs of infection (spreading redness, increasing pain, hot skin, thick coloured discharge) require medical attention — contact us and/or your GP.' },
      { q: 'When can I change my jewellery?', a: 'Never before your piercing is fully healed and your piercer has confirmed it is ready. Changing jewellery in a healing piercing can cause trauma, introduce bacteria, and significantly set back the healing process. When in doubt, book a check-up with us.' },
    ],
  },
  {
    id: 'jewellery',
    title: 'Jewellery & Accessories',
    icon: '✦',
    questions: [
      { q: 'What jewellery brands do you stock?', a: 'We stock a curated selection of premium body jewellery from industry-leading brands. All pieces available for new piercings are implant-grade certified. Visit us in studio to view the full range or ask your piercer for recommendations during your appointment.' },
      { q: 'Can I buy jewellery without getting a piercing?', a: 'Absolutely. You are welcome to visit and purchase jewellery for an existing healed piercing. Our piercers are also available for jewellery change appointments to ensure safe, comfortable transitions.' },
      { q: 'Do you offer custom jewellery?', a: 'We can assist with custom jewellery enquiries through our supplier network. Lead times and pricing vary — speak to us in studio for more details.' },
      { q: 'What is your returns policy on jewellery?', a: 'For hygiene reasons, jewellery that has been worn or removed from sealed packaging cannot be returned or exchanged. Faulty or damaged items received are handled on a case-by-case basis. Please inspect your purchase before leaving the studio.' },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & Payments',
    icon: '💳',
    questions: [
      { q: 'How much does a tattoo cost?', a: 'Pricing is determined by size, complexity, placement, and artist. We charge either an hourly rate or a flat rate per session for larger pieces. A minimum session charge applies. Your artist will provide a clear quote during your consultation — we do not give final prices without seeing your concept.' },
      { q: 'How much does a piercing cost?', a: 'Piercing pricing varies by placement and includes your starter jewellery. Upgrades to gold or specialty pieces are available at additional cost. Please contact us or check our current price list for specific placement pricing.' },
      { q: 'What payment methods do you accept?', a: 'We accept cash, all major credit and debit cards. Deposits to secure appointments can be paid by card. Please ask about any instalment or gift voucher options when booking.' },
      { q: 'Do you offer gift vouchers?', a: 'Yes! Gift vouchers are available for any amount and never expire. They can be used towards tattoos, piercings, and jewellery purchases. Perfect for birthdays, special occasions, or just because. Ask at the studio or contact us to arrange.' },
      { q: 'Do you offer any discounts?', a: 'We offer loyalty recognition for returning clients and refer-a-friend arrangements. Check our social media and top banner for any current promotional offers. We do not negotiate on pricing — our rates reflect the quality, time, and expertise that goes into every piece.' },
    ],
  },
];

export default function FAQPage() {
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
            <span className="text-white/[0.025] leading-none uppercase" style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(80px,18vw,220px)', letterSpacing: '0.08em' }}>
              FAQ
            </span>
          </div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-14 pb-14 pt-20">
            <p className="text-red-500/60 uppercase mb-4" style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}>— Got Questions?</p>
            <h1 className="text-white uppercase leading-none mb-4" style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(44px,7vw,88px)', letterSpacing: '0.06em' }}>
              Frequently Asked<br />Questions
            </h1>
            <p className="text-zinc-400 max-w-md" style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '15px', lineHeight: '1.6' }}>
              Everything you need to know about our studio, services, aftercare, and policies. Can&apos;t find your answer? Contact us directly.
            </p>
          </div>
        </section>

        {/* Category jump links */}
        <div className="w-full bg-zinc-950 border-b border-zinc-800 overflow-x-auto">
          <div className="max-w-[1200px] mx-auto px-8 flex gap-0">
            {FAQ_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex-shrink-0 px-5 py-4 border-r border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all"
                style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >
                {cat.title}
              </a>
            ))}
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="w-full bg-black">
          {FAQ_CATEGORIES.map((cat, i) => (
            <section
              key={cat.id}
              id={cat.id}
              className={`w-full py-16 md:py-20 ${i > 0 ? 'border-t border-zinc-900' : ''}`}
            >
              <div className="max-w-[900px] mx-auto px-8 md:px-14">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-1 h-8 bg-red-600 flex-shrink-0" />
                  <h2 className="text-white uppercase" style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(20px,2.5vw,30px)', letterSpacing: '0.08em' }}>
                    {cat.title}
                  </h2>
                </div>
                <FaqAccordion questions={cat.questions} />
              </div>
            </section>
          ))}
        </div>

        {/* Contact CTA */}
        <section className="w-full py-20 bg-zinc-950 border-t border-zinc-900 text-center">
          <p className="text-zinc-600 uppercase mb-4" style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}>— Still have questions?</p>
          <h2 className="text-white uppercase leading-none mb-4" style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: 'clamp(24px,3vw,40px)', letterSpacing: '0.06em' }}>
            Contact Us
          </h2>
          <p className="text-zinc-400 max-w-sm mx-auto mb-8" style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px', lineHeight: '1.6' }}>
            Our team is happy to answer any questions not covered above. Reach out and we&apos;ll get back to you promptly.
          </p>
          <a href="mailto:hello@toothandnail.ink" className="inline-flex items-center bg-white text-black hover:bg-zinc-200 transition-colors px-8 py-3.5" style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 600, fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            hello@toothandnail.ink
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
