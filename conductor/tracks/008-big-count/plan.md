# Implementation Plan: Big Remaining Count with Animation

## Phase 1: Header Redesign & Remaining Count Component [checkpoint: fed8319]
- [x] Task: Create a new `RemainingCount` component that uses `framer-motion` for the "Scale & Pop" animation. 47d3478
- [x] Task: Write failing tests for `RemainingCount` to ensure it renders correctly and accepts the count prop. 47d3478
- [x] Task: Implement `RemainingCount` with a large font and basic scale animation. 47d3478
- [x] Task: Update `App.tsx` header layout: move the remaining count to the center and compact the other stats. fed8319
- [x] Task: Write failing integration tests for the new header layout. fed8319
- [x] Task: Implement the header layout changes in `App.tsx`. fed8319
- [x] Task: Conductor - User Manual Verification 'Header Redesign & Remaining Count Component' (Protocol in workflow.md) fed8319

## Phase 2: Immediate Animation Logic
- [~] Task: Update `App.tsx` to trigger the "Remaining Count" update immediately upon correct answer selection (before the 1.2s delay).
- [ ] Task: Write failing tests to verify the immediate update and animation trigger.
- [ ] Task: Implement the immediate update logic in `App.tsx` and ensure it's synchronized with the `useQuiz` hook.
- [ ] Task: Refine the "Scale & Pop" animation in the `RemainingCount` component for a more satisfying feel.
- [ ] Task: Conductor - User Manual Verification 'Immediate Animation Logic' (Protocol in workflow.md)

## Phase 3: Responsive Polish & Final Refinement
- [ ] Task: Test and refine the header layout on various mobile screen sizes (responsive check).
- [ ] Task: Write tests to ensure the header elements don't overlap on narrow screens.
- [ ] Task: Final refinement of font sizes, spacing, and animation timing based on mobile-first principles.
- [ ] Task: Conductor - User Manual Verification 'Responsive Polish & Final Refinement' (Protocol in workflow.md)
