import React, { useState } from 'react';
import { Youtube, Play, ExternalLink, ChevronDown, ChevronUp, Sparkles, Video } from 'lucide-react';
import conceptVideos from '../data/conceptVideos.json';

export default function TopicVideoPlayer({ subtopic = 'percentages' }) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Normalize subtopic key fallback
  const normalizedKey = (subtopic || 'percentages').toLowerCase().replace(/\s+/g, '-');
  const videoData = conceptVideos[normalizedKey] || conceptVideos['percentages'];

  const directWatchUrl = videoData.directWatchUrl || `https://www.youtube.com/watch?v=${videoData.videoId || 'Fb0B_32dTYg'}`;
  const searchUrl = videoData.searchUrl || `https://www.youtube.com/results?search_query=Aptitude+${encodeURIComponent(subtopic)}+Tricks`;
  const embedUrl = videoData.videoUrl || `https://www.youtube-nocookie.com/embed/${videoData.videoId || 'Fb0B_32dTYg'}?rel=0&modestbranding=1`;

  return (
    <div className="glass-card rounded-2xl border border-rose-500/30 overflow-hidden shadow-xl transition-all duration-300">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-rose-950/40 border-b border-rose-500/20">
        <div className="flex items-center gap-3 truncate">
          <div className="p-2 rounded-xl bg-rose-900/60 border border-rose-500/40 text-rose-400 shrink-0">
            <Youtube className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 uppercase">
                {subtopic.replace(/-/g, ' ')}
              </span>
              <h4 className="font-serif font-bold text-sm text-slate-100 truncate">{videoData.title}</h4>
            </div>
            <p className="text-[11px] text-slate-400 font-mono truncate">Channel: {videoData.channel}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={directWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-all shadow"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>YouTube App</span>
          </a>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title={isExpanded ? "Collapse Video" : "Expand Video"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Video Embed Section */}
      {isExpanded && (
        <div className="p-4 bg-slate-950/80 space-y-4 animate-fade-in">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
            <iframe
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
              <span>Watch topic video tutorial while practicing questions</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-rose-300 hover:text-rose-200 font-semibold"
              >
                <span>Search All {subtopic.replace(/-/g, ' ')} Videos</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
