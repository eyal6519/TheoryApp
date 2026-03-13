import { render, screen, fireEvent, within } from '@testing-library/react';
import { expect, test, vi, beforeEach, describe } from 'vitest';
import { App } from './App';
import * as shuffleUtils from './utils/shuffle';

// Mock shuffle to be identity for predictability
vi.spyOn(shuffleUtils, 'shuffle').mockImplementation((array) => [...array]);

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
    
    const startButton = await screen.findByTitle(/התחל מבחן/i);
    expect(startButton).toBeInTheDocument();
  });

  test('clicking "Start Test" enters test mode', async () => {
    render(<App />);
    
    const startButton = await screen.findByTitle(/התחל מבחן/i);
    fireEvent.click(startButton);

    // Check if TestModeHeader timer is visible (40:00)
    expect(await screen.findByText('40:00')).toBeInTheDocument();
    // Check if Exit button is visible
    expect(screen.getByRole('button', { name: /יציאה/i })).toBeInTheDocument();
  });

  test('selecting an answer in test mode advances without immediate feedback', async () => {
    render(<App />);
    
    const startButton = await screen.findByTitle(/התחל מבחן/i);
    fireEvent.click(startButton);

    // Wait for Test Mode to be active
    await screen.findByRole('button', { name: /יציאה/i });

    // Find the TEST MODE question display specifically
    await screen.findByText(/Q1/i);
    const displays = await screen.findAllByTestId('question-display-test');
    const activeDisplay = displays[displays.length - 1]; 
    
    const firstAnswer = await within(activeDisplay).findByText('A1');
    fireEvent.click(firstAnswer);

    // It should advance to Q2
    expect(await screen.findByText(/Q2/i)).toBeInTheDocument();

    // Check that NO correct/incorrect indicators are visible in the NEW question
    expect(screen.queryByTestId('CheckCircle')).not.toBeInTheDocument();
    expect(screen.queryByTestId('XCircle')).not.toBeInTheDocument();
  });

  test('completing a test and reviewing answers works correctly', async () => {
    render(<App />);
    
    const startButton = await screen.findByTitle(/התחל מבחן/i);
    fireEvent.click(startButton);

    // Wait for Test Mode
    await screen.findByRole('button', { name: /יציאה/i });

    // Answer all 10 questions
    for (let i = 0; i < 10; i++) {
      await screen.findByText(new RegExp(`Q${i + 1}`, 'i'));
      const displays = await screen.findAllByTestId('question-display-test');
      const activeDisplay = displays[displays.length - 1]; 
      const answer = await within(activeDisplay).findByText(`A${i + 1}`);
      fireEvent.click(answer);
    }

    const finishButton = await screen.findByText(/סיום מבחן/i);
    fireEvent.click(finishButton);

    expect(await screen.findByText(/עברת את המבחן/i)).toBeInTheDocument();
    expect(screen.getByText('10/30')).toBeInTheDocument();

    const reviewButton = screen.getByText(/סקירת תשובות/i);
    fireEvent.click(reviewButton);

    expect(await screen.findByText(/סקירת תשובות המבחן/i)).toBeInTheDocument();
    expect(screen.getByText(/Q1/i)).toBeInTheDocument();
    expect(screen.getByTestId('CheckCircle')).toBeInTheDocument();
  }, 15000);
});
