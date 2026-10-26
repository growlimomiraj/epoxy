import React from 'react';
import { Product } from '../data/catalog';

export const BrandLogoDrop: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="edcGoldGrad" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id="edcSlateGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="44" height="44" rx="10" fill="url(#edcSlateGrad)" stroke="#F59E0B" strokeWidth="1.5" />
    <path
      d="M24 8L35 23.5C37.8 27.4 36.9 33.2 32.8 36.4C30.3 38.4 27.2 39.5 24 39.5C20.8 39.5 17.7 38.4 15.2 36.4C11.1 33.2 10.2 27.4 13 23.5L24 8Z"
      fill="url(#edcGoldGrad)"
    />
    <path
      d="M24 13L17.5 23.5C16.2 25.6 16.6 28.4 18.5 30.1"
      stroke="#FEF3C7"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <polygon points="24,25 30,28.5 24,32 18,28.5" fill="#0F172A" fillOpacity="0.35" />
  </svg>
);

export const ProductPackagingSvg: React.FC<{
  type: Product['illustrationType'];
  accentHex?: string;
  sku: string;
}> = ({ type, accentHex = '#F59E0B', sku }) => {
  switch (type) {
    case 'epoxy-kit':
      return (
        <svg viewBox="0 0 280 210" className="w-full h-full" role="img" aria-label={`${sku} 3-Gallon A+B Epoxy Kit`}>
          <defs>
            <linearGradient id="pailBody" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="darkPail" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="55%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          {/* Floor shadow */}
          <ellipse cx="140" cy="188" rx="98" ry="11" fill="#0F172A" fillOpacity="0.09" />
          {/* 2-Gal Part A Pail (Left) */}
          <path d="M54 56 H148 L141 174 C141 178 136 181 130 181 H72 C66 181 61 178 61 174 Z" fill="url(#darkPail)" stroke="#475569" strokeWidth="1.5" />
          <rect x="49" y="46" width="104" height="12" rx="3" fill="#F59E0B" />
          <rect x="64" y="80" width="74" height="66" rx="4" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.2" />
          <text x="101" y="99" textAnchor="middle" fill="#F59E0B" fontSize="9" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">EPOXY DEPOT CA</text>
          <text x="101" y="114" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="JetBrains Mono, monospace">E4E-100</text>
          <text x="101" y="127" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono, monospace">PART A · 2 GAL RESIN</text>
          <rect x="75" y="133" width="52" height="6" rx="3" fill={accentHex} />
          {/* 1-Gal Part B Jug (Right Foreground) */}
          <path d="M158 84 H222 L218 178 C218 181 214 184 209 184 H171 C166 184 162 181 162 178 Z" fill="url(#pailBody)" stroke="#94A3B8" strokeWidth="1.5" />
          <rect x="178" y="70" width="24" height="14" rx="2" fill="#0F172A" />
          <rect x="166" y="104" width="48" height="54" rx="3" fill="#0F172A" />
          <text x="190" y="122" textAnchor="middle" fill="#F59E0B" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace">PART B</text>
          <text x="190" y="135" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="Plus Jakarta Sans, sans-serif">HARDENER</text>
          <text x="190" y="148" textAnchor="middle" fill="#10B981" fontSize="7.5" fontFamily="JetBrains Mono, monospace">100% SOLIDS</text>
        </svg>
      );

    case 'polyaspartic-kit':
      return (
        <svg viewBox="0 0 280 210" className="w-full h-full" role="img" aria-label={`${sku} Polyaspartic 85% Fast-Cure Kit`}>
          <ellipse cx="140" cy="188" rx="95" ry="11" fill="#0F172A" fillOpacity="0.09" />
          {/* Left 1-Gal Metal F-Style Can */}
          <rect x="58" y="62" width="76" height="118" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
          <rect x="78" y="48" width="22" height="14" rx="3" fill="#F59E0B" />
          <path d="M106 54 H124 V62" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <rect x="66" y="82" width="60" height="76" rx="3" fill="#1E293B" stroke="#F59E0B" strokeWidth="1" />
          <text x="96" y="100" textAnchor="middle" fill="#F59E0B" fontSize="8.5" fontWeight="800">POLY-85 UV</text>
          <text x="96" y="116" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800" fontFamily="JetBrains Mono, monospace">PART A</text>
          <text x="96" y="131" textAnchor="middle" fill="#38BDF8" fontSize="8" fontFamily="JetBrains Mono, monospace">ALIPHATIC</text>
          <text x="96" y="146" textAnchor="middle" fill="#94A3B8" fontSize="7.5">1 GALLON</text>
          {/* Right 1-Gal Metal F-Style Can */}
          <rect x="146" y="62" width="76" height="118" rx="6" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
          <rect x="166" y="48" width="22" height="14" rx="3" fill="#0F172A" />
          <path d="M194 54 H212 V62" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
          <rect x="154" y="82" width="60" height="76" rx="3" fill="#0F172A" />
          <text x="184" y="100" textAnchor="middle" fill="#10B981" fontSize="8.5" fontWeight="800">FAST-CURE</text>
          <text x="184" y="116" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800" fontFamily="JetBrains Mono, monospace">PART B</text>
          <text x="184" y="131" textAnchor="middle" fill="#F59E0B" fontSize="8" fontFamily="JetBrains Mono, monospace">ISO HARDENER</text>
          <text x="184" y="146" textAnchor="middle" fill="#94A3B8" fontSize="7.5">1 GALLON</text>
        </svg>
      );

    case 'garage-box':
      return (
        <svg viewBox="0 0 280 210" className="w-full h-full" role="img" aria-label={`${sku} Complete 2-Car Garage Floor Kit`}>
          <ellipse cx="140" cy="188" rx="108" ry="12" fill="#0F172A" fillOpacity="0.1" />
          {/* Master Carton Box */}
          <rect x="38" y="44" width="136" height="134" rx="6" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.8" />
          <path d="M38 66 H174" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="4 3" />
          <text x="106" y="60" textAnchor="middle" fill="#F59E0B" fontSize="8.5" fontWeight="800" fontFamily="JetBrains Mono, monospace">COMPLETE 550 SQ.FT. SYSTEM</text>
          <text x="106" y="88" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800">2-CAR GARAGE</text>
          <text x="106" y="105" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="700">FLAKE FLOOR KIT</text>
          <rect x="56" y="116" width="100" height="44" rx="4" fill={accentHex} stroke="#FFFFFF" strokeWidth="1" />
          {/* Simulated flake pattern in swatch window */}
          <circle cx="72" cy="130" r="4" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="92" cy="142" r="5" fill="#0F172A" fillOpacity="0.75" />
          <circle cx="118" cy="128" r="4.5" fill="#CBD5E1" fillOpacity="0.9" />
          <circle cx="136" cy="146" r="3.5" fill="#0F172A" fillOpacity="0.8" />
          <text x="106" y="142" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="JetBrains Mono, monospace">40 LBS 1/4" FLAKE</text>
          {/* Foreground Pail + Roller */}
          <path d="M162 92 H236 L230 182 H168 Z" fill="#F8FAFC" stroke="#475569" strokeWidth="1.5" />
          <rect x="159" y="84" width="80" height="9" rx="2" fill="#F59E0B" />
          <rect x="172" y="112" width="54" height="48" rx="3" fill="#0F172A" />
          <text x="199" y="132" textAnchor="middle" fill="#F59E0B" fontSize="8.5" fontWeight="800">BASE + TOP</text>
          <text x="199" y="146" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="JetBrains Mono, monospace">INCLUDED</text>
        </svg>
      );

    case 'urethane-pail':
      return (
        <svg viewBox="0 0 280 210" className="w-full h-full" role="img" aria-label={`${sku} High-Wear Aliphatic Urethane`}>
          <ellipse cx="140" cy="188" rx="90" ry="11" fill="#0F172A" fillOpacity="0.09" />
          <path d="M68 50 H164 L156 178 H76 Z" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
          <rect x="64" y="40" width="104" height="11" rx="3" fill="#38BDF8" />
          <rect x="80" y="72" width="72" height="78" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />
          <text x="116" y="92" textAnchor="middle" fill="#38BDF8" fontSize="8.5" fontWeight="800" fontFamily="JetBrains Mono, monospace">ALIPHATIC</text>
          <text x="116" y="109" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800">URETHANE</text>
          <text x="116" y="124" textAnchor="middle" fill="#F59E0B" fontSize="8.5" fontWeight="700">HIGH-WEAR ARMOR</text>
          <text x="116" y="139" textAnchor="middle" fill="#94A3B8" fontSize="7.5" fontFamily="JetBrains Mono, monospace">SCRATCH & ACID PROOF</text>
          {/* Hardener Can */}
          <rect x="172" y="94" width="52" height="84" rx="5" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.5" />
          <rect x="186" y="83" width="24" height="11" rx="2" fill="#0F172A" />
          <rect x="178" y="114" width="40" height="44" rx="3" fill="#0F172A" />
          <text x="198" y="134" textAnchor="middle" fill="#38BDF8" fontSize="8" fontWeight="800">PART B</text>
          <text x="198" y="147" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontFamily="JetBrains Mono, monospace">CATALYST</text>
        </svg>
      );

    case 'metallic-jar':
      return (
        <svg viewBox="0 0 280 210" className="w-full h-full" role="img" aria-label={`${sku} Metallic Epoxy Reflective Pigment`}>
          <defs>
            <radialGradient id="metallicSwirl" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="45%" stopColor={accentHex} />
              <stop offset="100%" stopColor="#0F172A" />
            </radialGradient>
          </defs>
          <ellipse cx="140" cy="186" rx="88" ry="11" fill="#0F172A" fillOpacity="0.1" />
          {/* Swirl sample disc behind jar */}
          <circle cx="176" cy="112" r="54" fill="url(#metallicSwirl)" stroke="#F59E0B" strokeWidth="2" />
          <path d="M142 95 Q175 75 208 108 T165 145" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Heavy-Load 32oz Jar */}
          <rect x="64" y="64" width="88" height="116" rx="12" fill="#0F172A" stroke="#475569" strokeWidth="1.8" />
          <rect x="70" y="46" width="76" height="18" rx="4" fill="#F59E0B" />
          <rect x="72" y="84" width="72" height="76" rx="6" fill="url(#metallicSwirl)" stroke="#F59E0B" strokeWidth="1.2" />
          <rect x="78" y="96" width="60" height="48" rx="4" fill="#0F172A" fillOpacity="0.88" />
          <text x="108" y="112" textAnchor="middle" fill="#F59E0B" fontSize="8" fontWeight="800" fontFamily="JetBrains Mono, monospace">3D PEARLESCENT</text>
          <text x="108" y="126" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">METALLIC</text>
          <text x="108" y="138" textAnchor="middle" fill="#CBD5E1" fontSize="7.5" fontFamily="JetBrains Mono, monospace">32 OZ · 3-GAL LOAD</text>
        </svg>
      );

    case 'deep-pour':
      return (
        <svg viewBox="0 0 280 210" className="w-full h-full" role="img" aria-label={`${sku} Deep-Pour Clear Resin`}>
          <ellipse cx="140" cy="188" rx="92" ry="10" fill="#0F172A" fillOpacity="0.09" />
          {/* Part A 2-Gal Clear Jug */}
          <rect x="56" y="52" width="82" height="128" rx="10" fill="#F0F9FF" stroke="#38BDF8" strokeWidth="1.8" />
          <rect x="82" y="38" width="30" height="14" rx="3" fill="#0F172A" />
          <path d="M58 95 Q97 88 136 95 L136 172 C136 176 132 178 128 178 H64 C60 178 58 176 58 172 Z" fill="#BAE6FD" fillOpacity="0.45" />
          <rect x="66" y="82" width="62" height="72" rx="4" fill="#0F172A" />
          <text x="97" y="100" textAnchor="middle" fill="#38BDF8" fontSize="8" fontWeight="800" fontFamily="JetBrains Mono, monospace">OPTICAL GLASS</text>
          <text x="97" y="116" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">DEEP POUR</text>
          <text x="97" y="130" textAnchor="middle" fill="#F59E0B" fontSize="8" fontWeight="700">2" RIVER & BAR TOP</text>
          <text x="97" y="144" textAnchor="middle" fill="#94A3B8" fontSize="7.5" fontFamily="JetBrains Mono, monospace">PART A · 2 GAL</text>
          {/* Part B 1-Gal Clear Jug */}
          <rect x="152" y="72" width="68" height="108" rx="8" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.6" />
          <rect x="174" y="58" width="24" height="14" rx="3" fill="#F59E0B" />
          <rect x="160" y="98" width="52" height="60" rx="4" fill="#0F172A" />
          <text x="186" y="118" textAnchor="middle" fill="#F59E0B" fontSize="8.5" fontWeight="800">PART B</text>
          <text x="186" y="132" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="JetBrains Mono, monospace">UV STABILIZED</text>
          <text x="186" y="146" textAnchor="middle" fill="#38BDF8" fontSize="7.5" fontFamily="JetBrains Mono, monospace">ZERO BUBBLE</text>
        </svg>
      );

    case 'flake-box':
      return (
        <svg viewBox="0 0 280 210" className="w-full h-full" role="img" aria-label={`${sku} 40-lb Bulk Decorative Vinyl Flake Box`}>
          <ellipse cx="140" cy="188" rx="95" ry="11" fill="#0F172A" fillOpacity="0.1" />
          {/* 3D Isometric Heavy Corrugated Carton */}
          <rect x="64" y="42" width="152" height="138" rx="6" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
          <rect x="64" y="42" width="152" height="24" rx="4" fill="#F59E0B" />
          <text x="140" y="58" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="800" fontFamily="JetBrains Mono, monospace">40-LB CONTRACTOR BULK BOX</text>
          <text x="140" y="84" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800">ARCHITECTURAL</text>
          <text x="140" y="101" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="800">VINYL FLAKE CHIPS</text>
          {/* Die-Cut Viewing Window Showing Flake Texture */}
          <rect x="84" y="112" width="112" height="52" rx="6" fill={accentHex} stroke="#FFFFFF" strokeWidth="1.5" />
          <polygon points="96,124 106,120 109,130 98,132" fill="#FFFFFF" fillOpacity="0.9" />
          <polygon points="122,126 134,122 130,136 118,134" fill="#0F172A" fillOpacity="0.85" />
          <polygon points="154,120 166,126 160,136 148,132" fill="#E2E8F0" fillOpacity="0.9" />
          <polygon points="108,144 120,140 124,152 110,154" fill="#1E293B" fillOpacity="0.9" />
          <polygon points="142,144 156,140 158,154 144,156" fill="#FFFFFF" fillOpacity="0.85" />
          <polygon points="172,138 184,142 180,154 168,150" fill="#0F172A" fillOpacity="0.8" />
        </svg>
      );

    case 'mvb-primer':
      return (
        <svg viewBox="0 0 280 210" className="w-full h-full" role="img" aria-label={`${sku} Moisture Vapor Barrier Epoxy Primer`}>
          <ellipse cx="140" cy="188" rx="94" ry="11" fill="#0F172A" fillOpacity="0.09" />
          <path d="M58 54 H154 L146 178 H66 Z" fill="#0F172A" stroke="#10B981" strokeWidth="1.8" />
          <rect x="54" y="44" width="104" height="11" rx="3" fill="#10B981" />
          <rect x="70" y="74" width="72" height="80" rx="4" fill="#1E293B" stroke="#10B981" strokeWidth="1" />
          <text x="106" y="93" textAnchor="middle" fill="#10B981" fontSize="8.5" fontWeight="800" fontFamily="JetBrains Mono, monospace">20-LB MVER STOP</text>
          <text x="106" y="111" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="800">MVB PRIMER</text>
          <text x="106" y="126" textAnchor="middle" fill="#F59E0B" fontSize="8.5" fontWeight="700">VAPOR BARRIER</text>
          <text x="106" y="142" textAnchor="middle" fill="#94A3B8" fontSize="7.5" fontFamily="JetBrains Mono, monospace">ASTM F3010 SPEC</text>
          {/* Part B Hardener */}
          <path d="M164 86 H224 L218 178 H170 Z" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.5" />
          <rect x="161" y="78" width="66" height="9" rx="2" fill="#0F172A" />
          <rect x="172" y="106" width="44" height="52" rx="3" fill="#0F172A" />
          <text x="194" y="126" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="800">PART B</text>
          <text x="194" y="140" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontFamily="JetBrains Mono, monospace">DEEP SEAL</text>
        </svg>
      );

    case 'stain-pail':
      return (
        <svg viewBox="0 0 280 210" className="w-full h-full" role="img" aria-label={`${sku} 5-Gallon Concrete Sealer & Stain Pail`}>
          <ellipse cx="140" cy="188" rx="82" ry="11" fill="#0F172A" fillOpacity="0.1" />
          {/* Tall 5-Gallon Industrial Pail with Pour Spout Lid */}
          <path d="M78 46 H202 L190 180 H90 Z" fill="#0F172A" stroke="#475569" strokeWidth="1.8" />
          <rect x="72" y="34" width="136" height="13" rx="3" fill="#F59E0B" />
          <rect x="168" y="27" width="18" height="7" rx="2" fill="#0F172A" />
          {/* Wire Bail Handle */}
          <path d="M74 52 C52 88 52 115 84 126" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
          <rect x="94" y="68" width="92" height="88" rx="5" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.2" />
          <text x="140" y="88" textAnchor="middle" fill="#F59E0B" fontSize="8.5" fontWeight="800" fontFamily="JetBrains Mono, monospace">5-GALLON PRO PAIL</text>
          <text x="140" y="106" textAnchor="middle" fill="#FFFFFF" fontSize="12.5" fontWeight="800">WET-LOOK SEALER</text>
          <text x="140" y="122" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">&amp; CONCRETE STAIN</text>
          <rect x="108" y="132" width="64" height="12" rx="3" fill={accentHex} />
          <text x="140" y="141" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="800" fontFamily="JetBrains Mono, monospace">1,100 SQ.FT. PAIL</text>
        </svg>
      );

    case 'grinder-bundle':
      return (
        <svg viewBox="0 0 280 210" className="w-full h-full" role="img" aria-label={`${sku} Pro 7-Inch Concrete Grinder and Diamond Cup Wheels`}>
          <ellipse cx="140" cy="188" rx="102" ry="11" fill="#0F172A" fillOpacity="0.1" />
          {/* 7" Grinder Body + Dust Shroud */}
          <rect x="44" y="68" width="118" height="38" rx="8" fill="#F59E0B" stroke="#0F172A" strokeWidth="2" />
          <rect x="60" y="76" width="52" height="22" rx="3" fill="#0F172A" />
          <text x="86" y="90" textAnchor="middle" fill="#F59E0B" fontSize="8.5" fontWeight="800" fontFamily="JetBrains Mono, monospace">15A PRO 7"</text>
          {/* Rear Handle */}
          <path d="M162 76 H196 C202 76 206 82 206 88 C206 94 202 98 196 98 H162 Z" fill="#0F172A" />
          {/* HEPA Shroud Head */}
          <ellipse cx="78" cy="124" rx="44" ry="18" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
          <text x="78" y="127" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono, monospace">HEPA SHROUD</text>
          {/* Gold 30/40 Grit Turbo Diamond Cup Wheel */}
          <circle cx="156" cy="142" r="38" fill="#F59E0B" stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="156" cy="142" r="24" fill="#0F172A" />
          <circle cx="156" cy="142" r="10" fill="#E2E8F0" />
          {/* Diamond Segments */}
          <rect x="152" y="106" width="8" height="10" rx="1" fill="#0F172A" />
          <rect x="152" y="168" width="8" height="10" rx="1" fill="#0F172A" />
          <rect x="120" y="138" width="10" height="8" rx="1" fill="#0F172A" />
          <rect x="182" y="138" width="10" height="8" rx="1" fill="#0F172A" />
          {/* Black PCD Scraping Wheel */}
          <circle cx="216" cy="148" r="32" fill="#0F172A" stroke="#64748B" strokeWidth="2" />
          <circle cx="216" cy="148" r="12" fill="#F59E0B" />
          <text x="216" y="128" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="800" fontFamily="JetBrains Mono, monospace">PCD SCRAPER</text>
        </svg>
      );

    case 'crack-cartridge':
      return (
        <svg viewBox="0 0 280 210" className="w-full h-full" role="img" aria-label={`${sku} Fast-Set Polyurea Dual Cartridge Kit`}>
          <ellipse cx="140" cy="188" rx="90" ry="10" fill="#0F172A" fillOpacity="0.09" />
          {/* Dual Coaxial Cartridge Cylinders */}
          <rect x="68" y="54" width="46" height="122" rx="6" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
          <rect x="118" y="54" width="46" height="122" rx="6" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
          {/* Manifold Shoulder */}
          <path d="M78 54 L96 38 H136 L154 54 Z" fill="#F59E0B" />
          {/* Static Spiral Mixing Nozzle */}
          <polygon points="111,38 121,38 118,8 114,8" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.2" />
          <path d="M114 14 L118 18 L114 22 L118 26 L114 30 L118 34" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
          {/* Labels */}
          <text x="91" y="95" textAnchor="middle" fill="#F59E0B" fontSize="8" fontWeight="800" fontFamily="JetBrains Mono, monospace">ISO PART A</text>
          <text x="91" y="112" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">POLYUREA</text>
          <text x="91" y="126" textAnchor="middle" fill="#10B981" fontSize="7.5" fontFamily="JetBrains Mono, monospace">30-MIN GRIND</text>
          <text x="141" y="95" textAnchor="middle" fill="#38BDF8" fontSize="8" fontWeight="800" fontFamily="JetBrains Mono, monospace">RESIN PART B</text>
          <text x="141" y="112" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">CRACK WELD</text>
          <text x="141" y="126" textAnchor="middle" fill="#CBD5E1" fontSize="7.5" fontFamily="JetBrains Mono, monospace">600ML 1:1</text>
          {/* Extra Static Nozzles */}
          <rect x="186" y="76" width="10" height="96" rx="3" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.2" />
          <rect x="204" y="76" width="10" height="96" rx="3" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.2" />
          <text x="198" y="68" textAnchor="middle" fill="#0F172A" fontSize="8" fontWeight="800" fontFamily="JetBrains Mono, monospace">+3 NOZZLES</text>
        </svg>
      );

    case 'tool-bundle':
    default:
      return (
        <svg viewBox="0 0 280 210" className="w-full h-full" role="img" aria-label={`${sku} Pro Crew Install Tool Kit`}>
          <ellipse cx="140" cy="188" rx="102" ry="11" fill="#0F172A" fillOpacity="0.09" />
          {/* 22" Notched Squeegee / Gauge Rake */}
          <rect x="40" y="54" width="164" height="16" rx="3" fill="#F59E0B" stroke="#0F172A" strokeWidth="1.5" />
          <path d="M44 70 L48 76 L52 70 L56 76 L60 70 L64 76 L68 70 L72 76 L76 70 L80 76 L84 70 L88 76 L92 70 L96 76 L100 70 L104 76 L108 70 L112 76 L116 70 L120 76 L124 70 L128 76 L132 70 L136 76 L140 70 L144 76 L148 70 L152 76 L156 70 L160 76 L164 70 L168 76 L172 70 L176 76 L180 70 L184 76 L188 70 L192 76 L196 70" stroke="#0F172A" strokeWidth="1.5" fill="none" />
          {/* 18" Shed-Resistant Roller Cover */}
          <rect x="48" y="96" width="128" height="28" rx="14" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.8" />
          <line x1="68" y1="96" x2="84" y2="124" stroke="#F59E0B" strokeWidth="3" />
          <line x1="108" y1="96" x2="124" y2="124" stroke="#F59E0B" strokeWidth="3" />
          <line x1="148" y1="96" x2="164" y2="124" stroke="#F59E0B" strokeWidth="3" />
          {/* Porcupine Spike Roller */}
          <rect x="54" y="142" width="96" height="22" rx="6" fill="#0F172A" />
          <path d="M62 136 V170 M74 136 V170 M86 136 V170 M98 136 V170 M110 136 V170 M122 136 V170 M134 136 V170 M144 136 V170" stroke="#94A3B8" strokeWidth="2" />
          {/* Contractor Spike Shoe (Right) */}
          <path d="M184 96 C184 82 232 82 232 96 L236 164 C236 174 180 174 180 164 Z" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.8" />
          <rect x="184" y="114" width="50" height="8" rx="2" fill="#F59E0B" />
          <rect x="182" y="142" width="54" height="8" rx="2" fill="#F59E0B" />
          <circle cx="196" cy="102" r="2.5" fill="#E2E8F0" />
          <circle cx="220" cy="102" r="2.5" fill="#E2E8F0" />
          <circle cx="196" cy="130" r="2.5" fill="#E2E8F0" />
          <circle cx="220" cy="130" r="2.5" fill="#E2E8F0" />
          <circle cx="196" cy="158" r="2.5" fill="#E2E8F0" />
          <circle cx="220" cy="158" r="2.5" fill="#E2E8F0" />
        </svg>
      );
  }
};

