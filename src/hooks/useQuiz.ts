import { useState, useEffect } from 'react';
import type { Question } from '../types';
import { shuffle } from '../utils/shuffle';

export function useQuiz(initialQuestions: Question[]) {
  // Initialize pools from LocalStorage immediately (lazy initialization)
  const [knownIds, setKnownIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('knownIds');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [reviewIds, setReviewIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('reviewIds');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [remaining, setRemaining] = useState<Question[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Sync remaining when initialQuestions or knownIds change
  // BUT only shuffle once when questions are first loaded
  useEffect(() => {
    if (initialQuestions.length > 0 && !initialized) {
      const filtered = initialQuestions.filter(q => !knownIds.has(q.id));
      setRemaining(shuffle(filtered));
      setInitialized(true);
    } else if (initialQuestions.length > 0 && initialized) {
      // If already initialized but knownIds changed elsewhere (e.g. storage sync)
      // we just filter, we don't re-shuffle the existing remaining
      setRemaining(prev => prev.filter(q => !knownIds.has(q.id)));
    }
  }, [initialQuestions, knownIds, initialized]);

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
      setKnownIds(prev => {
        const next = new Set(prev);
        next.add(currentQuestion.id);
        return next;
      });
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
      setReviewIds(prev => {
        const next = new Set(prev);
        next.add(currentQuestion.id);
        return next;
      });
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
