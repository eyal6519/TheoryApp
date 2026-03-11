import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import App from './App'

test('renders Vite + React heading', () => {
  render(<App />)
  const headingElement = screen.getByText(/Vite \+ React/i)
  expect(headingElement).toBeInTheDocument()
})
