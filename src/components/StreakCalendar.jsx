import React from 'react';
import { Flame, Trophy, Calendar } from 'lucide-react';

export default function StreakCalendar({ streak }) {
  const activeDates = new Set(streak?.activeDates || []);

  // Generate last 14 days grid
  const daysGrid = [];
  const today = new Date();
  
  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const isToday = i === 0;
    const isActive = activeDates.has(dateStr);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'narrow' });
    const dayNum = date.getDate();

    daysGrid.push({
      dateStr,
      isToday,
      isActive,
      dayName,
      dayNum
    });
  }

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400">
            <Flame className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-slate-100">Study Streak</h3>
            <p className="text-xs text-slate-400">Continuous daily practice days</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xl font-mono font-bold text-amber-400">{streak.current} Days</div>
            <div className="text-[11px] text-slate-400 flex items-center justify-end gap-1">
              <Trophy className="w-3 h-3 text-amber-500" /> Best: {streak.max}d
            </div>
          </div>
        </div>
      </div>

      {/* 14-Day Grid */}
      <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 pt-2">
        {daysGrid.map((day) => (
          <div 
            key={day.dateStr}
            className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
              day.isActive
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-sm shadow-amber-500/10'
                : day.isToday
                ? 'bg-slate-800 border-slate-700 text-slate-300 ring-1 ring-brand-500/40'
                : 'bg-slate-950/40 border-slate-800/60 text-slate-500'
            }`}
          >
            <span className="text-[10px] font-mono uppercase text-slate-400">{day.dayName}</span>
            <span className="text-xs font-bold font-mono mt-1">{day.dayNum}</span>
            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${day.isActive ? 'bg-amber-400 animate-pulse' : 'bg-transparent'}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
