import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

export default function Timer({ durationMinutes = 15, onTimeUp, isActive = true }) {
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);

  useEffect(() => {
    setSecondsLeft(durationMinutes * 60);
  }, [durationMinutes]);

  useEffect(() => {
    if (!isActive) return;

    if (secondsLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, isActive, onTimeUp]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  const isWarning = secondsLeft < 120; // less than 2 mins
  const isCritical = secondsLeft < 30;  // less than 30 secs

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold text-sm sm:text-base transition-all duration-300 ${
      isCritical
        ? 'bg-rose-950/80 text-rose-300 border-rose-600/50 animate-pulse'
        : isWarning
        ? 'bg-amber-950/70 text-amber-300 border-amber-500/50'
        : 'bg-slate-900/80 text-slate-200 border-slate-700'
    }`}>
      {isCritical ? (
        <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
      ) : (
        <Clock className={`w-4 h-4 ${isWarning ? 'text-amber-400' : 'text-slate-400'}`} />
      )}
      <span>
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </span>
    </div>
  );
}
