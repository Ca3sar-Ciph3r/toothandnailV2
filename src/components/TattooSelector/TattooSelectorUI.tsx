'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { TattooHotspot } from './hotspotData';
import { groupOverviews, hotspots } from './hotspotData';
import { SKIN_TONES, BODY_MODELS, type SkinToneOption, type SessionTattoo } from './tattooTypes';
import { PORTFOLIO_DESIGNS, type PortfolioDesign } from './portfolioData';
import { DECAL_SIZES, SCENE_UNIT_TO_CM } from './tattooConstants';
import styles from './TattooSelector.module.css';

type ActiveTab = 'location' | 'upload' | 'model';

interface TattooSelectorUIProps {
  // Canvas / camera
  selectedHotspot: TattooHotspot | null;
  onReset: () => void;
  onGroupSelect: (
    pos: { x: number; y: number; z: number },
    lookAt: { x: number; y: number; z: number }
  ) => void;
  onHotspotSelect: (hotspot: TattooHotspot) => void;
  // Tattoo controls
  hasTattoo: boolean;
  tattooScale: number;
  tattooRotation: number;
  onTattooScale: (s: number) => void;
  onTattooRotation: (deg: number) => void;
  tattooMirrorX: boolean;
  tattooMirrorY: boolean;
  onMirrorX: (v: boolean) => void;
  onMirrorY: (v: boolean) => void;
  onTattooRemove: () => void;
  onRemoveAll: () => void;
  activePlacedHotspotId: string | null;
  placedHotspotIds: string[];
  // Designs tab
  sessionTattoos: SessionTattoo[];
  activeTattooId: string | null;
  onSelectTattoo: (t: SessionTattoo) => void;
  onPortfolioSelect: (d: PortfolioDesign) => void;
  onUpload: (dataUrl: string) => void;
  // Model tab
  activeSkinToneId: string;
  onSkinToneChange: (tone: SkinToneOption) => void;
  activeModelId: string;
  onModelChange: (id: string) => void;
  // Panel state
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  // Notes + export
  placementNotes: string;
  onNotesChange: (v: string) => void;
  onSavePlacement: () => void;
  onSendToStudio: () => void;
}

