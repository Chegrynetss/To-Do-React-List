import React, { useState } from 'react'
import AddTodo from './AddTodo'
import EditTodo from './EditTodo'
import TodoItem from './TodoItem'
import { TODO_STATUS } from './Todos.constants'
import './Todos.styles.css'
import TodosConditions from './TodosConditions'

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

  const visibleTodos = todos.filter((todo) => {
    if (status === TODO_STATUS.ALL) {
      return true
    }
    if (status === TODO_STATUS.ACTIVE) {
      return !todo.completed
    }
    if (status === TODO_STATUS.COMPLETED) {
      return todo.completed
    }
  })

  return (
    <div>
      <h1> ToDo List </h1>
      <TodosConditions value={status} onChange={setStatus} />
      <ul>
        {visibleTodos.map((todo) => (
          <TodoItem
            key={todo.id}
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
