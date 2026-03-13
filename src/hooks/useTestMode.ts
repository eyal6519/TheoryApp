import { useState, useEffect, useCallback, useRef } from 'react';
import type { Question } from '../types';
import { shuffle } from '../utils/shuffle';

export function useTestMode(allQuestions: Question[]) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const userAnswersRef = useRef<Record<number, number>>({});
  const [userAnswers, setUserAnswersState] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(40 * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [score, setScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const submitTest = useCallback(() => {
    setIsFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const correctCount = questions.reduce((acc, q, i) => {
      const chosenIndex = userAnswersRef.current[i];
      if (chosenIndex === undefined) return acc;
      return q.answers[chosenIndex]?.isCorrect ? acc + 1 : acc;
    }, 0);

    setScore(correctCount);
    setIsPassed(correctCount >= 26);
  }, [questions]);

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

  const handleAnswer = useCallback((index: number, answerIndex: number) => {
    userAnswersRef.current[index] = answerIndex;
    setUserAnswersState(prev => ({ ...prev, [index]: answerIndex }));
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
