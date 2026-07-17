import { useState } from 'react'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)

  function startEditing() {
    setDraft(todo.text)
    setIsEditing(true)
  }

  function commitEdit() {
    const trimmed = draft.trim()
    if (trimmed) {
      onEdit(todo.id, trimmed)
    }
    setIsEditing(false)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      commitEdit()
    } else if (event.key === 'Escape') {
      setIsEditing(false)
    }
  }

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'active' : 'complete'}`}
      />
      {isEditing ? (
        <input
          type="text"
          className="todo-edit-input"
          value={draft}
          autoFocus
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitEdit}
          aria-label={`Edit "${todo.text}"`}
        />
      ) : (
        <span
          className={todo.completed ? 'todo-text completed' : 'todo-text'}
          onDoubleClick={startEditing}
        >
          {todo.text}
        </span>
      )}
      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
      >
        ✕
      </button>
    </li>
  )
}

export default TodoItem
