import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TestModeResult } from './TestModeResult';

describe('TestModeResult Component', () => {
  const mockProps = {
    score: 28,
    isPassed: true,
    timeTaken: 1200, // 20:00
    onReview: vi.fn(),
    onHome: vi.fn(),
  };

  it('should display "Pass" status when isPassed is true', () => {
    render(<TestModeResult {...mockProps} />);
    expect(screen.getByText(/עברת את המבחן/i)).toBeInTheDocument(); // Hebrew for "Passed the test"
    expect(screen.getByText('28/30')).toBeInTheDocument();
  });

  it('should display "Fail" status when isPassed is false', () => {
    render(<TestModeResult {...mockProps} isPassed={false} score={24} />);
    expect(screen.getByText(/לא עברת את המבחן/i)).toBeInTheDocument(); // Hebrew for "Did not pass the test"
    expect(screen.getByText('24/30')).toBeInTheDocument();
  });

  it('should display formatted time taken', () => {
    render(<TestModeResult {...mockProps} />);
    expect(screen.getByText('20:00')).toBeInTheDocument();
  });

  it('should call onReview when review button is clicked', () => {
    render(<TestModeResult {...mockProps} />);
    fireEvent.click(screen.getByRole('button', { name: /סקירת תשובות/i })); // Hebrew for "Review answers"
    expect(mockProps.onReview).toHaveBeenCalledTimes(1);
  });

  it('should call onHome when home button is clicked', () => {
    render(<TestModeResult {...mockProps} />);
    fireEvent.click(screen.getByRole('button', { name: /חזרה לדף הבית/i })); // Hebrew for "Back to Home"
    expect(mockProps.onHome).toHaveBeenCalledTimes(1);
  });
});
