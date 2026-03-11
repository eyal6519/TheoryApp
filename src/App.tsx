import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, BookOpen, Clock } from 'lucide-react';
import type { Question } from './types';
import { parseJsonQuestions } from './utils/dataParser';
import { useQuiz } from './hooks/useQuiz';

export default function App() {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for immediate feedback UI
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  const {
    currentQuestion,
    knownCount,
    reviewCount,
    remainingCount,
    handleAnswer,
  } = useQuiz(allQuestions);

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

  const onAnswerSelect = (index: number) => {
    if (isAnswering || !currentQuestion) return;
    
    setSelectedAnswerIndex(index);
    setIsAnswering(true);
    
    const isCorrect = currentQuestion.answers[index].isCorrect;
    
    // Brief delay for feedback before moving to next
    setTimeout(() => {
      handleAnswer(isCorrect);
      setSelectedAnswerIndex(null);
      setIsAnswering(false);
    }, 1200);
  };

  const resetProgress = () => {
    if (confirm('האם אתה בטוח שברצונך לאפס את כל ההתקדמות?')) {
      localStorage.removeItem('knownIds');
      localStorage.removeItem('reviewIds');
      window.location.reload();
    }
  };

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

  if (!currentQuestion && allQuestions.length > 0) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4 text-center">
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
      {/* Header / Stats */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-4 py-3 shadow-sm">
        <div className="max-w-xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">ידוע</span>
              <div className="flex items-center gap-1 text-emerald-600 font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>{knownCount}</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">לביקורת</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Clock className="w-4 h-4" />
                <span>{reviewCount}</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-lg font-black text-slate-800 tracking-tight uppercase">תרגול תיאוריה</h1>
            <p className="text-xs text-slate-400 font-mono">({remainingCount}) נותרו</p>
          </div>

          <button 
            onClick={resetProgress}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            title="איפוס התקדמות"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-xl w-full mx-auto p-4 flex flex-col gap-6">
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="flex flex-col gap-6"
            >
              {/* Question Card */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                {currentQuestion.imageUrl && (
                  <div className="w-full bg-slate-100 aspect-video flex items-center justify-center p-4">
                    <img 
                      src={currentQuestion.imageUrl} 
                      alt="Question visual" 
                      className="max-h-full max-w-full object-contain rounded-lg"
                    />
                  </div>
                )}
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold mb-3">
                    {currentQuestion.category || 'כללי'}
                  </span>
                  <h2 className="text-xl font-bold leading-tight text-slate-800">
                    {currentQuestion.title}
                  </h2>
                </div>
              </div>

              {/* Answers Grid */}
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.answers.map((answer, index) => {
                  const isSelected = selectedAnswerIndex === index;
                  const showCorrect = isAnswering && answer.isCorrect;
                  const showIncorrect = isAnswering && isSelected && !answer.isCorrect;
                  
                  let buttonClass = "w-full p-5 text-right rounded-2xl border-2 transition-all flex items-center justify-between gap-4 ";
                  
                  if (isAnswering) {
                    if (answer.isCorrect) {
                      buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-900";
                    } else if (isSelected) {
                      buttonClass += "border-red-500 bg-red-50 text-red-900";
                    } else {
                      buttonClass += "border-slate-100 opacity-50";
                    }
                  } else {
                    buttonClass += "border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50 active:scale-[0.98]";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => onAnswerSelect(index)}
                      disabled={isAnswering}
                      className={buttonClass}
                    >
                      <span className="text-lg font-medium">{answer.text}</span>
                      {showCorrect && <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />}
                      {showIncorrect && <XCircle className="w-6 h-6 text-red-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <footer className="p-6 text-center text-slate-400 text-xs">
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <span>{allQuestions.length} שאלות בסך הכל</span>
          </div>
        </div>
        <p>© 2026 תרגול תיאוריה</p>
      </footer>
    </div>
  );
}
