import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Upload,
  Shield,
  Palette,
  Shirt,
  Info,
  Check,
  AlertCircle,
  X,
  RotateCw,
  Copy,
  Layers,
  ArrowRight,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import JerseyPreviewMockup from '../components/JerseyPreviewMockup';

export default function CreateJerseyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    teamName: searchParams.get('team') || 'Thunder FC',
    sponsorName: searchParams.get('sponsor') || 'APEX GLOBAL',
    playerName: 'STERLING',
    jerseyNumber: '10',
    primaryColor: searchParams.get('primary') || '#0f172a',
    secondaryColor: searchParams.get('secondary') || '#f59e0b',
    accentColor: searchParams.get('accent') || '#38bdf8',
    jerseyType: 'home', // 'home', 'away', 'third'
    collarType: searchParams.get('collar') || 'round', // 'round', 'v-neck', 'polo'
    sleeves: 'short',
    designStyle: searchParams.get('style') || 'geometric',
    additionalPrompt: '',
  });

  // Badge upload state
  const [badgeFile, setBadgeFile] = useState(null);
  const [badgePreview, setBadgePreview] = useState(null);

  // Validation errors
  const [errors, setErrors] = useState({});

  // Preview interactive state
  const [isBackView, setIsBackView] = useState(false);

  // Generation simulated modal / preparation for Phase 2/3
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Color Presets for quick selection
  const colorPresets = [
    { name: 'Obsidian & Gold', primary: '#090e1a', secondary: '#f59e0b', accent: '#ffffff' },
    { name: 'Electric Thunder', primary: '#0f172a', secondary: '#3b82f6', accent: '#06b6d4' },
    { name: 'Cyberpunk Neon', primary: '#3b0764', secondary: '#ec4899', accent: '#a855f7' },
    { name: 'Royal Blaugrana', primary: '#1e3a8a', secondary: '#b91c1c', accent: '#fbbf24' },
    { name: 'Classic Bianconeri', primary: '#18181b', secondary: '#ffffff', accent: '#eab308' },
    { name: 'Azzurri Heritage', primary: '#0369a1', secondary: '#ffffff', accent: '#10b981' },
    { name: 'Crimson Dragon', primary: '#991b1b', secondary: '#eab308', accent: '#000000' },
    { name: 'Emerald Forest', primary: '#064e3b', secondary: '#e2e8f0', accent: '#10b981' },
  ];

  // Design styles list
  const styleOptions = [
    {
      id: 'modern',
      title: 'Modern',
      desc: 'Dynamic diagonal energy slashes & contemporary athletic cuts',
      tag: 'Trending',
    },
    {
      id: 'geometric',
      title: 'Geometric',
      desc: 'Tessellated low-poly shapes with high-contrast angular flow',
      tag: 'Pro Sport',
    },
    {
      id: 'minimal',
      title: 'Minimal',
      desc: 'Clean European elegance with understated micro-details',
      tag: 'Clean',
    },
    {
      id: 'striped',
      title: 'Striped',
      desc: 'Bold vertical club stripes with contrasting accent piping',
      tag: 'Classic',
    },
    {
      id: 'futuristic',
      title: 'Futuristic',
      desc: 'Cyber pulse nodes, circuit overlays & neon gradient glow',
      tag: 'Digital',
    },
    {
      id: 'retro',
      title: 'Retro',
      desc: '90s chevron motifs, bold color blocking & nostalgia',
      tag: 'Heritage',
    },
    {
      id: 'gradient',
      title: 'Gradient',
      desc: 'Smooth vertical and diagonal color melt across the torso',
      tag: 'Vibrant',
    },
    {
      id: 'abstract',
      title: 'Abstract',
      desc: 'Organic fluid waves and kinetic sportswear typography',
      tag: 'Artistic',
    },
  ];

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Badge Upload Handler
  const handleBadgeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, badge: 'Please upload a valid image file (PNG, JPG, SVG).' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, badge: 'File size must be under 5MB.' }));
        return;
      }

      setBadgeFile(file);
      const previewUrl = URL.createObjectURL(file);
      setBadgePreview(previewUrl);
      setErrors((prev) => ({ ...prev, badge: null }));
    }
  };

  const removeBadge = () => {
    setBadgeFile(null);
    if (badgePreview) URL.revokeObjectURL(badgePreview);
    setBadgePreview(null);
  };

  // Apply a preset color palette
  const applyColorPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
    }));
  };

  // Sample Badge Presets for quick one-click testing
  const applySampleBadge = (label, color1, color2) => {
    // Generate an inline data URI SVG crest
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <polygon points="50,5 90,20 90,65 50,95 10,65 10,20" fill="${color1}" stroke="${color2}" stroke-width="4"/>
        <text x="50" y="58" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="${color2}" text-anchor="middle">${label}</text>
      </svg>
    `;
    const svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
    setBadgePreview(svgDataUri);
    setBadgeFile(new File([svgString], 'sample_crest.svg', { type: 'image/svg+xml' }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required.';
    }
    if (!formData.primaryColor) {
      newErrors.primaryColor = 'Primary color is required.';
    }
    if (!formData.secondaryColor) {
      newErrors.secondaryColor = 'Secondary color is required.';
    }
    if (!formData.accentColor) {
      newErrors.accentColor = 'Accent color is required.';
    }
    if (formData.jerseyNumber && (isNaN(formData.jerseyNumber) || Number(formData.jerseyNumber) < 0 || Number(formData.jerseyNumber) > 99)) {
      newErrors.jerseyNumber = 'Number must be between 0 and 99.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to top error
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setShowConfirmModal(true);
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-white py-10 relative">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 text-center lg:text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/60 text-xs font-semibold text-cyan-400 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Kit Architect Studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans">
            Configure Your Custom Football Kit
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Input your squad's heritage, badge, and aesthetic specifications. Watch the real-time vector preview adapt instantaneously.
          </p>
        </div>

        {/* Layout Grid: Left Form (7 cols) + Right Sticky Mockup (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ================= LEFT COLUMN: CONFIGURATION FORM ================= */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* SECTION 1: TEAM INFORMATION */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0b101f] border border-slate-800/90 shadow-xl space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">1. Team Identity & Crest</h2>
                    <p className="text-xs text-slate-400">Club name, badge upload, and match branding.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Team Name */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center justify-between">
                      <span>Team Name *</span>
                      <span className="text-[11px] text-slate-500 normal-case">e.g. Thunder FC</span>
                    </label>
                    <input
                      type="text"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      placeholder="Enter team name"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${
                        errors.teamName ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
                      } text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all`}
                    />
                    {errors.teamName && (
                      <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.teamName}
                      </p>
                    )}
                  </div>

                  {/* Badge / Logo Upload Area */}
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                      Club Badge / Logo
                    </label>
                    
                    {!badgePreview ? (
                      <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500/60 rounded-2xl p-6 text-center bg-slate-900/60 transition-all group">
                        <input
                          type="file"
                          id="badge-upload"
                          accept="image/png,image/jpeg,image/svg+xml"
                          onChange={handleBadgeUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="badge-upload"
                          className="flex flex-col items-center justify-center cursor-pointer space-y-3"
                        >
                          <div className="w-12 h-12 rounded-xl bg-slate-800 group-hover:bg-cyan-950/80 group-hover:border-cyan-500/50 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-all">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-400">
                              Click to upload club badge
                            </span>
                            <span className="text-xs text-slate-500 block mt-0.5">
                              PNG, SVG, or JPG (Transparent background recommended, max 5MB)
                            </span>
                          </div>
                        </label>

                        {/* Quick Test Crest Presets */}
                        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                          <span>Or pick a test badge:</span>
                          <button
                            type="button"
                            onClick={() => applySampleBadge('TH', '#0f172a', '#f59e0b')}
                            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                          >
                            Thunder (TH)
                          </button>
                          <button
                            type="button"
                            onClick={() => applySampleBadge('VX', '#4c1d95', '#06b6d4')}
                            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                          >
                            Vortex (VX)
                          </button>
                          <button
                            type="button"
                            onClick={() => applySampleBadge('AC', '#18181b', '#eab308')}
                            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                          >
                            Crown (AC)
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-cyan-500/40">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-slate-950 p-1 border border-slate-700 flex items-center justify-center overflow-hidden">
                            <img src={badgePreview} alt="Badge Preview" className="max-w-full max-h-full object-contain" />
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-white block">Team Badge Loaded</span>
                            <span className="text-[11px] text-cyan-400 block">Applied to kit chest & preview</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={removeBadge}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Remove badge"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {errors.badge && <p className="text-xs text-rose-400">{errors.badge}</p>}
                  </div>

                  {/* Optional Sponsor Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                      Chest Sponsor (Optional)
                    </label>
                    <input
                      type="text"
                      name="sponsorName"
                      value={formData.sponsorName}
                      onChange={handleInputChange}
                      placeholder="e.g. APEX GLOBAL"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white text-sm focus:outline-none transition-all"
                    />
                  </div>

                  {/* Jersey Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                      Squad Number
                    </label>
                    <input
                      type="number"
                      name="jerseyNumber"
                      min="0"
                      max="99"
                      value={formData.jerseyNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 10"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white text-sm focus:outline-none transition-all"
                    />
                  </div>

                  {/* Optional Player Name */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                      Back Player Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="playerName"
                      value={formData.playerName}
                      onChange={handleInputChange}
                      placeholder="e.g. STERLING"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white text-sm focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: COLOUR SELECTION */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0b101f] border border-slate-800/90 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Palette className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">2. Colour Selection</h2>
                      <p className="text-xs text-slate-400">Primary base, secondary graphics & accent trims.</p>
                    </div>
                  </div>
                </div>

                {/* Quick Preset Selector */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono block">
                    Fast Palettes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => applyColorPreset(preset)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-all cursor-pointer"
                      >
                        <div className="flex items-center -space-x-1">
                          <span className="w-2.5 h-2.5 rounded-full border border-black/30" style={{ backgroundColor: preset.primary }} />
                          <span className="w-2.5 h-2.5 rounded-full border border-black/30" style={{ backgroundColor: preset.secondary }} />
                          <span className="w-2.5 h-2.5 rounded-full border border-black/30" style={{ backgroundColor: preset.accent }} />
                        </div>
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3 Colour Pickers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Primary Colour */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <label className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center justify-between">
                      <span>Primary Base</span>
                      <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: formData.primaryColor }} />
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        name="primaryColor"
                        value={formData.primaryColor}
                        onChange={handleInputChange}
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                      />
                      <input
                        type="text"
                        name="primaryColor"
                        value={formData.primaryColor}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 uppercase"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 block">Main jersey fabric & body</span>
                  </div>

                  {/* Secondary Colour */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <label className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center justify-between">
                      <span>Secondary</span>
                      <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: formData.secondaryColor }} />
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        name="secondaryColor"
                        value={formData.secondaryColor}
                        onChange={handleInputChange}
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                      />
                      <input
                        type="text"
                        name="secondaryColor"
                        value={formData.secondaryColor}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 uppercase"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 block">Pattern, mesh & stripes</span>
                  </div>

                  {/* Accent Colour */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <label className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center justify-between">
                      <span>Accent Trim</span>
                      <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: formData.accentColor }} />
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        name="accentColor"
                        value={formData.accentColor}
                        onChange={handleInputChange}
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                      />
                      <input
                        type="text"
                        name="accentColor"
                        value={formData.accentColor}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 uppercase"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 block">Collar, cuffs & lettering</span>
                  </div>
                </div>
              </div>

              {/* SECTION 3: JERSEY CONFIGURATION */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0b101f] border border-slate-800/90 shadow-xl space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Shirt className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">3. Jersey Configuration</h2>
                    <p className="text-xs text-slate-400">Kit edition and ergonomic collar construction.</p>
                  </div>
                </div>

                {/* Kit Edition Tabs */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    Kit Edition
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'home', label: 'Home Kit', desc: 'Primary match kit' },
                      { id: 'away', label: 'Away Kit', desc: 'Contrasting variant' },
                      { id: 'third', label: 'Third Kit', desc: 'Experimental collector kit' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, jerseyType: item.id }))}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.jerseyType === item.id
                            ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs font-bold block">{item.label}</span>
                        <span className="text-[10px] text-slate-500 block">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Collar Construction */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    Collar Construction
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'round', label: 'Round Neck', desc: 'Classic athletic crew' },
                      { id: 'v-neck', label: 'V-Neck', desc: 'Sharp modern silhouette' },
                      { id: 'polo', label: 'Polo Collar', desc: 'Heritage foldover placket' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, collarType: item.id }))}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.collarType === item.id
                            ? 'bg-cyan-600/20 border-cyan-400 text-white shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs font-bold block">{item.label}</span>
                        <span className="text-[10px] text-slate-500 block">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sleeves */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    Sleeve Length
                  </label>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                    <span className="font-semibold">Short Sleeves (Athletic Match Fit)</span>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-cyan-400 font-mono">STANDARD</span>
                  </div>
                </div>
              </div>

              {/* SECTION 4: DESIGN STYLE */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0b101f] border border-slate-800/90 shadow-xl space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">4. Design Style Theme</h2>
                    <p className="text-xs text-slate-400">Select the visual aesthetic pattern for the fabric weave.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {styleOptions.map((opt) => {
                    const isSelected = formData.designStyle === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, designStyle: opt.id }))}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                          isSelected
                            ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-900/20 ring-1 ring-purple-500'
                            : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                            {opt.title}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                            {opt.tag}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-tight mt-2 line-clamp-2">
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 5: ADDITIONAL INSTRUCTIONS */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0b101f] border border-slate-800/90 shadow-xl space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">5. Custom Design Instructions</h2>
                    <p className="text-xs text-slate-400">Fine-tune the generative AI with detailed aesthetic prompts.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <textarea
                    name="additionalPrompt"
                    rows={4}
                    value={formData.additionalPrompt}
                    onChange={handleInputChange}
                    placeholder="e.g. Create a modern navy blue jersey with golden diagonal stripes, a subtle honeycomb watermark texture across the chest, and electric cyan edge accents on the collar."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all leading-relaxed"
                  />

                  {/* Suggestion tags */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="text-[11px] font-mono text-slate-500">Quick Prompts:</span>
                    {[
                      'Subtle geometric honeycomb pattern',
                      'Golden diagonal sash with gradient edge',
                      'Electric lightning trims on sleeve cuffs',
                      'Minimalist European luxury stitching',
                    ].map((promptSnippet) => (
                      <button
                        key={promptSnippet}
                        type="button"
                        onClick={() =>
                          setFormData((p) => ({
                            ...p,
                            additionalPrompt: p.additionalPrompt
                              ? `${p.additionalPrompt}, ${promptSnippet}`
                              : promptSnippet,
                          }))
                        }
                        className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-cyan-400 transition-colors"
                      >
                        + {promptSnippet}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-5 rounded-2xl text-base font-black text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-2xl shadow-blue-600/30 hover:shadow-cyan-400/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer uppercase tracking-wider font-sans"
                >
                  <Sparkles className="w-5 h-5 text-cyan-200" />
                  <span>Generate My Jersey Concepts</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-xs text-slate-500 mt-2">
                  Generates 3 distinct high-resolution variations ready for Studio editing.
                </p>
              </div>
            </form>
          </div>

          {/* ================= RIGHT COLUMN: STICKY LIVE MOCKUP PREVIEW ================= */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0c1222] to-[#070a13] border border-slate-800/90 shadow-2xl backdrop-blur-xl relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Real-Time Preview
                  </span>
                  <h3 className="text-sm font-bold text-white">
                    {formData.teamName || 'Your Club Kit'}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBackView(!isBackView)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold border border-slate-700 transition-colors cursor-pointer"
                  >
                    <RotateCw className="w-3 h-3 text-cyan-400" />
                    <span>{isBackView ? 'Front' : 'Back'}</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Live Mockup */}
              <div className="py-2">
                <JerseyPreviewMockup
                  primaryColor={formData.primaryColor}
                  secondaryColor={formData.secondaryColor}
                  accentColor={formData.accentColor}
                  collarType={formData.collarType}
                  stylePattern={formData.designStyle}
                  teamName={formData.teamName}
                  badgeUrl={badgePreview}
                  sponsorName={formData.sponsorName}
                  playerName={formData.playerName}
                  jerseyNumber={formData.jerseyNumber}
                  isBackView={isBackView}
                  onToggleView={setIsBackView}
                  size="large"
                />
              </div>

              {/* Specs Summary Card */}
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Live Kit Specifications
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px]">Edition</span>
                    <span className="font-semibold text-slate-200 capitalize">{formData.jerseyType} Kit</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px]">Collar</span>
                    <span className="font-semibold text-slate-200 capitalize">{formData.collarType}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px]">Style Weave</span>
                    <span className="font-semibold text-slate-200 capitalize">{formData.designStyle}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px]">Badge</span>
                    <span className="font-semibold text-cyan-400">
                      {badgePreview ? 'Custom Crest' : 'Default Shield'}
                    </span>
                  </div>
                </div>

                {/* Color Hex Chips */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                  <span className="text-slate-400 text-[11px]">Harmonized Palette:</span>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="flex items-center gap-1 text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: formData.primaryColor }} />
                      {formData.primaryColor}
                    </span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: formData.secondaryColor }} />
                      {formData.secondaryColor}
                    </span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: formData.accentColor }} />
                      {formData.accentColor}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRMATION / PROMPT GENERATION MODAL (Prepares for Phase 2 & 3 Backend Integration) */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#0b101f] border border-cyan-500/40 shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Generation Prompt Ready</h3>
                <p className="text-xs text-slate-400">Structured prompt engineered for Phase 2/3 Backend.</p>
              </div>
            </div>

            {/* Generated Prompt Preview */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed max-h-56 overflow-y-auto space-y-2">
              <p className="text-cyan-400 font-semibold">// Constructed Generation Payload:</p>
              <p>
                "Create a premium professional football jersey for <strong>{formData.teamName}</strong>.
              </p>
              <p>
                Primary colour: {formData.primaryColor}. Secondary colour: {formData.secondaryColor}. Accent colour: {formData.accentColor}.
              </p>
              <p>
                Style: {formData.designStyle}. Collar: {formData.collarType} neck. Sleeves: short sleeves. Jersey type: {formData.jerseyType} kit.
              </p>
              {formData.sponsorName && <p>Chest Sponsor Mark: {formData.sponsorName}.</p>}
              {formData.additionalPrompt && <p>Custom Instructions: "{formData.additionalPrompt}".</p>}
              <p className="text-slate-400">
                Show a clean, front-facing jersey product mockup on a neutral studio background. Professional athletic sportswear fabric and realistic stitching."
              </p>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Phase 1 Notice:</strong> Frontend form validation and interactive vector preview are fully functional. In Phase 2 & 3, clicking proceed will dispatch this payload to the FastAPI `/api/ai/generate` endpoint.
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700"
              >
                Back To Editing
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmModal(false);
                  alert(`Phase 1 Input Validated!\nReady for Phase 2 (FastAPI Backend) and Phase 3 (AI Generation)!\nTeam: ${formData.teamName}\nColors: ${formData.primaryColor}, ${formData.secondaryColor}, ${formData.accentColor}`);
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md shadow-blue-600/30 cursor-pointer"
              >
                Proceed With Specifications
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
