'use client';

import React, { useState, useEffect } from 'react';
import styles from './TattooSelector.module.css';

interface PlacedSummaryItem {
  hotspotLabel: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  capturedImage: string | null;
  placedSummary: PlacedSummaryItem[];
  notes: string;
  onNotesChange: (v: string) => void;
}

export function BookingModal({
  isOpen, onClose, capturedImage, placedSummary, notes, onNotesChange,
}: BookingModalProps) {
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sent,  setSent]  = useState(false);

  // Reset form when modal re-opens
  useEffect(() => {
    if (isOpen) { setName(''); setEmail(''); setPhone(''); setSent(false); }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!capturedImage) return;
    const a = document.createElement('a');
    a.href = capturedImage;
    a.download = `tooth-and-nail-placement-${new Date().toISOString().slice(0, 10)}.png`;
    a.click();
  };

  const placementLines = placedSummary.map(p => `  • ${p.hotspotLabel}`).join('\n');
  const emailBody = [
    `Hi Tooth & Nail Team,`,
    ``,
    `I'd like to book a consultation for the following tattoo placements:`,
    ``,
    placementLines || `  • (see attached image)`,
    ``,
    notes ? `Notes: ${notes}` : null,
    ``,
    `My details:`,
    `  Name:  ${name}`,
    `  Email: ${email}`,
    phone ? `  Phone: ${phone}` : null,
    ``,
    `I've attached my placement preview from the Tooth & Nail visualiser.`,
    ``,
    `Looking forward to hearing from you.`,
  ].filter(l => l !== null).join('\n');

  const handleSendEmail = () => {
    handleDownload();
    setSent(true);
    setTimeout(() => {
      const subject = encodeURIComponent('Tattoo Consultation — Placement Attached');
      const body    = encodeURIComponent(emailBody);
      window.location.href = `mailto:bookings@toothandnailco.com?subject=${subject}&body=${body}`;
    }, 600);
  };

  const canSubmit = name.trim().length > 0 && email.includes('@');

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Send placement to studio">
      <div className={styles.modalPanel} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.modalHeader}>
          <span className={styles.modalEyebrow}>Tooth &amp; Nail</span>
          <h2 className={styles.modalTitle}>Send to Studio</h2>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Preview */}
        {capturedImage && (
          <div className={styles.modalPreviewWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={capturedImage} alt="Your tattoo placement" className={styles.modalPreviewImg} />
            <button className={styles.modalDownloadBtn} onClick={handleDownload}>
              ↓ Save Image
            </button>
          </div>
        )}

        {/* Placement chips */}
        {placedSummary.length > 0 && (
          <div className={styles.modalChips}>
            {placedSummary.map((p, i) => (
              <span key={i} className={styles.modalChip}>{p.hotspotLabel}</span>
            ))}
          </div>
        )}

        {/* Form */}
        <div className={styles.modalForm}>
          {!sent ? (
            <>
              <p className={styles.modalHint}>
                Fill in your details and we&apos;ll open an email draft. Download and attach the placement image above before sending.
              </p>

              <input
                className={styles.modalInput}
                type="text"
                placeholder="Your name *"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
              <input
                className={styles.modalInput}
                type="email"
                placeholder="Email address *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
              <input
                className={styles.modalInput}
                type="tel"
                placeholder="Phone (optional)"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                autoComplete="tel"
              />
              <textarea
                className={styles.modalTextarea}
                placeholder="Notes for your artist — size preference, style, reference ideas…"
                value={notes}
                onChange={e => onNotesChange(e.target.value)}
                rows={3}
              />

              <button
                className={styles.modalSubmitBtn}
                onClick={handleSendEmail}
                disabled={!canSubmit}
              >
                Open Email Draft →
              </button>
            </>
          ) : (
            <div className={styles.modalSuccess}>
              <p className={styles.modalSuccessTitle}>Image downloaded.</p>
              <p className={styles.modalSuccessBody}>
                Your email draft is opening — attach the saved image before sending.
              </p>
              <button className={styles.modalCloseBtn} onClick={onClose}>Done</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