function Stars({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <div className={styles.stars} role="img" aria-label={`${count} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < count ? styles.starFilled : styles.starEmpty} aria-hidden="true">★</span>
      ))}
    </div>
  );
}

function PainDots({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <div className={styles.painDots} role="img" aria-label={`${count} out of ${max} pain level`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < count ? styles.dotFilled : styles.dotEmpty} aria-hidden="true">●</span>
      ))}
    </div>
  );
}

const GROUP_LABELS: Record<TattooHotspot['group'], string> = {
  'head':        'Head & Neck',
  'upper-body':  'Upper Body',
  'arms':        'Arms',
  'lower-body':  'Lower Body',
  'hand':        'Hand & Fingers',
};

function isHandModel(modelId: string) { return modelId === 'hand-detail'; }

const TAB_LABELS: Record<ActiveTab, string> = {
  location: 'Locations',
  upload:   'Designs',
  model:    'Model',
};

// All location groups (filtered per-model inside the component).
// Navigation-only hotspots (targetModelId set) are excluded from the list
// because they trigger a model switch rather than opening the placement panel.
const allLocationGroups = groupOverviews.map(g => ({
  group:  g.group,
  label:  g.label,
  items:  hotspots.filter(h => h.group === g.group && !h.targetModelId),
}));

export function TattooSelectorUI({
  selectedHotspot, onReset, onGroupSelect, onHotspotSelect,
  hasTattoo, tattooScale, tattooRotation, tattooMirrorX, tattooMirrorY,
  onTattooScale, onTattooRotation, onMirrorX, onMirrorY, onTattooRemove, onRemoveAll,
  activePlacedHotspotId, placedHotspotIds,
  sessionTattoos, activeTattooId, onSelectTattoo, onPortfolioSelect, onUpload,
  activeSkinToneId, onSkinToneChange,
  activeModelId, onModelChange,
  activeTab, onTabChange,
  placementNotes, onNotesChange, onSavePlacement, onSendToStudio,
}: TattooSelectorUIProps) {
  const [showHint,    setShowHint]    = useState(true);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(t);
  }, []);

  // Auto-open mobile panel when a hotspot is selected
  useEffect(() => {
    if (selectedHotspot) setMobileOpen(true);
  }, [selectedHotspot]);

  useEffect(() => {
    if (selectedHotspot) setActiveGroup(null);
  }, [selectedHotspot]);

  const handleGroupSelect = useCallback(
    (group: (typeof groupOverviews)[number]) => {
      setActiveGroup(group.group);
      onGroupSelect(group.cameraPosition, group.cameraLookAt);
    },
    [onGroupSelect]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        if (dataUrl) onUpload(dataUrl);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const scalePercent = Math.round(tattooScale * 100);

  // Filter groups + overviews to only those relevant to the active model
  const handMode = isHandModel(activeModelId);
  const activeGroupOverviews = groupOverviews.filter(g =>
    handMode ? g.group === 'hand' : g.group !== 'hand'
  );
  const locationGroups = allLocationGroups.filter(g =>
    handMode ? g.group === 'hand' : g.group !== 'hand'
  );

  // Real-world size estimate
  const approxSizeCm = activePlacedHotspotId
    ? Math.round((DECAL_SIZES[activePlacedHotspotId] ?? 0.20) * SCENE_UNIT_TO_CM * tattooScale)
    : null;

  return (
    <>
      {/* ── Instruction bar ── */}
      <div
        className={`${styles.instructionBar} ${selectedHotspot ? styles.instructionBarHidden : ''}`}
        aria-hidden="true"
      >
        {hasTattoo
          ? 'Drag a tattoo to reposition · Click another to select'
          : 'Click a body area or choose a location →'}
      </div>

      {/* ── Rotate hint ── */}
      <div
        className={`${styles.rotateHint} ${!showHint ? styles.rotateHintHidden : ''}`}
        aria-hidden="true"
      >
        Drag to rotate&nbsp;&nbsp;•&nbsp;&nbsp;Click a point to explore
      </div>

      {/* ── Group tabs ── */}
      <nav className={styles.groupTabs} aria-label="Body region navigation">
        {activeGroupOverviews.map((overview) => (
          <button
            key={overview.group}
            className={`${styles.groupTab} ${activeGroup === overview.group ? styles.groupTabActive : ''}`}
            onClick={() => handleGroupSelect(overview)}
            aria-pressed={activeGroup === overview.group}
          >
            {overview.tabLabel}
          </button>
        ))}
      </nav>

      {/* ── Mobile panel toggle ── */}
      <button
        className={`${styles.mobilePanelToggle} ${mobileOpen ? styles.mobilePanelToggleHidden : ''}`}
        onClick={() => setMobileOpen(true)}
        aria-label="Open options panel"
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="10" cy="6" r="3.5"/>
          <path d="M2 18c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
        </svg>
      </button>

      {/* ── Mobile backdrop ── */}
      {mobileOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Right panel ── */}
      <aside
        className={`${styles.rightPanel} ${mobileOpen ? styles.rightPanelOpen : ''}`}
        aria-label="Tattoo placement panel"
      >
        {/* Tab bar */}
        <div className={styles.panelTabs} role="tablist">
          {(Object.keys(TAB_LABELS) as ActiveTab[]).map((tab) => (
            <button
              key={tab}
              role="tab"
              className={`${styles.panelTab} ${activeTab === tab ? styles.panelTabActive : ''}`}
              onClick={() => onTabChange(tab)}
              aria-selected={activeTab === tab}
            >
              {TAB_LABELS[tab]}
              {tab === 'upload' && sessionTattoos.length > 0 && (
                <span className={styles.tabBadge}>{sessionTattoos.length}</span>
              )}
              {tab === 'location' && placedHotspotIds.length > 0 && (
                <span className={styles.tabBadge}>{placedHotspotIds.length}</span>
              )}
            </button>
          ))}
          {/* Mobile close */}
          <button
            className={styles.panelMobileClose}
            onClick={() => setMobileOpen(false)}
            aria-label="Close panel"
          >
            ✕
          </button>
        </div>

        {/* ── Scrollable content ── */}
        <div className={styles.panelContent}>

          {/* ── Locations tab ── */}
          {activeTab === 'location' && (
            selectedHotspot ? (
              /* Detail view */
              <div className={styles.locationContent}>
                <button className={styles.locationBack} onClick={onReset}>
                  ← All Locations
                </button>
                <span className={styles.locationGroupTag}>{GROUP_LABELS[selectedHotspot.group]}</span>
                <h2 className={styles.locationLabel}>{selectedHotspot.label}</h2>
                <div className={styles.divider} />
                <p className={styles.description}>{selectedHotspot.description}</p>

                <div className={styles.metaSection}>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Popularity</span>
                    <Stars count={selectedHotspot.popularity} />
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Pain Level</span>
                    <PainDots count={selectedHotspot.painLevel} />
                  </div>
                </div>

                <div className={styles.stylesSection}>
                  <span className={styles.metaLabel}>Best Styles for Here</span>
                  <div className={styles.styleTags}>
                    {selectedHotspot.styles.map((s) => (
                      <span key={s} className={styles.styleTag}>{s}</span>
                    ))}
                  </div>
                </div>

                {sessionTattoos.length === 0 && (
                  <button
                    className={styles.goToDesignsBtn}
                    onClick={() => onTabChange('upload')}
                  >
                    Upload a Design →
                  </button>
                )}

                <button
                  className={styles.bookBtn}
                  onClick={() => { window.location.href = '/#book'; }}
                >
                  Book This Placement →
                </button>
              </div>
            ) : (
              /* Browse list */
              <div className={styles.locationBrowse}>
                {locationGroups.map(({ group, label, items }) => (
                  <div key={group} className={styles.locationGroupSection}>
                    <p className={styles.locationGroupHeader}>{label}</p>
                    {items.map((spot) => {
                      const isPlaced = placedHotspotIds.includes(spot.id);
                      return (
                        <button
                          key={spot.id}
                          className={`${styles.locationListItem} ${isPlaced ? styles.locationListItemPlaced : ''}`}
                          onClick={() => onHotspotSelect(spot)}
                        >
                          <span className={styles.locationListLabel}>{spot.label}</span>
                          <span className={styles.locationListRight}>
                            {isPlaced && <span className={styles.locationPlacedDot} aria-label="Tattoo placed" />}
                            <span className={styles.locationListArrow}>→</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )
          )}

          {/* ── Designs tab ── */}
          {activeTab === 'upload' && (
            <div className={styles.uploadContent}>

              {/* Flash designs */}
              <p className={styles.sectionLabel}>Flash Designs</p>
              <div className={styles.portfolioGrid}>
                {PORTFOLIO_DESIGNS.map((design) => {
                  const isActive = design.id === activeTattooId;
                  return (
                    <button
                      key={design.id}
                      className={`${styles.portfolioItem} ${isActive ? styles.portfolioItemActive : ''}`}
                      onClick={() => onPortfolioSelect(design)}
                      aria-pressed={isActive}
                      title={`${design.label} — ${design.style}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={design.dataUrl} alt={design.label} className={styles.portfolioThumb} />
                      <span className={styles.portfolioLabel}>{design.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className={styles.divider} style={{ margin: '18px 0 14px' }} />

              {/* Uploaded designs */}
              <p className={styles.sectionLabel}>Your Designs</p>
              <div className={styles.galleryGrid}>
                <button
                  className={styles.galleryUploadBtn}
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Upload tattoo design"
                >
                  <span className={styles.galleryUploadIcon}>+</span>
                  <span className={styles.galleryUploadLabel}>Upload</span>
                </button>

                {sessionTattoos
                  .filter(t => !t.id.startsWith('flash-'))
                  .map((tattoo) => (
                    <button
                      key={tattoo.id}
                      className={`${styles.galleryItem} ${tattoo.id === activeTattooId ? styles.galleryItemActive : ''}`}
                      onClick={() => onSelectTattoo(tattoo)}
                      aria-pressed={tattoo.id === activeTattooId}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={tattoo.dataUrl} alt="Tattoo design" className={styles.galleryThumb} />
                    </button>
                  ))}
              </div>

              {sessionTattoos.filter(t => !t.id.startsWith('flash-')).length === 0 && (
                <p className={styles.galleryEmpty}>Upload your own design above</p>
              )}
            </div>
          )}

          {/* ── Model tab ── */}
          {activeTab === 'model' && (
            <div className={styles.modelContent}>
              <p className={styles.sectionLabel}>Body Model</p>
              <div className={styles.modelGrid}>
                {BODY_MODELS.map((model) => (
                  <button
                    key={model.id}
                    className={`${styles.modelItem} ${!model.locked && model.id === activeModelId ? styles.modelItemActive : ''} ${model.locked ? styles.modelItemLocked : ''}`}
                    onClick={() => !model.locked && onModelChange(model.id)}
                    disabled={model.locked}
                    aria-pressed={model.id === activeModelId}
                  >
                    <div className={styles.modelThumbWrap}>
                      {model.id === 'hand-detail' ? (
                        <svg viewBox="0 0 60 100" className={styles.modelSvg} aria-hidden="true">
                          {/* Index */}
                          <rect x="15" y="14" width="8" height="32" rx="4" fill="currentColor" opacity="0.6"/>
                          {/* Middle */}
                          <rect x="26" y="10" width="8" height="36" rx="4" fill="currentColor" opacity="0.6"/>
                          {/* Ring */}
                          <rect x="37" y="14" width="8" height="32" rx="4" fill="currentColor" opacity="0.6"/>
                          {/* Pinky */}
                          <rect x="47" y="22" width="6" height="24" rx="3" fill="currentColor" opacity="0.55"/>
                          {/* Thumb */}
                          <rect x="5"  y="42" width="12" height="8"  rx="4" fill="currentColor" opacity="0.6" transform="rotate(-25 11 46)"/>
                          {/* Palm */}
                          <rect x="13" y="44" width="40" height="28" rx="7" fill="currentColor" opacity="0.6"/>
                          {/* Wrist */}
                          <rect x="20" y="72" width="20" height="18" rx="4" fill="currentColor" opacity="0.5"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 60 100" className={styles.modelSvg} aria-hidden="true">
                          <ellipse cx="30" cy="10" rx="9" ry="9" fill="currentColor" opacity="0.6"/>
                          <rect x="18" y="20" width="24" height="32" rx="4" fill="currentColor" opacity="0.6"/>
                          <rect x="8"  y="21" width="10" height="26" rx="4" fill="currentColor" opacity="0.5"/>
                          <rect x="42" y="21" width="10" height="26" rx="4" fill="currentColor" opacity="0.5"/>
                          <rect x="18" y="52" width="10" height="32" rx="4" fill="currentColor" opacity="0.6"/>
                          <rect x="32" y="52" width="10" height="32" rx="4" fill="currentColor" opacity="0.6"/>
                        </svg>
                      )}
                      {model.locked && (
                        <span className={styles.lockBadge} aria-label="Locked">
                          <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12" aria-hidden="true">
                            <path d="M11 7V5a3 3 0 0 0-6 0v2H4v7h8V7h-1ZM7 5a1 1 0 0 1 2 0v2H7V5Z"/>
                          </svg>
                        </span>
                      )}
                    </div>
                    <span className={styles.modelLabel}>{model.label}</span>
                  </button>
                ))}
              </div>

              <p className={styles.sectionLabel} style={{ marginTop: '28px' }}>Skin Tone</p>
              <div className={styles.skinToneGrid}>
                {SKIN_TONES.map((tone) => (
                  <button
                    key={tone.id}
                    className={`${styles.skinToneItem} ${tone.id === activeSkinToneId ? styles.skinToneItemActive : ''}`}
                    onClick={() => onSkinToneChange(tone)}
                    aria-pressed={tone.id === activeSkinToneId}
                  >
                    <div className={styles.skinToneSwatch}>
                      {tone.color ? (
                        <span className={styles.skinToneCircle} style={{ background: tone.color }} />
                      ) : (
                        <span className={styles.skinToneNone}>
                          <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
                            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
                            <line x1="8" y1="8" x2="32" y2="32" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </span>
                      )}
                    </div>
                    <span className={styles.skinToneLabel}>{tone.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Tattoo controls (bottom of panel) ── */}
        {hasTattoo && (
          <div className={styles.tattooControls}>
            <div className={styles.tattooControlsHeader}>
              <p className={styles.tattooControlsLabel}>Adjust Tattoo</p>
              {placedHotspotIds.length > 1 && (
                <button className={styles.removeAllBtn} onClick={onRemoveAll}>
                  Remove All
                </button>
              )}
            </div>
            <div className={styles.tattooControlRow}>
              <span className={styles.tattooControlLabel}>Size</span>
              <input
                type="range" min={0.4} max={2.5} step={0.05}
                value={tattooScale}
                onChange={(e) => onTattooScale(parseFloat(e.target.value))}
                className={styles.scaleSlider}
                aria-label="Tattoo size"
              />
              <span className={styles.scaleValue}>{scalePercent}%</span>
            </div>
            <div className={styles.tattooControlRow}>
              <span className={styles.tattooControlLabel}>Rotate</span>
              <input
                type="range" min={-180} max={180} step={1}
                value={tattooRotation}
                onChange={(e) => onTattooRotation(parseInt(e.target.value, 10))}
                className={styles.scaleSlider}
                aria-label="Tattoo rotation"
              />
              <span className={styles.scaleValue}>{tattooRotation}°</span>
            </div>
            <div className={styles.mirrorRow}>
              <button
                className={`${styles.mirrorBtn} ${tattooMirrorX ? styles.mirrorBtnActive : ''}`}
                onClick={() => onMirrorX(!tattooMirrorX)}
                aria-pressed={tattooMirrorX}
              >
                Flip H
              </button>
              <button
                className={`${styles.mirrorBtn} ${tattooMirrorY ? styles.mirrorBtnActive : ''}`}
                onClick={() => onMirrorY(!tattooMirrorY)}
                aria-pressed={tattooMirrorY}
              >
                Flip V
              </button>
            </div>

            {approxSizeCm !== null && (
              <div className={styles.sizeDisplay}>
                <span className={styles.sizeDisplayLabel}>Approx. size</span>
                <span className={styles.sizeDisplayValue}>~{approxSizeCm} cm</span>
              </div>
            )}

            <textarea
              className={styles.notesTextarea}
              placeholder="Notes for your artist — style, size, references…"
              value={placementNotes}
              onChange={(e) => onNotesChange(e.target.value)}
              rows={2}
              aria-label="Notes for artist"
            />

            <div className={styles.panelActionRow}>
              <button className={styles.panelSaveBtn} onClick={onSavePlacement}>
                Save Image
              </button>
              <button className={styles.panelSendBtn} onClick={onSendToStudio}>
                Send to Studio
              </button>
            </div>

            <button className={styles.tattooRemoveBtn} onClick={onTattooRemove}>
              Remove Selected
            </button>
          </div>
        )}
      </aside>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
}
