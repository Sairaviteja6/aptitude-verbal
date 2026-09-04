import React, { useState, useEffect } from 'react';
import { Youtube, Play, ExternalLink, ChevronDown, ChevronUp, Sparkles, Video, ListFilter, BookOpen } from 'lucide-react';
import conceptVideos from '../data/conceptVideos.json';

export default function TopicVideoPlayer({ subtopic = 'percentages' }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedVideoKey, setSelectedVideoKey] = useState(subtopic);

  // Sync internal state whenever parent subtopic prop changes
  useEffect(() => {
    if (subtopic && subtopic !== 'all') {
      setSelectedVideoKey(subtopic);
    }
  }, [subtopic]);

  // Normalize subtopic key fallback
  const normalizedKey = (selectedVideoKey || 'percentages').toLowerCase().replace(/\s+/g, '-');
  const videoData = conceptVideos[normalizedKey] || conceptVideos['percentages'];

  const searchUrl = videoData.searchUrl || `https://www.youtube.com/results?search_query=Aptitude+${encodeURIComponent(normalizedKey)}+Tricks+GATE+Smashers`;
  const directWatchUrl = videoData.directWatchUrl || searchUrl;
  const availableTopics = Object.keys(conceptVideos);

  return (
    <div className="glass-card rounded-2xl border border-rose-500/30 overflow-hidden shadow-xl transition-all duration-300">
      
      {/* Header Bar with Topic Selector Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-rose-950/50 border-b border-rose-500/20">
        <div className="flex items-center gap-3 truncate min-w-[240px]">
          <div className="p-2 rounded-xl bg-rose-900/60 border border-rose-500/40 text-rose-400 shrink-0">
            <Youtube className="w-5 h-5" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 uppercase">
                {normalizedKey.replace(/-/g, ' ')}
              </span>
              <h4 className="font-serif font-bold text-sm text-slate-100 truncate">{videoData.title}</h4>
            </div>
            <p className="text-[11px] text-rose-300 font-mono truncate">Recommended: {videoData.channel}</p>
          </div>
        </div>

        {/* Topic Video Switcher & Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Dropdown to pick ANY topic's video */}
          <div className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-700">
            <ListFilter className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <select
              value={normalizedKey}
              onChange={(e) => setSelectedVideoKey(e.target.value)}
              className="bg-transparent text-slate-200 text-xs font-mono font-semibold focus:outline-none cursor-pointer"
            >
              {availableTopics.map(tKey => (
                <option key={tKey} value={tKey} className="bg-slate-900 text-slate-200">
                  Topic: {tKey.replace(/-/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-md"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>Watch Topic Videos on YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title={isExpanded ? "Collapse Video Section" : "Expand Video Section"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Interactive Learning Card */}
      {isExpanded && (
        <div className="p-5 bg-slate-950/90 space-y-4 animate-fade-in">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Left 2 Cols: Main Topic Video Action Banner */}
            <div className="md:col-span-2 p-5 rounded-2xl bg-gradient-to-br from-rose-950/70 via-slate-900 to-slate-950 border border-rose-500/30 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-rose-900 text-rose-200 uppercase">
                    Topic Tutorial Guide
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{videoData.channel}</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-white">
                  {videoData.title}
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {videoData.keyConcepts}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs transition-all shadow-lg shadow-rose-950/60"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Open {normalizedKey.replace(/-/g, ' ')} Video Lessons on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>

                <a
                  href={directWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-semibold transition-all"
                >
                  <Play className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  <span>Direct Channel Link</span>
                </a>
              </div>
            </div>

            {/* Right 1 Col: Quick Formula Cheat Sheet */}
            <div className="md:col-span-1 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Key Formula Shortcuts
                </div>
                <ul className="space-y-1.5">
                  {videoData.keyFormulas.map((f, idx) => (
                    <li key={idx} className="text-[11px] font-mono text-slate-300 bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                      • {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 text-[10px] font-mono text-slate-400 border-t border-slate-800 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-brand-400" /> Review rules while practicing questions
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
