import { useState } from 'react'
import { config } from '../../config'
import { mapTodoFromApi, mapTodoToApi } from '../../utils/mapTodosApi'

const useTodos = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTodos = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${config.API_URL}/api/todos`)
      const data = await response.json()
      setTodos(data.payload.list.map(mapTodoFromApi))
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const createTodo = async (todo) => {
    try {
      const response = await fetch(`${config.API_URL}/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapTodoToApi(todo)),
      })
      const data = await response.json()
      setTodos((prev) => [...prev, mapTodoFromApi(data.payload?.dto)])
    } catch (err) {
      console.log(err)
    }
  }

  const updateTodo = async (todo) => {
    try {
      const response = await fetch(`${config.API_URL}/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapTodoToApi(todo)),
      })
      const data = await response.json()
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === data.payload.dto._id
            ? mapTodoFromApi(data.payload.dto)
            : todo,
        ),
      )
    } catch (err) {
      console.log(err)
    }
  }

  const updateTodosCompletedStatus = async () => {
    try {
      const allTodosCompleted = !todos.every(({ completed }) => completed)
      await fetch(`${config.API_URL}/api/updateTodosCompleted`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: allTodosCompleted }),
      })
      setTodos((todos) =>
        todos.map((todo) => ({ ...todo, completed: allTodosCompleted })),
      )
    } catch (err) {
      console.log(err)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await fetch(`${config.API_URL}/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  const deleteCompletedTodos = async () => {
    try {
      await fetch(`${config.API_URL}/api/clearCompletedTodos`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setTodos((todos) => todos.filter((todo) => !todo.completed))
    } catch (err) {
      console.log(err)
    }
  }

  return {
    todos,
    loading,
    fetchTodos,
    createTodo,
    updateTodo,
    updateTodosCompletedStatus,
    deleteTodo,
    deleteCompletedTodos,
  }
}

export { useTodos }
