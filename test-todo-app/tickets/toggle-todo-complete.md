# Toggle todo complete

**ID:** `toggle-todo-complete`
**Blocked by:** `scaffold-and-add-todos`

## Description

Let the user mark a todo as complete or active again. Uses the `completed` flag already present in the todo shape from the scaffold ticket.

## Acceptance criteria

- [x] Clicking a todo's text or a checkbox toggles its complete state
- [x] Complete todos are visually distinct (e.g. strikethrough)
- [x] Toggled state is saved to localStorage and survives a page refresh

## Notes

Likely files: `src/App.jsx`, `src/App.css`. Independent of `delete-todo` and `edit-todo-inline` — all three only depend on the scaffold ticket.
