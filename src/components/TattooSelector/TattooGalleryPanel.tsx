'use client';

import React, { useRef } from 'react';
import styles from './TattooSelector.module.css';

export interface SessionTattoo {
  id: string;
  dataUrl: string;
}

interface TattooGalleryPanelProps {
  isOpen: boolean;
  tattoos: SessionTattoo[];
  activeTattooId: string | null;
  onSelect: (tattoo: SessionTattoo) => void;
  onUpload: (dataUrl: string) => void;
  onClose: () => void;
}

export function TattooGalleryPanel({
  isOpen,
  tattoos,
  activeTattooId,
  onSelect,
  onUpload,
  onClose,
}: TattooGalleryPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className={`${styles.bottomSheet} ${isOpen ? styles.bottomSheetVisible : ''}`}>
      <div className={styles.bottomSheetHandle} onClick={onClose} />

      <div className={styles.bottomSheetHeader}>
        <span className={styles.bottomSheetTitle}>Your Designs</span>
        <button className={styles.bottomSheetClose} onClick={onClose} aria-label="Close">✕</button>
      </div>

      <div className={styles.galleryGrid}>
        {/* Upload button — always first */}
        <button
          className={styles.galleryUploadBtn}
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload tattoo design"
        >
          <span className={styles.galleryUploadIcon}>+</span>
          <span className={styles.galleryUploadLabel}>Upload</span>
        </button>

        {/* Session tattoos */}
        {tattoos.map((tattoo) => (
          <button
            key={tattoo.id}
            className={`${styles.galleryItem} ${tattoo.id === activeTattooId ? styles.galleryItemActive : ''}`}
            onClick={() => onSelect(tattoo)}
            aria-pressed={tattoo.id === activeTattooId}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tattoo.dataUrl} alt="Tattoo design" className={styles.galleryThumb} />
          </button>
        ))}
      </div>

      {tattoos.length === 0 && (
        <p className={styles.galleryEmpty}>
          Upload a design to preview it on the body
        </p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}
