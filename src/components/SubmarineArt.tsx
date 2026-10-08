export default function SubmarineArt() {
  return (
    <svg
      viewBox="0 0 600 600"
      className="submarine-svg"
      role="img"
      aria-label="Animasi kapal selam menyelam di dalam laut dengan gelembung udara"
    >
      <defs>
        <linearGradient id="subSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.0" />
          <stop offset="40%" stopColor="#0284c7" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="subBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="55%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="subTower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <radialGradient id="porthole" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7ed" />
          <stop offset="60%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0369a1" />
        </radialGradient>
        <radialGradient id="headlight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7ed" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#fde68a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ===== Latar laut ===== */}
      <rect width="600" height="600" fill="url(#subSea)" />

      {/* ===== Sinar cahaya dari permukaan ===== */}
      <g className="sub-rays" opacity="0.5">
        <path className="light-ray" d="M120 0 L40 600 L200 600 L200 0 Z" fill="url(#ray)" />
        <path className="light-ray" d="M280 0 L240 600 L360 600 L340 0 Z" fill="url(#ray)" style={{ animationDelay: '1.2s' }} />
        <path className="light-ray" d="M480 0 L440 600 L560 600 L540 0 Z" fill="url(#ray)" style={{ animationDelay: '2.4s' }} />
      </g>

      {/* ===== Ikan kecil berenang ===== */}
      <g className="fish-swim" style={{ animationDelay: '1s' }}>
        <ellipse cx="0" cy="220" rx="16" ry="8" fill="#67e8f9" opacity="0.85" />
        <polygon points="-16,220 -28,212 -28,228" fill="#67e8f9" opacity="0.85" />
        <circle cx="6" cy="218" r="1.6" fill="#0c4a6e" />
      </g>
      <g className="fish-swim" style={{ animationDelay: '6s' }}>
        <ellipse cx="0" cy="480" rx="12" ry="6" fill="#a7f3d0" opacity="0.75" />
        <polygon points="-12,480 -22,474 -22,486" fill="#a7f3d0" opacity="0.75" />
        <circle cx="4" cy="478" r="1.2" fill="#0c4a6e" />
      </g>
      <g className="fish-swim" style={{ animationDelay: '9s' }}>
        <ellipse cx="0" cy="140" rx="10" ry="5" fill="#bae6fd" opacity="0.7" />
        <polygon points="-10,140 -18,136 -18,144" fill="#bae6fd" opacity="0.7" />
      </g>

      {/* ===== Rumput laut dasar ===== */}
      <g className="seaweed">
        <path d="M70 600 Q60 540 78 480 Q90 440 76 400" stroke="#059669" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M110 600 Q100 550 118 500 Q128 470 116 430" stroke="#10b981" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.65" />
        <path d="M500 600 Q510 545 492 490 Q482 450 494 410" stroke="#059669" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M540 600 Q548 555 530 510 Q520 480 532 445" stroke="#10b981" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.65" />
      </g>

      {/* ===== Gelembung naik ===== */}
      <g fill="#fff" opacity="0.85">
        <circle className="bubble" cx="360" cy="380" r="5" />
        <circle className="bubble" cx="330" cy="400" r="3.5" style={{ animationDelay: '0.8s' }} />
        <circle className="bubble" cx="380" cy="420" r="6"   style={{ animationDelay: '1.6s' }} />
        <circle className="bubble" cx="345" cy="440" r="4"   style={{ animationDelay: '2.4s' }} />
        <circle className="bubble" cx="395" cy="460" r="3"   style={{ animationDelay: '3.2s' }} />
        <circle className="bubble" cx="310" cy="470" r="5"   style={{ animationDelay: '4s' }} />
      </g>

      {/* ===== KAPAL SELAM ===== */}
      <g className="sub-float">
        {/* Cahaya sorot dari depan */}
        <ellipse cx="180" cy="310" rx="120" ry="55" fill="url(#headlight)" />

        {/* Propeller */}
        <g transform="translate(500, 310)">
          <circle r="6" fill="#78350f" />
          <g className="propeller">
            <ellipse cx="0" cy="-16" rx="4" ry="14" fill="#92400e" />
            <ellipse cx="14" cy="8" rx="4" ry="14" fill="#92400e" transform="rotate(120 0 0)" />
            <ellipse cx="-14" cy="8" rx="4" ry="14" fill="#92400e" transform="rotate(-120 0 0)" />
          </g>
        </g>

        {/* Badan utama */}
        <ellipse cx="340" cy="310" rx="170" ry="58" fill="url(#subBody)" stroke="#78350f" strokeWidth="3" />

        {/* Panel garis pada badan */}
        <path d="M200 280 Q340 268 480 280" stroke="#78350f" strokeWidth="1.5" fill="none" opacity="0.4" />
        <path d="M200 340 Q340 352 480 340" stroke="#78350f" strokeWidth="1.5" fill="none" opacity="0.4" />

        {/* Menara / conning tower */}
        <path d="M290 252 L290 220 Q290 208 302 208 L400 208 Q412 208 412 220 L412 252 Z"
              fill="url(#subTower)" stroke="#78350f" strokeWidth="3" />

        {/* Periskop */}
        <rect x="318" y="168" width="7" height="42" fill="#78350f" />
        <rect x="318" y="162" width="26" height="10" rx="3" fill="#78350f" />
        <circle cx="340" cy="167" r="3" fill="#7dd3fc" />

        {/* Antena kecil */}
        <line x1="392" y1="208" x2="392" y2="182" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
        <circle cx="392" cy="180" r="3" fill="#ef4444" className="sub-blink" />

        {/* Jendela / porthole */}
        <circle cx="270" cy="310" r="15" fill="url(#porthole)" stroke="#78350f" strokeWidth="3.5" />
        <circle cx="320" cy="310" r="15" fill="url(#porthole)" stroke="#78350f" strokeWidth="3.5" />
        <circle cx="370" cy="310" r="15" fill="url(#porthole)" stroke="#78350f" strokeWidth="3.5" />
        <circle cx="420" cy="310" r="15" fill="url(#porthole)" stroke="#78350f" strokeWidth="3.5" />

        {/* Highlight pada porthole */}
        <circle cx="266" cy="305" r="3.5" fill="#fff" opacity="0.9" />
        <circle cx="316" cy="305" r="3.5" fill="#fff" opacity="0.9" />
        <circle cx="366" cy="305" r="3.5" fill="#fff" opacity="0.9" />
        <circle cx="416" cy="305" r="3.5" fill="#fff" opacity="0.9" />

        {/* Lampu depan */}
        <circle cx="185" cy="310" r="10" fill="#fef3c7" stroke="#78350f" strokeWidth="3" />
        <circle cx="185" cy="310" r="4" fill="#fff7ed" className="sub-glow" />

        {/* Fin bawah */}
        <path d="M420 362 L400 400 L450 400 Z" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />

        {/* Jendela di menara */}
        <rect x="360" y="222" width="30" height="16" rx="3" fill="url(#porthole)" stroke="#78350f" strokeWidth="2.5" />
      </g>

      {/* ===== Dasar laut berpasir ===== */}
      <path d="M0 590 Q150 565 300 585 T600 580 L600 600 L0 600 Z" fill="#0c4a6e" opacity="0.55" />
    </svg>
  );
}