import React, { useState } from 'react';
import { RotateCw, Shield, Sparkles } from 'lucide-react';

/**
 * Realistic Football Jersey Vector Mockup
 * Renders dynamically based on primary, secondary, accent colours, collar type, style, badge, and sponsor.
 */
export default function JerseyPreviewMockup({
  primaryColor = '#1e3a8a',
  secondaryColor = '#f59e0b',
  accentColor = '#ffffff',
  collarType = 'round', // 'round', 'v-neck', 'polo'
  stylePattern = 'geometric', // 'modern', 'minimal', 'retro', 'geometric', 'futuristic', 'striped', 'gradient', 'abstract'
  teamName = 'Thunder FC',
  badgeUrl = null,
  sponsorName = 'APEX ENERGY',
  playerName = 'RODRIGUEZ',
  jerseyNumber = '10',
  isBackView = false,
  onToggleView = null,
  size = 'medium', // 'small', 'medium', 'large'
  showControls = true,
}) {
  const [internalBackView, setInternalBackView] = useState(false);
  const activeBackView = isBackView !== undefined && onToggleView ? isBackView : internalBackView;

  const toggleView = () => {
    if (onToggleView) {
      onToggleView(!activeBackView);
    } else {
      setInternalBackView(!internalBackView);
    }
  };

  // Dimensions
  const dimensions = {
    small: 'w-64 h-72',
    medium: 'w-80 h-96 sm:w-96 sm:h-[460px]',
    large: 'w-full max-w-lg h-[520px]',
  }[size] || 'w-80 h-96 sm:w-96 sm:h-[460px]';

  // Pattern SVG definitions
  const renderPattern = () => {
    switch (stylePattern.toLowerCase()) {
      case 'striped':
        return (
          <g opacity="0.85">
            <line x1="170" y1="80" x2="170" y2="480" stroke={secondaryColor} strokeWidth="32" />
            <line x1="250" y1="80" x2="250" y2="480" stroke={secondaryColor} strokeWidth="32" />
            <line x1="330" y1="80" x2="330" y2="480" stroke={secondaryColor} strokeWidth="32" />
            <line x1="130" y1="80" x2="130" y2="480" stroke={accentColor} strokeWidth="4" />
            <line x1="210" y1="80" x2="210" y2="480" stroke={accentColor} strokeWidth="4" />
            <line x1="290" y1="80" x2="290" y2="480" stroke={accentColor} strokeWidth="4" />
            <line x1="370" y1="80" x2="370" y2="480" stroke={accentColor} strokeWidth="4" />
          </g>
        );
      case 'geometric':
        return (
          <g opacity="0.75">
            {/* Dynamic geometric low-poly tessellation */}
            <polygon points="120,100 200,160 140,240 70,180" fill={secondaryColor} fillOpacity="0.4" />
            <polygon points="200,160 280,110 320,190 230,220" fill={accentColor} fillOpacity="0.3" />
            <polygon points="280,110 380,120 420,200 320,190" fill={secondaryColor} fillOpacity="0.35" />
            <polygon points="140,240 230,220 250,320 160,340" fill={accentColor} fillOpacity="0.25" />
            <polygon points="230,220 320,190 350,300 250,320" fill={secondaryColor} fillOpacity="0.45" />
            <polygon points="320,190 420,200 400,320 350,300" fill={accentColor} fillOpacity="0.2" />
            <polygon points="160,340 250,320 260,440 180,450" fill={secondaryColor} fillOpacity="0.3" />
            <polygon points="250,320 350,300 340,440 260,440" fill={accentColor} fillOpacity="0.35" />
            {/* Angular stroke accents */}
            <polyline points="90,150 200,220 180,360 270,450" fill="none" stroke={accentColor} strokeWidth="2.5" opacity="0.8" />
            <polyline points="410,160 300,230 320,370 230,460" fill="none" stroke={secondaryColor} strokeWidth="2.5" opacity="0.8" />
          </g>
        );
      case 'futuristic':
        return (
          <g opacity="0.8">
            <defs>
              <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {/* Cyber pulse lines */}
            <path d="M 120,130 L 250,210 L 250,470" fill="none" stroke="url(#neonGlow)" strokeWidth="6" />
            <path d="M 380,130 L 250,210" fill="none" stroke="url(#neonGlow)" strokeWidth="6" />
            <path d="M 140,270 L 250,330 L 360,270" fill="none" stroke={accentColor} strokeWidth="3" strokeDasharray="8 6" />
            <path d="M 160,370 L 250,420 L 340,370" fill="none" stroke={secondaryColor} strokeWidth="4" />
            {/* Digital hex grid dots */}
            <circle cx="160" cy="200" r="4" fill={accentColor} />
            <circle cx="200" cy="180" r="4" fill={secondaryColor} />
            <circle cx="300" cy="180" r="4" fill={secondaryColor} />
            <circle cx="340" cy="200" r="4" fill={accentColor} />
          </g>
        );
      case 'gradient':
        return (
          <g>
            <defs>
              <linearGradient id="jerseyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primaryColor} />
                <stop offset="45%" stopColor={secondaryColor} stopOpacity="0.9" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <rect x="70" y="70" width="360" height="420" fill="url(#jerseyGrad)" opacity="0.65" />
          </g>
        );
      case 'retro':
        return (
          <g opacity="0.85">
            {/* Bold retro chevron blocks */}
            <polygon points="100,140 250,230 400,140 400,190 250,280 100,190" fill={secondaryColor} />
            <polygon points="100,210 250,300 400,210 400,240 250,330 100,240" fill={accentColor} />
            <polygon points="100,260 250,350 400,260 400,290 250,380 100,290" fill={secondaryColor} opacity="0.7" />
          </g>
        );
      case 'abstract':
        return (
          <g opacity="0.75">
            <path d="M 90,160 Q 200,80 270,220 T 410,290 L 410,480 L 90,480 Z" fill={secondaryColor} opacity="0.4" />
            <path d="M 410,130 Q 320,240 220,200 T 90,390 L 90,480 L 410,480 Z" fill={accentColor} opacity="0.3" />
            <circle cx="250" cy="240" r="90" fill="none" stroke={secondaryColor} strokeWidth="12" opacity="0.25" />
          </g>
        );
      case 'modern':
      default:
        return (
          <g opacity="0.8">
            {/* Dynamic diagonal slash with secondary & accent */}
            <polygon points="80,100 240,70 420,380 260,480" fill={secondaryColor} opacity="0.3" />
            <line x1="120" y1="80" x2="380" y2="480" stroke={secondaryColor} strokeWidth="14" />
            <line x1="150" y1="80" x2="410" y2="480" stroke={accentColor} strokeWidth="5" />
            <line x1="90" y1="80" x2="350" y2="480" stroke={accentColor} strokeWidth="3" opacity="0.7" />
          </g>
        );
    }
  };

  // Render Collar based on type
  const renderCollar = () => {
    switch (collarType.toLowerCase()) {
      case 'v-neck':
        return (
          <g id="collar-v">
            <path d="M 195,78 L 250,132 L 305,78 Z" fill="#0b0f19" />
            {/* V-trim */}
            <path d="M 195,78 L 250,132 L 305,78" fill="none" stroke={accentColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 200,78 L 250,126 L 300,78" fill="none" stroke={secondaryColor} strokeWidth="4" strokeLinejoin="round" />
          </g>
        );
      case 'polo':
        return (
          <g id="collar-polo">
            <path d="M 210,78 L 250,105 L 290,78 Z" fill="#0b0f19" />
            {/* Placket */}
            <rect x="242" y="100" width="16" height="52" rx="2" fill={secondaryColor} stroke={accentColor} strokeWidth="1.5" />
            <circle cx="250" cy="115" r="2.5" fill="#ffffff" />
            <circle cx="250" cy="135" r="2.5" fill="#ffffff" />
            {/* Left Wing */}
            <polygon points="190,75 246,104 220,136 175,90" fill={accentColor} stroke="#0f172a" strokeWidth="1.5" />
            {/* Right Wing */}
            <polygon points="310,75 254,104 280,136 325,90" fill={accentColor} stroke="#0f172a" strokeWidth="1.5" />
          </g>
        );
      case 'round':
      default:
        return (
          <g id="collar-round">
            {/* Inner neck hole */}
            <ellipse cx="250" cy="85" rx="55" ry="24" fill="#0b0f19" />
            {/* Collar ribbing */}
            <path d="M 195,85 C 195,115 305,115 305,85" fill="none" stroke={accentColor} strokeWidth="9" strokeLinecap="round" />
            <path d="M 198,85 C 198,110 302,110 302,85" fill="none" stroke={secondaryColor} strokeWidth="3" />
          </g>
        );
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none group">
      {/* Jersey Canvas SVG Container */}
      <div className={`relative ${dimensions} transition-transform duration-300 group-hover:scale-[1.02]`}>
        <svg
          viewBox="0 0 500 520"
          className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Shadow gradients for 3D body curvature */}
            <radialGradient id="bodyHighlight" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
            </radialGradient>

            <linearGradient id="creaseShadow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
              <stop offset="15%" stopColor="#000000" stopOpacity="0" />
              <stop offset="85%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
            </linearGradient>

            {/* Jersey Body Mask */}
            <clipPath id="torsoClip">
              <path d="M 140,88 L 195,78 C 215,90 285,90 305,78 L 360,88 L 400,175 L 345,195 L 338,470 C 290,482 210,482 162,470 L 155,195 L 100,175 Z" />
            </clipPath>

            {/* Left Sleeve Mask */}
            <clipPath id="leftSleeveClip">
              <path d="M 140,88 L 100,175 L 155,195 L 168,140 Z" />
            </clipPath>

            {/* Right Sleeve Mask */}
            <clipPath id="rightSleeveClip">
              <path d="M 360,88 L 400,175 L 345,195 L 332,140 Z" />
            </clipPath>
          </defs>

          {/* BACKGROUND DROPSHADOW SILHOUETTE */}
          <path
            d="M 140,88 L 195,78 C 215,90 285,90 305,78 L 360,88 L 400,175 L 345,195 L 338,470 C 290,482 210,482 162,470 L 155,195 L 100,175 Z"
            fill="rgba(0,0,0,0.4)"
            transform="translate(0, 10)"
          />

          {/* MAIN TORSO BASE */}
          <g clipPath="url(#torsoClip)">
            {/* Primary Fabric Background */}
            <rect x="60" y="60" width="380" height="430" fill={primaryColor} />

            {/* Dynamic Pattern Layer */}
            {renderPattern()}

            {/* Athletic Breathable Mesh Side Panels */}
            <path d="M 155,195 L 165,195 L 175,465 L 162,470 Z" fill={secondaryColor} opacity="0.8" />
            <path d="M 345,195 L 335,195 L 325,465 L 338,470 Z" fill={secondaryColor} opacity="0.8" />
            <path d="M 165,195 L 168,195 L 178,465 L 175,465 Z" fill={accentColor} opacity="0.6" />
            <path d="M 335,195 L 332,195 L 322,465 L 325,465 Z" fill={accentColor} opacity="0.6" />

            {/* 3D Realistic Athletic Curvature & Specular Lighting */}
            <rect x="60" y="60" width="380" height="430" fill="url(#bodyHighlight)" />
            <rect x="60" y="60" width="380" height="430" fill="url(#creaseShadow)" />

            {/* Athletic Seam Lines */}
            <path d="M 175,90 C 190,180 185,340 180,460" stroke="#000000" strokeWidth="1" opacity="0.25" fill="none" />
            <path d="M 325,90 C 310,180 315,340 320,460" stroke="#000000" strokeWidth="1" opacity="0.25" fill="none" />

            {/* VIEW SPECIFIC GRAPHICS (FRONT OR BACK) */}
            {!activeBackView ? (
              /* FRONT VIEW */
              <g id="front-graphics">
                {/* Team Badge / Crest (Left Chest) */}
                <g transform="translate(180, 168)">
                  {badgeUrl ? (
                    <image href={badgeUrl} x="-22" y="-22" width="44" height="44" preserveAspectRatio="xMidYMid meet" />
                  ) : (
                    <g>
                      <circle cx="0" cy="0" r="22" fill={secondaryColor} stroke={accentColor} strokeWidth="3" />
                      <Shield className="text-white" x="-14" y="-14" width="28" height="28" fill={primaryColor} stroke={accentColor} strokeWidth="2" />
                      <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="sans-serif">
                        {teamName ? teamName.substring(0, 2).toUpperCase() : 'FC'}
                      </text>
                    </g>
                  )}
                  {/* Subtle Badge Sheen */}
                  <circle cx="-5" cy="-7" r="14" fill="#ffffff" opacity="0.15" />
                </g>

                {/* Sportswear Brand Logo (Right Chest) */}
                <g transform="translate(320, 168)">
                  <path
                    d="M -16,-6 L 8,-14 L 0,-2 L 14,-2 L -8,14 L -2,4 Z"
                    fill={accentColor}
                    stroke="rgba(0,0,0,0.3)"
                    strokeWidth="1"
                  />
                </g>

                {/* Center Chest Sponsor Branding */}
                <g transform="translate(250, 260)">
                  {sponsorName && (
                    <g>
                      {/* Sponsor Background Glow */}
                      <rect x="-95" y="-18" width="190" height="36" rx="6" fill="#000000" fillOpacity="0.25" />
                      <text
                        x="0"
                        y="6"
                        textAnchor="middle"
                        fill={accentColor}
                        fontSize="20"
                        fontWeight="900"
                        letterSpacing="3"
                        fontFamily="'Arial Black', Impact, sans-serif"
                        stroke="#000000"
                        strokeWidth="1"
                      >
                        {sponsorName.toUpperCase()}
                      </text>
                      <line x1="-70" y1="14" x2="70" y2="14" stroke={secondaryColor} strokeWidth="2" />
                    </g>
                  )}
                </g>

                {/* Front Small Number */}
                {jerseyNumber && (
                  <g transform="translate(250, 335)">
                    <text
                      x="0"
                      y="0"
                      textAnchor="middle"
                      fill={accentColor}
                      fontSize="36"
                      fontWeight="900"
                      fontFamily="'Arial Black', Impact, sans-serif"
                      stroke={secondaryColor}
                      strokeWidth="2"
                    >
                      {jerseyNumber}
                    </text>
                  </g>
                )}

                {/* Authentic Kit Tag (Lower Right Hem) */}
                <g transform="translate(310, 445)">
                  <rect x="0" y="0" width="18" height="12" rx="2" fill="#ffd700" stroke="#000000" strokeWidth="0.5" />
                  <text x="9" y="8" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#000">JERSEY AI</text>
                </g>
              </g>
            ) : (
              /* BACK VIEW */
              <g id="back-graphics">
                {/* Back Player Name Arc */}
                <g transform="translate(250, 165)">
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    fill={accentColor}
                    fontSize="22"
                    fontWeight="900"
                    letterSpacing="4"
                    fontFamily="'Arial Black', Impact, sans-serif"
                    stroke="#000000"
                    strokeWidth="1.5"
                  >
                    {playerName.toUpperCase()}
                  </text>
                  <line x1="-60" y1="8" x2="60" y2="8" stroke={secondaryColor} strokeWidth="2" />
                </g>

                {/* Large Squad Number */}
                <g transform="translate(250, 290)">
                  {/* Drop Shadow for Number */}
                  <text
                    x="3"
                    y="3"
                    textAnchor="middle"
                    fill="#000000"
                    opacity="0.4"
                    fontSize="108"
                    fontWeight="900"
                    fontFamily="'Arial Black', Impact, sans-serif"
                  >
                    {jerseyNumber}
                  </text>
                  {/* Outer Stroke Number */}
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    fill={accentColor}
                    fontSize="108"
                    fontWeight="900"
                    fontFamily="'Arial Black', Impact, sans-serif"
                    stroke={secondaryColor}
                    strokeWidth="8"
                    strokeLinejoin="round"
                  >
                    {jerseyNumber}
                  </text>
                  {/* Inner Crisp Number */}
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    fill={accentColor}
                    fontSize="108"
                    fontWeight="900"
                    fontFamily="'Arial Black', Impact, sans-serif"
                  >
                    {jerseyNumber}
                  </text>
                </g>

                {/* Back Lower Sponsor / Club Identity */}
                <g transform="translate(250, 400)">
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    fill={secondaryColor}
                    fontSize="12"
                    fontWeight="800"
                    letterSpacing="3"
                    fontFamily="sans-serif"
                  >
                    {teamName.toUpperCase()}
                  </text>
                </g>
              </g>
            )}

            {/* Bottom Hem Trim */}
            <path d="M 162,470 C 210,482 290,482 338,470" fill="none" stroke={secondaryColor} strokeWidth="5" />
            <path d="M 164,466 C 210,478 290,478 336,466" fill="none" stroke={accentColor} strokeWidth="2" />
          </g>

          {/* LEFT SLEEVE */}
          <g>
            {/* Base Sleeve */}
            <path d="M 140,88 L 100,175 L 155,195 L 168,140 Z" fill={primaryColor} />
            {/* Left Sleeve Pattern clip */}
            <g clipPath="url(#leftSleeveClip)">
              <rect x="90" y="80" width="80" height="120" fill={secondaryColor} opacity="0.35" />
              {/* Sleeve Stripe */}
              <line x1="120" y1="88" x2="135" y2="190" stroke={accentColor} strokeWidth="6" />
            </g>
            {/* Left Sleeve Cuff Trim */}
            <line x1="100" y1="175" x2="155" y2="195" stroke={accentColor} strokeWidth="7" strokeLinecap="round" />
            <line x1="101" y1="171" x2="153" y2="190" stroke={secondaryColor} strokeWidth="3" />
            {/* Sleeve Shadow */}
            <path d="M 140,88 L 168,140 L 155,195" fill="none" stroke="#000000" strokeWidth="4" opacity="0.3" />
          </g>

          {/* RIGHT SLEEVE */}
          <g>
            {/* Base Sleeve */}
            <path d="M 360,88 L 400,175 L 345,195 L 332,140 Z" fill={primaryColor} />
            {/* Right Sleeve Pattern clip */}
            <g clipPath="url(#rightSleeveClip)">
              <rect x="330" y="80" width="80" height="120" fill={secondaryColor} opacity="0.35" />
              {/* Sleeve Stripe */}
              <line x1="380" y1="88" x2="365" y2="190" stroke={accentColor} strokeWidth="6" />
            </g>
            {/* Right Sleeve Cuff Trim */}
            <line x1="400" y1="175" x2="345" y2="195" stroke={accentColor} strokeWidth="7" strokeLinecap="round" />
            <line x1="399" y1="171" x2="347" y2="190" stroke={secondaryColor} strokeWidth="3" />
            {/* Sleeve Shadow */}
            <path d="M 360,88 L 332,140 L 345,195" fill="none" stroke="#000000" strokeWidth="4" opacity="0.3" />
          </g>

          {/* DYNAMIC COLLAR (LAYERED ON TOP) */}
          {renderCollar()}

          {/* ATHLETIC SHOULDER SEAMS */}
          <line x1="140" y1="88" x2="195" y2="78" stroke={accentColor} strokeWidth="2.5" opacity="0.6" />
          <line x1="360" y1="88" x2="305" y2="78" stroke={accentColor} strokeWidth="2.5" opacity="0.6" />
        </svg>

        {/* View Badge in Corner */}
        <div className="absolute top-2 right-2 bg-slate-900/90 border border-slate-700/80 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-slate-300 tracking-wider uppercase flex items-center gap-1.5 shadow-md">
          <span className={`w-1.5 h-1.5 rounded-full ${activeBackView ? 'bg-amber-400' : 'bg-cyan-400'} animate-pulse`} />
          {activeBackView ? 'Back View' : 'Front View'}
        </div>
      </div>

      {/* Interactive Controls Bar */}
      {showControls && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={toggleView}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 transition-all text-xs font-semibold tracking-wide shadow-md hover:shadow-cyan-500/10 cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5 text-cyan-400 transition-transform group-hover:rotate-180" />
            Switch to {activeBackView ? 'Front View' : 'Back View'}
          </button>
        </div>
      )}
    </div>
  );
}
