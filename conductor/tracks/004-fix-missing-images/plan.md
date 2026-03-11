# Implementation Plan: Bug Fix - Missing Question Images (Switch to JSON Source)

## Phase 1: Data Migration & Parser Update
- [ ] Task: Create JSON Parser for datastore_search.json
    - [ ] Create `src/utils/jsonParser.ts` (or update xmlParser.ts to a generic dataParser)
    - [ ] Correctly parse `title2` for ID/Title and `description4` for answers and images
- [ ] Task: Create Failing Tests for JSON Parsing
    - [ ] Add tests to verify extraction from the new JSON structure
    - [ ] Confirm tests fail before implementation (Red Phase)
- [ ] Task: Conductor - User Manual Verification 'Data Migration & Parser Update' (Protocol in workflow.md)

## Phase 2: Integration & UI Polish
- [ ] Task: Update App.tsx to use JSON source
    - [ ] Change fetch target to `/datastore_search.json`
    - [ ] Update state and effects to handle the new data structure
- [ ] Task: Verify Images and UI Fallbacks
    - [ ] Confirm images from `www.gov.il` are displayed correctly
    - [ ] Ensure `onError` handler is robust
- [ ] Task: Final Verification & Coverage
    - [ ] Run all tests and ensure >80% coverage
    - [ ] Verify in local dev environment
- [ ] Task: Conductor - User Manual Verification 'Integration & UI Polish' (Protocol in workflow.md)
