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

  const updateTodosCompleted = async (todo) => {
    try {
      const response = await fetch(`${config.API_URL}/api/${todo.completed}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapTodoToApi(todo)),
      })
      const data = await response.json()
      setTodos((prev) =>
        prev.map((todo) =>
          todo.completed === data.payload.list.isCompleted
            ? mapTodoFromApi(data.payload.list)
            : todo,
        ),
      )
    } catch (err) {
      console.log(err)
    }
  }

  // const deleteTodo = async (todo) => {
  //   try {
  //     const response = await fetch(`${config.API_URL}/api/todos/${todo.id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     const data = await response.json()
  //     setTodos((prev) =>
  //       prev.map((todo) =>
  //         todo.id !== data.payload.dto._id
  //           ? mapTodoFromApi(data.payload.dto)
  //           : todo,
  //       ),
  //     )
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return {
    todos,
    loading,
    fetchTodos,
    createTodo,
    updateTodo,
    updateTodosCompleted,
    // deleteTodo,
  }
}

export { useTodos }
