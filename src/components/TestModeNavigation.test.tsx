import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TestModeNavigation } from './TestModeNavigation';

describe('TestModeNavigation Component', () => {
  const mockProps = {
    totalQuestions: 30,
    currentIndex: 0,
    answeredIndices: [1, 2, 5],
    flaggedIndices: [0, 5],
    onSelect: vi.fn(),
  };

  it('should render 30 navigation buttons', () => {
    render(<TestModeNavigation {...mockProps} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(30);
  });

  it('should highlight the current question', () => {
    render(<TestModeNavigation {...mockProps} />);
    const currentButton = screen.getByText('1'); // Index 0 is question 1
    expect(currentButton).toHaveClass('ring-2'); // Or whatever active class I choose
  });

  it('should show visual indicators for answered questions', () => {
    render(<TestModeNavigation {...mockProps} />);
    const answeredButton = screen.getByText('2'); // Index 1
    expect(answeredButton).toHaveClass('bg-blue-600'); // Or whatever answered class I choose
  });

  it('should show visual indicators for flagged questions', () => {
    render(<TestModeNavigation {...mockProps} />);
    const flaggedButton = screen.getByText('1'); // Index 0
    expect(screen.getByTestId('flag-icon-0')).toBeInTheDocument();
  });

  it('should call onSelect when a button is clicked', () => {
    render(<TestModeNavigation {...mockProps} />);
    const button5 = screen.getByText('5');
    fireEvent.click(button5);
    expect(mockProps.onSelect).toHaveBeenCalledWith(4); // Question 5 is index 4
  });
});
