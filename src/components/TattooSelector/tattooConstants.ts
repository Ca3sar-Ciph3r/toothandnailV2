// Decal base sizes in Three.js scene units at scale = 1.0
export const DECAL_SIZES: Record<string, number> = {
  // Full-body model hotspots
  'neck': 0.14,
  'left-shoulder': 0.24, 'right-shoulder': 0.24,
  'chest-left': 0.20,    'chest-right': 0.20,
  'ribs': 0.22,          'stomach': 0.22,
  'left-upper-arm': 0.20, 'right-upper-arm': 0.20,
  'left-forearm': 0.18,  'right-forearm': 0.18,
  'upper-back': 0.35,    'lower-back': 0.25,
  'left-thigh': 0.28,    'right-thigh': 0.28,
  'left-calf': 0.22,     'right-calf': 0.22,
  'ankle': 0.13,
  // Hand model hotspots (hand.glb scaled to 2.0 units ≈ 1 unit = 10 cm on a hand)
  'hand-back': 0.28,
  'hand-palm': 0.28,
  'hand-wrist': 0.16,
  'hand-thumb': 0.10,
  'hand-index': 0.08,
  'hand-middle': 0.08,
  'hand-ring': 0.08,
  'hand-pinky': 0.07,
};

// Full-body model: 182.32 cm → 2.0 Three.js scene units → 1 unit ≈ 91 cm
export const SCENE_UNIT_TO_CM = 91;
// Hand model: ~20 cm palm width → 2.0 scene units → 1 unit ≈ 10 cm
export const HAND_SCENE_UNIT_TO_CM = 10;
