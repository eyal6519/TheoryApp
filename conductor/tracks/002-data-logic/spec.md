# Specification: XML Data Parsing & Logic

## Goal
Implement the core data engine that parses the Hebrew theory exam XML file and manages the flashcard state.

## Requirements
1.  **XML Parser**:
    - Parse `theoryexamhe-data.xml.xml` using the browser's `DOMParser`.
    - Extract: Question ID, Question text, 4 Multiple-choice answers, Correct answer, Image URL (if present).
2.  **State Management (Logic)**:
    - Maintain three pools: `Remaining`, `Known`, `Review`.
    - Initial state: All questions in `Remaining`.
    - `handleAnswer(questionId, isCorrect)`:
        - If correct: Move to `Known`.
        - If incorrect: Move to `Review`.
3.  **Persistence**:
    - Sync `Known` and `Review` pools with `LocalStorage`.
4.  **Unit Tests**:
    - Verify parsing of sample XML items.
    - Verify pool transitions (Correct vs. Incorrect).
