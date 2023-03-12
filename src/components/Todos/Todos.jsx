import React, { useState } from 'react'
import AddTodo from './AddTodo.jsx'
import EditTodo from './EditTodo.jsx'
import TodoItem from './TodoItem.jsx'
import { TODO_STATUS } from './TodoStatus.ts'

function Todos() {
  const [todos, setTodos] = useState([])
  const [editing, setEditing] = useState(null)
  const [status, setStatus] = useState(TODO_STATUS.ALL)

  function handleAdd(text) {
    setTodos([...todos, { id: Date.now(), text }])
  }

  function handleRemove(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function handleEdit(todo) {
    setEditing(todo)
  }

  function handleSave(todo) {
    const updatedTodos = todos.map((t) => (t.id === todo.id ? todo : t))
    setTodos(updatedTodos)
    setEditing(null)
  }

  function handleCancel() {
    setEditing(null)
  }

  const handleToggle = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        }
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }

  const visibleTodos = todos.filter((todo) => {
    if (status === TODO_STATUS.COMPLETED) {
      return todo.completed
    } else {
      return !todo.completed
    }
  })

  return (
    <div>
      <h1> ToDo List </h1>
      <label>
        <select onChange={handleStatusChange}>
          <option value={TODO_STATUS.ALL}> All Items </option>
          <option value={TODO_STATUS.COMPLETED}> Completed </option>
        </select>
      </label>
      <ul>
        {visibleTodos.map((todo) => (
          <TodoItem
            todo={todo}
            onEdit={handleEdit}
            onRemove={handleRemove}
            onToggle={handleToggle}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
      {editing && (
        <EditTodo todo={editing} onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  )
}
export default Todos
