import React, { useState } from 'react';
import { Flame, Trophy, Calendar, CheckCircle2, Target, ChevronLeft, ChevronRight, BookOpen, Clock } from 'lucide-react';

// 30-Day GATE & Placement Exam Preparation Roadmap
const PREP_SCHEDULE_30_DAYS = [
  { day: 1, topic: "percentages", title: "Day 1: Percentages & Base Shifting", category: "Quantitative Aptitude" },
  { day: 2, topic: "profit-and-loss", title: "Day 2: Profit, Loss & Marked Price Discounts", category: "Quantitative Aptitude" },
  { day: 3, topic: "ratio-and-proportion", title: "Day 3: Ratio, Proportion & Means", category: "Quantitative Aptitude" },
  { day: 4, topic: "time-and-work", title: "Day 4: Time & Work (LCM Method)", category: "Quantitative Aptitude" },
  { day: 5, topic: "speed-and-distance", title: "Day 5: Speed, Distance & Train Crossing Rules", category: "Quantitative Aptitude" },
  { day: 6, topic: "interest", title: "Day 6: Simple & Compound Interest Tricks", category: "Quantitative Aptitude" },
  { day: 7, topic: "mock-test", title: "Day 7: Weekly Revision & Quant Mini Mock Test", category: "Assessment" },
  { day: 8, topic: "probability", title: "Day 8: Probability, Dice & Cards", category: "Quantitative Aptitude" },
  { day: 9, topic: "permutations-and-combinations", title: "Day 9: Permutations & Combinations (Selection vs Arrangement)", category: "Quantitative Aptitude" },
  { day: 10, topic: "syllogisms", title: "Day 10: Syllogisms & Minimal Overlap Venn Diagrams", category: "Logical Reasoning" },
  { day: 11, topic: "blood-relations", title: "Day 11: Blood Relations & Family Tree Diagrams", category: "Logical Reasoning" },
  { day: 12, topic: "number-series", title: "Day 12: Number Series & Pattern Recognition", category: "Logical Reasoning" },
  { day: 13, topic: "data-interpretation", title: "Day 13: Data Interpretation Tables & Calculation Shortcuts", category: "Data Interpretation" },
  { day: 14, topic: "data-interpretation", title: "Day 14: Bar Charts & Line Graphs Speed Math", category: "Data Interpretation" },
  { day: 15, topic: "mock-test", title: "Day 15: Mid-Way Full Length Placement Mock Test", category: "Assessment" },
  { day: 16, topic: "reading-comprehension", title: "Day 16: Verbal Reading Comprehension Skimming", category: "Verbal Ability" },
  { day: 17, topic: "sentence-correction", title: "Day 17: Grammar & Sentence Correction Rules", category: "Verbal Ability" },
  { day: 18, topic: "reading-comprehension", title: "Day 18: Author Tone, Main Idea & Inference", category: "Verbal Ability" },
  { day: 19, topic: "sentence-correction", title: "Day 19: Subject-Verb Agreement & Parallelism", category: "Verbal Ability" },
  { day: 20, topic: "syllogisms", title: "Day 20: Advanced Syllogisms & Either-Or Conditions", category: "Logical Reasoning" },
  { day: 21, topic: "time-and-work", title: "Day 21: Pipes & Cisterns Efficiency Problems", category: "Quantitative Aptitude" },
  { day: 22, topic: "speed-and-distance", title: "Day 22: Boats, Streams & Relative Speed", category: "Quantitative Aptitude" },
  { day: 23, topic: "data-interpretation", title: "Day 23: Mixed Chart DI & Pie Chart Percentages", category: "Data Interpretation" },
  { day: 24, topic: "percentages", title: "Day 24: High-Level GATE PYQs (Quant & Logic)", category: "GATE Exam Level" },
  { day: 25, topic: "mock-test", title: "Day 25: Full Length GATE General Aptitude Mock", category: "Assessment" },
  { day: 26, topic: "profit-and-loss", title: "Day 26: Dishonest Dealer & Successive Discounts PYQs", category: "Quantitative Aptitude" },
  { day: 27, topic: "probability", title: "Day 27: Independent Events & Conditional Probability", category: "Quantitative Aptitude" },
  { day: 28, topic: "blood-relations", title: "Day 28: Coded Blood Relations & Seating PYQs", category: "Logical Reasoning" },
  { day: 29, topic: "mock-test", title: "Day 29: Final All-India Placement Speed Test", category: "Assessment" },
  { day: 30, topic: "all", title: "Day 30: Comprehensive Exam Mastery & Formula Revision", category: "Mastery" }
];

