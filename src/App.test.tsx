import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { expect, test, vi, beforeEach } from 'vitest'
import App from './App'
import * as shuffleUtils from './utils/shuffle'

// Mock shuffle to be identity for predictability
vi.spyOn(shuffleUtils, 'shuffle').mockImplementation((array) => [...array])

// Mock fetch for datastore_search.json
const mockFetch = vi.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve(JSON.stringify({
      result: {
        records: [
          {
            _id: 1,
            title2: "1. מה פירוש התמרור?",
            category: "תמרורים",
            description4: `
              <div dir="rtl">
                <ul>
                  <li><span>תשובה 1</span></li>
                  <li><span id="correctAnswer1">תשובה נכונה</span></li>
                </ul>
                <span>| «В» |</span>
              </div>
            `
          },
          {
            _id: 2,
            title2: "2. עוד שאלה?",
            category: "כללי",
            description4: `
              <div dir="rtl">
                <ul>
                  <li><span>תשובה א</span></li>
                  <li><span id="correctAnswer1">תשובה ב</span></li>
                </ul>
                <span>| «В» |</span>
              </div>
            `
          }
        ]
      }
    })),
  } as Response)
)

vi.stubGlobal('fetch', mockFetch)

beforeEach(() => {
  localStorage.clear()
  vi.clearAllMocks()
})

test('renders the Remaining Count', async () => {
  render(<App />)
  
  // Wait for loading to finish and check for the big count
  await waitFor(() => {
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('נותרו')).toBeInTheDocument()
  })
})

test('displays a question after loading', async () => {
  render(<App />)
  
  await waitFor(() => {
    expect(screen.getByText(/מה פירוש התמרור/i)).toBeInTheDocument()
    expect(screen.getByText(/תשובה נכונה/i)).toBeInTheDocument()
  })
})

test('clicking review button shows toast', async () => {
  render(<App />)
  
  await waitFor(() => {
    expect(screen.getByText(/מה פירוש התמרור/i)).toBeInTheDocument()
  })

  const reviewButton = screen.getByTitle('הצג שאלות לביקורת תחילה')
  
  // Initially no reviews
  fireEvent.click(reviewButton)
  expect(screen.getByText(/אין שאלות לביקורת כרגע/i)).toBeInTheDocument()

  // Answer incorrectly to get a review item
  const incorrectAnswer = screen.getByText('תשובה 1')
  fireEvent.click(incorrectAnswer)
  
  // Wait for the answer feedback delay (1200ms) and state update
  await waitFor(() => {
    expect(screen.getByText('1')).toBeInTheDocument()
  }, { timeout: 3000 })

  fireEvent.click(reviewButton)
  expect(screen.getByText(/שאלות לביקורת הועברו להתחלה/i)).toBeInTheDocument()
})

test('completing review session successfully shows success toast', async () => {
  render(<App />)
  
  await waitFor(() => {
    expect(screen.getByText(/מה פירוש התמרור/i)).toBeInTheDocument()
  })

  // 1. Get a question wrong
  const incorrectAnswer = screen.getByText('תשובה 1')
  fireEvent.click(incorrectAnswer)
  
  await waitFor(() => {
    expect(screen.getByText('1')).toBeInTheDocument()
  }, { timeout: 3000 })

  // 2. Click Review button
  const reviewButton = screen.getByTitle('הצג שאלות לביקורת תחילה')
  fireEvent.click(reviewButton)

  // 3. Answer correctly this time
  const correctAnswer = screen.getByText('תשובה נכונה')
  fireEvent.click(correctAnswer)

  // 4. Check for success toast after all delays (1200ms handleAnswer + 1300ms completion)
  await waitFor(() => {
    expect(screen.getByText(/כל הכבוד! הצלחת בכל השאלות בהן טעית/i)).toBeInTheDocument()
  }, { timeout: 5000 })
})

test('failing review session shows retry modal', async () => {
  render(<App />)
  
  await waitFor(() => {
    expect(screen.getByText(/מה פירוש התמרור/i)).toBeInTheDocument()
  })

  // 1. Get a question wrong
  const incorrectAnswer = screen.getByText('תשובה 1')
  fireEvent.click(incorrectAnswer)
  
  await waitFor(() => {
    expect(screen.getByText('1')).toBeInTheDocument()
  }, { timeout: 3000 })

  // 2. Click Review button
  const reviewButton = screen.getByTitle('הצג שאלות לביקורת תחילה')
  fireEvent.click(reviewButton)

  // 3. Answer incorrectly AGAIN
  const incorrectAgain = screen.getByText('תשובה 1')
  fireEvent.click(incorrectAgain)

  // 4. Check for modal after all delays
  await waitFor(() => {
    expect(screen.getByText(/האם ברצונך לנסות שוב את השאלות שבהן טעית/i)).toBeInTheDocument()
  }, { timeout: 5000 })
  
  // 5. Test Retry button
  const retryBtn = screen.getByText(/נסה שוב את השאלות שטעיתי/i)
  fireEvent.click(retryBtn)
  
  // Modal should close
  await waitFor(() => {
    expect(screen.queryByText(/האם ברצונך לנסות שוב את השאלות שבהן טעית/i)).not.toBeInTheDocument()
  })
})
