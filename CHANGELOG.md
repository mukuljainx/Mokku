# Change Log

All notable changes to this project will be documented in this file.

## [2.4.1] - 29 December 2025

### Added
- Added Dark theme
- Added theme selectors in settings
- Added proper URL tester, where you can test against existing mocks or custom test values.
- Tabs will retain filter state for each tab.
- Added changelog modal


## [2.3.0] - 26 December 2025

### Added

- Add App back to Panel: All Curd can be done in Panel only, while Dashboard can be open for full view
- Added Selection to headers
- Added dedicated Panel settings

### Fixes
- Fixed header search

## [2.2.2] - 22 December 2025

### Added

- Added project dropdown in mock form
- Added bulk operations like delete, active, deactivate and change project to mocks listing
- Remove redundant headings
- Improves mock pagination U

### Fixes
- Mocking status apart from 200
- Status apart from 200 will be mocked properly
- Will identify url's in 3 part, protocol, origin and pathname, will check only pathname for dynamic parts.
- Adds tests for urlParser
- Highlight side nav option when on the page
- fix Project search
- Fix Monaco editor linting

## [2.2.1] - 15 December 2025

### Fixed

- Fixed URL when opening dashboard from add mock and no existing page is loaded

## [2.2.0] - 10 December 2025

### Updated

- Bundled mokku.app with extension as dashboard.html page


## [2.1.2] - 26 November 2025

### Updated

- Header: Use declarativeNetRequest for header modification, this ensures we are setting right headers even on page load for all resource type
- Header: Add support for multi method and resource type
- Header: Add support domain filter, url pattern matching or regex

## [2.1.1] - 19 November 2025

### Updated

- Check if Mokku and loaded before starting the app

## [2.1.0] - 17 November 2025

### Added

- GraphQL support
- Dynamic Response via functions
- Create Projects to manage mocks
- Import export
- Added the Monaco editor (VSCode editor)
