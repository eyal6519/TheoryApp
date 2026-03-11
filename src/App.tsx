import { useState, useEffect } from 'react';
import './App.css';
import { Question } from './types';
import { parseQuestions } from './utils/xmlParser';
import { useQuiz } from './hooks/useQuiz';
import ProgressHeader from './components/ProgressHeader';
import QuestionCard from './components/QuestionCard';
import AnswerButton from './components/AnswerButton';

function App() {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for immediate feedback
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
    fetch('/data.xml')
      .then((res) => res.text())
      .then((xml) => {
        const parsed = parseQuestions(xml);
        setAllQuestions(parsed);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load questions:', err);
        setError('שגיאה בטעינת השאלות. נא לנסות שוב מאוחר יותר.');
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
    }, 1000);
  };

  if (loading) return <div className="loading">טוען שאלות...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!currentQuestion) return <div className="complete">כל הכבוד! סיימת את כל השאלות.</div>;

  return (
    <div className="app-container">
      <ProgressHeader 
        mastered={knownCount} 
        review={reviewCount} 
        remaining={remainingCount} 
      />
      
      <main className="quiz-main">
        <QuestionCard 
          title={currentQuestion.title} 
          imageUrl={currentQuestion.imageUrl} 
        />
        
        <div className="answers-grid">
          {currentQuestion.answers.map((answer, index) => {
            let status: 'correct' | 'incorrect' | 'default' = 'default';
            if (selectedAnswerIndex === index) {
              status = answer.isCorrect ? 'correct' : 'incorrect';
            } else if (selectedAnswerIndex !== null && answer.isCorrect) {
              // Highlight the correct answer if user guessed wrong
              status = 'correct';
            }

            return (
              <AnswerButton
                key={`${currentQuestion.id}-${index}`}
                text={answer.text}
                status={status}
                disabled={isAnswering}
                onClick={() => onAnswerSelect(index)}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
