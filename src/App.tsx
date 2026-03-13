import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, BookOpen, Clock, Play } from 'lucide-react';
import type { Question } from './types';
import { parseJsonQuestions } from './utils/dataParser';
import { useQuiz } from './hooks/useQuiz';
import { useTestMode } from './hooks/useTestMode';
import { Toast } from './components/Toast';
import { ReviewModal } from './components/ReviewModal';
import { RemainingCount } from './components/RemainingCount';
import { TestModeHeader } from './components/TestModeHeader';
import { TestModeNavigation } from './components/TestModeNavigation';
import { TestModeResult } from './components/TestModeResult';

interface QuestionDisplayProps {
  question: Question;
  index: number;
  isSelected: boolean;
  isAnswering: boolean;
  isTestMode: boolean;
  isReviewMode: boolean;
  chosenAnswerIndex?: number;
  onAnswerSelect: (index: number) => void;
  onToggleFlag?: () => void;
  isFlagged?: boolean;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  index,
  isSelected,
  isAnswering,
  isTestMode,
  isReviewMode,
  chosenAnswerIndex,
  onAnswerSelect,
  onToggleFlag,
  isFlagged,
}) => {
  return (
    <motion.div
      data-testid={`question-display-${isTestMode ? 'test' : 'practice'}`}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="flex flex-col gap-6"
    >
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {question.imageUrl && (
          <div className="w-full bg-slate-100 aspect-video flex items-center justify-center p-4">
            <img 
              src={question.imageUrl} 
              alt="Question visual" 
              className="max-h-full max-w-full object-contain rounded-lg"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold">
              {question.category || 'כללי'}
            </span>
            {isTestMode && !isReviewMode && onToggleFlag && (
              <button 
                onClick={onToggleFlag}
                className={`p-2 rounded-full transition-colors ${isFlagged ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'}`}
              >
                <Clock size={18} fill={isFlagged ? "currentColor" : "none"} />
              </button>
            )}
          </div>
          <h2 className="text-xl font-bold leading-tight text-slate-800">
            {question.title}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {question.answers.map((answer, i) => {
          const isUserSelected = isReviewMode && chosenAnswerIndex === i;
          const isCurrentlySelected = !isReviewMode && isSelected && index === i;

          let showCorrect = isAnswering && answer.isCorrect;
          let showIncorrect = isAnswering && isCurrentlySelected && !answer.isCorrect;

          if (isReviewMode) {
            showCorrect = answer.isCorrect;
            showIncorrect = isUserSelected && !answer.isCorrect;
          }
          
          let buttonClass = "w-full p-5 text-right rounded-2xl border-2 transition-all flex items-center justify-between gap-4 ";
          
          if (isAnswering || isReviewMode) {
            if (answer.isCorrect) {
              buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-900";
            } else if (isUserSelected || (isCurrentlySelected && !isReviewMode)) {
              buttonClass += "border-red-500 bg-red-50 text-red-900";
            } else {
              buttonClass += "border-slate-100 opacity-50";
            }
          } else {
            buttonClass += "border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50 active:scale-[0.98]";
            // In Test Mode, if already answered, highlight the selection without feedback
            if (isTestMode && chosenAnswerIndex !== undefined && chosenAnswerIndex === i) {
               buttonClass += "ring-2 ring-blue-500 bg-blue-50/50 ";
            }
          }

          return (
            <button
              key={i}
              onClick={() => onAnswerSelect(i)}
              disabled={isAnswering || isReviewMode}
              className={buttonClass}
            >
              <span className="text-lg font-medium">{answer.text}</span>
              {showCorrect && <CheckCircle data-testid="CheckCircle" className="w-6 h-6 text-emerald-500 shrink-0" />}
              {showIncorrect && <XCircle data-testid="XCircle" className="w-6 h-6 text-red-500 shrink-0" />}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export function App() {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for immediate feedback UI
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Modal state
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Test Mode State
  const [isTestModeActive, setIsTestModeActive] = useState(false);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [flaggedIndices, setFlaggedIndices] = useState<number[]>([]);
  const [isShowingTestReview, setIsShowingTestReview] = useState(false);

  const {
    currentQuestion: practiceQuestion,
    knownCount,
    reviewCount,
    remainingCount,
    handleAnswer: handlePracticeAnswer,
    bringReviewToFront,
    reviewSession,
    resetReviewSession,
  } = useQuiz(allQuestions);

  const {
    questions: testQuestions,
    userAnswers: testUserAnswers,
    timeLeft,
    isFinished: isTestFinished,
    isPassed: isTestPassed,
    score: testScore,
    startTest,
    submitTest,
    handleAnswer: handleTestAnswer,
  } = useTestMode(allQuestions);

  useEffect(() => {
    fetch('/datastore_search.json')
      .then((res) => res.text())
      .then((json) => {
        const parsed = parseJsonQuestions(json);
        setAllQuestions(parsed);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load questions:', err);
        setError('שגיאה בטעינת השאלות. נא לוודא שקובץ הנתונים קיים.');
        setLoading(false);
      });
  }, []);

  // Handle Review Session completion
  useEffect(() => {
    if (reviewSession && reviewSession.count === reviewSession.total) {
      if (reviewSession.failed) {
        const timer = setTimeout(() => {
          setShowReviewModal(true);
        }, 1300);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setToastMessage('כל הכבוד! הצלחת בכל השאלות בהן טעית');
          setShowToast(true);
          resetReviewSession();
        }, 1300);
        return () => clearTimeout(timer);
      }
    }
  }, [reviewSession, resetReviewSession]);

  const onAnswerSelect = (index: number) => {
    if (isAnswering) return;

    if (isTestModeActive && !isShowingTestReview) {
      const currentQuestion = testQuestions[currentTestIndex];
      if (!currentQuestion) return;

      handleTestAnswer(currentTestIndex, index);

      if (currentTestIndex < testQuestions.length - 1) {
        setCurrentTestIndex(prev => prev + 1);
      }
      return;
    }

    if (!isTestModeActive) {
      if (!practiceQuestion) return;
      
      setSelectedAnswerIndex(index);
      setIsAnswering(true);
      
      const isCorrect = practiceQuestion.answers[index].isCorrect;
      
      setTimeout(() => {
        handlePracticeAnswer(isCorrect);
        setSelectedAnswerIndex(null);
        setIsAnswering(false);
      }, 1200);
    }
  };

  const handleReviewClick = () => {
    if (reviewCount > 0) {
      bringReviewToFront();
      setToastMessage('שאלות לביקורת הועברו להתחלה');
      setShowToast(true);
    } else {
      setToastMessage('אין שאלות לביקורת כרגע');
      setShowToast(true);
    }
  };

  const handleStartTest = () => {
    startTest();
    setIsTestModeActive(true);
    setCurrentTestIndex(0);
    setFlaggedIndices([]);
    setIsShowingTestReview(false);
    setIsAnswering(false);
    setSelectedAnswerIndex(null);
  };

  const handleQuitTest = () => {
    if (confirm('האם אתה בטוח שברצונך לצאת מהמבחן? ההתקדמות לא תישמר.')) {
      setIsTestModeActive(false);
    }
  };

  const toggleFlag = () => {
    setFlaggedIndices(prev => 
      prev.includes(currentTestIndex) 
        ? prev.filter(i => i !== currentTestIndex)
        : [...prev, currentTestIndex]
    );
  };

  const resetProgress = () => {
    if (confirm('האם אתה בטוח שברצונך לאפס את כל ההתקדמות?')) {
      localStorage.removeItem('knownIds');
      localStorage.removeItem('reviewIds');
      window.location.reload();
    }
  };

  const onRetryReview = () => {
    setShowReviewModal(false);
    bringReviewToFront();
  };

  const onContinueAfterReview = () => {
    setShowReviewModal(false);
    resetReviewSession();
  };

  const answeredIndices = useMemo(() => {
    return Object.keys(testUserAnswers).map(Number);
  }, [testUserAnswers]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-center">
        <div className="max-w-md">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800">{error}</h1>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            נסה שוב
          </button>
        </div>
      </div>
    );
  }

  // Test Results Screen
  if (isTestModeActive && isTestFinished && !isShowingTestReview) {
    return (
      <div dir="rtl">
        <TestModeResult 
          score={testScore}
          isPassed={isTestPassed}
          timeTaken={40 * 60 - timeLeft}
          onReview={() => setIsShowingTestReview(true)}
          onHome={() => setIsTestModeActive(false)}
        />
      </div>
    );
  }

  // Current question data
  const currentQuestion = isTestModeActive ? testQuestions[currentTestIndex] : practiceQuestion;

  if (!currentQuestion && allQuestions.length > 0 && !isTestModeActive) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4 text-center" dir="rtl">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full"
        >
          <Trophy className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-slate-800 mb-2">כל הכבוד!</h1>
          <p className="text-slate-600 mb-8">סיימת את כל {allQuestions.length} השאלות בהצלחה.</p>
          <button 
            onClick={resetProgress}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            התחל מחדש
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900" dir="rtl">
      {isTestModeActive ? (
        <TestModeHeader timeLeft={timeLeft} onQuit={handleQuitTest} />
      ) : (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-4 py-2 shadow-sm">
          <div className="max-w-xl mx-auto flex justify-between items-center">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">ידוע</span>
                <div className="flex items-center gap-1 text-emerald-600 font-bold">
                  <CheckCircle className="w-4 h-4" />
                  <span>{knownCount}</span>
                </div>
              </div>
              <button 
                onClick={handleReviewClick}
                className="flex flex-col items-center hover:bg-slate-50 px-2 rounded-lg transition-colors group"
                title="הצג שאלות לביקורת תחילה"
              >
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold group-hover:text-amber-500">לביקורת</span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Clock className="w-4 h-4" />
                  <span>{reviewCount}</span>
                </div>
              </button>
            </div>
            
            <RemainingCount count={remainingCount} />

            <div className="flex gap-2">
              <button 
                onClick={handleStartTest}
                className="flex flex-col items-center hover:bg-blue-50 px-2 rounded-lg transition-colors group text-blue-600"
                title="התחל מבחן"
              >
                <span className="text-[10px] uppercase tracking-wider font-bold">מבחן</span>
                <div className="flex items-center gap-1 font-bold">
                  <Play className="w-4 h-4" />
                </div>
              </button>
              <button 
                onClick={resetProgress}
                className="flex flex-col items-center hover:bg-slate-50 px-2 rounded-lg transition-colors group text-slate-400"
                title="איפוס התקדמות"
              >
                <span className="text-[10px] uppercase tracking-wider font-bold group-hover:text-red-500">איפוס</span>
                <div className="flex items-center gap-1 font-bold group-hover:text-red-500">
                  <RotateCcw className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </header>
      )}

      {isTestModeActive && !isShowingTestReview && (
        <TestModeNavigation 
          totalQuestions={testQuestions.length}
          currentIndex={currentTestIndex}
          answeredIndices={answeredIndices}
          flaggedIndices={flaggedIndices}
          onSelect={setCurrentTestIndex}
        />
      )}

      {isTestModeActive && isShowingTestReview && (
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
          <span className="font-bold">סקירת תשובות המבחן</span>
          <button 
            onClick={() => setIsShowingTestReview(false)}
            className="bg-white/20 hover:bg-white/30 px-4 py-1 rounded-lg text-sm font-bold transition-colors"
          >
            חזרה לתוצאות
          </button>
        </div>
      )}

      <main className="flex-1 max-w-xl w-full mx-auto p-4 flex flex-col gap-6">
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <QuestionDisplay 
              key={isTestModeActive ? `${currentTestIndex}-${currentQuestion.id}` : currentQuestion.id}
              question={currentQuestion}
              index={selectedAnswerIndex ?? -1}
              isSelected={selectedAnswerIndex !== null}
              isAnswering={isAnswering}
              isTestMode={isTestModeActive}
              isReviewMode={isShowingTestReview}
              chosenAnswerIndex={isTestModeActive ? testUserAnswers[currentTestIndex] : undefined}
              onAnswerSelect={onAnswerSelect}
              onToggleFlag={toggleFlag}
              isFlagged={flaggedIndices.includes(currentTestIndex)}
            />
          )}
        </AnimatePresence>

        {isTestModeActive && (
          <div className="flex justify-between mt-4">
            <button 
              onClick={() => setCurrentTestIndex(prev => Math.max(0, prev - 1))}
              disabled={currentTestIndex === 0}
              className="px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 disabled:opacity-30"
            >
              הקודם
            </button>
            
            {isShowingTestReview ? (
              <button 
                onClick={() => setCurrentTestIndex(prev => Math.min(testQuestions.length - 1, prev + 1))}
                disabled={currentTestIndex === testQuestions.length - 1}
                className="px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 disabled:opacity-30"
              >
                הבא
              </button>
            ) : (
              currentTestIndex === testQuestions.length - 1 ? (
                <button 
                  onClick={submitTest}
                  className="px-8 py-2 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-100"
                >
                  סיום מבחן
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentTestIndex(prev => Math.min(testQuestions.length - 1, prev + 1))}
                  className="px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-600"
                >
                  הבא
                </button>
              )
            )}
          </div>
        )}
      </main>

      {!isTestModeActive && (
        <footer className="p-6 text-center text-slate-400 text-xs">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              <span>{allQuestions.length} שאלות בסך הכל</span>
            </div>
          </div>
          <p>© 2026 תרגול תיאוריה</p>
        </footer>
      )}

      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />

      <ReviewModal 
        isOpen={showReviewModal}
        onRetry={onRetryReview}
        onContinue={onContinueAfterReview}
      />
    </div>
  );
}
