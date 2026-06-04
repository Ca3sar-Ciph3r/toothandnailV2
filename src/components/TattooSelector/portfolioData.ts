export interface PortfolioDesign {
  id: string;
  label: string;
  style: string;
  dataUrl: string;
}

const u = (svg: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

const CRESCENT = u(`<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 100 100">
  <path d="M58 12C38 12 22 30 22 50C22 70 38 88 58 88C44 80 36 66 36 50C36 34 44 20 58 12Z" fill="#1a1a1a"/>
  <circle cx="74" cy="22" r="4" fill="#1a1a1a"/>
  <circle cx="82" cy="48" r="2.5" fill="#1a1a1a"/>
  <circle cx="76" cy="70" r="3" fill="#1a1a1a"/>
  <circle cx="64" cy="84" r="2" fill="#1a1a1a"/>
</svg>`);

const SERPENT = u(`<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 100 120">
  <path d="M50 18C65 18 76 30 72 44C68 58 55 60 52 72C49 84 54 95 65 101" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round" fill="none"/>
  <path d="M50 18C35 18 24 30 28 44C32 58 45 60 48 72" stroke="#1a1a1a" stroke-width="6" stroke-linecap="round" fill="none"/>
  <ellipse cx="50" cy="14" rx="10" ry="8" fill="#1a1a1a"/>
  <path d="M44 8L40 3M56 8L60 3" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round"/>
  <circle cx="45" cy="13" r="3" fill="white"/>
  <circle cx="55" cy="13" r="3" fill="white"/>
  <circle cx="45.5" cy="13" r="1.5" fill="#1a1a1a"/>
  <circle cx="55.5" cy="13" r="1.5" fill="#1a1a1a"/>
</svg>`);

const EYE = u(`<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 100 100">
  <polygon points="50,8 94,88 6,88" stroke="#1a1a1a" stroke-width="2.5" fill="none"/>
  <path d="M22 62C35 46 65 46 78 62C65 78 35 78 22 62Z" fill="#1a1a1a"/>
  <circle cx="50" cy="62" r="11" fill="white"/>
  <circle cx="50" cy="62" r="7.5" fill="#1a1a1a"/>
  <circle cx="47" cy="59" r="2.5" fill="white"/>
  <line x1="50" y1="8" x2="50" y2="34" stroke="#1a1a1a" stroke-width="1.5"/>
  <line x1="8" y1="92" x2="92" y2="92" stroke="#1a1a1a" stroke-width="2"/>
  <line x1="20" y1="97" x2="80" y2="97" stroke="#1a1a1a" stroke-width="1.5"/>
</svg>`);

const DAGGER = u(`<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 60 150" fill="#1a1a1a">
  <polygon points="30,4 40,78 30,88 20,78"/>
  <rect x="11" y="80" width="38" height="9" rx="4.5"/>
  <rect x="22" y="89" width="16" height="44" rx="3"/>
  <ellipse cx="30" cy="137" rx="13" ry="9"/>
  <ellipse cx="30" cy="137" rx="7" ry="5" fill="none" stroke="white" stroke-width="2"/>
  <path d="M27 90L27 133M33 90L33 133" stroke="white" stroke-width="0.8" opacity="0.35"/>
</svg>`);

const LOTUS = u(`<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 100 110" fill="none" stroke="#1a1a1a">
  <path d="M50 88C45 70 40 48 50 22C60 48 55 70 50 88Z" stroke-width="2"/>
  <path d="M50 88C40 76 20 62 24 40C38 52 45 72 50 88Z" stroke-width="2"/>
  <path d="M50 88C60 76 80 62 76 40C62 52 55 72 50 88Z" stroke-width="2"/>
  <path d="M50 88C34 84 12 72 10 50C28 56 41 74 50 88Z" stroke-width="1.5"/>
  <path d="M50 88C66 84 88 72 90 50C72 56 59 74 50 88Z" stroke-width="1.5"/>
  <line x1="50" y1="88" x2="50" y2="106" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M50 98C40 94 34 84 38 75" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M50 98C60 94 66 84 62 75" stroke-width="1.5" stroke-linecap="round"/>
</svg>`);

const COMPASS = u(`<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 100 100">
  <polygon points="50,4 56,44 50,40 44,44" fill="#1a1a1a"/>
  <polygon points="50,96 56,56 50,60 44,56" fill="#1a1a1a"/>
  <polygon points="4,50 44,56 40,50 44,44" fill="#1a1a1a"/>
  <polygon points="96,50 56,56 60,50 56,44" fill="#1a1a1a"/>
  <polygon points="50,4 56,44 50,40 44,44" fill="#1a1a1a" transform="rotate(45 50 50)" opacity="0.5"/>
  <polygon points="50,96 56,56 50,60 44,56" fill="#1a1a1a" transform="rotate(45 50 50)" opacity="0.5"/>
  <polygon points="4,50 44,56 40,50 44,44" fill="#1a1a1a" transform="rotate(45 50 50)" opacity="0.5"/>
  <polygon points="96,50 56,56 60,50 56,44" fill="#1a1a1a" transform="rotate(45 50 50)" opacity="0.5"/>
  <circle cx="50" cy="50" r="9" fill="#1a1a1a"/>
  <circle cx="50" cy="50" r="4.5" fill="none" stroke="white" stroke-width="2"/>
</svg>`);

export const PORTFOLIO_DESIGNS: PortfolioDesign[] = [
  { id: 'flash-crescent', label: 'Crescent Moon',  style: 'Fine Line',  dataUrl: CRESCENT },
  { id: 'flash-serpent',  label: 'Coiled Serpent', style: 'Traditional', dataUrl: SERPENT  },
  { id: 'flash-eye',      label: 'All-Seeing Eye', style: 'Blackwork',  dataUrl: EYE      },
  { id: 'flash-dagger',   label: 'Dagger',         style: 'Traditional', dataUrl: DAGGER   },
  { id: 'flash-lotus',    label: 'Lotus',          style: 'Fine Line',  dataUrl: LOTUS    },
  { id: 'flash-compass',  label: 'Compass Rose',   style: 'Geometric',  dataUrl: COMPASS  },
];
