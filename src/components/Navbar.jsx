import React, { useState } from 'react';
import { 
  Flame, 
  LayoutDashboard, 
  CalendarCheck, 
  BookOpen, 
  Clock, 
  BarChart3, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, streak = { current: 0 } }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'daily', label: 'Daily Workout', icon: CalendarCheck },
    { id: 'practice', label: 'Practice Bank', icon: BookOpen },
    { id: 'mock', label: 'Mock Exam', icon: Clock },
    { id: 'progress', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
              <Sparkles className="w-5 h-5 animate-pulse-subtle" />
            </div>
            <div>
              <h1 className="font-serif font-semibold text-lg text-slate-100 tracking-tight flex items-center gap-1.5">
                Quant<span className="text-brand-400 font-sans font-light">&</span>Verbal
              </h1>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">GATE & Placement Prep</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-800/90 text-brand-400 border border-slate-700/60 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action / Streak Indicator */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900/90 border border-amber-500/30 px-3.5 py-1.5 rounded-full shadow-inner">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
              <span className="text-xs font-mono font-semibold text-amber-300">
                {streak.current} {streak.current === 1 ? 'Day' : 'Days'} Streak
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-mono font-semibold text-amber-300">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{streak.current}d</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-brand-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-brand-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
