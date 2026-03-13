import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useQuiz } from './useQuiz';
import type { Question } from '../types';
import * as shuffleUtils from '../utils/shuffle';

// Mock shuffle to return questions in reverse order for predictability in tests
vi.spyOn(shuffleUtils, 'shuffle').mockImplementation((array) => [...array].reverse());

const mockQuestions: Question[] = [
  { id: '1', title: 'Q1', category: 'C1', answers: [{ text: 'A1', isCorrect: true }] },
  { id: '2', title: 'Q2', category: 'C2', answers: [{ text: 'A2', isCorrect: true }] },
  { id: '3', title: 'Q3', category: 'C3', answers: [{ text: 'A3', isCorrect: true }] },
];

describe('useQuiz', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with shuffled questions', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    
    expect(result.current.remaining).toHaveLength(3);
    expect(shuffleUtils.shuffle).toHaveBeenCalled();
    // Shuffled (reversed in mock) order: 3, 2, 1
    expect(result.current.currentQuestion?.id).toBe('3');
  });

  it('should move correct answers to known pool', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    
    act(() => {
      result.current.handleAnswer(true);
    });

    expect(result.current.knownCount).toBe(1);
    expect(result.current.remaining).toHaveLength(2);
    // Next in shuffled order
    expect(result.current.currentQuestion?.id).toBe('2');
  });

  it('should move incorrect answers to review pool and keep in remaining at the end', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    
    act(() => {
      result.current.handleAnswer(false);
    });

    expect(result.current.reviewCount).toBe(1);
    expect(result.current.knownCount).toBe(0);
    expect(result.current.remaining).toHaveLength(3); 
    // It should move to the end of the current shuffled queue
    // Initial: [3, 2, 1] -> After wrong 3: [2, 1, 3]
    expect(result.current.currentQuestion?.id).toBe('2');
    expect(result.current.remaining[2].id).toBe('3');
  });

  it('should initialize with known and review IDs from LocalStorage', () => {
    localStorage.setItem('knownIds', JSON.stringify(['1']));
    localStorage.setItem('reviewIds', JSON.stringify(['2']));
    
    const { result } = renderHook(() => useQuiz(mockQuestions));
    
    expect(result.current.knownCount).toBe(1);
    expect(result.current.reviewCount).toBe(1);
    expect(result.current.remaining).toHaveLength(2); // ID 1 is known, so filtered out
    // Shuffled (reversed) of [2, 3] is [3, 2]
    expect(result.current.currentQuestion?.id).toBe('3');
  });

  it('should not wipe LocalStorage on initialization', () => {
    const initialKnown = ['1', '2'];
    localStorage.setItem('knownIds', JSON.stringify(initialKnown));
    
    renderHook(() => useQuiz(mockQuestions));
    
    // Check if it's still there after mount effects
    const stored = JSON.parse(localStorage.getItem('knownIds') || '[]');
    expect(stored).toEqual(expect.arrayContaining(initialKnown));
  });

  it('should move review questions to the front when bringReviewToFront is called', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    
    // Initial order: [3, 2, 1]
    // Mark 1 as wrong. Order becomes [3, 2, 1], but 1 is in reviewIds.
    // Wait, the hook re-queues it at the end immediately.
    // Let's answer 3 correctly, 2 incorrectly.
    // [3, 2, 1] -> Correct 3 -> [2, 1]
    // [2, 1] -> Incorrect 2 -> [1, 2], reviewIds: {2}
    
    act(() => {
      result.current.handleAnswer(true); // 3 is correct
    });
    act(() => {
      result.current.handleAnswer(false); // 2 is incorrect
    });
    
    expect(result.current.currentQuestion?.id).toBe('1');
    expect(result.current.reviewCount).toBe(1);
    
    act(() => {
      result.current.bringReviewToFront();
    });
    
    // After bringReviewToFront, 2 should be at the front.
    expect(result.current.currentQuestion?.id).toBe('2');
    expect(result.current.remaining[0].id).toBe('2');
    expect(result.current.remaining[1].id).toBe('1');
  });

  it('should track review session progress and failure', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    
    // 1 wrong, 2 wrong. Order [3, 2, 1] -> Wrong 3 -> [2, 1, 3] -> Wrong 2 -> [1, 3, 2]
    // reviewIds: {3, 2}
    act(() => {
      result.current.handleAnswer(false); // 3 wrong
    });
    act(() => {
      result.current.handleAnswer(false); // 2 wrong
    });

    expect(result.current.reviewCount).toBe(2);

    act(() => {
      result.current.bringReviewToFront();
    });

    expect(result.current.reviewSession).toEqual({
      total: 2,
      count: 0,
      failed: false,
    });

    // Answer first one correctly
    act(() => {
      result.current.handleAnswer(true);
    });

    expect(result.current.reviewSession).toEqual({
      total: 2,
      count: 1,
      failed: false,
    });

    // Answer second one incorrectly
    act(() => {
      result.current.handleAnswer(false);
    });

    expect(result.current.reviewSession).toEqual({
      total: 2,
      count: 2,
      failed: true,
    });
  });
});
