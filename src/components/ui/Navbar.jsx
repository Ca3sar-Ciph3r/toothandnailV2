'use client';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 pointer-events-none">
      <div className="flex items-center justify-between px-6 md:px-12 py-6 pointer-events-auto">
        
        {/* Logo */}
        <a href="#hero" className="text-lg font-black tracking-tighter uppercase hover:text-red-500 transition-colors">
          T&amp;N
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#ethos" className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase hover:text-white transition-colors">Ethos</a>
          <a href="#matrix" className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase hover:text-white transition-colors">Matrix</a>
          <a href="#roster" className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase hover:text-white transition-colors">Artists</a>
          <a href="#footer" className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase hover:text-white transition-colors">Contact</a>
        </div>

        {/* CTA */}
        <a 
          href="#matrix"
          className="text-[10px] font-mono text-zinc-950 bg-white tracking-[0.2em] uppercase px-5 py-2.5 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          Book Now
        </a>
      </div>
    </nav>
  );
}
