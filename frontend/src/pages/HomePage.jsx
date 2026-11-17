import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Palette,
  Cpu,
  Layers,
  RotateCw,
  Download,
  Eye,
  CheckCircle2,
  ChevronRight,
  Flame,
  Award,
  Zap,
} from 'lucide-react';
import JerseyPreviewMockup from '../components/JerseyPreviewMockup';

export default function HomePage() {
  // Hero interactive kit switcher
  const [heroKitIndex, setHeroKitIndex] = useState(0);

  const heroKits = [
    {
      name: 'Thunder FC (Home)',
      primaryColor: '#0f172a', // Deep Obsidian Navy
      secondaryColor: '#f59e0b', // Electric Amber
      accentColor: '#38bdf8', // Cyan
      collarType: 'round',
      stylePattern: 'geometric',
      teamName: 'Thunder FC',
      sponsorName: 'HYPERION',
      playerName: 'STERLING',
      jerseyNumber: '10',
    },
    {
      name: 'Cyber Vortex (Away)',
      primaryColor: '#4c1d95', // Royal Cyber Violet
      secondaryColor: '#ec4899', // Hot Pink
      accentColor: '#a78bfa', // Lavender
      collarType: 'v-neck',
      stylePattern: 'futuristic',
      teamName: 'Vortex SC',
      sponsorName: 'QUANTUM',
      playerName: 'MODRIC',
      jerseyNumber: '7',
    },
    {
      name: 'Monolith Heritage (Third)',
      primaryColor: '#18181b', // Zinc Black
      secondaryColor: '#eab308', // Pure Gold
      accentColor: '#ffffff', // Crisp White
      collarType: 'polo',
      stylePattern: 'striped',
      teamName: 'Juventus AC',
      sponsorName: 'PIRELLI',
      playerName: 'DEL PIERO',
      jerseyNumber: '9',
    },
  ];

  const activeKit = heroKits[heroKitIndex];

  // Showcase items
  const showcaseKits = [
    {
      id: 1,
      title: 'Thunder Electric Kit',
      team: 'Thunder FC',
      type: 'Home Kit',
      style: 'Geometric Tech',
      primary: '#0f172a',
      secondary: '#f59e0b',
      accent: '#38bdf8',
      collar: 'round',
      pattern: 'geometric',
      sponsor: 'HYPERION',
      player: 'STERLING',
      number: '10',
    },
    {
      id: 2,
      title: 'Neon Velocity Away',
      team: 'Cyber Vortex',
      type: 'Away Kit',
      style: 'Cyber Pulse',
      primary: '#1e1b4b',
      secondary: '#06b6d4',
      accent: '#f43f5e',
      collar: 'v-neck',
      pattern: 'futuristic',
      sponsor: 'NEXUS AI',
      player: 'VALVERDE',
      number: '8',
    },
    {
      id: 3,
      title: 'Royal Heritage Classic',
      team: 'Monarchs SC',
      type: 'Home Kit',
      style: '90s Chevron Retro',
      primary: '#831843',
      secondary: '#fbbf24',
      accent: '#ffffff',
      collar: 'polo',
      pattern: 'retro',
      sponsor: 'FLY EMIRATES',
      player: 'ZIDANE',
      number: '5',
    },
    {
      id: 4,
      title: 'Alpine Minimalist',
      team: 'Nordic FC',
      type: 'Third Kit',
      style: 'Clean European',
      primary: '#0284c7',
      secondary: '#ffffff',
      accent: '#38bdf8',
      collar: 'round',
      pattern: 'striped',
      sponsor: 'SPOTIFY',
      player: 'HAALAND',
      number: '9',
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#070a13] text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Pill Tagline */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-300 tracking-wide font-mono uppercase">
                Design Your Identity. Wear Your Legacy.
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] font-sans">
              Create Your Own <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                Football Jersey
              </span>{' '}
              With AI.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Upload your club crest, choose your heritage colours, and watch our generative sportswear engine forge three match-ready kit concepts. Refine badges, player names, and numbers in the interactive Fabric.js studio.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/create"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-600/30 hover:shadow-cyan-400/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Start Designing Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#showcase"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 hover:text-white border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4 text-slate-400" />
                <span>Explore Showcase</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-black text-white font-mono">3x</div>
                <div className="text-xs text-slate-400">Variations Per Prompt</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-black text-cyan-400 font-mono">360°</div>
                <div className="text-xs text-slate-400">Front & Back Vectors</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-black text-indigo-400 font-mono">100%</div>
                <div className="text-xs text-slate-400">Custom Badges & Text</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Realistic Football Jersey Visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Jersey Card Enclosure */}
            <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#0c1222]/90 border border-slate-700/60 shadow-2xl shadow-blue-900/20 backdrop-blur-xl relative">
              {/* Header Kit Selector */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white tracking-wider uppercase font-mono">
                    {activeKit.name}
                  </span>
                </div>
                {/* Kit Switcher Dots */}
                <div className="flex items-center gap-1.5">
                  {heroKits.map((kit, idx) => (
                    <button
                      key={kit.name}
                      type="button"
                      onClick={() => setHeroKitIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        heroKitIndex === idx ? 'bg-cyan-400 w-6' : 'bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Select ${kit.name}`}
                    />
                  ))}
                </div>
              </div>

              {/* Vector Mockup */}
              <JerseyPreviewMockup
                primaryColor={activeKit.primaryColor}
                secondaryColor={activeKit.secondaryColor}
                accentColor={activeKit.accentColor}
                collarType={activeKit.collarType}
                stylePattern={activeKit.stylePattern}
                teamName={activeKit.teamName}
                sponsorName={activeKit.sponsorName}
                playerName={activeKit.playerName}
                jerseyNumber={activeKit.jerseyNumber}
                size="medium"
              />

              {/* Kit Metadata Badge */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-white/20"
                    style={{ backgroundColor: activeKit.primaryColor }}
                  />
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-white/20"
                    style={{ backgroundColor: activeKit.secondaryColor }}
                  />
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-white/20"
                    style={{ backgroundColor: activeKit.accentColor }}
                  />
                  <span className="font-mono text-[11px] text-slate-300">{activeKit.stylePattern} style</span>
                </div>

                <Link
                  to={`/create?primary=${encodeURIComponent(activeKit.primaryColor)}&secondary=${encodeURIComponent(activeKit.secondaryColor)}&accent=${encodeURIComponent(activeKit.accentColor)}&style=${activeKit.stylePattern}`}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Customize Kit</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section className="py-20 bg-slate-950/70 border-y border-slate-800/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-black tracking-widest text-cyan-400 uppercase font-mono">
              Effortless Workflow
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              How JerseyAI Brings Your Kit To Life
            </h3>
            <p className="text-sm sm:text-base text-slate-400">
              From amateur club to stadium-worthy aesthetic in four streamlined steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-[#0d1322] border border-slate-800/80 hover:border-blue-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                01
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <h4 className="text-base font-bold text-white">Upload Your Badge</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Provide your team's crest or logo in PNG, JPG, or SVG format. Our engine isolates the silhouette and aligns it seamlessly.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-[#0d1322] border border-slate-800/80 hover:border-cyan-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                02
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-4 h-4 text-cyan-400" />
                <h4 className="text-base font-bold text-white">Choose Your Colours</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Select your club's primary, secondary, and accent shades with HEX-level precision or curate from famous historic kit palettes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-[#0d1322] border border-slate-800/80 hover:border-purple-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                03
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <h4 className="text-base font-bold text-white">Generate Concepts</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our athletic generative AI crafts three unique jersey iterations balancing geometric textures, stitching, and sportswear cuts.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 rounded-2xl bg-[#0d1322] border border-slate-800/80 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                04
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <h4 className="text-base font-bold text-white">Customize Studio</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fine-tune every layer on the interactive Fabric.js canvas: reposition badges, change fonts, tweak numbers, and export in 4K PNG.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-black tracking-widest text-blue-400 uppercase font-mono">
            Sportswear Engineering
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Built Like A Pro Design House
          </h3>
          <p className="text-sm sm:text-base text-slate-400">
            Engineered specifically for sportswear proportions, athletic typography, and sublimated fabric textures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-2xl bg-[#0b101d] border border-slate-800 hover:border-blue-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">AI-Powered Generation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates multiple design concepts honoring real kit geometry, seam ergonomics, and athletic color placement without blurry artifacts.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-2xl bg-[#0b101d] border border-slate-800 hover:border-cyan-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <Palette className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Custom Team Colours</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full 3-tier color harmony: primary base, secondary pattern accents, and crisp contrasting highlight trims for collar and sleeve cuffs.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-2xl bg-[#0b101d] border border-slate-800 hover:border-indigo-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Clean Logo Integration</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never bake distorted logos into the image. Your uploaded badge stays crisp as an independent vector layer you can position anywhere.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-8 rounded-2xl bg-[#0b101d] border border-slate-800 hover:border-purple-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Interactive Studio Editor</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Powered by Fabric.js. Move, rotate, scale, change z-indexes, and adjust opacity for sponsor graphics, badge crests, and stripes.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-8 rounded-2xl bg-[#0b101d] border border-slate-800 hover:border-pink-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
              <RotateCw className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Front & Back Previews</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Switch effortlessly between front sponsor views and back player names with arched squad typography, drop shadows, and authentic numbers.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-8 rounded-2xl bg-[#0b101d] border border-slate-800 hover:border-amber-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Download className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">High-Resolution Downloads</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Export high-resolution transparent PNG mockups and vector composition files ready for print shops, manufacturer specs, or social media reveals.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SHOWCASE SECTION ================= */}
      <section id="showcase" className="py-24 bg-[#050810] border-t border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-widest">
                Concept Gallery
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                Featured Kit Showcase
              </h3>
              <p className="text-sm text-slate-400 max-w-xl">
                Explore real football kits configured and generated on JerseyAI with custom geometric textures, badges, and collars.
              </p>
            </div>

            <Link
              to="/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-800/80 hover:bg-cyan-900/60 transition-all"
            >
              <span>Build Your Own Variant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {showcaseKits.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl bg-[#0d1322] border border-slate-800/90 overflow-hidden hover:border-slate-700 transition-all flex flex-col group shadow-xl"
              >
                {/* Kit Canvas Preview */}
                <div className="p-4 bg-gradient-to-b from-[#11192e] to-[#0a0f1d] flex items-center justify-center border-b border-slate-800/80">
                  <JerseyPreviewMockup
                    primaryColor={item.primary}
                    secondaryColor={item.secondary}
                    accentColor={item.accent}
                    collarType={item.collar}
                    stylePattern={item.pattern}
                    teamName={item.team}
                    sponsorName={item.sponsor}
                    playerName={item.player}
                    jerseyNumber={item.number}
                    size="small"
                    showControls={false}
                  />
                </div>

                {/* Card Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="font-mono text-cyan-400">{item.type}</span>
                      <span>{item.style}</span>
                    </div>
                    <h4 className="text-base font-bold text-white">{item.title}</h4>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: item.primary }} />
                      <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: item.secondary }} />
                      <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: item.accent }} />
                    </div>

                    <Link
                      to={`/create?primary=${encodeURIComponent(item.primary)}&secondary=${encodeURIComponent(item.secondary)}&accent=${encodeURIComponent(item.accent)}&style=${item.pattern}&team=${encodeURIComponent(item.team)}&sponsor=${encodeURIComponent(item.sponsor)}&collar=${item.collar}`}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Remix Design</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA BANNER ================= */}
      <section className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-blue-900/60 via-indigo-950/70 to-slate-900/80 border border-blue-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ready To Dress Your Squad Like Champions?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Design your identity. Wear your legacy. Turn club ambition into authentic football kits ready for the pitch, social launch, or factory order.
            </p>
            <div className="pt-2">
              <Link
                to="/create"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-300 to-blue-400 hover:from-cyan-200 hover:to-blue-300 shadow-xl shadow-cyan-500/25 transition-all cursor-pointer font-sans"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Launch Jersey Creator Studio</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
