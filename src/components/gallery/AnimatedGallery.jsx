'use client';
import Image from 'next/image';

// Each column: scroll direction, loop duration (s), starting offset (negative = jump into mid-loop)
const COL_CFG = [
  { dir: 'up',   dur: 44, off:   0 },
  { dir: 'down', dur: 37, off: -14 },
  { dir: 'up',   dur: 52, off: -26 },
  { dir: 'down', dur: 31, off:  -7 },
];

function Column({ images, label, cfg, className }) {
  if (!images.length) return null;
  // Duplicate so the scroll loops seamlessly (at -50% it looks identical to 0%)
  const doubled = [...images, ...images];
  return (
    <div
      data-gcol
      className={`overflow-hidden min-w-0 flex-1 ${className ?? ''}`}
    >
      <div style={{
        animationName:            cfg.dir === 'up' ? 'galUp' : 'galDown',
        animationDuration:        `${cfg.dur}s`,
        animationTimingFunction:  'linear',
        animationIterationCount:  'infinite',
        animationDelay:           `${cfg.off}s`,
        animationFillMode:        'both',
      }}>
        {doubled.map((src, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <Image
              src={src}
              alt={`${label ?? 'Gallery'} image`}
              width={600}
              height={750}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading={i < 4 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnimatedGallery({ images, label, height = '88vh' }) {
  // Round-robin into 4 buckets
  const buckets = [[], [], [], []];
  images.forEach((src, i) => buckets[i % 4].push(src));

  return (
    <div
      data-gallery-wrap
      style={{ height, display: 'flex', gap: 6, overflow: 'hidden' }}
      onMouseEnter={e => e.currentTarget.setAttribute('data-paused', '1')}
      onMouseLeave={e => e.currentTarget.removeAttribute('data-paused')}
    >
      {/* Col 0 — always visible */}
      <Column images={buckets[0]} label={label} cfg={COL_CFG[0]} />
      {/* Col 1 — always visible */}
      <Column images={buckets[1]} label={label} cfg={COL_CFG[1]} />
      {/* Col 2 — sm+ */}
      <Column images={buckets[2]} label={label} cfg={COL_CFG[2]} className="hidden sm:block" />
      {/* Col 3 — lg+ */}
      <Column images={buckets[3]} label={label} cfg={COL_CFG[3]} className="hidden lg:block" />

      <style>{`
        @keyframes galUp {
          from { transform: translateY(0);    }
          to   { transform: translateY(-50%); }
        }
        @keyframes galDown {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0);    }
        }
        [data-gallery-wrap][data-paused] [data-gcol] > div {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}
