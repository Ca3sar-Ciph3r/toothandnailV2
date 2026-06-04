'use client';

import { useState } from 'react';
import styles from './TattooSelector.module.css';

export interface SkinToneOption {
  id: string;
  label: string;
  color: string | null; // null = default/none
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

interface BodyModel {
  id: string;
  label: string;
  locked: boolean;
  section: string;
}

const BODY_MODELS: BodyModel[] = [
  { id: 'female-full', label: 'Female Full Body', locked: false, section: 'BASIC MALE / FEMALE' },
  { id: 'male-full',   label: 'Male Full Body',   locked: false, section: 'BASIC MALE / FEMALE' },
];

interface EditModelPanelProps {
  isOpen: boolean;
  activeSkinToneId: string;
  activeModelId: string;
  onSkinToneChange: (tone: SkinToneOption) => void;
  onModelChange: (modelId: string) => void;
  onClose: () => void;
}

export function EditModelPanel({
  isOpen,
  activeSkinToneId,
  activeModelId,
  onSkinToneChange,
  onModelChange,
  onClose,
}: EditModelPanelProps) {
  const [activeTab, setActiveTab] = useState<'bodyPart' | 'skinTone'>('bodyPart');

  const sections = [...new Set(BODY_MODELS.map((m) => m.section))];

  return (
    <div className={`${styles.editPanel} ${isOpen ? styles.editPanelVisible : ''}`}>
      {/* Header */}
      <div className={styles.editPanelHeader}>
        <button className={styles.editPanelBack} onClick={onClose} aria-label="Close">
          ←
        </button>
        <span className={styles.editPanelTitle}>Edit Model</span>
      </div>

      {/* Tabs */}
      <div className={styles.editPanelTabs}>
        <button
          className={`${styles.editPanelTab} ${activeTab === 'bodyPart' ? styles.editPanelTabActive : ''}`}
          onClick={() => setActiveTab('bodyPart')}
        >
          Body Part
        </button>
        <button
          className={`${styles.editPanelTab} ${activeTab === 'skinTone' ? styles.editPanelTabActive : ''}`}
          onClick={() => setActiveTab('skinTone')}
        >
          Skin Tone
        </button>
      </div>

      <div className={styles.editPanelContent}>
        {/* ── Body Part tab ── */}
        {activeTab === 'bodyPart' && (
          <>
            {sections.map((section) => (
              <div key={section}>
                <p className={styles.editSectionLabel}>{section}</p>
                <div className={styles.modelGrid}>
                  {BODY_MODELS.filter((m) => m.section === section).map((model) => (
                    <button
                      key={model.id}
                      className={`${styles.modelItem} ${!model.locked && model.id === activeModelId ? styles.modelItemActive : ''} ${model.locked ? styles.modelItemLocked : ''}`}
                      onClick={() => !model.locked && onModelChange(model.id)}
                      disabled={model.locked}
                      aria-pressed={model.id === activeModelId}
                    >
                      <div className={styles.modelThumbWrap}>
                        {/* Silhouette placeholder */}
                        <svg viewBox="0 0 60 100" className={styles.modelSvg} aria-hidden="true">
                          <ellipse cx="30" cy="10" rx="9" ry="9" fill="currentColor" opacity="0.6"/>
                          <rect x="18" y="20" width="24" height="32" rx="4" fill="currentColor" opacity="0.6"/>
                          <rect x="8"  y="21" width="10" height="26" rx="4" fill="currentColor" opacity="0.5"/>
                          <rect x="42" y="21" width="10" height="26" rx="4" fill="currentColor" opacity="0.5"/>
                          <rect x="18" y="52" width="10" height="32" rx="4" fill="currentColor" opacity="0.6"/>
                          <rect x="32" y="52" width="10" height="32" rx="4" fill="currentColor" opacity="0.6"/>
                        </svg>
                        {model.locked && <span className={styles.lockBadge}>🔒</span>}
                      </div>
                      <span className={styles.modelLabel}>{model.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── Skin Tone tab ── */}
        {activeTab === 'skinTone' && (
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
                    <span
                      className={styles.skinToneCircle}
                      style={{ background: tone.color }}
                    />
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
        )}
      </div>
    </div>
  );
}
