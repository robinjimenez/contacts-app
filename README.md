# Contacts App

A fullstack React/Express/MongoDB app to store your contacts.

Use `yarn install` and `yarn start` to run both client and server concurrently (or run them separately).

## Improvements
- Testing
### Client
- Create a hook to translate literals.
- Avoid storing access token in browser storage.
- Unify error handling and detailed error messaging.
### Server
- Server-side data validations
- Data sanitizing to prevent XXSS
## Known issues
- Contact Edits panel scrolls horizontally when content is too long.
- Testing with Zustand: requires specific hook testing library that uses `renderHook` and isn't compatible anymore with React 18 