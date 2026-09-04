import React, { useState, useEffect } from 'react';
import { Youtube, Play, ExternalLink, ChevronDown, ChevronUp, Sparkles, Video, ListFilter } from 'lucide-react';
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

  const directWatchUrl = videoData.directWatchUrl || `https://www.youtube.com/watch?v=${videoData.videoId || 'Fb0B_32dTYg'}`;
  const searchUrl = videoData.searchUrl || `https://www.youtube.com/results?search_query=Aptitude+${encodeURIComponent(normalizedKey)}+Tricks`;
  const embedUrl = videoData.videoUrl || `https://www.youtube-nocookie.com/embed/${videoData.videoId || 'Fb0B_32dTYg'}?rel=0&modestbranding=1`;

  const availableTopics = Object.keys(conceptVideos);

  return (
    <div className="glass-card rounded-2xl border border-rose-500/30 overflow-hidden shadow-xl transition-all duration-300">
      
      {/* Header Bar with Topic Selector Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-rose-950/50 border-b border-rose-500/20">
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
            <p className="text-[11px] text-rose-300 font-mono truncate">Channel: {videoData.channel}</p>
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
                  Video: {tKey.replace(/-/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <a
            href={directWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-all shadow"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>YouTube App</span>
          </a>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title={isExpanded ? "Collapse Video" : "Expand Video"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Video Embed Section */}
      {isExpanded && (
        <div className="p-4 bg-slate-950/80 space-y-4 animate-fade-in">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
            <iframe
              key={embedUrl}
              src={embedUrl}
              title={videoData.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono pt-1 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Playing topic video for: <strong className="text-rose-400 uppercase">{normalizedKey.replace(/-/g, ' ')}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-rose-300 hover:text-rose-200 font-semibold"
              >
                <span>Search All {normalizedKey.replace(/-/g, ' ')} Tutorials</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
