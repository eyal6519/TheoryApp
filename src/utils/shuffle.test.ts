import { describe, it, expect } from 'vitest';
import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('should return a new array with the same elements', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    
    expect(result).not.toBe(input); // Should be a new array
    expect(result).toHaveLength(input.length);
    expect(result.sort()).toEqual(input.sort());
  });

  it('should randomize the order of elements (statistically)', () => {
    const input = Array.from({ length: 100 }, (_, i) => i);
    const result = shuffle(input);
    
    // While it's technically possible for a shuffle to return the same order,
    // with 100 elements the probability is extremely low (1/100!).
    expect(result).not.toEqual(input);
  });

  it('should handle empty arrays', () => {
    expect(shuffle([])).toEqual([]);
  });

  it('should handle single-element arrays', () => {
    expect(shuffle([1])).toEqual([1]);
  });
});
