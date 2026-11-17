import React from 'react';
import { Link } from 'react-router-dom';
import { Shirt, Sparkles, Shield, Cpu, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#070a13] text-white py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Intro */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/60 text-xs font-semibold text-cyan-400 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Athletic Intelligence Platform</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Design Your Identity. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Wear Your Legacy.
            </span>
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            JerseyAI bridges generative artificial intelligence and professional sportswear manufacturing standards. We empower football clubs of every level to create iconic kit designs without needing specialized 3D garment software.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl bg-[#0b101f] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Generative Precision</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trained on athletic garment geometry, aerodynamic seam cuts, and professional kit design principles. Every prompt yields realistic studio-lit mockups.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0b101f] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Interactive Studio</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We separate underlying fabric artwork from vector badges, numbers, and sponsor typography. Fine-tune your kit on an interactive Fabric.js canvas.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0b101f] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Sublimation-Ready</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Export high-resolution transparent assets and vector specifications ready to send directly to dye-sublimation garment printers and manufacturers.
            </p>
          </div>
        </div>

        {/* Technical Architecture Overview */}
        <div className="p-8 rounded-3xl bg-[#0d1322] border border-slate-800/80 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>The JerseyAI Technology Stack</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400 font-mono">React 19 + Vite</span>
              <p className="text-slate-400">Ultra-fast reactive UI with Tailwind CSS and responsive sports-tech design identity.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400 font-mono">Fabric.js Canvas Engine</span>
              <p className="text-slate-400">Multi-layer interactive vector canvas for badges, squad numbers, and sponsor manipulation.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400 font-mono">Python FastAPI Backend</span>
              <p className="text-slate-400">High-performance asynchronous REST API with SQLAlchemy, Pydantic, and PostgreSQL persistence.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400 font-mono">Configurable AI Image Pipeline</span>
              <p className="text-slate-400">Dedicated prompt engineer service producing three distinct kit variations with reference badge conditioning.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/create"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 shadow-xl shadow-blue-600/30 hover:shadow-cyan-400/40 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>Launch Jersey Creator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
