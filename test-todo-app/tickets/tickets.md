# Tickets: Simple todo app

A small React + Vite todo app with localStorage persistence, built to exercise the skills framework. No backend, no automated tests — manual verification in the browser.

Work the **frontier**: any ticket whose blockers are all done. Ticket 1 unblocks all of 2, 3, 4, which can then proceed in any order.

## 1. Scaffold app and add todos (`scaffold-and-add-todos`)

**Blocked by:** none

**Delivers:** Vite+React app runs via `npm install && npm run dev`; user can type a todo and add it to a list; the list persists across page refresh via localStorage.

- [x] `npm install && npm run dev` starts the app with no errors
- [x] Typing text and submitting (Enter or a button) adds a new todo to a visible list
- [x] Submitting empty/whitespace-only text does not add a todo
- [x] The input clears after a successful add
- [x] Todos persist in localStorage and survive a page refresh
- [x] Plain CSS styling only, no UI library dependency

## 2. Toggle todo complete (`toggle-todo-complete`)

**Blocked by:** `scaffold-and-add-todos`

**Delivers:** Clicking a todo toggles it between active and complete, visually distinct, and the state persists across refresh.

- [x] Clicking a todo's text or a checkbox toggles its complete state
- [x] Complete todos are visually distinct (e.g. strikethrough)
- [x] Toggled state is saved to localStorage and survives a page refresh

## 3. Delete todo (`delete-todo`)

**Blocked by:** `scaffold-and-add-todos`

**Delivers:** Each todo has a delete control that removes it from the list and from localStorage.

- [x] Each todo item has a delete control (button/icon)
- [x] Clicking it removes the todo from the visible list immediately
- [x] The removal is saved to localStorage and survives a page refresh

## 4. Edit todo inline (`edit-todo-inline`)

**Blocked by:** `scaffold-and-add-todos`

**Delivers:** Double-clicking a todo's text turns it into an editable field; committing the edit renames it and persists the change.

- [x] Double-clicking a todo's text switches it to an editable input pre-filled with the current text
- [x] Pressing Enter or blurring the input commits the new text
- [x] Pressing Escape cancels the edit and restores the original text
- [x] Committing an empty/whitespace-only edit is rejected (original text is kept)
- [x] The renamed text is saved to localStorage and survives a page refresh
