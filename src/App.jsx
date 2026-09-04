import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DailyQuestions from './pages/DailyQuestions';
import Practice from './pages/Practice';
import MockTest from './pages/MockTest';
import Progress from './pages/Progress';
import { getStreak, updateStreak, getAttempts } from './services/storageService';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [streak, setStreak] = useState(getStreak());
  const [attempts, setAttempts] = useState(getAttempts());

  useEffect(() => {
    const updated = updateStreak();
    setStreak(updated);
    setAttempts(getAttempts());
  }, [activeTab]);

  const handleStreakUpdate = () => {
    const updated = updateStreak();
    setStreak(updated);
    setAttempts(getAttempts());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} streak={streak} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard setActiveTab={setActiveTab} streak={streak} attempts={attempts} />
        )}

        {activeTab === 'daily' && (
          <DailyQuestions onStreakUpdate={handleStreakUpdate} />
        )}

        {activeTab === 'practice' && (
          <Practice />
        )}

        {activeTab === 'mock' && (
          <MockTest onTestComplete={handleStreakUpdate} />
        )}

        {activeTab === 'progress' && (
          <Progress attempts={attempts} />
        )}
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-800/80 py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-serif">
            Aptitude <span className="text-brand-400 font-sans">&</span> Verbal Prep — Free Tier GATE & Campus Placement Platform
          </p>
          <p className="font-mono text-slate-400">
            Client-Side Firestore Ready • Local Storage Enabled
          </p>
        </div>
      </footer>

    </div>
  );
}