export default function StreakCalendar({ streak }) {
  const activeDates = new Set(streak?.activeDates || []);
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  // Real Month Calculation
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Get active schedule item for selected date
  const scheduleDayIndex = (selectedDay - 1) % PREP_SCHEDULE_30_DAYS.length;
  const currentScheduledItem = PREP_SCHEDULE_30_DAYS[scheduleDayIndex];

  // Helper to format date string YYYY-MM-DD
  const formatDateStr = (dayNum) => {
    const m = String(currentMonth + 1).padStart(2, '0');
    const d = String(dayNum).padStart(2, '0');
    return `${currentYear}-${m}-${d}`;
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
      
      {/* Header & Streak Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-400">
            <Flame className="w-6 h-6 fill-amber-400 animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-100 flex items-center gap-2">
              Real Calendar & 30-Day Prep Schedule
            </h3>
            <p className="text-xs text-slate-400 font-mono">Date-by-date target schedule for GATE & Campus Placements</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-slate-800">
          <div className="text-right">
            <div className="text-xs font-mono uppercase text-slate-400">Active Streak</div>
            <div className="text-lg font-mono font-extrabold text-amber-400">{streak?.current || 0} Days</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-right">
            <div className="text-xs font-mono uppercase text-slate-400">Max Streak</div>
            <div className="text-lg font-mono font-extrabold text-brand-400">{streak?.max || 0} Days</div>
          </div>
        </div>
      </div>

      {/* Calendar Month Navigation Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-brand-400" />
          <h4 className="font-serif text-lg font-bold text-slate-100">
            {monthNames[currentMonth]} {currentYear}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            title="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            title="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real Month Calendar Grid */}
      <div className="space-y-2">
        {/* Day Names Header */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono font-bold text-slate-400 uppercase py-1">
          {weekDays.map((day) => (
            <div key={day} className="py-1">{day}</div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty offset slots before 1st of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-12 rounded-2xl bg-slate-950/20 opacity-30" />
          ))}

          {/* Actual days of current month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dateStr = formatDateStr(dayNum);
            const isToday = dayNum === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
            const isActive = activeDates.has(dateStr);
            const isSelected = dayNum === selectedDay;

            let cardStyle = "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700";
            if (isActive) {
              cardStyle = "bg-emerald-950/50 border-emerald-500/60 text-emerald-200 shadow-md shadow-emerald-950/40 font-bold";
            } else if (isToday) {
              cardStyle = "bg-brand-950/80 border-brand-500 text-brand-200 ring-2 ring-brand-500/40 font-bold";
            }

            if (isSelected) {
              cardStyle += " ring-2 ring-amber-400 border-amber-400 scale-[1.03]";
            }

            return (
              <button
                key={dayNum}
                onClick={() => setSelectedDay(dayNum)}
                className={`h-12 rounded-2xl border p-1.5 flex flex-col items-center justify-between transition-all relative ${cardStyle}`}
              >
                <div className="flex items-center justify-between w-full px-1">
                  <span className="text-xs font-mono font-semibold">{dayNum}</span>
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                </div>

                <div className="w-full flex items-center justify-center">
                  {isToday ? (
                    <span className="text-[9px] font-mono font-bold uppercase text-brand-400 tracking-tighter">TODAY</span>
                  ) : isActive ? (
                    <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ) : (
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scheduled Preparation Details for Selected Date */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-slate-900/60 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-slate-200 uppercase">
              Selected Date Target: {monthNames[currentMonth]} {selectedDay}, {currentYear}
            </span>
          </div>

          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-brand-950 text-brand-300 border border-brand-800">
            {currentScheduledItem.category}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
          <div>
            <h5 className="font-serif font-bold text-base text-slate-100">{currentScheduledItem.title}</h5>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Recommended Target: Complete 5 questions + watch concept video tutorial for <span className="text-brand-400 capitalize">{currentScheduledItem.topic.replace(/-/g, ' ')}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-400" /> 30-45 mins/day
            </span>
          </div>
        </div>
      </div>

      {/* 30-Day Roadmap List Overview */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-semibold text-sm text-slate-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand-400" /> Full 30-Day GATE & Placement Study Schedule Roadmap
          </h4>
          <span className="text-xs font-mono text-slate-400">Day 1 to Day 30</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
          {PREP_SCHEDULE_30_DAYS.map((item) => {
            const isCurrentSelected = item.day === selectedDay;
            return (
              <button
                key={item.day}
                onClick={() => setSelectedDay(item.day)}
                className={`text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                  isCurrentSelected
                    ? 'bg-brand-950/80 border-brand-500 text-white shadow-md'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="truncate">
                  <div className="font-mono font-bold text-brand-400 text-[11px]">{item.title.split(':')[0]}</div>
                  <div className="font-medium text-slate-200 truncate mt-0.5">{item.title.split(':')[1] || item.title}</div>
                </div>
                <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0 ml-2">
                  {item.category.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
