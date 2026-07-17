# Scaffold app and add todos

**ID:** `scaffold-and-add-todos`
**Blocked by:** none

## Description

Set up the Vite + React project skeleton for the todo app and implement the first vertical slice: adding a todo. This includes the localStorage-backed state that every later ticket (toggle, delete, edit) builds on, so get the shape of that state right here — an array of `{ id, text, completed }` objects is the expected shape.

## Acceptance criteria

- [x] `npm install && npm run dev` starts the app with no errors
- [x] Typing text and submitting (Enter or a button) adds a new todo to a visible list
- [x] Submitting empty/whitespace-only text does not add a todo
- [x] The input clears after a successful add
- [x] Todos persist in localStorage and survive a page refresh
- [x] Plain CSS styling only, no UI library dependency

## Notes

Likely files: `package.json`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`, `src/App.css`. Consider a small `useLocalStorage`-style hook or a load/save effect pair, since tickets 2-4 will reuse the same persisted state shape.
