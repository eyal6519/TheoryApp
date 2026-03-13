import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TestModeHeader } from './TestModeHeader';

describe('TestModeHeader Component', () => {
  it('should format seconds into MM:SS correctly', () => {
    const { rerender } = render(<TestModeHeader timeLeft={2400} onQuit={() => {}} />); // 40:00
    expect(screen.getByText('40:00')).toBeInTheDocument();

    rerender(<TestModeHeader timeLeft={65} onQuit={() => {}} />); // 01:05
    expect(screen.getByText('01:05')).toBeInTheDocument();

    rerender(<TestModeHeader timeLeft={9} onQuit={() => {}} />); // 00:09
    expect(screen.getByText('00:09')).toBeInTheDocument();
  });

  it('should call onQuit when quit button is clicked', () => {
    const onQuit = vi.fn();
    render(<TestModeHeader timeLeft={2400} onQuit={onQuit} />);
    
    // I'll assume there is a quit button with a specific label or icon
    const quitButton = screen.getByRole('button', { name: /יציאה/i }); // Hebrew for "Exit"
    quitButton.click();
    
    expect(onQuit).toHaveBeenCalledTimes(1);
  });
});
