export interface SessionTattoo {
  id: string;
  dataUrl: string;
}

export interface SkinToneOption {
  id: string;
  label: string;
  color: string | null; // null = default model colour
}

export const SKIN_TONES: SkinToneOption[] = [
  { id: 'none',       label: 'None',       color: null },
  { id: 'porcelain',  label: 'Porcelain',  color: '#f7e0cc' },
  { id: 'fair',       label: 'Fair',       color: '#edcaaa' },
  { id: 'sand',       label: 'Sand',       color: '#d9a87c' },
  { id: 'warm-beige', label: 'Warm Beige', color: '#c8915c' },
  { id: 'honey',      label: 'Honey',      color: '#b87840' },
  { id: 'caramel',    label: 'Caramel',    color: '#9a5e2c' },
  { id: 'chestnut',   label: 'Chestnut',   color: '#7a3e1e' },
  { id: 'espresso',   label: 'Espresso',   color: '#562810' },
  { id: 'ebony',      label: 'Ebony',      color: '#351608' },
];

export interface ModelConfig {
  modelPath: string;
  cameraPosition: { x: number; y: number; z: number };
  cameraLookAt:   { x: number; y: number; z: number };
  enableZoom: boolean;
  minDistance: number;
  maxDistance: number;
  /** Polar angle limits [min, max] in radians. Defaults to [PI*0.25, PI*0.75]. */
  polarLimits?: [number, number];
}

export interface BodyModel {
  id: string;
  label: string;
  locked: boolean;
  config: ModelConfig;
}

export const BODY_MODELS: BodyModel[] = [
  {
    id: 'female-full',
    label: 'Female Full Body',
    locked: false,
    config: {
      modelPath: '/models/female_body_base.glb',
      cameraPosition: { x: 0, y: 0.1, z: 3.5 },
      cameraLookAt:   { x: 0, y: 0.0, z: 0 },
      enableZoom: false,
      minDistance: 2.0,
      maxDistance: 6.0,
    },
  },
  {
    id: 'male-full',
    label: 'Male Full Body',
    locked: false,
    config: {
      modelPath: '/models/body.glb',
      cameraPosition: { x: 0, y: 0.1, z: 3.5 },
      cameraLookAt:   { x: 0, y: 0.0, z: 0 },
      enableZoom: false,
      minDistance: 2.0,
      maxDistance: 6.0,
    },
  },
  {
    id: 'hand-detail',
    label: 'Hand Detail',
    locked: false,
    config: {
      modelPath: '/models/hand.glb',
      cameraPosition: { x: 0, y: 0, z: 1.8 },
      cameraLookAt:   { x: 0, y: 0, z: 0 },
      enableZoom: true,
      minDistance: 0.6,
      maxDistance: 3.5,
      polarLimits: [Math.PI * 0.05, Math.PI * 0.95],
    },
  },
];
