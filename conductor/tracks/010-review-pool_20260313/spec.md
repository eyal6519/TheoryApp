# Specification: Question Review Pool (Track: 010-review-pool_20260313)

## Overview
Implement a "Manual Review Pool" (starring) feature where users can manually mark questions to be practiced later, even if they answered them correctly.

## Functional Requirements
- **Mark for Review**:
    - A toggle icon (Star/Flag) located in the Question Header.
    - Toggle behavior: Add to Review Pool / Remove from Review Pool.
- **Entry Point**:
    - A new "Review Pool" button on the Home Screen.
    - This button will launch a practice session containing only questions in the Manual Review Pool.
- **Persistence**:
    - Review Pool state must be saved to LocalStorage.
    - Removal is "Always Manual": Questions stay in the pool until the user explicitly unmarks them via the icon toggle.
- **Visual Feedback**:
    - The Icon Toggle must change state (e.g., Outline to Filled) to indicate if the current question is in the pool.

## Acceptance Criteria
- [ ] Clicking the icon toggle in the question header adds/removes the question from the pool.
- [ ] The "Review Pool" button on the Home Screen shows the correct count of questions.
- [ ] Practicing the "Review Pool" only includes questions manually marked.
- [ ] State persists after a browser refresh.

## Out of Scope
- Integration with the "Incorrect Answers" (Review) pool.
- Detailed statistics on the Manual Review Pool.
