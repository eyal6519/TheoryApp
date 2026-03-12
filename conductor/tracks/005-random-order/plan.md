# Implementation Plan: Randomized Question Order

## Phase 1: Logic Implementation & Testing
- [x] Task: Create Shuffle Utility faa21d5
    - [x] Implement a Fisher-Yates shuffle algorithm in a new utility file `src/utils/shuffle.ts`
    - [x] Write unit tests for the shuffle function in `src/utils/shuffle.test.ts`
- [x] Task: Integrate Shuffle in `useQuiz.ts` f56082f
    - [x] Update `useQuiz` to shuffle the `initialQuestions` (after filtering known) exactly once on mount
    - [x] Ensure the re-shuffle does not happen on every state update, but only when `initialQuestions` changes (initial load)
- [x] Task: Update Hook Tests f56082f
    - [x] Update `src/hooks/useQuiz.test.ts` to mock or expect a different order when the randomization is active.
- [ ] Task: Conductor - User Manual Verification 'Logic Implementation & Testing' (Protocol in workflow.md)

## Phase 2: Final Verification
- [ ] Task: Manual Verification in Browser
    - [ ] Verify that refreshing the page changes the first question shown.
    - [ ] Confirm that "Known" questions are still properly removed from the initial pool.
    - [ ] Ensure "Incorrect" re-queuing still works (moves to end of the currently shuffled queue).
- [ ] Task: Final Coverage & Cleanup
    - [ ] Verify that test coverage for `useQuiz.ts` and `shuffle.ts` is >80%.
- [ ] Task: Conductor - User Manual Verification 'Final Verification' (Protocol in workflow.md)
