import React, { useState } from 'react';
import { Filter, Search, BookOpen, Sparkles, CheckCircle, Youtube, Lightbulb, SortAsc } from 'lucide-react';
import questionsData from '../data/questions.json';
import QuestionCard from '../components/QuestionCard';
import ConceptVideoModal from '../components/ConceptVideoModal';
import FormulaCheatSheet from '../components/FormulaCheatSheet';
import TopicVideoPlayer from '../components/TopicVideoPlayer';
import { recordAttempt } from '../services/storageService';

export default function Practice() {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedSubtopic, setSelectedSubtopic] = useState('percentages');
  const [selectedOrientation, setSelectedOrientation] = useState('all');
  const [activeQuestionId, setActiveQuestionId] = useState(questionsData[0]?.id);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedStatus, setSubmittedStatus] = useState({});
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [showFormulaDrawer, setShowFormulaDrawer] = useState(true);

  // Difficulty Weight Map for ordering Simple -> Complex
  const diffOrder = { easy: 1, medium: 2, hard: 3 };

  // Filter & Sort logic (ordered from Simple -> Medium -> Complex)
  const filteredQuestions = questionsData
    .filter(q => {
      if (selectedTopic !== 'all' && q.topic !== selectedTopic) return false;
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      if (selectedSubtopic !== 'all' && q.subtopic !== selectedSubtopic) return false;
      if (selectedOrientation !== 'all' && q.orientation !== selectedOrientation) return false;
      return true;
    })
    .sort((a, b) => (diffOrder[a.difficulty] || 2) - (diffOrder[b.difficulty] || 2));

  // Extract unique subtopics
  const subtopics = Array.from(new Set(
    questionsData
      .filter(q => selectedTopic === 'all' || q.topic === selectedTopic)
      .map(q => q.subtopic)
  ));

  const currentQ = filteredQuestions.find(q => q.id === activeQuestionId) || filteredQuestions[0];

  const handleAnswerSelect = (option) => {
    if (!currentQ) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: option
    });
  };

  const handleCheckAnswer = () => {
    if (!currentQ || !selectedAnswers[currentQ.id]) return;
    setSubmittedStatus({
      ...submittedStatus,
      [currentQ.id]: true
    });

    const isCorrect = selectedAnswers[currentQ.id] === currentQ.correctAnswer;
    recordAttempt({
      questionId: currentQ.id,
      topic: currentQ.topic,
      subtopic: currentQ.subtopic,
      selectedAnswer: selectedAnswers[currentQ.id],
      correctAnswer: currentQ.correctAnswer,
      isCorrect
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title & Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-brand-400" /> Untimed Practice Bank & Pre-Question Formulas
            </h2>
            <p className="text-slate-400 text-xs mt-1">Review formulas & shortcuts before solving. Questions ordered progressively from Simple → Medium → Complex.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-mono font-semibold transition-all shadow-md"
            >
              <Youtube className="w-4 h-4 text-rose-400" />
              <span>Watch Concept Video</span>
            </button>

            <div className="text-xs font-mono font-bold px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300">
              {filteredQuestions.length} Questions
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-800/60">
          
          {/* Domain Filter */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Subject Domain</label>
            <select
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setSelectedSubtopic('all');
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-500"
            >
              <option value="all">All Subjects</option>
              <option value="aptitude">Quantitative Aptitude</option>
              <option value="verbal">Verbal Ability</option>
              <option value="data-interpretation">Data Interpretation</option>
              <option value="logical-reasoning">Logical Reasoning</option>
            </select>
          </div>

          {/* Subtopic Filter */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Subtopic</label>
            <select
              value={selectedSubtopic}
              onChange={(e) => setSelectedSubtopic(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-500"
            >
              <option value="all">All Subtopics</option>
              {subtopics.map(sub => (
                <option key={sub} value={sub}>{sub.replace(/-/g, ' ')}</option>
              ))}
            </select>
          </div>

          {/* Question Orientation Filter */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Orientation</label>
            <select
              value={selectedOrientation}
              onChange={(e) => setSelectedOrientation(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-500"
            >
              <option value="all">All Orientations</option>
              <option value="IndiaBIX Standard">IndiaBIX Standard Questions</option>
              <option value="GeeksforGeeks PYQ">GeeksforGeeks PYQs</option>
              <option value="Conceptual">Conceptual Foundation</option>
              <option value="Formula & Application">Formula & Direct Application</option>
              <option value="Shortcut Trick">Shortcut Trick / Speed Math</option>
              <option value="GATE / Placement PYQ">GATE & Placement Exam PYQ</option>
            </select>
          </div>

          {/* Difficulty Filter (Simple -> Complex) */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Difficulty Range</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-500"
            >
              <option value="all">Simple → Complex (All)</option>
              <option value="easy">Simple / Basic</option>
              <option value="medium">Medium / Intermediate</option>
              <option value="hard">Complex / GATE Level</option>
            </select>
          </div>

        </div>
      </div>

      {/* Topic-Oriented YouTube Video Tutorial Player Embedded directly on Practice Page */}
      <TopicVideoPlayer
        key={currentQ?.subtopic || selectedSubtopic}
        subtopic={selectedSubtopic !== 'all' ? selectedSubtopic : (currentQ?.subtopic || 'percentages')}
      />

      {/* Pre-Question Topic Formula Cheat Sheet */}
      <FormulaCheatSheet
        subtopic={selectedSubtopic !== 'all' ? selectedSubtopic : (currentQ?.subtopic || 'percentages')}
        defaultOpen={false}
      />

      {/* Content Layout: Question Picker Drawer + Question Card */}
      {filteredQuestions.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center text-slate-400">
          No questions match the selected filters. Please adjust your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left 1 Col: Question Selector List */}
          <div className="lg:col-span-1 glass-card rounded-2xl p-4 border border-slate-800 h-fit max-h-[600px] overflow-y-auto space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 px-2 pb-2 border-b border-slate-800 uppercase">
              <span>Questions (Simple→Complex)</span>
              <SortAsc className="w-3.5 h-3.5 text-brand-400" />
            </div>
            {filteredQuestions.map((q, idx) => {
              const isActive = currentQ?.id === q.id;
              const isDone = submittedStatus[q.id];
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-brand-600 text-white font-semibold shadow-md'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${q.difficulty === 'easy' ? 'bg-emerald-400' : q.difficulty === 'medium' ? 'bg-amber-400' : 'bg-rose-400'}`} />
                    <span className="truncate" title={q.question}>
                      Q{idx + 1}. <span className="text-slate-400 font-mono text-[10px]">[{q.orientation ? q.orientation.split(' ')[0] : 'Q'}]</span> {q.question}
                    </span>
                  </div>
                  {isDone && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>

          {/* Right 3 Cols: Question Card & Submit Trigger */}
          <div className="lg:col-span-3 space-y-4">
            <QuestionCard
              question={currentQ}
              selectedAnswer={selectedAnswers[currentQ?.id]}
              onAnswerSelect={handleAnswerSelect}
              isSubmitted={submittedStatus[currentQ?.id]}
              showExplanationDirectly={submittedStatus[currentQ?.id]}
            />

            {!submittedStatus[currentQ?.id] && (
              <div className="flex justify-end pt-2">
                <button
                  disabled={!selectedAnswers[currentQ?.id]}
                  onClick={handleCheckAnswer}
                  className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm transition-all shadow-lg shadow-brand-950/50"
                >
                  Check Solution & Submit
                </button>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Embedded Concept Video Tutorial Modal */}
      <ConceptVideoModal
        subtopic={selectedSubtopic !== 'all' ? selectedSubtopic : (currentQ?.subtopic || 'percentages')}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

    </div>
  );
}
