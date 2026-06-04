'use client';
import { useState } from 'react';

export default function FaqAccordion({ questions }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="divide-y divide-zinc-900">
      {questions.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 py-5 text-left group"
              aria-expanded={isOpen}
            >
              <span
                className="text-white group-hover:text-red-400 transition-colors leading-snug"
                style={{
                  fontFamily: 'var(--font-source-sans), sans-serif',
                  fontWeight: 600,
                  fontSize: '15px',
                }}
              >
                {item.q}
              </span>
              <span
                className={`flex-shrink-0 w-6 h-6 border border-zinc-700 flex items-center justify-center text-zinc-500 group-hover:border-red-600 group-hover:text-red-500 transition-all ${isOpen ? 'bg-red-600 border-red-600 text-white' : ''}`}
                style={{ fontSize: '14px', lineHeight: 1 }}
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <div className="pb-6 pr-12">
                <p
                  className="text-zinc-400 leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-source-sans), sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '1.7',
                  }}
                >
                  {item.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
