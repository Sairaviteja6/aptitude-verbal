import React from 'react';
import { 
  Flame, 
  Target, 
  Zap, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Clock, 
  BarChart2,
  Sparkles
} from 'lucide-react';
import StreakCalendar from '../components/StreakCalendar';
import { getDailyQuestions, getTopicAccuracyStats } from '../services/storageService';

export default function Dashboard({ setActiveTab, streak, attempts }) {
  const dailySet = getDailyQuestions();
  const topicStats = getTopicAccuracyStats();

  const totalAttempted = attempts.length;
  const correctCount = attempts.filter(a => a.isCorrect).length;
  const overallAccuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

  // Find lowest accuracy topic
  const lowestTopicEntry = Object.entries(topicStats)
    .filter(([_, stats]) => stats.total > 0)
    .sort((a, b) => a[1].accuracy - b[1].accuracy)[0];

  const lowestTopicName = lowestTopicEntry ? lowestTopicEntry[0] : null;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-brand-950/40 p-8 sm:p-10 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-950/80 border border-brand-800/60 text-brand-300 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" /> 100% Free GATE & Placement Practice Engine
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
            Build Consistency. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-amber-300 to-sage-400">
              Master Aptitude & Verbal.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed">
            Daily targeted workouts, untimed topic drills, and full timed mock exams crafted to elevate your accuracy and speed.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab('daily')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-medium text-sm shadow-lg shadow-brand-900/40 transition-all hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>{dailySet.completed ? 'Review Today\'s Workout' : 'Start Today\'s Daily Workout'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('mock')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium text-sm transition-all"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Take Timed Mock Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Streak */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs uppercase font-mono tracking-wider font-semibold">Active Streak</span>
            <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400">
              <Flame className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="text-3xl font-mono font-bold text-slate-100">{streak.current} <span className="text-sm font-sans font-normal text-slate-400">Days</span></div>
          <p className="text-xs text-amber-400/90 mt-2 font-medium">Best: {streak.max} days consecutive</p>
        </div>

        {/* Metric 2: Questions Solved */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs uppercase font-mono tracking-wider font-semibold">Total Solved</span>
            <div className="p-2 rounded-xl bg-brand-950/60 border border-brand-500/30 text-brand-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-mono font-bold text-slate-100">{totalAttempted}</div>
          <p className="text-xs text-slate-400 mt-2">Questions completed in bank</p>
        </div>

        {/* Metric 3: Accuracy */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs uppercase font-mono tracking-wider font-semibold">Overall Accuracy</span>
            <div className="p-2 rounded-xl bg-sage-950/60 border border-sage-500/30 text-sage-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-mono font-bold text-emerald-400">{overallAccuracy}%</div>
          <p className="text-xs text-slate-400 mt-2">{correctCount} of {totalAttempted} correct</p>
        </div>

        {/* Metric 4: Daily Goal Status */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs uppercase font-mono tracking-wider font-semibold">Daily Goal</span>
            <div className="p-2 rounded-xl bg-slate-800 text-slate-300">
              {dailySet.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Clock className="w-4 h-4 text-amber-400" />}
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-slate-100">
            {dailySet.completed ? 'Completed' : '5 Pending'}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {dailySet.completed ? 'Great job! Return tomorrow.' : 'Targeted set ready for today.'}
          </p>
        </div>

      </div>

      {/* Main Grid: Streak Calendar & Weak Spot Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Streak Calendar */}
        <div className="lg:col-span-2">
          <StreakCalendar streak={streak} />
        </div>

        {/* Right 1 Col: Smart Recommendation / Weak Spot */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase font-bold tracking-wider mb-2">
              <AlertCircle className="w-4 h-4" /> Smart Focus Recommendation
            </div>
            <h3 className="font-serif text-xl font-semibold text-slate-100 mb-2">
              {lowestTopicName ? `Target ${lowestTopicName.toUpperCase()}` : 'Explore All Topics'}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {lowestTopicName 
                ? `Your current accuracy in ${lowestTopicName} is ${topicStats[lowestTopicName]?.accuracy}%. Spend 15 minutes reviewing solutions.`
                : 'Solve daily practice sets to unlock personalized weak topic insights.'
              }
            </p>
          </div>

          <button
            onClick={() => setActiveTab('practice')}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-brand-300 font-medium text-sm transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Practice Bank</span>
          </button>
        </div>

      </div>

    </div>
  );
}
