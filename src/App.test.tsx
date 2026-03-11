import { render, screen, waitFor } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import App from './App'

// Mock fetch for datastore_search.json
vi.stubGlobal('fetch', vi.fn(() =>
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
                <span style="float: left;">| «В» | </span>
              </div>
            `
          }
        ]
      }
    })),
  } as Response)
))

test('renders the Theory Practice title', async () => {
  render(<App />)
  
  // Wait for loading to finish and check for the main title
  await waitFor(() => {
    const titleElement = screen.getByRole('heading', { name: /תרגול תיאוריה/i })
    expect(titleElement).toBeInTheDocument()
  })
})

test('displays a question after loading', async () => {
  render(<App />)
  
  await waitFor(() => {
    expect(screen.getByText(/מה פירוש התמרור/i)).toBeInTheDocument()
    expect(screen.getByText(/תשובה נכונה/i)).toBeInTheDocument()
  })
})
