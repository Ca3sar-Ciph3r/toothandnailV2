'use client';

import dynamic from 'next/dynamic';

function LoadingCanvas() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        fontFamily: "'DM Sans', sans-serif",
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '180px',
          height: '1px',
          background: 'rgba(255,255,255,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)',
            animation: 'ts-shimmer 1.4s linear infinite',
          }}
        />
      </div>
      <p
        style={{
          color: '#6b6560',
          fontSize: '10px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
        }}
      >
        Initialising
      </p>
      <style>{`
        @keyframes ts-shimmer {
          0%   { transform: translateX(-180px); }
          100% { transform: translateX(180px); }
        }
      `}</style>
    </div>
  );
}

const TattooSelector = dynamic(
  () => import('@/components/TattooSelector/TattooSelector'),
  {
    ssr: false,
    loading: () => <LoadingCanvas />,
  }
);

export default function TattooEditorClient() {
  return <TattooSelector />;
}
