# Project: Driving Theory Flashcard App (Mobile-First)

## Objective

Build a functional, mobile-responsive web application for practicing driving theory questions. The app should process an XML file containing approximately 1,800 questions and provide a "Quizlet-style" learning experience.

## Core Features & Logic

1. **XML Parsing**: The app must parse a provided XML file. Each entry contains a question, 4 multiple-choice answers, and an image reference.
2. **Automatic Sorting (Flashcard Logic)**:
    - When a user selects the **correct** answer: The question is marked as "Known" and moved out of the active pool.
    - When a user selects an **incorrect** answer: The question is marked as "Review" and remains in the active pool to be shown again later.
3. **Real-time Counters & Countdown**:
    - **Mastered Count**: Display the total number of questions answered correctly (Known).
    - **Review Count**: Display the total number of questions answered incorrectly (To be reviewed).
    - **Remaining Countdown**: Display a countdown of the remaining questions in the pool in parentheses, e.g., `(1450)`. This number must decrease only when a question moves to the "Known" pool.
4. **Visuals**: Display the associated image for each question prominently.
5. **Persistence**: Use **LocalStorage** to save the user's progress. If the page is refreshed, the "Known" and "Review" pools must be preserved.

## UI/UX Requirements

- **Mobile-First Design**: Large, easy-to-tap buttons for the four answers.
- **Clean Layout**: Minimalist interface focused on study, with counters visible at the top or side.
- **Feedback**: Immediate visual feedback for correct/incorrect answers before moving to the next card.

## Technical Constraints

- No complex backend architecture. Provide a frontend-ready solution (HTML/CSS/JS or a single-file React/Vue component).
- Do not suggest external database setups; keep everything local to the browser.

---
**Note to AI**: I will provide a sample of the XML structure below. Please analyze it to ensure the parser uses the correct tags for questions, answers, and images.
