# Specification: Feature - Randomized Question Order

## Overview
Currently, the questions appear in the same fixed order from the data source. To provide a better learning experience, the app should shuffle the remaining questions every time the session is initialized (on load or refresh), making the sequence unpredictable.

## Functional Requirements
- **Session-Based Randomization**: Shuffle the `allQuestions` (excluding "Known" ones) during the initial load in `App.tsx` or inside `useQuiz.ts`.
- **Persistent Logic for Incorrect Answers**: Maintain the current behavior where an incorrect answer is re-queued at the **end** of the current session's remaining list.
- **Persistence Support**: Shuffling should not interfere with the existing `knownIds` and `reviewIds` logic in LocalStorage.

## Non-Functional Requirements
- **Performance**: The shuffle algorithm (e.g., Fisher-Yates) should be efficient enough to handle 1,800+ questions without noticeable lag.
- **Consistency**: The shuffle should happen exactly once per load, and then the queue should remain stable until the next load or until an answer is given.

## Acceptance Criteria
- Questions appear in a different random order every time the page is refreshed.
- "Known" questions (stored in LocalStorage) are correctly filtered out before shuffling.
- Incorrect questions are moved to the end of the queue as before.
- The total question count remains correct.

## Out of Scope
- Adding a manual "Shuffle" button to the UI.
- Randomizing the order of answers within a question (multiple-choice options).
