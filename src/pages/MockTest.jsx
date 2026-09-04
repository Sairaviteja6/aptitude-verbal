import React, { useState } from 'react';
import { Clock, Play, Award, RotateCcw, AlertTriangle, CheckCircle2, Bookmark, ArrowRight } from 'lucide-react';
import questionsData from '../data/questions.json';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';
import { recordMockTest } from '../services/storageService';

export default function MockTest({ onTestComplete }) {
  const [testState, setTestState] = useState('config'); // 'config' | 'active' | 'results'
  const [selectedSection, setSelectedSection] = useState('all');
  const [timeLimit, setTimeLimit] = useState(10); // minutes
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [testResult, setTestResult] = useState(null);

  const startTest = () => {
    let pool = [...questionsData];
    if (selectedSection !== 'all') {
      pool = pool.filter(q => q.topic === selectedSection);
    }
    // Shuffle and pick 10 questions
    const selected = pool.sort(() => 0.5 - Math.random()).slice(0, 10);
    setQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setMarkedForReview(new Set());
    setTestState('active');
  };

  const handleSelectAnswer = (option) => {
    const currentQ = questions[currentIndex];
    setUserAnswers({
      ...userAnswers,
      [currentQ.id]: option
    });
  };

  const toggleMarkForReview = () => {
    const currentQ = questions[currentIndex];
    const newSet = new Set(markedForReview);
    if (newSet.has(currentQ.id)) {
      newSet.delete(currentQ.id);
    } else {
      newSet.add(currentQ.id);
    }
    setMarkedForReview(newSet);
  };

  const finishTest = () => {
    let correctCount = 0;
    const details = questions.map(q => {
      const ans = userAnswers[q.id] || null;
      const isCorrect = ans === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        selectedAnswer: ans,
        correctAnswer: q.correctAnswer,
        isCorrect
      };
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const summary = {
      section: selectedSection,
      totalQuestions: questions.length,
      correctCount,
      score,
      details
    };

    recordMockTest(summary);
    setTestResult(summary);
    setTestState('results');
    if (onTestComplete) onTestComplete();
  };

  // Render Config Screen
  if (testState === 'config') {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div className="glass-card rounded-3xl p-8 border border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-brand-600 flex items-center justify-center mx-auto text-white shadow-lg shadow-amber-500/20">
            <Clock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold text-slate-100">Timed Exam Simulator</h2>
            <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
              Simulate actual GATE and campus placement exam conditions with strict countdown timer and question palette navigation.
            </p>
          </div>

          <div className="space-y-4 text-left max-w-md mx-auto pt-4 border-t border-slate-800">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">Test Section</label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-brand-500"
              >
                <option value="all">Full Mixed Exam (Quant + Verbal + DI + LR)</option>
                <option value="aptitude">Quantitative Aptitude Only</option>
                <option value="verbal">Verbal Ability Only</option>
                <option value="logical-reasoning">Logical Reasoning Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase font-semibold mb-2">Duration</label>
              <div className="grid grid-cols-3 gap-3">
                {[5, 10, 15].map(mins => (
                  <button
                    key={mins}
                    onClick={() => setTimeLimit(mins)}
                    className={`py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                      timeLimit === mins
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {mins} Minutes
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={startTest}
            className="w-full max-w-md flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-medium text-base shadow-xl shadow-brand-950/60 transition-all hover:scale-[1.01]"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Begin Mock Exam</span>
          </button>
        </div>
      </div>
    );
  }

  // Render Results Screen
  if (testState === 'results') {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="glass-card rounded-3xl p-8 border border-slate-800 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold text-slate-100">Exam Results Summary</h2>
            <p className="text-slate-400 text-sm mt-1">Section: {testResult?.section?.toUpperCase()}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto py-4 border-y border-slate-800">
            <div>
              <div className="text-3xl font-mono font-bold text-emerald-400">{testResult?.score}%</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Score</div>
            </div>
            <div>
              <div className="text-3xl font-mono font-bold text-slate-100">{testResult?.correctCount} / {testResult?.totalQuestions}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Correct</div>
            </div>
            <div>
              <div className="text-3xl font-mono font-bold text-amber-400">{timeLimit}m</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Time Limit</div>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => setTestState('config')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Take Another Test</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Active Test Interface
  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      
      {/* Top Controls Header */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-950 text-brand-300 border border-brand-800">
            Mock Exam Mode
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">Q{currentIndex + 1} of {questions.length}</span>
        </div>

        <div className="flex items-center gap-4">
          <Timer durationMinutes={timeLimit} onTimeUp={finishTest} />
          
          <button
            onClick={finishTest}
            className="px-4 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-700/50 text-rose-300 font-medium text-xs font-mono transition-colors"
          >
            Finish & Submit
          </button>
        </div>
      </div>

      {/* Main Grid: Question View + Question Palette Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Question Area */}
        <div className="lg:col-span-3 space-y-4">
          <QuestionCard
            question={currentQ}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={userAnswers[currentQ?.id]}
            onAnswerSelect={handleSelectAnswer}
            isSubmitted={false}
          />

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={toggleMarkForReview}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-medium transition-colors ${
                markedForReview.has(currentQ?.id)
                  ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{markedForReview.has(currentQ?.id) ? 'Marked for Review' : 'Mark for Review'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-40 text-slate-300 text-xs font-medium"
              >
                Prev
              </button>
              
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={finishTest}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium"
                >
                  Submit Exam
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Question Palette Drawer */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 h-fit space-y-4">
          <div className="text-xs font-mono font-bold text-slate-300 uppercase pb-3 border-b border-slate-800">
            Question Palette
          </div>

          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const isAnswered = Boolean(userAnswers[q.id]);
              const isMarked = markedForReview.has(q.id);

              let paletteStyle = "bg-slate-900 text-slate-400 border-slate-800";
              if (isCurrent) paletteStyle = "ring-2 ring-brand-400 bg-brand-600 text-white";
              else if (isMarked) paletteStyle = "bg-amber-950 text-amber-300 border-amber-500/50";
              else if (isAnswered) paletteStyle = "bg-emerald-950 text-emerald-300 border-emerald-500/40";

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 rounded-lg text-xs font-mono font-bold border flex items-center justify-center transition-all ${paletteStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="space-y-2 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-950 border border-emerald-500/40 inline-block" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-950 border border-amber-500/50 inline-block" />
              <span>Marked for Review</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-slate-900 border border-slate-800 inline-block" />
              <span>Unanswered</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
