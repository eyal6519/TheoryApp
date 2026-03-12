import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RemainingCount } from './RemainingCount';

describe('RemainingCount', () => {
  it('renders the count correctly', () => {
    render(<RemainingCount count={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders the Hebrew label "נותרו"', () => {
    render(<RemainingCount count={42} />);
    expect(screen.getByText('נותרו')).toBeInTheDocument();
  });

  it('has a large font size (text-4xl)', () => {
    render(<RemainingCount count={42} />);
    const countElement = screen.getByText('42');
    expect(countElement).toHaveClass('text-4xl');
  });
});
