import { useState, useEffect, useMemo } from 'react';
import { Question } from '../types';

export function useQuiz(initialQuestions: Question[]) {
  const [remaining, setRemaining] = useState<Question[]>(initialQuestions);
  const [knownIds, setKnownIds] = useState<Set<string>>(new Set());
  const [reviewIds, setReviewIds] = useState<Set<string>>(new Set());

  // Initialize from LocalStorage
  useEffect(() => {
    const savedKnown = localStorage.getItem('knownIds');
    const savedReview = localStorage.getItem('reviewIds');

    if (savedKnown) {
      const knownSet = new Set<string>(JSON.parse(savedKnown));
      setKnownIds(knownSet);
      // Filter out known questions from remaining
      setRemaining(prev => prev.filter(q => !knownSet.has(q.id)));
    }
    if (savedReview) {
      setReviewIds(new Set(JSON.parse(savedReview)));
    }
  }, []);

  // Save to LocalStorage when pools change
  useEffect(() => {
    localStorage.setItem('knownIds', JSON.stringify(Array.from(knownIds)));
  }, [knownIds]);

  useEffect(() => {
    localStorage.setItem('reviewIds', JSON.stringify(Array.from(reviewIds)));
  }, [reviewIds]);

  const currentQuestion = remaining.length > 0 ? remaining[0] : null;

  const handleAnswer = (isCorrect: boolean) => {
    if (!currentQuestion) return;

    if (isCorrect) {
      // Move to Known pool
      setKnownIds(prev => new Set(prev).add(currentQuestion.id));
      // Remove from Review if it was there
      setReviewIds(prev => {
        const next = new Set(prev);
        next.delete(currentQuestion.id);
        return next;
      });
      // Remove from Remaining
      setRemaining(prev => prev.slice(1));
    } else {
      // Move to Review pool (if not already there)
      setReviewIds(prev => new Set(prev).add(currentQuestion.id));
      // Re-queue the question at the end of remaining
      setRemaining(prev => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }
  };

  return {
    currentQuestion,
    remaining,
    knownCount: knownIds.size,
    reviewCount: reviewIds.size,
    remainingCount: remaining.length,
    handleAnswer,
  };
}
