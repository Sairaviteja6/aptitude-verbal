import React from 'react';
import { X, Play, Youtube, BookOpen, Sparkles, ExternalLink, Video } from 'lucide-react';
import conceptVideos from '../data/conceptVideos.json';

export default function ConceptVideoModal({ subtopic = 'percentages', isOpen, onClose }) {
  if (!isOpen) return null;

  // Normalize subtopic key fallback
  const normalizedKey = (subtopic || 'percentages').toLowerCase().replace(/\s+/g, '-');
  const videoData = conceptVideos[normalizedKey] || conceptVideos['percentages'];

  const directWatchUrl = videoData.directWatchUrl || `https://www.youtube.com/watch?v=${videoData.videoId || 'Fb0B_32dTYg'}`;
  const searchUrl = videoData.searchUrl || `https://www.youtube.com/results?search_query=Aptitude+${encodeURIComponent(subtopic)}+Tricks`;
  const embedUrl = videoData.videoUrl || `https://www.youtube-nocookie.com/embed/${videoData.videoId || 'Fb0B_32dTYg'}?rel=0&modestbranding=1`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl glass-card rounded-3xl border border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-950 border border-rose-500/40 text-rose-400">
              <Youtube className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-base sm:text-lg text-slate-100">{videoData.title}</h3>
              <p className="text-xs text-rose-400 font-mono font-medium">Topic Channel: {videoData.channel}</p>
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
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* YouTube Embedded Video Player Container */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
            <iframe
              src={embedUrl}
              title={videoData.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          {/* Quick Action Watch Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
              <Video className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Video playback not loading? Watch directly on YouTube:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={directWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs transition-all shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play on YouTube App/Web</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>

              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-semibold text-xs transition-all border border-slate-700"
              >
                <Youtube className="w-3.5 h-3.5 text-rose-400" />
                <span>Search All {subtopic.replace(/-/g, ' ')} Video Tutorials</span>
              </a>
            </div>
          </div>

          {/* Key Formulas Cheat-Sheet */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-2 text-brand-400 font-mono text-xs font-bold uppercase tracking-wider">
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
