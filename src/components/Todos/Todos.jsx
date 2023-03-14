import React, { useState } from 'react'
import AddTodo from './AddTodo'
import TodoItem from './TodoItem'
import { TODO_STATUS } from './Todos.constants'
import './TodoStyles/Edit.Delete.css'
import TodosConditions from './TodosConditions'
import './TodoStyles/Header.css'
import './TodoStyles/TodoList.css'
import './TodoStyles/FormInput.css'

const Todos = () => {
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState(TODO_STATUS.ALL)

  const handleAdd = (text) => {
    setTodos([...todos, { id: Date.now(), text }])
  }

  const handleRemove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleEdit = (newTodo) => {
    setTodos(todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo)))
  }

  const ItemsLeftCounter = todos.reduce(
    (acc, todo) => (!todo.completed ? acc + 1 : acc),
    0,
  )

  const CompletedTodos = todos.some((todo) => todo.completed)

  const handleClearedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const visibleTodos = todos.filter((todo) => {
    if (status === TODO_STATUS.ACTIVE) {
      return !todo.completed
    }
    if (status === TODO_STATUS.COMPLETED) {
      return todo.completed
    }
    return true
  })

  return (
    <div>
      <header className="Header">
        <h1 className="Header__title"> ToDo List </h1>
      </header>
      <AddTodo onAdd={handleAdd} />
      <ul>
        {visibleTodos.map((todo) => (
          <TodoItem
            className="TodoList__item"
            key={todo.id}
            todo={todo}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        ))}
      </ul>
      <div>{ItemsLeftCounter} Items left </div>
      <TodosConditions
        value={status}
        onChange={setStatus}
        options={[
          { name: 'All', value: TODO_STATUS.ALL },
          { name: 'Active', value: TODO_STATUS.ACTIVE },
          { name: 'Completed', value: TODO_STATUS.COMPLETED },
        ]}
      />
      {CompletedTodos ? (
        <button className="Footer Footer__filter" onClick={handleClearedTodos}>
          Clear Completed
        </button>
      ) : null}
    </div>
  )
}
export default Todos
