export default function Footer() {
  return (
    <footer className="relative z-10 py-8 mt-10 border-t border-[#8B6F47]/10 bg-[#FDFCF8]">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* LEFT: Branding */}
        <div className="text-center md:text-left">
          <h2 className="font-serif italic text-lg leading-none text-[#2B2A28]">BookNest</h2>
          <p className="text-[8px] uppercase tracking-[0.3em] text-[#8B6F47] mt-1">
            Est. 2025
          </p>
        </div>

        {/* CENTER: Copyright/Note (Hidden on mobile or kept very small) */}
        <div className="hidden lg:block text-center">
          <p className="text-[9px] text-[#A0A0A0] font-serif italic tracking-wide">
            Curated with patience and ink. © {new Date().getFullYear()}
          </p>
        </div>

        {/* RIGHT: Links */}
        <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-medium text-[#6B6B6B]">
          <span className="cursor-pointer hover:text-[#2B2A28] transition-colors">Terms</span>
          <span className="cursor-pointer hover:text-[#2B2A28] transition-colors">Privacy</span>
          <span className="h-3 w-px bg-[#8B6F47]/20" /> {/* Vertical Divider */}
          <span className="cursor-pointer hover:text-[#2B2A28] transition-colors">Contact</span>
        </div>

      </div>
    </footer>
  );
}