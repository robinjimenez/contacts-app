# Contacts App

A fullstack React/Express/MongoDB app to store your contacts.

## Improvements
### Client
- Create a hook to translate literals.
- Avoid storing access token in browser storage.
- Unify error handling and detailed error messaging.

### Server
- Server-side data validations
- Create middleware for authentication
- Data sanitizing to prevent XXSS
## Known issues
- Testing with Zustand: requires specific hook testing library that uses `renderHook` and isn't compatible anymore with React 18 