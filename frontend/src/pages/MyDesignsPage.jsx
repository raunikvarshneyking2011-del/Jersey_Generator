import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Plus,
  Edit3,
  Copy,
  Trash2,
  Download,
  Calendar,
  Sparkles,
  Shield,
  Eye,
} from 'lucide-react';
import JerseyPreviewMockup from '../components/JerseyPreviewMockup';

export default function MyDesignsPage() {
  const [designs, setDesigns] = useState([
    {
      id: 'des-01',
      name: 'Thunder Electric 2026/27',
      teamName: 'Thunder FC',
      jerseyType: 'Home Kit',
      style: 'geometric',
      primaryColor: '#0f172a',
      secondaryColor: '#f59e0b',
      accentColor: '#38bdf8',
      collarType: 'round',
      sponsorName: 'HYPERION',
      playerName: 'STERLING',
      jerseyNumber: '10',
      createdAt: '2026-11-12',
    },
    {
      id: 'des-02',
      name: 'Cyber Vortex Away Special',
      teamName: 'Vortex SC',
      jerseyType: 'Away Kit',
      style: 'futuristic',
      primaryColor: '#4c1d95',
      secondaryColor: '#ec4899',
      accentColor: '#a78bfa',
      collarType: 'v-neck',
      sponsorName: 'QUANTUM',
      playerName: 'MODRIC',
      jerseyNumber: '7',
      createdAt: '2026-11-10',
    },
    {
      id: 'des-03',
      name: 'Monolith Heritage Collector',
      teamName: 'Juventus AC',
      jerseyType: 'Third Kit',
      style: 'striped',
      primaryColor: '#18181b',
      secondaryColor: '#eab308',
      accentColor: '#ffffff',
      collarType: 'polo',
      sponsorName: 'PIRELLI',
      playerName: 'DEL PIERO',
      jerseyNumber: '9',
      createdAt: '2026-11-08',
    },
  ]);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this design?')) {
      setDesigns(designs.filter((d) => d.id !== id));
    }
  };

  const handleDuplicate = (design) => {
    const copy = {
      ...design,
      id: `des-${Date.now()}`,
      name: `${design.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setDesigns([copy, ...designs]);
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-slate-800 gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/60 text-xs font-semibold text-cyan-400 font-mono">
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Project Locker</span>
            </div>
            <h1 className="text-3xl font-black text-white">My Kit Designs</h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Manage, reopen, duplicate, and download your customized football jersey projects.
            </p>
          </div>

          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Kit</span>
          </Link>
        </div>

        {/* Designs Grid */}
        {designs.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 p-8">
            <FolderKanban className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-1">No Saved Designs Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
              You haven't saved any jersey configurations yet. Head to the studio to design your first kit.
            </p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Designing</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designs.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl bg-[#0b101f] border border-slate-800 hover:border-slate-700 transition-all overflow-hidden flex flex-col group shadow-xl"
              >
                {/* Visual Vector Mockup Preview */}
                <div className="p-4 bg-gradient-to-b from-[#11192e] to-[#0a0f1d] flex items-center justify-center border-b border-slate-800/80">
                  <JerseyPreviewMockup
                    primaryColor={item.primaryColor}
                    secondaryColor={item.secondaryColor}
                    accentColor={item.accentColor}
                    collarType={item.collarType}
                    stylePattern={item.style}
                    teamName={item.teamName}
                    sponsorName={item.sponsorName}
                    playerName={item.playerName}
                    jerseyNumber={item.jerseyNumber}
                    size="small"
                    showControls={false}
                  />
                </div>

                {/* Card Info & Actions */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-mono text-cyan-400 uppercase">{item.jerseyType}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {item.createdAt}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400">{item.teamName}</p>
                  </div>

                  {/* Action Buttons Toolbar */}
                  <div className="pt-3 border-t border-slate-800/80 grid grid-cols-4 gap-2">
                    <Link
                      to={`/create?primary=${encodeURIComponent(item.primaryColor)}&secondary=${encodeURIComponent(item.secondaryColor)}&accent=${encodeURIComponent(item.accentColor)}&style=${item.style}&team=${encodeURIComponent(item.teamName)}&sponsor=${encodeURIComponent(item.sponsorName)}&collar=${item.collarType}`}
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 text-[10px] font-semibold border border-slate-800 transition-colors"
                      title="Edit Design in Studio"
                    >
                      <Edit3 className="w-3.5 h-3.5 mb-1" />
                      <span>Edit</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDuplicate(item)}
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-[10px] font-semibold border border-slate-800 transition-colors cursor-pointer"
                      title="Duplicate Design"
                    >
                      <Copy className="w-3.5 h-3.5 mb-1 text-slate-400" />
                      <span>Clone</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => alert(`Downloading high-resolution export package for ${item.name}`)}
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-[10px] font-semibold border border-slate-800 transition-colors cursor-pointer"
                      title="Download PNG Export"
                    >
                      <Download className="w-3.5 h-3.5 mb-1 text-slate-400" />
                      <span>Export</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 text-[10px] font-semibold border border-slate-800 transition-colors cursor-pointer"
                      title="Delete Design"
                    >
                      <Trash2 className="w-3.5 h-3.5 mb-1 text-rose-500" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
