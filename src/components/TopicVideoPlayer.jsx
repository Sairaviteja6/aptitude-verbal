import React, { useState, useEffect } from 'react';
import { Youtube, Play, ExternalLink, ChevronDown, ChevronUp, Sparkles, Video, ListFilter, RefreshCw } from 'lucide-react';
import conceptVideos from '../data/conceptVideos.json';

export default function TopicVideoPlayer({ subtopic = 'percentages' }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedVideoKey, setSelectedVideoKey] = useState(subtopic);
  const [useIframe, setUseIframe] = useState(false);

  // Sync internal state whenever parent subtopic prop changes
  useEffect(() => {
    if (subtopic && subtopic !== 'all') {
      setSelectedVideoKey(subtopic);
      setUseIframe(false); // Reset to interactive thumbnail card on topic switch
    }
  }, [subtopic]);

  // Normalize subtopic key fallback
  const normalizedKey = (selectedVideoKey || 'percentages').toLowerCase().replace(/\s+/g, '-');
  const videoData = conceptVideos[normalizedKey] || conceptVideos['percentages'];

  const videoId = videoData.videoId || 'Fb0B_32dTYg';
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const directWatchUrl = videoData.directWatchUrl || `https://www.youtube.com/watch?v=${videoId}`;
  const searchUrl = videoData.searchUrl || `https://www.youtube.com/results?search_query=Aptitude+${encodeURIComponent(normalizedKey)}+Tricks`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

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
              onChange={(e) => {
                setSelectedVideoKey(e.target.value);
                setUseIframe(false);
              }}
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
            <span>Open YouTube</span>
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

      {/* Expanded Video Container Section */}
      {isExpanded && (
        <div className="p-4 bg-slate-950/80 space-y-4 animate-fade-in">
          
          {/* Dual Mode: Interactive Thumbnail Card OR Embedded Iframe */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
            {useIframe ? (
              <iframe
                key={embedUrl}
                src={embedUrl}
                title={videoData.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : (
              <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-slate-950">
                {/* High Res Thumbnail Background */}
                <img
                  src={thumbnailUrl}
                  alt={videoData.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-4 max-w-lg">
                  <div className="p-4 rounded-full bg-rose-600/90 text-white shadow-2xl shadow-rose-600/50 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>

                  <div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-500/40 uppercase">
                      {videoData.channel}
                    </span>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-white mt-2 drop-shadow-md">
                      {videoData.title}
                    </h3>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => setUseIframe(true)}
                      className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-semibold transition-all shadow"
                    >
                      Embed Player
                    </button>

                    <a
                      href={directWatchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs transition-all shadow-lg shadow-rose-950/60"
                    >
                      <Youtube className="w-4 h-4" />
                      <span>Watch Full Lesson on YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono pt-1 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Topic: <strong className="text-rose-400 uppercase">{normalizedKey.replace(/-/g, ' ')}</strong></span>
            </div>

            <div className="flex items-center gap-3">
              {useIframe && (
                <button
                  onClick={() => setUseIframe(false)}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 text-xs font-mono"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Show Card View</span>
                </button>
              )}

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
