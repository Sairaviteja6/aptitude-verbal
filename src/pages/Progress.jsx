import React, { useState } from 'react';
import { BarChart3, Bookmark, Trophy, CheckCircle, Clock, BookOpen } from 'lucide-react';
import AccuracyChart from '../components/AccuracyChart';
import QuestionCard from '../components/QuestionCard';
import questionsData from '../data/questions.json';
import { getTopicAccuracyStats, getMockHistory, getBookmarks } from '../services/storageService';

export default function Progress({ attempts }) {
  const [activeSubTab, setActiveSubTab] = useState('charts'); // 'charts' | 'history' | 'bookmarks'
  const topicStats = getTopicAccuracyStats();
  const mockHistory = getMockHistory();
  const bookmarkedIds = getBookmarks();

  const bookmarkedQuestions = questionsData.filter(q => bookmarkedIds.includes(q.id));

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Sub-tab Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('charts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeSubTab === 'charts'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Subject Analytics</span>
          </button>

          <button
            onClick={() => setActiveSubTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeSubTab === 'history'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Mock Exam History ({mockHistory.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('bookmarks')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeSubTab === 'bookmarks'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Bookmarked ({bookmarkedQuestions.length})</span>
          </button>
        </div>
      </div>

      {/* Sub-tab 1: Recharts Analytics */}
      {activeSubTab === 'charts' && (
        <div className="space-y-8">
          <AccuracyChart topicStats={topicStats} />

          {/* Detailed domain stats list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'aptitude', title: 'Quantitative Aptitude', color: 'border-brand-500/40 text-brand-400' },
              { key: 'verbal', title: 'Verbal Ability', color: 'border-sage-500/40 text-sage-400' },
              { key: 'data-interpretation', title: 'Data Interpretation', color: 'border-amber-500/40 text-amber-400' },
              { key: 'logical-reasoning', title: 'Logical Reasoning', color: 'border-indigo-500/40 text-indigo-400' },
            ].map(domain => {
              const stats = topicStats[domain.key] || { accuracy: 0, total: 0, correct: 0 };
              return (
                <div key={domain.key} className={`glass-card rounded-2xl p-5 border ${domain.color} space-y-2`}>
                  <div className="text-xs font-mono uppercase font-bold text-slate-400">{domain.title}</div>
                  <div className={`text-2xl font-mono font-bold ${domain.color.split(' ')[1]}`}>
                    {stats.accuracy}% <span className="text-xs text-slate-400 font-sans">Accuracy</span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono pt-2 border-t border-slate-800">
                    {stats.correct} correct / {stats.total} total
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-tab 2: Mock Exam History */}
      {activeSubTab === 'history' && (
        <div className="space-y-4">
          {mockHistory.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center text-slate-400">
              No mock test attempts recorded yet. Complete a mock test to view performance history.
            </div>
          ) : (
            mockHistory.slice().reverse().map(item => (
              <div key={item.id} className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-slate-100">{item.section?.toUpperCase()} MOCK EXAM</h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{item.date} • {item.totalQuestions} Questions</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xl font-mono font-bold text-emerald-400">{item.score}%</div>
                    <div className="text-[11px] text-slate-400 font-mono">{item.correctCount} / {item.totalQuestions} Correct</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Sub-tab 3: Bookmarked Questions */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-6">
          {bookmarkedQuestions.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center text-slate-400">
              No bookmarked questions yet. Click the bookmark icon on any question to save it here for revision.
            </div>
          ) : (
            bookmarkedQuestions.map((q, idx) => (
              <QuestionCard
                key={q.id}
                question={q}
                questionNumber={idx + 1}
                totalQuestions={bookmarkedQuestions.length}
                selectedAnswer={q.correctAnswer}
                isSubmitted={true}
                showExplanationDirectly={true}
              />
            ))
          )}
        </div>
      )}

    </div>
  );
}
