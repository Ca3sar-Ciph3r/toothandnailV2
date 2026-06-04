export interface TattooHotspot {
  id: string;
  label: string;
  position: { x: number; y: number; z: number };
  cameraTarget: { x: number; y: number; z: number };
  cameraLookAt: { x: number; y: number; z: number };
  zoomDistance: number;
  group: 'head' | 'upper-body' | 'arms' | 'lower-body' | 'hand';
  description: string;
  popularity: number;
  painLevel: number;
  styles: [string, string, string];
  /**
   * Which model this hotspot belongs to.
   * undefined  = visible on all full-body models
   * 'hand-detail' = visible only on the hand model
   */
  modelId?: string;
  /**
   * When set, clicking this hotspot switches to the named model instead of
   * opening the tattoo-placement panel. Used for "drill-down" navigation dots
   * (e.g. tapping the hand on the full body switches to hand.glb).
   */
  targetModelId?: string;
}

export interface GroupOverview {
  group: TattooHotspot['group'];
  label: string;
  tabLabel: string;
  cameraPosition: { x: number; y: number; z: number };
  cameraLookAt: { x: number; y: number; z: number };
}

// Coordinates for female_body_base.glb after Z-up rotation + auto-scale to 2.0 units.
// Rotation: model.rotation.set(-PI/2, PI, 0) → world = (-raw_X, raw_Z, raw_Y)
// Scale ≈ 1.112, centre subtracted so body spans Y ≈ -1.0 (feet) to +1.0 (head).
// Convention: viewer's LEFT = negative scene X (model's anatomical right).

export const INITIAL_CAMERA_POSITION = { x: 0, y: 0.1, z: 3.5 };
export const INITIAL_CAMERA_LOOK_AT  = { x: 0, y: 0.0, z: 0 };

export const groupOverviews: GroupOverview[] = [
  {
    group: 'head',
    label: 'Head & Neck',
    tabLabel: 'HEAD',
    cameraPosition: { x: 0, y: 0.72, z: 2.0 },
    cameraLookAt:   { x: 0, y: 0.625, z: 0 },
  },
  {
    group: 'upper-body',
    label: 'Upper Body',
    tabLabel: 'UPPER BODY',
    cameraPosition: { x: 0, y: 0.22, z: 2.8 },
    cameraLookAt:   { x: 0, y: 0.20, z: 0 },
  },
  {
    group: 'arms',
    label: 'Arms',
    tabLabel: 'ARMS',
    cameraPosition: { x: 0, y: 0.62, z: 4.0 },
    cameraLookAt:   { x: 0, y: 0.62, z: 0 },
  },
  {
    group: 'lower-body',
    label: 'Lower Body',
    tabLabel: 'LOWER BODY',
    cameraPosition: { x: 0, y: -0.50, z: 2.5 },
    cameraLookAt:   { x: 0, y: -0.55, z: 0 },
  },
  {
    group: 'hand',
    label: 'Hand & Fingers',
    tabLabel: 'HAND',
    cameraPosition: { x: 0, y: 0.0, z: 1.5 },
    cameraLookAt:   { x: 0, y: 0.0, z: 0 },
  },
];

