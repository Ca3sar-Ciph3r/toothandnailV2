import type { Metadata } from 'next';
import TattooEditorClient from './TattooEditorClient';

export const metadata: Metadata = {
  title: 'Placement Editor — Tooth & Nail',
  description:
    'Explore tattoo placement on an interactive 3D body model. Click any zone to see pain level, popular styles, and book your spot.',
};

export default function TattooEditorPage() {
  return <TattooEditorClient />;
}
