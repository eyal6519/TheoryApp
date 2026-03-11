# Initial Concept
a mobile app for prepearing to the driver licesnse exam by practicing the questions.

# Driving Theory Exam Flashcard App (Mobile-First)

## Product Vision
To provide a simple, effective, and mobile-friendly way for students to prepare for their driving theory exams. The app focuses on a "Quizlet-style" learning experience using flashcards and real-time progress tracking.

## Target Audience
- **Student Drivers**: Primary users preparing for their initial driving theory exams.

## Core Features & Logic
- **Flashcard System**: Questions are shown one at a time. Users select a multiple-choice answer.
    - **Correct**: Moves to "Known" pool.
    - **Incorrect**: Moves to "Review" pool.
- **Progress Tracking**: Real-time display of:
    - **Mastered Count**: Total correct answers.
    - **Review Count**: Total incorrect answers.
    - **Remaining Countdown**: Current pool of questions remaining.
- **Visual Quiz UI**: Each question displays its associated image prominently along with its four multiple-choice answers.
- **Local Persistence**: Uses browser LocalStorage to save "Known" and "Review" pools so progress isn't lost on refresh.

## Data & Content
- **Primary Source**: `theoryexamhe-data.xml.xml` (parsed directly in the browser).
- **Format**: Standard XML parsing logic to handle the 1,800+ questions.

## Success Metrics
- Seamless mobile experience.
- Fast XML parsing and UI updates.
- Reliable state persistence across sessions.
