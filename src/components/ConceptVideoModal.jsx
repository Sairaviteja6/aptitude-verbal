import React from 'react';
import { X, Play, Youtube, BookOpen, Sparkles, ExternalLink } from 'lucide-react';
import conceptVideos from '../data/conceptVideos.json';

export default function ConceptVideoModal({ subtopic = 'percentages', isOpen, onClose }) {
  if (!isOpen) return null;

  const videoData = conceptVideos[subtopic] || conceptVideos['percentages'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl glass-card rounded-3xl border border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-400">
              <Youtube className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-lg text-slate-100">{videoData.title}</h3>
              <p className="text-xs text-slate-400 font-mono">Channel: {videoData.channel}</p>
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
          
          {/* YouTube Video Player Embed */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
            <iframe
              src={videoData.videoUrl}
              title={videoData.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* External Links */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <a
              href={videoData.youtubeLink || `https://www.youtube.com/results?search_query=Aptitude+${encodeURIComponent(subtopic)}+Tricks`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-xs text-rose-300 font-mono font-semibold transition-all"
            >
              <Youtube className="w-4 h-4 text-rose-400" />
              <span>Search All {subtopic.replace(/-/g, ' ')} Videos on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
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
            <div className="flex items-center gap-2 text-sage-400 font-mono text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" /> Concept Breakdown
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
