import React, { useState, useEffect } from 'react';
import { CheckCircle2, RefreshCw, Trophy, Zap, AlertCircle, ArrowRight } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';
import { getDailyQuestions, markDailyCompleted } from '../services/storageService';

export default function DailyQuestions({ onStreakUpdate }) {
  const [dailyData, setDailyData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [summaryResults, setSummaryResults] = useState(null);

  useEffect(() => {
    const data = getDailyQuestions();
    setDailyData(data);
    if (data.completed) {
      setIsSubmitted(true);
    }
  }, []);

  if (!dailyData || !dailyData.questions || dailyData.questions.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
        <RefreshCw className="w-8 h-8 text-brand-400 animate-spin mx-auto" />
        <p className="text-slate-300 font-medium">Loading today's workout...</p>
      </div>
    );
  }

  const questions = dailyData.questions;
  const currentQ = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSelectAnswer = (option) => {
    if (isSubmitted) return;
    setUserAnswers({
      ...userAnswers,
      [currentQ.id]: option
    });
  };

  const handleSubmitDailyWorkout = () => {
    const results = questions.map(q => {
      const selected = userAnswers[q.id] || null;
      return {
        questionId: q.id,
        topic: q.topic,
        subtopic: q.subtopic,
        selectedAnswer: selected,
        correctAnswer: q.correctAnswer,
        isCorrect: selected === q.correctAnswer
      };
    });

    const updated = markDailyCompleted(results);
    setDailyData(updated);
    setIsSubmitted(true);
    setSummaryResults(results);
    if (onStreakUpdate) onStreakUpdate();
  };

  const correctCount = isSubmitted 
    ? questions.filter(q => userAnswers[q.id] === q.correctAnswer || (dailyData.results?.find(r => r.questionId === q.id)?.isCorrect)).length 
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 glass-card rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4 fill-amber-400" /> Today's Targeted Daily Workout
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-100">Daily 5-Question Challenge</h2>
          <p className="text-slate-400 text-xs mt-1">Weighted automatically by your past accuracy</p>
        </div>

        {/* Progress Stepper Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
          {questions.map((q, idx) => {
            const isAnswered = Boolean(userAnswers[q.id]);
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
                  isCurrent
                    ? 'bg-brand-500 text-white ring-2 ring-brand-400/50'
                    : isAnswered
                    ? 'bg-slate-700 text-slate-200'
                    : 'bg-slate-950/60 text-slate-500 hover:text-slate-300'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Completion Banner if already submitted */}
      {isSubmitted && (
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-lg text-emerald-200">Daily Workout Completed!</h3>
              <p className="text-xs text-emerald-300/80">
                You scored <strong className="font-mono text-emerald-200 text-sm">{correctCount} / {questions.length}</strong> correct today. Streak maintained!
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-emerald-900/60 border border-emerald-700/50 text-emerald-200">
            Locked for today
          </span>
        </div>
      )}

      {/* Question Card */}
      <QuestionCard
        question={currentQ}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        selectedAnswer={userAnswers[currentQ.id] || (dailyData.results?.find(r => r.questionId === currentQ.id)?.selectedAnswer)}
        onAnswerSelect={handleSelectAnswer}
        isSubmitted={isSubmitted}
      />

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(prev => prev - 1)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-sm transition-colors"
        >
          ← Previous
        </button>

        {!isSubmitted ? (
          isLast ? (
            <button
              onClick={handleSubmitDailyWorkout}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium text-sm shadow-lg shadow-emerald-950/50 transition-all hover:scale-[1.02]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Workout</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition-all"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )
        ) : (
          !isLast && (
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-colors"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )
        )}
      </div>

    </div>
  );
}
