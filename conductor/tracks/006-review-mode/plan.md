# Implementation Plan: Review Mode Button

## Phase 1: Core Logic (useQuiz Hook) [checkpoint: 489c787]
- [x] Task: Write failing tests for `bringReviewToFront` functionality in `useQuiz.test.ts` 0c3e027
- [x] Task: Implement `bringReviewToFront` logic in `useQuiz.ts` 0c3e027
- [x] Task: Verify tests pass and ensure >80% coverage for the hook 0c3e027
- [x] Task: Conductor - User Manual Verification 'Core Logic (useQuiz Hook)' (Protocol in workflow.md)

## Phase 2: UI Feedback (Toast Component)
- [x] Task: Create `src/components/Toast.tsx` component using Framer Motion 6278bcf
- [x] Task: Write tests for `Toast.tsx` to verify auto-dismiss and visibility 6278bcf
- [x] Task: Verify tests pass and ensure >80% coverage 6278bcf
- [ ] Task: Conductor - User Manual Verification 'UI Feedback (Toast Component)' (Protocol in workflow.md)

## Phase 3: Integration & Final Polish
- [ ] Task: Integrate `Toast` component into `App.tsx`
- [ ] Task: Update Header in `App.tsx` to make "Review Count" clickable
- [ ] Task: Implement click handler in `App.tsx` to trigger review logic or show toast
- [ ] Task: Final manual verification on mobile (responsive check)
- [ ] Task: Conductor - User Manual Verification 'Integration & Final Polish' (Protocol in workflow.md)
