# Specification: Bug Fix - Missing Question Images (Switch to JSON Source)

## Overview
Users are reporting that images (such as traffic signs) are not displaying in the quiz because the old XML source uses deprecated `mot.gov.il` URLs. A new official source, `datastore_search.json`, provides working images via `www.gov.il`. This track aims to switch the data source to this JSON format and ensure correct image display.

## Functional Requirements
- **JSON Data Migration**: Replace `data.xml` with `datastore_search.json`.
- **New Parsing Logic**: Implement a parser that handles the JSON structure (`result.records`), specifically extracting:
    - `id` and `title` from `title2`.
    - `answers` and `imageUrl` from `description4`.
    - `category` from the `category` field.
- **Protocol Compatibility**: Ensure images from `https://www.gov.il` load correctly.
- **Fallback UI**: Maintain robust fallback behavior for image loading failures.

## Acceptance Criteria
- The app loads and displays questions from `datastore_search.json`.
- Images are visible and correctly associated with their questions.
- All existing functionality (persistence, progress tracking) remains intact.
