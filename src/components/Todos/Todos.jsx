import React, { useEffect, useState } from 'react'
import AddTodo from './AddTodo'
import TodoItem from './TodoItem'
import { TODO_STATUS } from './Todos.constants'
import './TodoStyles/Edit.Delete.css'
import TodosConditions from './TodosConditions'
import './TodoStyles/Header.css'
import './TodoStyles/TodoList.css'
import './TodoStyles/FormInput.css'
import downArrowIcon from './TodoStyles/Icons/down-arrow.png'

const Todos = () => {
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState(TODO_STATUS.ALL)
  const [allChecked, setAllChecked] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const allTodosChecked = todos.every((todo) => todo.completed)
    setAllChecked(allTodosChecked)
  }, [todos])

  const handleAdd = (text) => {
    setTodos([...todos, { id: Date.now(), text }])
    setFormSubmitted(true)
  }

  const handleRemove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleEdit = (newTodo) => {
    setTodos(todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo)))
  }

  const completedTodosCount = todos.reduce(
    (acc, todo) => (!todo.completed ? acc + 1 : acc),
    0,
  )

  const todosAreCompleted = todos.some((todo) => todo.completed)

  const handleCheckAll = () => {
    if (allChecked) {
      setTodos((prevTodo) =>
        prevTodo.map((todo) => ({ ...todo, completed: false })),
      )
    } else {
      setTodos((prevTodo) =>
        prevTodo.map((todo) => ({ ...todo, completed: true })),
      )
    }
  }

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
      <div className="App__section">
        <div className="input__Section">
          <button onClick={handleCheckAll} className="complete__All__Button">
            <img src={downArrowIcon} width="25px" height="25px" />
          </button>
          <AddTodo onAdd={handleAdd} />
        </div>
        {formSubmitted && (
          <ul className="todo__Section">
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
        )}
        {formSubmitted && (
          <div className="Nav__section">
            <span className="Footer__counter">
              {completedTodosCount} Items left
            </span>
            <TodosConditions
              value={status}
              onChange={setStatus}
              options={[
                { name: 'All', value: TODO_STATUS.ALL },
                { name: 'Active', value: TODO_STATUS.ACTIVE },
                { name: 'Completed', value: TODO_STATUS.COMPLETED },
              ]}
            />
            <div className="Footer__clear">
              {todosAreCompleted ? (
                <button
                  className="Footer Footer__filter"
                  onClick={handleClearedTodos}
                >
                  Clear Completed
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Todos
