import { useState, useEffect } from 'react';
import type { Question } from '../types';
import { shuffle } from '../utils/shuffle';

export interface ReviewSession {
  total: number;
  count: number;
  failed: boolean;
}

export interface QuizOptions {
  includeKnown?: boolean;
  manualReviewOnly?: boolean;
}

export function useQuiz(initialQuestions: Question[], options: QuizOptions = {}) {
  const { includeKnown = false, manualReviewOnly = false } = options;

  // Initialize pools from LocalStorage immediately (lazy initialization)
  const [knownIds, setKnownIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('knownIds');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [reviewIds, setReviewIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('reviewIds');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [manualReviewIds, setManualReviewIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('manualReviewIds');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [remaining, setRemaining] = useState<Question[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Review session state
  const [reviewSession, setReviewSession] = useState<ReviewSession | null>(null);

  // Sync remaining when initialQuestions or knownIds change
  // BUT only shuffle once when questions are first loaded for a specific set
  useEffect(() => {
    if (initialQuestions.length === 0) return;

    let filtered = initialQuestions;
    
    if (manualReviewOnly) {
      filtered = filtered.filter(q => manualReviewIds.has(q.id));
    }
    
    if (!includeKnown) {
      filtered = filtered.filter(q => !knownIds.has(q.id));
    }
    
    setRemaining(shuffle(filtered));
    setInitialized(true);
  }, [initialQuestions, includeKnown, manualReviewOnly, manualReviewIds.size]); // Re-initialize whenever questions, mode or pool changes

  // Handle knownIds changes during a session
  useEffect(() => {
    if (initialized && !includeKnown) {
      setRemaining(prev => prev.filter(q => !knownIds.has(q.id)));
    }
  }, [knownIds, includeKnown, initialized]);

  // Save to LocalStorage when pools change
  useEffect(() => {
    localStorage.setItem('knownIds', JSON.stringify(Array.from(knownIds)));
  }, [knownIds]);

  useEffect(() => {
    localStorage.setItem('reviewIds', JSON.stringify(Array.from(reviewIds)));
  }, [reviewIds]);

  useEffect(() => {
    localStorage.setItem('manualReviewIds', JSON.stringify(Array.from(manualReviewIds)));
  }, [manualReviewIds]);

  const currentQuestion = remaining.length > 0 ? remaining[0] : null;

  const handleAnswer = (isCorrect: boolean) => {
    if (!currentQuestion) return;

    // Update review session if active
    if (reviewSession) {
      setReviewSession(prev => {
        if (!prev) return null;
        return {
          ...prev,
          count: prev.count + 1,
          failed: prev.failed || !isCorrect,
        };
      });
    }

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

  const bringReviewToFront = () => {
    const rIds = Array.from(reviewIds);
    if (rIds.length === 0) return;

    setReviewSession({
      total: rIds.length,
      count: 0,
      failed: false,
    });

    setRemaining(prev => {
      const reviewQuestions = prev.filter(q => reviewIds.has(q.id));
      const otherQuestions = prev.filter(q => !reviewIds.has(q.id));
      return [...reviewQuestions, ...otherQuestions];
    });
  };

  const resetReviewSession = () => {
    setReviewSession(null);
  };

  const toggleManualReview = (id: string) => {
    setManualReviewIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isManualReviewMarked = (id: string) => {
    return manualReviewIds.has(id);
  };

  return {
    currentQuestion,
    remaining,
    knownCount: knownIds.size,
    reviewCount: reviewIds.size,
    manualReviewCount: manualReviewIds.size,
    remainingCount: remaining.length,
    handleAnswer,
    bringReviewToFront,
    reviewSession,
    resetReviewSession,
    toggleManualReview,
    isManualReviewMarked,
  };
}
