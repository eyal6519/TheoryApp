# Specification: Test Mode (Track: 009-test-mode)

## Overview
Implement a realistic "Test Mode" simulating the official Israeli driving theory exam to help users assess their readiness.

## Functional Requirements
- **Entry Point**: A prominent "Start Test" button on the Home Screen.
- **Question Selection (Official Distribution)**:
    - Total: 30 questions.
    - חוקי התנועה (Traffic Laws): 10 questions.
    - תמרורים (Road Signs): 6 questions.
    - בטיחות (Safety): 9 questions.
    - הכרת הרכב (Vehicle Knowledge): 5 questions.
- **Timer**: 
    - 40-minute countdown timer, displayed in the top header.
    - Auto-submits the test when time reaches 00:00.
- **Navigation & Review**:
    - **Question Grid**: A 1-30 number grid allowing users to jump directly to any question.
    - **Flagging**: Ability to flag specific questions for review during the test.
- **Results & Passing Criteria**:
    - **Passing Grade**: At least 26 correct answers out of 30.
    - **Result Screen**: Shows "Pass" or "Fail", the final score, and time taken.
- **Post-Test Review**:
    - After completion, users can review all 30 questions to see their answers vs. the correct answers.
- **State Management**:
    - Tests are ephemeral; progress is lost if the tab is closed, but LocalStorage "Known" pools are NOT affected by Test Mode.

## Non-Functional Requirements
- **Performance**: Question selection should be instantaneous.
- **UI/UX**: Mobile-first design consistent with current Tailwind/Framer Motion style.

## Acceptance Criteria
- [ ] Clicking "Start Test" generates 30 questions with the correct category distribution.
- [ ] Timer starts at 40:00 and counts down.
- [ ] Navigation grid works correctly.
- [ ] Flagging works and persists throughout the session.
- [ ] 26/30 score results in a "Pass" status.
- [ ] Time expiration triggers automatic submission.
- [ ] Post-test review accurately reflects all answers.

## Out of Scope
- Persistent test history across browser sessions.
- Detailed per-category performance breakdown (future enhancement).
