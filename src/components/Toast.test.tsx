import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toast } from './Toast';

describe('Toast Component', () => {
  it('should render the message when visible', () => {
    render(<Toast message="Test Message" isVisible={true} onClose={() => {}} />);
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('should not render when not visible', () => {
    render(<Toast message="Test Message" isVisible={false} onClose={() => {}} />);
    expect(screen.queryByText('Test Message')).not.toBeInTheDocument();
  });

  it('should call onClose after the specified duration', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast message="Test Message" isVisible={true} onClose={onClose} duration={1000} />);
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(onClose).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
