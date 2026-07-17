# Edit todo inline

**ID:** `edit-todo-inline`
**Blocked by:** `scaffold-and-add-todos`

## Description

Let the user rename an existing todo's text in place, without a separate edit page or modal.

## Acceptance criteria

- [x] Double-clicking a todo's text switches it to an editable input pre-filled with the current text
- [x] Pressing Enter or blurring the input commits the new text
- [x] Pressing Escape cancels the edit and restores the original text
- [x] Committing an empty/whitespace-only edit is rejected (original text is kept)
- [x] The renamed text is saved to localStorage and survives a page refresh

## Notes

Likely files: `src/App.jsx`, `src/App.css`. Independent of `toggle-todo-complete` and `delete-todo` — all three only depend on the scaffold ticket.
