# Implementation Plan: Review Session Feedback

## Phase 1: useQuiz Hook Tracking
- [x] Task: Update `useQuiz.ts` to include `reviewSession` state.
- [x] Task: Modify `bringReviewToFront` to initialize the session.
- [x] Task: Modify `handleAnswer` to increment session progress.
- [x] Task: Add `resetReviewSession` to clear the session.
- [x] Task: Update `useQuiz.test.ts` with tests for session tracking.

## Phase 2: Review Choice Modal
- [x] Task: Create `src/components/ReviewModal.tsx` using Framer Motion.
- [x] Task: Add animation and Hebrew text to the modal.
- [ ] Task: Create tests for `ReviewModal.tsx`. (Covered by App.test.tsx)

## Phase 3: App Integration
- [x] Task: Integrate `ReviewModal` into `App.tsx`.
- [x] Task: Implement `useEffect` logic to show Toast or Modal upon session completion.
- [x] Task: Update `App.test.tsx` to verify the new review session flow.
