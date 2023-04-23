import React, { useEffect, useState } from 'react'
import { TODO_STATUS } from './Todos.constants'
import AddTodo from './AddTodo/AddTodo'
import TodoItem from './TodoItem/TodoItem'
import { useStyles } from './Todos.styles'
import TodoStatus from './TodoStatus/TodoStatus'
import { useSelector, useDispatch } from 'react-redux'
import { GetTodosList, GetTodosLoading } from '../../redux/selectors/todos'
import {
  CreateTodoRequestAction,
  DeleteTodoRequestAction,
  DeleteTodosCompletedRequestAction,
  FetchTodosRequestAction,
  UpdateTodoRequestAction,
  UpdateTodosCompletedStatusRequestAction,
} from '../../redux/actions/actions'
import { Todo } from 'types'

const Todos = () => {
  const [status, setStatus] = useState(TODO_STATUS.ALL)

  const [allChecked, setAllChecked] = useState(true)

  const dispatch = useDispatch()

  const todos = useSelector(GetTodosList)

  const loading = useSelector(GetTodosLoading)

  const { classes } = useStyles()

  useEffect(() => {
    const action: FetchTodosRequestAction = {
      type: 'FETCH_TODOS_REQUEST',
    }

    dispatch(action)
  }, [])

  useEffect(() => {
    const allTodosChecked = todos.every((todo) => todo.completed)
    setAllChecked(allTodosChecked)
  }, [todos])

  const handleAdd = (text: string) => {
    const action: CreateTodoRequestAction = {
      type: 'CREATE_TODO_REQUEST',
      payload: {
        text,
      },
    }

    dispatch(action)
  }

  const handleEdit = (todo: Todo, onEditEnd?: () => void) => {
    const action: UpdateTodoRequestAction = {
      type: 'UPDATE_TODO_REQUEST',
      payload: {
        todo,
        onSuccess: onEditEnd,
      },
    }

    dispatch(action)
  }

  const handleRemove = (id: string) => {
    const action: DeleteTodoRequestAction = {
      type: 'DELETE_TODO_REQUEST',
      payload: {
        id: id,
      },
    }

    dispatch(action)
  }

  const handleCheckAll = () => {
    const action: UpdateTodosCompletedStatusRequestAction = {
      type: 'UPDATE_TODOS_COMPLETED_STATUS_REQUEST',
    }

    dispatch(action)
  }

  const handleClearedTodos = () => {
    const action: DeleteTodosCompletedRequestAction = {
      type: 'DELETE_TODOS_COMPLETED_REQUEST',
    }

    dispatch(action)
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
        <div className={classes.titleLoading}>
          <p> Loading... </p>
        </div>
      )}
      {loading && 'Loading...'}
      <header className={classes.header}>
        <h1 className={classes.title}> todos </h1>
      </header>
      <div className={classes.box}>
        <div className={classes.form}>
          <AddTodo
            onAdd={handleAdd}
            onToggleActive={Boolean(todosAreCompleted)}
            onToggleClick={handleCheckAll}
            showToggle={Boolean(todos.length)}
          />
        </div>
        <ul className={classes.boxSection}>
          {visibleTodos.map((todo) => (
            <TodoItem
              className={classes.listItems}
              key={todo.id}
              todo={todo}
              onEdit={handleEdit}
              onRemove={handleRemove}
            />
          ))}
        </ul>
        {todos.length ? (
          <div className={classes.footer}>
            <span className={classes.buttonCount}>
              {completedTodosCount} Items left
            </span>
            <TodoStatus
              value={status}
              onChange={setStatus}
              options={todosCheckOption}
            />
            <button
              className={`${classes.buttonClear} ${
                !todosAreCompleted ? classes.buttonClearHidden : ''
              }`}
              onClick={handleClearedTodos}
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
