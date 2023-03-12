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
    <ul key={todo}>
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
        <button className="buttonDelete" onClick={handleRemove}> &#10060; </button>
        <button className="buttonEdit"onClick={handleEdit}> Edit </button>
    </ul>
)
}

export default TodoItem;