# Plan: XML Data Parsing & Logic

## Phase 1: XML Parsing Engine
- [x] Define the `Question` type in TypeScript beedb73
- [x] Create an `xmlParser` module 8c2cdca
- [x] Write unit tests for the parser using a sample XML fragment 8c2cdca
- [x] Implement the parser logic using `DOMParser` 8c2cdca

## Phase 2: Flashcard Core Logic
- [x] Create the `QuizState` store or custom hook db24c3e
- [x] Write unit tests for the sorting logic (Correct -> Known, Incorrect -> Review) db24c3e
- [x] Implement the `handleAnswer` function db24c3e
- [x] Implement the `Remaining` countdown logic db24c3e

## Phase 3: Persistence Layer
- [x] Write tests for `LocalStorage` synchronization db24c3e
- [x] Implement the state hydration and saving logic db24c3e
