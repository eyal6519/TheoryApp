# Implementation Plan: Question Review Pool (Track: 010-review-pool_20260313)

## Phase 1: Core Logic & Persistence (TDD)
- [ ] Task: Update `src/hooks/useQuiz.ts` to support the "Manual Review Pool".
    - [ ] Add `reviewPool` state (list of question IDs).
    - [ ] Implement `toggleReview(id: string)` function.
    - [ ] Implement `isReviewMarked(id: string)` utility.
    - [ ] Update `saveToStorage` and `loadFromStorage` to persist `reviewPool`.
    - [ ] Write unit tests in `src/hooks/useQuiz.test.ts` for marking/unmarking and persistence.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Core Logic' (Protocol in workflow.md)

## Phase 2: Component UI Enhancements
- [ ] Task: Add "Review Toggle" to the question display area.
    - [ ] Use `Star` or `Bookmark` icon from Lucide.
    - [ ] Style with Tailwind (toggle active/inactive state).
    - [ ] Connect icon click to `toggleReview`.
    - [ ] Write tests to ensure the icon correctly reflects and updates the state.
- [ ] Task: Update Home Screen with "Practice Bookmarks" button.
    - [ ] Add a new button for manual review pool practice.
    - [ ] Display the current count of bookmarked questions.
    - [ ] Connect button to launch a quiz session containing only those questions.
    - [ ] Write tests for the home screen button and count display.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: UI Enhancements' (Protocol in workflow.md)

## Phase 3: Final Integration & UX
- [ ] Task: Ensure the practice mode transition is smooth for the new pool.
- [ ] Task: Verify that "Always Manual" removal works as expected in all quiz modes.
- [ ] Task: Final UI polish for the Bookmark icon.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final Integration' (Protocol in workflow.md)
