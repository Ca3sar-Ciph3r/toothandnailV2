'use client';

import { useState, useEffect, useRef } from 'react';
import { uploadReferenceImage } from '@/lib/supabase/client';

export default function PricingFunnel() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState('None');
  
  // Form State
  const [volume, setVolume] = useState(10);
  const [style, setStyle] = useState('American Traditional');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  
  // AI Response State
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const fileInputRef = useRef(null);
  
  // Micro-Acoustic Engineering: Tactile low-frequency mechanical sound
  const playMechanicalThud = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(60, audioCtx.currentTime); // Low freq punch
      oscillator.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 0.15);
      
      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      // Ignore if browser blocks auto-play audio
    }
  };

  useEffect(() => {
    const handleOpen = (e) => {
      setSelectedZone(e.detail.zone);
      setIsOpen(true);
      setAnalysis(null);
      playMechanicalThud();
    };
    window.addEventListener('OPEN_FUNNEL', handleOpen);
    return () => window.removeEventListener('OPEN_FUNNEL', handleOpen);
  }, []);

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles([...files, ...Array.from(e.dataTransfer.files)]);
      playMechanicalThud();
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles([...files, ...Array.from(e.target.files)]);
      playMechanicalThud();
    }
  };

  const submitInquiry = async () => {
    playMechanicalThud();
    setIsAnalyzing(true);
    setIsUploading(true);
    
    // 1. Upload files to Supabase
    const uploadedUrls = [];
    for (const file of files) {
      const url = await uploadReferenceImage(file);
      if (url) uploadedUrls.push(url);
    }
    setIsUploading(false);

    // 2. Ping Intelligent Router
    const payload = {
      placement: selectedZone,
      dimensions: volume,
      styleComplexity: style,
      description: description || `Tattoo on ${selectedZone}`,
      referenceUrls: uploadedUrls
    };

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setAnalysis(data.result);
        playMechanicalThud(); // Success sound
      }
    } catch (error) {
      console.error("Analysis Failed", error);
    }
    setIsAnalyzing(false);
  };

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-black/60 backdrop-blur-3xl border-l border-white/10 p-8 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-auto flex flex-col z-50 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex justify-between items-center mb-10 shrink-0">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-50">
          Quotation Engine
        </h2>
        <button 
          onClick={() => { setIsOpen(false); playMechanicalThud(); }}
          className="text-zinc-500 hover:text-white transition-colors p-2 text-xl"
        >
          ✕
        </button>
      </div>

      {analysis ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 my-auto">
          <div className="mb-6 p-8 bg-red-900/20 rounded-2xl border border-red-500/30 text-center">
            <h3 className="text-red-500 font-mono text-sm tracking-widest uppercase mb-4">Analysis Complete</h3>
            <div className="text-5xl font-black text-white mb-2">${analysis.estimatedPriceRange[0]} - ${analysis.estimatedPriceRange[1]}</div>
            <div className="text-zinc-400 font-mono text-xs uppercase">Estimated Range</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-xs font-mono text-zinc-500 uppercase mb-1">AI Tier</div>
              <div className="text-lg font-bold text-white capitalize">{analysis.tier} Model</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-xs font-mono text-zinc-500 uppercase mb-1">Difficulty</div>
              <div className="text-lg font-bold text-white capitalize">{analysis.difficulty}</div>
            </div>
          </div>

          <div className="mb-8 p-6 bg-zinc-900 rounded-xl border border-zinc-700">
            <div className="text-xs font-mono text-zinc-500 uppercase mb-2">Artist Allocation Match</div>
            <div className="text-xl font-bold text-white">{analysis.recommendedArtist}</div>
          </div>
          
          <button 
            onClick={() => { setAnalysis(null); playMechanicalThud(); }} 
            className="w-full bg-white/10 text-white font-black uppercase py-4 rounded-xl tracking-widest hover:bg-white/20 transition-all"
          >
            New Inquiry
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/10 shrink-0">
            <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-2">Target Coordinates</label>
            <div className="text-xl font-black text-red-500 uppercase tracking-wider drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">{selectedZone}</div>
          </div>

          <div className="mb-6 shrink-0">
            <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4 flex justify-between">
              <span>Spatial Volume</span>
              <span className="text-white">{volume} cm²</span>
            </label>
            <input 
              type="range" min="1" max="500" value={volume} onChange={(e) => { setVolume(e.target.value); if(volume % 10 === 0) playMechanicalThud(); }}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500" 
            />
          </div>

          <div className="mb-6 shrink-0">
            <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4 block">Aesthetic Protocol</label>
            <select 
              value={style} onChange={(e) => { setStyle(e.target.value); playMechanicalThud(); }}
              className="w-full bg-black/50 border border-white/10 p-4 rounded-xl font-mono text-zinc-200 outline-none focus:border-red-500 transition-colors appearance-none cursor-pointer"
            >
              <option>American Traditional</option>
              <option>Hyper-Realism</option>
              <option>Neo-Japanese</option>
              <option>Fine Line Blackwork</option>
            </select>
          </div>
          
          <div className="mb-6 shrink-0">
            <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4 block">Concept Directives</label>
            <textarea 
              value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your vision..."
              className="w-full bg-black/50 border border-white/10 p-4 rounded-xl font-mono text-sm text-zinc-200 outline-none focus:border-red-500 min-h-[100px] resize-none"
            />
          </div>

          <div className="mb-8 shrink-0">
            <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4 block">Reference Databank ({files.length} loaded)</label>
            <div 
              onDragOver={(e) => e.preventDefault()} 
              onDrop={handleFileDrop}
              onClick={() => { fileInputRef.current?.click(); playMechanicalThud(); }}
              className="border-2 border-dashed border-white/10 bg-black/30 flex flex-col items-center justify-center h-32 rounded-2xl cursor-pointer hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 group"
            >
              <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
              <svg className="w-8 h-8 text-zinc-600 mb-2 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <span className="font-mono text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">Drop high-res references</span>
            </div>
          </div>

          <button 
            onClick={submitInquiry}
            disabled={isAnalyzing}
            className="w-full mt-auto bg-red-600 text-white font-black uppercase py-5 rounded-2xl tracking-[0.2em] hover:bg-red-500 disabled:bg-zinc-800 disabled:shadow-none transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] active:scale-[0.98] shrink-0"
          >
            {isUploading ? "UPLOADING ASSETS..." : isAnalyzing ? "PROCESSING AI MATRIX..." : "Initialize Sequence"}
          </button>
        </>
      )}
    </div>
  );
}
