# Specification: Reading Mode

## Overview
The "Reading Mode" is a feature that allows users to browse through the questions in the current pool without having to answer them. It provides a way to study the correct answers directly and navigate through the questions sequentially.

## Functional Requirements
- **Toggle Location**: A toggle switch in the top header to enter and leave Reading Mode.
- **Toggle Behavior**: When entering or leaving Reading Mode, the app should remain on the current question.
- **Answer Display**: In Reading Mode, the correct answer for the current question is always highlighted (e.g., in green).
- **Navigation**:
    - "Next" and "Previous" buttons are available in Reading Mode.
    - "Next" moves to the next question in the current pool.
    - "Previous" moves to the previous question in the current pool.
- **Pool Impact**: Reading Mode is purely informational. Navigating through questions does not affect the "Mastered" (Known) or "Review" pools.
- **UI Changes**:
    - The answer selection buttons are disabled in Reading Mode.
    - Navigation buttons are prominently displayed.

## Acceptance Criteria
- [ ] User can toggle Reading Mode from the header.
- [ ] In Reading Mode, the correct answer is automatically highlighted.
- [ ] User can navigate to the next and previous questions using dedicated buttons.
- [ ] Toggling Reading Mode does not change the current question.
- [ ] Navigating in Reading Mode does not update the question counts (Mastered, Review, Remaining).
- [ ] Leaving Reading Mode returns the user to the regular quiz mode for the current question.

## Out of Scope
- Automatic progress tracking based on time spent on a question.
- "Review Mode" within Reading Mode.
