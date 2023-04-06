import React, { useEffect, useState } from 'react'
import { TODO_STATUS } from './Todos.constants'
import AddTodo from './AddTodo/AddTodo'
import TodoItem from './TodoItem/TodoItem'
import TodoStatus from './TodoStatus/TodoStatus'
import './Todos.styles.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchTodoRequest,
  createTodoRequest,
  updateTodoRequest,
  updateTodosCompletedStatusRequest,
  deleteTodoRequest,
} from '../../redux/actions/actions'

const Todos = () => {
  const [status, setStatus] = useState(TODO_STATUS.ALL)
  const [allChecked, setAllChecked] = useState(true)
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)
  const loading = useSelector((state) => state.loading)

  useEffect(() => {
    dispatch(fetchTodoRequest())
  }, [])

  useEffect(() => {
    const allTodosChecked = todos.every((todo) => todo.completed)
    setAllChecked(allTodosChecked)
  }, [todos])

  const handleAdd = (text) => {
    dispatch(createTodoRequest({ text }))
  }

  const handleEdit = (newTodo) => {
    dispatch(updateTodoRequest(newTodo))
  }

  const handleRemove = (id) => {
    dispatch(deleteTodoRequest(id))
  }

  const handleCheckAll = () => {
    dispatch(updateTodosCompletedStatusRequest())
    if (allChecked) {
      dispatch(
        updateTodoRequest(todos.map((todo) => ({ ...todo, completed: false }))),
      )
    } else {
      dispatch(
        updateTodoRequest(todos.map((todo) => ({ ...todo, completed: true }))),
      )
    }
  }

  const completedTodosCount = todos.reduce(
    (acc, todo) => (!todo.completed ? acc + 1 : acc),
    0,
  )

  const todosAreCompleted = () => {
    todos.some((todo) => todo.completed)
  }

  const todosCheckOption = [
    { name: 'All', value: TODO_STATUS.ALL },
    { name: 'Active', value: TODO_STATUS.ACTIVE },
    { name: 'Completed', value: TODO_STATUS.COMPLETED },
  ]

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
      {loading && (
        <div className="Todos__title--loading">
          <p> Loading... </p>
        </div>
      )}
      {loading && 'Loading...'}
      <header className="Todos__header">
        <h1 className="Todos__title "> todos </h1>
      </header>
      <div className="TodoItem__box">
        <div className="AddTodo__form">
          <AddTodo
            onAdd={handleAdd}
            onToggleActive={todosAreCompleted}
            onToggleClick={handleCheckAll}
            showToggle={todos.length}
          />
        </div>
        <ul className="TodoItem__box-section">
          {visibleTodos.map((todo) => (
            <TodoItem
              className="List__items"
              key={todo.id}
              todo={todo}
              onEdit={handleEdit}
              onRemove={handleRemove}
            />
          ))}
        </ul>
        {todos.length ? (
          <div className="Todos__footer">
            <span className="Todos__button--count">
              {completedTodosCount} Items left
            </span>
            <TodoStatus
              value={status}
              onChange={setStatus}
              options={todosCheckOption}
            />
            <button
              className={`Todos__button--clear ${
                !todosAreCompleted ? 'Todos__button--clear--hidden' : ''
              }`}
              //   onClick={handleClearedTodos}
            >
              Clear Completed
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
export default Todos

// const Todos = () => {
//   const [todos, setTodos] = useState([])
//   const [status, setStatus] = useState(TODO_STATUS.ALL)
//   const [, setAllChecked] = useState(false)
//   const {
//     todos,
//     loading,
//     fetchTodos,
//     createTodo,
//     updateTodo,
//     updateTodosCompletedStatus,
//     deleteTodo,
//     deleteCompletedTodos,
//   } = useTodos()

//   useEffect(() => {
//     fetchTodos()
//   }, [])

//   useEffect(() => {
//     const allTodosChecked = todos.every((todo) => todo.completed)
//     setAllChecked(allTodosChecked)
//   }, [todos])

//   const handleAdd = (text) => {
//     createTodo({ text })
//   }

// const handleRemove = (id) => {
//   deleteTodo(id)
//   // setTodos(todos.filter((todo) => todo.id !== id))
// }

// const handleEdit = (newTodo) => {
//   updateTodo(newTodo)
//   // setTodos(todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo)))
// }
// const handleCheckAll = () => {
//   updateTodosCompletedStatus()
//   // updateTodosCompletedStatus()
//   // if (allChecked) {
//   //   setTodos((prevTodo) =>
//   //     prevTodo.map((todo) => ({ ...todo, completed: false })),
//   //   )
//   // } else {
//   //   setTodos((prevTodo) =>
//   //     prevTodo.map((todo) => ({ ...todo, completed: true })),
//   //   )
//   // }
// }

// const handleClearedTodos = () => {
//   deleteCompletedTodos()
//   // setTodos(todos.filter((todo) => !todo.completed))
// }
