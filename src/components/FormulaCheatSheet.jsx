import React, { useState } from 'react';
import { BookOpen, Sparkles, ChevronDown, ChevronUp, Copy, Check, Lightbulb, Zap } from 'lucide-react';
import topicFormulas from '../data/topicFormulas.json';

export default function FormulaCheatSheet({ subtopic = 'percentages', isCollapsible = true, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const formulaData = topicFormulas[subtopic] || topicFormulas['percentages'];

  if (!formulaData) return null;

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="glass-card rounded-2xl border border-brand-500/30 bg-brand-950/20 overflow-hidden transition-all duration-300 shadow-xl">
      
      {/* Header Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-brand-950/80 via-slate-900 to-slate-900 border-b border-brand-800/40 text-left transition-colors hover:bg-slate-900"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-brand-600/30 border border-brand-500/40 text-brand-300">
            <Lightbulb className="w-5 h-5 text-amber-400 fill-amber-400/20 animate-pulse-subtle" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-amber-400" /> Pre-Question Formula Guide
            </div>
            <h3 className="font-serif font-bold text-slate-100 text-base sm:text-lg">
              {formulaData.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-brand-300">
          <span>{isOpen ? 'Hide Formulas' : 'Review Formulas Before Solving'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expandable Formula Body */}
      {isOpen && (
        <div className="p-6 space-y-6 animate-fade-in bg-slate-950/60">
          
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            {formulaData.description}
          </p>

          {/* Formulas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formulaData.formulas.map((item, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2.5 hover:border-brand-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-brand-300 uppercase tracking-wide">
                    {item.name}
                  </h4>
                  <button
                    onClick={() => handleCopy(item.equation, idx)}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-[10px] font-mono flex items-center gap-1"
                  >
                    {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs font-bold text-emerald-300 overflow-x-auto">
                  {item.equation}
                </div>

                {item.example && (
                  <p className="text-[11px] text-slate-400 font-sans italic pt-1 border-t border-slate-800/60">
                    💡 <strong className="text-slate-300">Example:</strong> {item.example}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Short Tricks & Tips */}
          {formulaData.shortcuts && formulaData.shortcuts.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase">
                <Sparkles className="w-4 h-4 text-amber-400" /> Shortcut Tricks & Speed Rules
              </div>
              <ul className="space-y-1.5">
                {formulaData.shortcuts.map((tip, index) => (
                  <li key={index} className="text-xs text-amber-200/90 font-mono flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">⚡</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
