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

## Phase 2: UI Components [checkpoint: 6e43950]
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
- [x] Task: Conductor - User Manual Verification 'Phase 2: UI Components' (Protocol in workflow.md) 6e43950

## Phase 3: Integration & UX Flow
Connect the domain logic with the UI and integrate into the main application.

- [x] Task: Add "Start Test" button to the main screen. 02d68c7
- [x] Task: Implement full "Test Mode" screen layout. 02d68c7
    - [x] Integrate `TestModeHeader`, `TestModeNavigation`, and the existing question display logic.
    - [x] Ensure Test Mode is ephemeral and doesn't pollute practice "Known/Review" pools.
- [x] Task: Implement "Post-Test Review" mode. 02d68c7
    - [x] Allow users to revisit all 30 questions with their answer and the correct answer shown.
- [x] Task: Final UI Polish & Framer Motion transitions. 02d68c7
- [x] Task: Conductor - User Manual Verification 'Phase 3: Integration' (Protocol in workflow.md) 02d68c7

## Phase 4: Final Verification
- [x] Task: Ensure all tests pass with >80% coverage.
- [x] Task: Verify mobile responsiveness for all new components.
- [x] Task: Perform final manual verification of the end-to-end flow.
- [x] Task: Conductor - User Manual Verification 'Phase 4: Final' (Protocol in workflow.md)
