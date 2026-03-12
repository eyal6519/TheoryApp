# Specification: Feature - Review Mode Button

## Overview
This feature introduces a more active "Review" capability. Users can trigger a "Bring to Front" action from the header statistics that shuffles all questions currently in the "Review" pool (incorrectly answered) to the very top of their question queue. This provides an immediate way to re-practice difficult questions.

## Functional Requirements
- **Review Trigger**: Clicking the "Review Count" statistic in the header will trigger the "Bring to Front" logic.
- **Queue Modification**: When triggered, all questions whose IDs are in the `reviewIds` pool will be moved to the beginning of the `remaining` questions list.
- **Completion Feedback**: If a user has zero questions in the "Review" pool, or has already successfully re-reviewed all of them (the `reviewIds` set is empty), a custom toast notification will appear saying "All questions reviewed!".
- **Custom Toast UI**: Implement a sleek, auto-dismissing notification component for feedback.

## Non-Functional Requirements
- **User Interface**: Maintain the existing Hebrew RTL (Right-to-Left) styling.
- **Accessibility**: Ensure the "Review Count" in the header is accessible as a clickable element.

## Acceptance Criteria
- Clicking the review count moves all incorrect questions to the top of the queue.
- If there are no incorrect questions, a custom toast confirms all are reviewed.
- The toast auto-dismisses after a short delay (e.g., 3 seconds).
- The state is preserved correctly in LocalStorage.

## Out of Scope
- A dedicated "Review Only" persistent mode.
- Changing the existing logic for how questions enter the review pool (incorrect answer = move to review).
