import React from 'react';
import { X, Play, Youtube, BookOpen, Sparkles, ExternalLink, Video, CheckCircle2, Search } from 'lucide-react';
import conceptVideos from '../data/conceptVideos.json';

export default function ConceptVideoModal({ subtopic = 'percentages', isOpen, onClose }) {
  if (!isOpen) return null;

  // Normalize subtopic key fallback
  const normalizedKey = (subtopic || 'percentages').toLowerCase().replace(/\s+/g, '-');
  const videoData = conceptVideos[normalizedKey] || conceptVideos['percentages'];

  const directWatchUrl = videoData.directWatchUrl || `https://www.youtube.com/watch?v=${videoData.videoId || 'rVq8hUvhFmg'}`;
  const searchUrl = videoData.searchUrl || `https://www.youtube.com/results?search_query=Aptitude+${encodeURIComponent(subtopic)}+Tricks+GATE+Smashers`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl glass-card rounded-3xl border border-rose-500/30 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-500/20 bg-rose-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-900/80 border border-rose-500/40 text-rose-300">
              <Youtube className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 uppercase">
                  {normalizedKey.replace(/-/g, ' ')}
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-slate-100">{videoData.title}</h3>
              </div>
              <p className="text-xs text-rose-300 font-mono">Channel: {videoData.channel}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-950">
          
          {/* Main Video Action Card (Replaces un-embeddable iframe) */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-rose-950/80 via-slate-900 to-slate-950 border border-rose-500/30 p-6 shadow-2xl space-y-4">
            
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-900/60 border border-rose-500/30 text-rose-300 font-mono text-xs font-semibold">
                  <Play className="w-3.5 h-3.5 fill-rose-300" /> Topic Masterclass Video
                </div>
                <h4 className="font-serif font-bold text-xl text-white">
                  {videoData.title}
                </h4>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {videoData.keyConcepts}
                </p>
              </div>
            </div>

            {/* Guaranteed Live YouTube Launch Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={directWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs sm:text-sm transition-all shadow-lg shadow-rose-950/60 hover:scale-[1.02]"
              >
                <Youtube className="w-5 h-5 fill-white" />
                <span>Watch {normalizedKey.replace(/-/g, ' ')} Video on YouTube</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>

              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono font-semibold text-xs transition-all hover:border-rose-500/40"
              >
                <Search className="w-4 h-4 text-rose-400" />
                <span>Search Top GATE & Placement Tutorials</span>
              </a>
            </div>

            <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Direct YouTube launch ensures 100% video availability with zero embed errors or region restrictions.</span>
            </div>
          </div>

          {/* Key Formulas Cheat-Sheet */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Core Formulas & Shortcuts Cheat-Sheet
            </div>
            <ul className="space-y-2">
              {videoData.keyFormulas.map((formula, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-200 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-amber-400 font-bold shrink-0">•</span>
                  <span>{formula}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conceptual Notes */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" /> Concept & Strategy Breakdown
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {videoData.keyConcepts}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