export const FlakeTextureSvgOverlay: React.FC<{ pattern: 'domino' | 'desert' | 'granite' }> = ({ pattern }) => {
  const palettes = {
    domino: ['#0F172A', '#FFFFFF', '#475569', '#CBD5E1'],
    desert: ['#78350F', '#FEF3C7', '#B45309', '#FDE68A'],
    granite: ['#1E293B', '#E2E8F0', '#334155', '#94A3B8'],
  };
  const colors = palettes[pattern];

  // Deterministic multi-chip flake scatter
  const chips = Array.from({ length: 78 }, (_, idx) => {
    const x = (idx * 47) % 380;
    const y = (idx * 73) % 210;
    const size = pattern === 'granite' ? 5 + (idx % 5) : 9 + (idx % 9);
    const rot = (idx * 37) % 360;
    const color = colors[idx % colors.length];
    return { x, y, size, rot, color };
  });

  return (
    <svg viewBox="0 0 380 210" preserveAspectRatio="none" className="w-full h-full opacity-90">
      {chips.map((c, i) => (
        <polygon
          key={i}
          points={`${c.x},${c.y} ${c.x + c.size},${c.y + 2} ${c.x + c.size - 2},${c.y + c.size} ${c.x + 2},${c.y + c.size - 3}`}
          fill={c.color}
          transform={`rotate(${c.rot} ${c.x} ${c.y})`}
          opacity="0.92"
        />
      ))}
    </svg>
  );
};
