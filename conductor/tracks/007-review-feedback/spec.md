# Specification: Review Session Feedback

## Objective
Enhance the "Review Mode" with more specific feedback and a decision point after completing a review batch.

## Core Requirements
1. **Success Feedback**: When a user completes a review session (after clicking the Review button) and answers all questions correctly, show a success toast.
   - **Toast Message**: "כל הכבוד! הצלחת בכל השאלות בהן טעית" (Well done! You succeeded in all the questions you got wrong).
2. **Failure Choice**: If the user finishes a review session but missed at least one question again, show a choice modal.
   - **Modal Question**: "האם ברצונך לנסות שוב את השאלות שנכשלו או להמשיך הלאה?" (Would you like to retry the failed questions or move on?).
   - **Options**:
     - **Retry (נסה שוב)**: Restarts the review session for the remaining failed questions.
     - **Move On (המשך)**: Resets the session state and continues with the current question pool.

## Technical Details
- **Session State**: Track `batchSize`, `batchCount`, and `batchFailed` within the `useQuiz` hook.
- **Session Lifecycle**:
  - **Start**: When `bringReviewToFront` is called.
  - **Progress**: On each `handleAnswer` call.
  - **Finish**: When `batchCount === batchSize`.
- **UI Component**: A modal using `framer-motion` for the choice.

## Hebrew Translations
- Success Toast: "כל הכבוד! הצלחת בכל השאלות בהן טעית"
- Modal Title: "סיימת את הביקורת" (You finished the review)
- Modal Question: "האם ברצונך לנסות שוב את השאלות שבהן טעית או להמשיך בשאלות הבאות?"
- Button Retry: "נסה שוב את השאלות שטעיתי"
- Button Continue: "המשך לשאלות הבאות"
