# Specification: Big Remaining Count with Animation

## Overview
Elevate the "Remaining Count" from a secondary stat to a central UI/UX feature. The count will be prominently displayed in the header with a dynamic "Scale & Pop" animation that triggers as soon as a correct answer is selected.

## Functional Requirements
1. **Primary UI Placement**:
   - The "Remaining Count" will be moved to the center of the header.
   - It will use a significantly larger font (e.g., `text-3xl` or `text-4xl`) to emphasize the progress toward completion.
2. **"Scale & Pop" Animation**:
   - When the count decreases, it should briefly scale up (e.g., `scale(1.2)`) and change color or glow before returning to its original size.
   - Use `framer-motion` for a smooth, high-quality spring animation.
3. **Immediate Interaction**:
   - The animation and count update must occur *immediately* when the user clicks the correct answer, providing instant gratification.

## UI/UX Design
- **Header Layout**:
  - Center: Big Remaining Count.
  - Left: Known/Review stats (compact).
  - Right: Reset/Actions (compact).
- **Hebrew Context**: Maintain RTL support and appropriate Hebrew labels (e.g., "נותרו").

## Acceptance Criteria
- [x] Remaining count is large and centered in the header.
- [x] Count updates immediately on correct answer selection.
- [x] "Scale & Pop" animation is smooth and visually satisfying.
- [x] Header remains responsive on narrow mobile screens.
