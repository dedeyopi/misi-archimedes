export function HeroArt() {
  return (
    <svg className="hero-art" viewBox="0 0 520 400" role="img" aria-label="Ilustrasi kapal baja mengapung di laut">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd" /><stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" /><stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" /><stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="arrow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <rect width="520" height="400" rx="24" fill="url(#sky)" />
      <circle cx="420" cy="70" r="30" fill="#fde68a" opacity=".85" />
      <g opacity=".7" fill="#fff">
        <ellipse cx="110" cy="62" rx="40" ry="18" /><ellipse cx="145" cy="56" rx="30" ry="22" />
        <ellipse cx="330" cy="42" rx="34" ry="15" />
      </g>
      <path d="M0 210 H520 V376 a24 24 0 0 1 -24 24 H24 a24 24 0 0 1 -24 -24 Z" fill="url(#sea)" />
      <g className="wave" opacity=".5" fill="#7dd3fc">
        <path d="M-20 214 q30 -12 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 v14 H-20 Z" />
      </g>
      <g className="bob">
        <path d="M150 200 h230 l-26 56 H176 Z" fill="url(#hull)" />
        <rect x="185" y="168" width="160" height="32" rx="5" fill="#e2e8f0" />
        <rect x="212" y="140" width="110" height="28" rx="5" fill="#f8fafc" />
        <g fill="#f59e0b"><rect x="228" y="148" width="14" height="13" rx="2" /><rect x="250" y="148" width="14" height="13" rx="2" /><rect x="272" y="148" width="14" height="13" rx="2" /></g>
        <rect x="300" y="100" width="7" height="42" fill="#475569" />
        <path d="M307 102 l30 16 -30 16 Z" fill="#ef4444" />
      </g>
      <g className="floaty">
        <path d="M120 300 V232" stroke="url(#arrow)" strokeWidth="9" strokeLinecap="round" />
        <path d="M120 218 l-16 26 h32 Z" fill="#fbbf24" />
        <text x="120" y="332" textAnchor="middle" fontFamily="Nunito Sans,sans-serif" fontSize="15" fontWeight="800" fill="#fff">Fₐ</text>
      </g>
      <g>
        <path d="M400 232 V296" stroke="#ef4444" strokeWidth="9" strokeLinecap="round" opacity=".9" />
        <path d="M400 310 l-16 -26 h32 Z" fill="#ef4444" opacity=".9" />
        <text x="400" y="214" textAnchor="middle" fontFamily="Nunito Sans,sans-serif" fontSize="15" fontWeight="800" fill="#0369a1">w</text>
      </g>
    </svg>
  );
}