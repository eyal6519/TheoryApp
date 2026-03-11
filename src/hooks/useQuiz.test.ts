import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useQuiz } from './useQuiz';
import type { Question } from '../types';

const mockQuestions: Question[] = [
  { id: '1', title: 'Q1', category: 'C1', answers: [{ text: 'A1', isCorrect: true }] },
  { id: '2', title: 'Q2', category: 'C2', answers: [{ text: 'A2', isCorrect: true }] },
  { id: '3', title: 'Q3', category: 'C3', answers: [{ text: 'A3', isCorrect: true }] },
];

describe('useQuiz', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with all questions in remaining pool', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    
    expect(result.current.remaining).toHaveLength(3);
    expect(result.current.knownCount).toBe(0);
    expect(result.current.reviewCount).toBe(0);
    expect(result.current.currentQuestion?.id).toBe('1');
  });

  it('should move correct answers to known pool', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    
    act(() => {
      result.current.handleAnswer(true);
    });

    expect(result.current.knownCount).toBe(1);
    expect(result.current.remaining).toHaveLength(2);
    expect(result.current.currentQuestion?.id).toBe('2');
  });

  it('should move incorrect answers to review pool and keep in remaining', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    
    act(() => {
      result.current.handleAnswer(false);
    });

    expect(result.current.reviewCount).toBe(1);
    expect(result.current.knownCount).toBe(0);
    expect(result.current.remaining).toHaveLength(3); // Incorrect stays in remaining (to be shown later)
    // It should move to the end of the queue
    expect(result.current.currentQuestion?.id).toBe('2');
  });
});
