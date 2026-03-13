# Implementation Plan: Reading Mode

## Phase 1: Core Logic & State Management
- [ ] Task: Update `src/types.ts` to include `isReadingMode` in the application state.
- [ ] Task: Extend `useQuiz` hook to support Reading Mode toggling and navigation (Next/Previous).
- [ ] Task: Ensure navigation in Reading Mode does not trigger progress updates (Mastered/Review counts).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Core Logic & State Management' (Protocol in workflow.md)

## Phase 2: UI Implementation
- [ ] Task: Add the Reading Mode toggle switch to the application header in `src/App.tsx`.
- [ ] Task: Implement visual feedback for the correct answer when Reading Mode is active (disabled buttons, highlighted correct answer).
- [ ] Task: Add "Previous" and "Next" navigation buttons to the quiz interface, visible only in Reading Mode.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: UI Implementation' (Protocol in workflow.md)

## Phase 3: Integration & Validation
- [ ] Task: Verify seamless transition between regular Quiz Mode and Reading Mode on the same question.
- [ ] Task: Ensure the "Remaining" count and other progress indicators remain static during Reading Mode navigation.
- [ ] Task: Perform a final responsive UI check to ensure navigation buttons and the toggle are accessible on mobile devices.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Integration & Validation' (Protocol in workflow.md)