export const hotspots: TattooHotspot[] = [
  // ── Head & Neck ──────────────────────────────────────────────────────────
  {
    id: 'neck',
    label: 'Neck',
    position:     { x:  0.00, y:  0.625, z:  0.127 },
    cameraTarget: { x:  0.00, y:  0.650, z:  1.50  },
    cameraLookAt: { x:  0.00, y:  0.625, z:  0.00  },
    zoomDistance: 0.6,
    group: 'head',
    description:
      'Neck tattoos are bold statements. Works beautifully with script, geometric, or floral designs.',
    popularity: 4,
    painLevel: 4,
    styles: ['Script', 'Geometric', 'Minimal'],
  },

  // ── Upper Body ───────────────────────────────────────────────────────────
  {
    id: 'left-shoulder',
    label: 'Left Shoulder',
    position:     { x: -0.33, y:  0.655, z:  0.06  },
    cameraTarget: { x: -0.52, y:  0.700, z:  1.30  },
    cameraLookAt: { x: -0.33, y:  0.655, z:  0.00  },
    zoomDistance: 0.8,
    group: 'upper-body',
    description:
      'Classic placement. Ideal for larger pieces — mandalas, portraits, geometric sleeves.',
    popularity: 5,
    painLevel: 2,
    styles: ['Mandala', 'Portrait', 'Japanese'],
  },
  {
    id: 'right-shoulder',
    label: 'Right Shoulder',
    position:     { x:  0.33, y:  0.655, z:  0.06  },
    cameraTarget: { x:  0.52, y:  0.700, z:  1.30  },
    cameraLookAt: { x:  0.33, y:  0.655, z:  0.00  },
    zoomDistance: 0.8,
    group: 'upper-body',
    description:
      'Mirror of left shoulder. Great for symmetrical or standalone statement pieces.',
    popularity: 5,
    painLevel: 2,
    styles: ['Mandala', 'Portrait', 'Blackwork'],
  },
  {
    id: 'chest-left',
    label: 'Left Chest',
    position:     { x: -0.17, y:  0.364, z:  0.118 },
    cameraTarget: { x: -0.22, y:  0.380, z:  1.40  },
    cameraLookAt: { x: -0.17, y:  0.364, z:  0.00  },
    zoomDistance: 0.7,
    group: 'upper-body',
    description:
      'Intimate and powerful. Perfect for meaningful symbols, names, or fine-line work.',
    popularity: 5,
    painLevel: 3,
    styles: ['Fine Line', 'Script', 'Symbolic'],
  },
  {
    id: 'chest-right',
    label: 'Right Chest',
    position:     { x:  0.17, y:  0.364, z:  0.118 },
    cameraTarget: { x:  0.22, y:  0.380, z:  1.40  },
    cameraLookAt: { x:  0.17, y:  0.364, z:  0.00  },
    zoomDistance: 0.7,
    group: 'upper-body',
    description: 'Right-chest placement for detailed or text-based designs.',
    popularity: 4,
    painLevel: 3,
    styles: ['Fine Line', 'Illustrative', 'Geometric'],
  },
  {
    id: 'ribs',
    label: 'Ribs',
    position:     { x: -0.24, y:  0.058, z:  0.10  },
    cameraTarget: { x: -0.55, y:  0.070, z:  1.30  },
    cameraLookAt: { x: -0.24, y:  0.058, z:  0.00  },
    zoomDistance: 0.9,
    group: 'upper-body',
    description:
      'One of the most expressive placements. Long scripts, botanical, and illustrative work thrive here.',
    popularity: 4,
    painLevel: 5,
    styles: ['Script', 'Botanical', 'Illustrative'],
  },
  {
    id: 'stomach',
    label: 'Stomach',
    position:     { x:  0.00, y: -0.209, z:  0.086 },
    cameraTarget: { x:  0.00, y: -0.200, z:  1.50  },
    cameraLookAt: { x:  0.00, y: -0.209, z:  0.00  },
    zoomDistance: 0.9,
    group: 'upper-body',
    description:
      'Large canvas for statement pieces, panels, or continuation of chest/torso work.',
    popularity: 3,
    painLevel: 3,
    styles: ['Illustrative', 'Portrait', 'Blackwork'],
  },
  {
    id: 'upper-back',
    label: 'Upper Back',
    position:     { x:  0.00, y:  0.419, z: -0.161 },
    cameraTarget: { x:  0.00, y:  0.440, z: -1.70  },
    cameraLookAt: { x:  0.00, y:  0.419, z:  0.00  },
    zoomDistance: 1.1,
    group: 'upper-body',
    description:
      'Epic canvas. Back pieces can run from shoulders to lower back — ultimate statement work.',
    popularity: 4,
    painLevel: 3,
    styles: ['Back Piece', 'Japanese', 'Realism'],
  },
  {
    id: 'lower-back',
    label: 'Lower Back',
    position:     { x:  0.00, y: -0.081, z: -0.116 },
    cameraTarget: { x:  0.00, y: -0.070, z: -1.60  },
    cameraLookAt: { x:  0.00, y: -0.081, z:  0.00  },
    zoomDistance: 0.9,
    group: 'upper-body',
    description:
      'Lower back and spine tattoos are increasingly popular — elegant, linear designs work beautifully.',
    popularity: 3,
    painLevel: 3,
    styles: ['Script', 'Spine', 'Ornamental'],
  },

  // ── Arms (T-pose: arms extend horizontally) ──────────────────────────────
  {
    id: 'left-upper-arm',
    label: 'Left Bicep',
    position:     { x: -0.578, y:  0.609, z:  0.040 },
    cameraTarget: { x: -0.800, y:  0.720, z:  1.20  },
    cameraLookAt: { x: -0.578, y:  0.609, z:  0.00  },
    zoomDistance: 0.7,
    group: 'arms',
    description:
      'Prime real estate for bold, wrap-around designs or standalone statement pieces.',
    popularity: 5,
    painLevel: 2,
    styles: ['Japanese', 'Tribal', 'Bold'],
  },
  {
    id: 'right-upper-arm',
    label: 'Right Bicep',
    position:     { x:  0.578, y:  0.609, z:  0.040 },
    cameraTarget: { x:  0.800, y:  0.720, z:  1.20  },
    cameraLookAt: { x:  0.578, y:  0.609, z:  0.00  },
    zoomDistance: 0.7,
    group: 'arms',
    description: 'Right bicep — great for symmetrical pair pieces or standalone designs.',
    popularity: 5,
    painLevel: 2,
    styles: ['Japanese', 'Tribal', 'Bold'],
  },
  {
    id: 'left-forearm',
    label: 'Left Forearm',
    position:     { x: -0.778, y:  0.617, z:  0.017 },
    cameraTarget: { x: -1.100, y:  0.720, z:  1.10  },
    cameraLookAt: { x: -0.778, y:  0.617, z:  0.00  },
    zoomDistance: 0.65,
    group: 'arms',
    description:
      'Highly visible. Perfect for script, portraits, fine-line botanical, or geometric sleeves.',
    popularity: 5,
    painLevel: 2,
    styles: ['Script', 'Fine Line', 'Botanical'],
  },
  {
    id: 'right-forearm',
    label: 'Right Forearm',
    position:     { x:  0.778, y:  0.617, z:  0.017 },
    cameraTarget: { x:  1.100, y:  0.720, z:  1.10  },
    cameraLookAt: { x:  0.778, y:  0.617, z:  0.00  },
    zoomDistance: 0.65,
    group: 'arms',
    description: 'Highly visible. Right forearm placement for expressive or detailed work.',
    popularity: 5,
    painLevel: 2,
    styles: ['Portrait', 'Geometric', 'Blackwork'],
  },

  // ── Hand navigation (full-body → hand detail model) ─────────────────────
  // Amber dots at the wrist tips; clicking switches to hand.glb.
  {
    id: 'nav-hand-right',
    label: 'View Hand Detail',
    position:     { x:  0.925, y:  0.611, z: -0.002 },
    cameraTarget: { x:  1.10,  y:  0.70,  z:  1.10  },
    cameraLookAt: { x:  0.925, y:  0.611, z:  0.00  },
    zoomDistance: 0.5,
    group: 'arms',
    targetModelId: 'hand-detail',
    description: 'Switch to the hand detail model for precise finger and palm tattoo placement.',
    popularity: 0,
    painLevel: 0,
    styles: ['', '', ''] as [string, string, string],
  },
  {
    id: 'nav-hand-left',
    label: 'View Hand Detail',
    position:     { x: -0.925, y:  0.611, z: -0.002 },
    cameraTarget: { x: -1.10,  y:  0.70,  z:  1.10  },
    cameraLookAt: { x: -0.925, y:  0.611, z:  0.00  },
    zoomDistance: 0.5,
    group: 'arms',
    targetModelId: 'hand-detail',
    description: 'Switch to the hand detail model for precise finger and palm tattoo placement.',
    popularity: 0,
    painLevel: 0,
    styles: ['', '', ''] as [string, string, string],
  },

  // ── Lower Body ───────────────────────────────────────────────────────────
  {
    id: 'left-thigh',
    label: 'Left Thigh',
    position:     { x: -0.109, y: -0.443, z:  0.113 },
    cameraTarget: { x: -0.280, y: -0.380, z:  1.30  },
    cameraLookAt: { x: -0.109, y: -0.443, z:  0.00  },
    zoomDistance: 0.9,
    group: 'lower-body',
    description:
      'Large, flat surface. Thigh tattoos can be concealed or shown — ideal for big illustrative pieces.',
    popularity: 4,
    painLevel: 2,
    styles: ['Illustrative', 'Portrait', 'Large Scale'],
  },
  {
    id: 'right-thigh',
    label: 'Right Thigh',
    position:     { x:  0.109, y: -0.443, z:  0.113 },
    cameraTarget: { x:  0.280, y: -0.380, z:  1.30  },
    cameraLookAt: { x:  0.109, y: -0.443, z:  0.00  },
    zoomDistance: 0.9,
    group: 'lower-body',
    description:
      'Right thigh — versatile and concealable. Pairs beautifully with left-thigh matching designs.',
    popularity: 4,
    painLevel: 2,
    styles: ['Illustrative', 'Botanical', 'Japanese'],
  },
  {
    id: 'left-calf',
    label: 'Left Calf',
    position:     { x: -0.120, y: -0.765, z:  0.110 },
    cameraTarget: { x: -0.240, y: -0.700, z:  1.20  },
    cameraLookAt: { x: -0.120, y: -0.765, z:  0.00  },
    zoomDistance: 0.8,
    group: 'lower-body',
    description:
      'Calves wrap beautifully. Perfect for script, animals, or continuation of full-leg pieces.',
    popularity: 3,
    painLevel: 3,
    styles: ['Script', 'Animal', 'Wrap-Around'],
  },
  {
    id: 'right-calf',
    label: 'Right Calf',
    position:     { x:  0.120, y: -0.765, z:  0.110 },
    cameraTarget: { x:  0.240, y: -0.700, z:  1.20  },
    cameraLookAt: { x:  0.120, y: -0.765, z:  0.00  },
    zoomDistance: 0.8,
    group: 'lower-body',
    description: 'Right calf — underrated placement, great visibility when walking.',
    popularity: 3,
    painLevel: 3,
    styles: ['Geometric', 'Illustrative', 'Blackwork'],
  },
  {
    id: 'ankle',
    label: 'Ankle',
    position:     { x: -0.166, y: -0.926, z:  0.096 },
    cameraTarget: { x: -0.180, y: -0.880, z:  1.10  },
    cameraLookAt: { x: -0.166, y: -0.926, z:  0.00  },
    zoomDistance: 0.5,
    group: 'lower-body',
    description:
      'Delicate and elegant. Ankle tattoos suit fine-line, minimal, or wrap-around designs.',
    popularity: 3,
    painLevel: 4,
    styles: ['Fine Line', 'Minimal', 'Wrap-Around'],
  },

  // ── Hand model hotspots ───────────────────────────────────────────────────
  // hand.glb is Y-up; scaled to 2.0 units (wrist base to fingertip), centred at origin.
  // Palm faces +Z. Y: -1.0 (forearm base) → +1.0 (fingertips).
  // Measured: wrist ≈ Y -0.79, palm ≈ Y 0.0, knuckles ≈ Y 0.33, tips ≈ Y 0.90.
  {
    id: 'hand-back',
    label: 'Back of Hand',
    position:     { x:  0.00, y:  0.05, z: -0.10 },
    cameraTarget: { x:  0.00, y:  0.05, z: -0.90 },
    cameraLookAt: { x:  0.00, y:  0.05, z:  0.00 },
    zoomDistance: 0.75,
    group: 'hand',
    modelId: 'hand-detail',
    description:
      'The back of the hand (dorsal) is a highly visible canvas. Ideal for geometric patterns, mandalas, or bold graphic work.',
    popularity: 4,
    painLevel: 4,
    styles: ['Geometric', 'Mandala', 'Blackwork'],
  },
  {
    id: 'hand-palm',
    label: 'Palm / Inner Hand',
    position:     { x:  0.00, y:  0.05, z:  0.10 },
    cameraTarget: { x:  0.00, y:  0.05, z:  0.90 },
    cameraLookAt: { x:  0.00, y:  0.05, z:  0.00 },
    zoomDistance: 0.75,
    group: 'hand',
    modelId: 'hand-detail',
    description:
      'Inner palm tattooing is bold and unconventional. Ink fades faster here — discuss longevity with your artist.',
    popularity: 2,
    painLevel: 5,
    styles: ['Minimal', 'Symbolic', 'Fine Line'],
  },
  {
    id: 'hand-wrist',
    label: 'Wrist',
    position:     { x:  0.00, y: -0.70, z:  0.02 },
    cameraTarget: { x:  0.00, y: -0.70, z:  0.85 },
    cameraLookAt: { x:  0.00, y: -0.70, z:  0.00 },
    zoomDistance: 0.50,
    group: 'hand',
    modelId: 'hand-detail',
    description:
      'A classic, intimate placement. Wrist tattoos are always visible — perfect for meaningful symbols or short scripts.',
    popularity: 5,
    painLevel: 3,
    styles: ['Script', 'Minimal', 'Symbolic'],
  },
  {
    id: 'hand-thumb',
    label: 'Thumb',
    position:     { x:  0.37, y: -0.05, z:  0.04 },
    cameraTarget: { x:  0.70, y: -0.05, z:  0.85 },
    cameraLookAt: { x:  0.37, y: -0.05, z:  0.00 },
    zoomDistance: 0.40,
    group: 'hand',
    modelId: 'hand-detail',
    description:
      'Thumb tattoos are edgy and unexpected. Small, detailed designs or wrap-around bands work well.',
    popularity: 3,
    painLevel: 4,
    styles: ['Minimal', 'Band', 'Symbolic'],
  },
  {
    id: 'hand-index',
    label: 'Index Finger',
    position:     { x:  0.22, y:  0.52, z:  0.04 },
    cameraTarget: { x:  0.35, y:  0.55, z:  0.85 },
    cameraLookAt: { x:  0.22, y:  0.52, z:  0.00 },
    zoomDistance: 0.38,
    group: 'hand',
    modelId: 'hand-detail',
    description:
      'Index finger tattoos are constantly in view. Bands, single symbols, or side-of-finger scripts are popular choices.',
    popularity: 3,
    painLevel: 4,
    styles: ['Band', 'Minimal', 'Script'],
  },
  {
    id: 'hand-middle',
    label: 'Middle Finger',
    position:     { x:  0.06, y:  0.62, z:  0.04 },
    cameraTarget: { x:  0.06, y:  0.65, z:  0.85 },
    cameraLookAt: { x:  0.06, y:  0.62, z:  0.00 },
    zoomDistance: 0.38,
    group: 'hand',
    modelId: 'hand-detail',
    description:
      'The longest finger offers a narrow but expressive canvas for single-line or wrap-around designs.',
    popularity: 3,
    painLevel: 4,
    styles: ['Minimal', 'Geometric', 'Script'],
  },
  {
    id: 'hand-ring',
    label: 'Ring Finger',
    position:     { x: -0.10, y:  0.54, z:  0.04 },
    cameraTarget: { x: -0.18, y:  0.56, z:  0.85 },
    cameraLookAt: { x: -0.10, y:  0.54, z:  0.00 },
    zoomDistance: 0.38,
    group: 'hand',
    modelId: 'hand-detail',
    description:
      'Ring finger tattoos are a meaningful alternative to traditional jewellery — bands and vine motifs are iconic here.',
    popularity: 4,
    painLevel: 4,
    styles: ['Band', 'Fine Line', 'Symbolic'],
  },
  {
    id: 'hand-pinky',
    label: 'Pinky Finger',
    position:     { x: -0.25, y:  0.42, z:  0.04 },
    cameraTarget: { x: -0.38, y:  0.44, z:  0.85 },
    cameraLookAt: { x: -0.25, y:  0.42, z:  0.00 },
    zoomDistance: 0.35,
    group: 'hand',
    modelId: 'hand-detail',
    description:
      'Tiny and cheeky. The pinky is ideal for micro tattoos, bands, or playful minimal designs.',
    popularity: 3,
    painLevel: 4,
    styles: ['Micro', 'Minimal', 'Band'],
  },
];
