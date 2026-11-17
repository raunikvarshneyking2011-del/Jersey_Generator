import React from 'react';
import { Link } from 'react-router-dom';
import { Shirt, Sparkles, Shield, Heart, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050810] border-t border-slate-800/80 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-[2px]">
                <div className="w-full h-full bg-[#090e1a] rounded-[10px] flex items-center justify-center">
                  <Shirt className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-black tracking-wider text-white font-mono uppercase">
                Jersey<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Design Your Identity. Wear Your Legacy. The AI-powered football jersey design studio engineered for grassroots clubs, esports squads, and professional kits.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>AI Engine Online & Ready</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  Home Landing
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  Create Jersey Studio <span className="text-[10px] text-cyan-400 font-mono">NEW</span>
                </Link>
              </li>
              <li>
                <Link to="/my-designs" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  My Designs Library
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  About the Engine
                </Link>
              </li>
            </ul>
          </div>

          {/* Design Styles */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Kit Styles</h4>
            <ul className="space-y-2 text-xs">
              <li className="text-slate-400 hover:text-white transition-colors">Modern Geometric Kits</li>
              <li className="text-slate-400 hover:text-white transition-colors">Minimalist European Matchwear</li>
              <li className="text-slate-400 hover:text-white transition-colors">Retro 90s Heritage Striped</li>
              <li className="text-slate-400 hover:text-white transition-colors">Futuristic Cyber Gradient</li>
              <li className="text-slate-400 hover:text-white transition-colors">Abstract Dynamic Waves</li>
            </ul>
          </div>

          {/* Athletic Tech Standard */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Pro Standards</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every generation produces high-fidelity vector mockups and editable fabric layers suitable for sublimation printing and 3D garment visualization.
            </p>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
              <span className="font-semibold text-cyan-400">Fabric.js + AI:</span> Independent vector overlays for badges, squad numbers & sponsor marks.
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} JerseyAI. "Design Your Identity. Wear Your Legacy." All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Sublimation Specs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
