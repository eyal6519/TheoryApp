import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTestMode } from './useTestMode';
import type { Question } from '../types';

const mockQuestions: Question[] = [
  ...Array.from({ length: 20 }, (_, i) => ({ id: `L${i}`, title: `Law ${i}`, category: 'חוקי התנועה', answers: [{ text: 'A', isCorrect: true }] })),
  ...Array.from({ length: 20 }, (_, i) => ({ id: `S${i}`, title: `Sign ${i}`, category: 'תמרורים', answers: [{ text: 'A', isCorrect: true }] })),
  ...Array.from({ length: 20 }, (_, i) => ({ id: `Sa${i}`, title: `Safety ${i}`, category: 'בטיחות', answers: [{ text: 'A', isCorrect: true }] })),
  ...Array.from({ length: 20 }, (_, i) => ({ id: `V${i}`, title: `Vehicle ${i}`, category: 'הכרת הרכב', answers: [{ text: 'A', isCorrect: true }] })),
];

describe('useTestMode', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should select exactly 30 questions with correct distribution', () => {
    const { result } = renderHook(() => useTestMode(mockQuestions));
    
    act(() => {
      result.current.startTest();
    });

    const selected = result.current.questions;
    expect(selected).toHaveLength(30);
    
    const laws = selected.filter(q => q.category === 'חוקי התנועה');
    const signs = selected.filter(q => q.category === 'תמרורים');
    const safety = selected.filter(q => q.category === 'בטיחות');
    const vehicle = selected.filter(q => q.category === 'הכרת הרכב');

    expect(laws).toHaveLength(10);
    expect(signs).toHaveLength(6);
    expect(safety).toHaveLength(9);
    expect(vehicle).toHaveLength(5);
  });

  it('should initialize timer with 40 minutes and tick down', () => {
    const { result } = renderHook(() => useTestMode(mockQuestions));
    
    act(() => {
      result.current.startTest();
    });

    expect(result.current.timeLeft).toBe(40 * 60);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft).toBe(40 * 60 - 1);
  });

  it('should auto-submit when time expires', () => {
    const { result } = renderHook(() => useTestMode(mockQuestions));
    
    act(() => {
      result.current.startTest();
    });

    act(() => {
      vi.advanceTimersByTime(40 * 60 * 1000);
    });

    expect(result.current.isFinished).toBe(true);
  });

  it('should calculate score and passing status correctly', () => {
    const { result } = renderHook(() => useTestMode(mockQuestions));
    
    act(() => {
      result.current.startTest();
    });

    // Answer 26 questions correctly
    act(() => {
      for (let i = 0; i < 26; i++) {
        result.current.handleAnswer(i, true);
      }
      for (let i = 26; i < 30; i++) {
        result.current.handleAnswer(i, false);
      }
      result.current.submitTest();
    });

    expect(result.current.score).toBe(26);
    expect(result.current.isPassed).toBe(true);

    // Test failure case
    const { result: resultFail } = renderHook(() => useTestMode(mockQuestions));
    act(() => {
      resultFail.current.startTest();
    });
    act(() => {
      for (let i = 0; i < 25; i++) {
        resultFail.current.handleAnswer(i, true);
      }
      resultFail.current.submitTest();
    });
    expect(resultFail.current.isPassed).toBe(false);
  });
});
