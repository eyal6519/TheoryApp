import { useState, useEffect, useCallback, useRef } from 'react';
import type { Question } from '../types';
import { shuffle } from '../utils/shuffle';

export function useTestMode(allQuestions: Question[]) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const userAnswersRef = useRef<Record<number, boolean>>({});
  const [userAnswers, setUserAnswersState] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(40 * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [score, setScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const submitTest = useCallback(() => {
    setIsFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const correctCount = Object.values(userAnswersRef.current).filter(Boolean).length;
    setScore(correctCount);
    setIsPassed(correctCount >= 26);
  }, []);

  const startTest = useCallback(() => {
    const laws = shuffle(allQuestions.filter(q => q.category === 'חוקי התנועה')).slice(0, 10);
    const signs = shuffle(allQuestions.filter(q => q.category === 'תמרורים')).slice(0, 6);
    const safety = shuffle(allQuestions.filter(q => q.category === 'בטיחות')).slice(0, 9);
    const vehicle = shuffle(allQuestions.filter(q => q.category === 'הכרת הרכב')).slice(0, 5);

    const selectedQuestions = shuffle([...laws, ...signs, ...safety, ...vehicle]);
    setQuestions(selectedQuestions);
    userAnswersRef.current = {};
    setUserAnswersState({});
    setTimeLeft(40 * 60);
    setIsFinished(false);
    setIsPassed(false);
    setScore(0);
    setIsStarted(true);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          submitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [allQuestions, submitTest]);

  const handleAnswer = useCallback((index: number, isCorrect: boolean) => {
    userAnswersRef.current[index] = isCorrect;
    setUserAnswersState(prev => ({ ...prev, [index]: isCorrect }));
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    questions,
    userAnswers,
    timeLeft,
    isFinished,
    isPassed,
    score,
    isStarted,
    startTest,
    submitTest,
    handleAnswer,
  };
}
