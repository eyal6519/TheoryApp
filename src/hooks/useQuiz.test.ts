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
});
