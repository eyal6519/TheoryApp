# Implementation Plan: Test Mode (Track: 009-test-mode)

## Phase 1: Domain Logic & State Management (TDD) [checkpoint: 7c1c317]
Focus on the core engine for the 40-minute test and question selection logic.

- [x] Task: Create `src/hooks/useTestMode.ts` for managing test state. a358927
    - [x] Write tests for category-based question selection (10 Laws, 6 Signs, 9 Safety, 5 Vehicle).
    - [x] Write tests for timer management (initial 40:00, ticking down, stop).
    - [x] Write tests for auto-submission on timer expiration.
    - [x] Write tests for scoring and passing logic (Pass if score >= 26).
    - [x] Implement `useTestMode` hook to satisfy all tests.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Domain Logic' (Protocol in workflow.md) 7c1c317

## Phase 2: UI Components
Develop the specialized UI elements for the test environment.

- [x] Task: Create `src/components/TestModeHeader.tsx`. b3baa28
    - [x] Implement visible timer display at the top.
    - [x] Write tests for timer formatting (MM:SS).
- [x] Task: Create `src/components/TestModeNavigation.tsx`. 5136401
    - [x] Implement 1-30 question grid for rapid navigation.
    - [x] Implement flagging logic with visual indicators in the grid.
    - [x] Write tests for grid click events and flagging status.
- [x] Task: Create `src/components/TestModeResult.tsx`. 041919f
    - [x] Implement a clear "Pass/Fail" results screen with final score.
    - [x] Write tests for result conditional rendering.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: UI Components' (Protocol in workflow.md)

## Phase 3: Integration & UX Flow
Connect the domain logic with the UI and integrate into the main application.

- [ ] Task: Add "Start Test" button to the main screen.
- [ ] Task: Implement full "Test Mode" screen layout.
    - [ ] Integrate `TestModeHeader`, `TestModeNavigation`, and the existing question display logic.
    - [ ] Ensure Test Mode is ephemeral and doesn't pollute practice "Known/Review" pools.
- [ ] Task: Implement "Post-Test Review" mode.
    - [ ] Allow users to revisit all 30 questions with their answer and the correct answer shown.
- [ ] Task: Final UI Polish & Framer Motion transitions.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Integration' (Protocol in workflow.md)

## Phase 4: Final Verification
- [ ] Task: Ensure all tests pass with >80% coverage.
- [ ] Task: Verify mobile responsiveness for all new components.
- [ ] Task: Perform final manual verification of the end-to-end flow.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final' (Protocol in workflow.md)
