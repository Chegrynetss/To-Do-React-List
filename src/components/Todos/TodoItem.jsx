const TodoItem = ({todo, onToggle, onEdit, onRemove}) => {
  const handleToggle = () => {
    onToggle(todo.id)
}
  const handleEdit = () => {
    onEdit(todo)
}
  const handleRemove = () => {
      onRemove(todo.id)
  }

return (
    <li key={todo.id}>
        <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
        />
        <span
            style={{textDecoration: todo.completed ? 'line-through' : 'none',}}
        >
            {todo.text}
        </span>
        <button onClick={handleEdit}> Edit </button>
        <button onClick={handleRemove}> Remove </button>
    </li>
)
}

export default TodoItem;