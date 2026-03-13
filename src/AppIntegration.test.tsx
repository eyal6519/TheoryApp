import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { expect, test, vi, beforeEach } from 'vitest';
import App from './App';

// Mock fetch for datastore_search.json
const mockFetch = vi.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve(JSON.stringify({
      result: {
        records: [
          { _id: 1, title2: "1. Q1", category: "חוקי התנועה", description4: '<ul><li><span id="correctAnswer1">A1</span></li></ul><span>| «В» |</span>' },
          ...Array.from({ length: 35 }, (_, i) => ({
            _id: i + 2,
            title2: `${i + 2}. Q${i + 2}`,
            category: "בטיחות",
            description4: `<ul><li><span id="correctAnswer${i + 2}">A${i + 2}</span></li></ul><span>| «В» |</span>`
          }))
        ]
      }
    })),
  } as Response)
);

vi.stubGlobal('fetch', mockFetch);

describe('App Test Mode Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('renders "Start Test" button on home screen', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByTitle(/התחל מבחן/i)).toBeInTheDocument(); // Use title matcher
    });
  });

  test('clicking "Start Test" enters test mode', async () => {
    render(<App />);
    
    await waitFor(() => {
      const startButton = screen.getByTitle(/התחל מבחן/i);
      fireEvent.click(startButton);
    });

    // Check if TestModeHeader timer is visible (40:00)
    await waitFor(() => {
      expect(screen.getByText('40:00')).toBeInTheDocument();
    });
  });
});
