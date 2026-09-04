import React, { useState } from 'react';
import { Bookmark, CheckCircle2, XCircle, HelpCircle, ChevronDown, ChevronUp, Sparkles, Youtube } from 'lucide-react';
import { toggleBookmark, getBookmarks } from '../services/storageService';
import ConceptVideoModal from './ConceptVideoModal';

export default function QuestionCard({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswerSelect, 
  selectedAnswer,
  isSubmitted,
  showExplanationDirectly = false,
  onNextQuestion
}) {
  const [showExplanation, setShowExplanation] = useState(showExplanationDirectly);
  const [bookmarks, setBookmarks] = useState(getBookmarks());
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  if (!question) return null;

  const isBookmarked = bookmarks.includes(question.id);

  const handleBookmarkToggle = () => {
    const updated = toggleBookmark(question.id);
    setBookmarks(updated);
  };

  const getDifficultyBadge = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40';
      case 'medium':
        return 'bg-amber-950/60 text-amber-400 border-amber-800/40';
      case 'hard':
        return 'bg-rose-950/60 text-rose-400 border-rose-800/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getOrientationBadge = (orient) => {
    switch (orient) {
      case 'Shortcut Trick':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      case 'GATE / Placement PYQ':
        return 'bg-purple-950/80 text-purple-300 border-purple-500/40';
      case 'Conceptual':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40';
      case 'Formula & Application':
        return 'bg-sage-950/80 text-sage-300 border-sage-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <>
      <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800/80 transition-all duration-300">
        
        {/* Header Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800/60 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {questionNumber && (
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-950/60 text-brand-300 border border-brand-800/40">
                Q{questionNumber} of {totalQuestions}
              </span>
            )}
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 uppercase tracking-wider font-mono">
              {question.subtopic || question.topic}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border uppercase font-mono ${getDifficultyBadge(question.difficulty)}`}>
              {question.difficulty}
            </span>
            {question.orientation && (
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border font-mono ${getOrientationBadge(question.orientation)}`}>
                ⚡ {question.orientation}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Watch Concept Video Button */}
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg border bg-rose-950/40 text-rose-300 border-rose-500/30 hover:bg-rose-900/50 transition-colors"
            >
              <Youtube className="w-3.5 h-3.5 text-rose-400" />
              <span>Concept Video</span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmarkToggle}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
          </div>
        </div>

        {/* Question Text */}
        <div className="mb-8">
          <p className="text-slate-100 text-base sm:text-lg font-medium leading-relaxed font-sans">
            {question.question}
          </p>
        </div>

        {/* Options Grid */}
        <div className="space-y-3.5 mb-8">
          {question.options.map((option, index) => {
            const letter = String.fromCharCode(65 + index);
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === question.correctAnswer;
            
            let optionStyle = "border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:bg-slate-900";
            let letterStyle = "bg-slate-800 text-slate-400 border-slate-700";

            if (isSubmitted) {
              if (isCorrectOption) {
                optionStyle = "border-emerald-500/50 bg-emerald-950/40 text-emerald-200 shadow-sm";
                letterStyle = "bg-emerald-500 text-slate-950 font-bold border-emerald-400";
              } else if (isSelected && !isCorrectOption) {
                optionStyle = "border-rose-500/50 bg-rose-950/40 text-rose-200";
                letterStyle = "bg-rose-500 text-white font-bold border-rose-400";
              } else {
                optionStyle = "border-slate-800/40 bg-slate-950/30 text-slate-500 opacity-60";
              }
            } else if (isSelected) {
              optionStyle = "border-brand-500 bg-brand-950/40 text-brand-100 ring-1 ring-brand-500/30 shadow-inner";
              letterStyle = "bg-brand-500 text-white font-bold border-brand-400";
            }

            return (
              <button
                key={index}
                disabled={isSubmitted}
                onClick={() => onAnswerSelect && onAnswerSelect(option)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${optionStyle}`}
              >
                <div className="flex items-center gap-3.5">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono border transition-all ${letterStyle}`}>
                    {letter}
                  </span>
                  <span className="text-sm sm:text-base font-medium">{option}</span>
                </div>

                {isSubmitted && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isSubmitted && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Post-Submission Explanation & Action controls */}
        {isSubmitted && (
          <div className="pt-4 border-t border-slate-800/60 space-y-4 animate-fade-in">
            
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center justify-between w-full p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-400" />
                <span>Step-by-Step Solution & Explanation</span>
              </div>
              {showExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showExplanation && (
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 text-sm leading-relaxed space-y-2 font-sans">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Correct Answer: {question.correctAnswer}
                </div>
                <p className="pt-1 text-slate-300">{question.explanation}</p>
              </div>
            )}

            {onNextQuestion && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={onNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition-all shadow-md shadow-brand-900/30"
                >
                  Continue to Next Question →
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Embedded Concept Video Tutorial Modal */}
      <ConceptVideoModal
        subtopic={question.subtopic}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </>
  );
}
