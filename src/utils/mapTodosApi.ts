interface Todo {
  id: string
  text: string
  completed: boolean
}

interface ApiTodo {
  _id: string
  description: string
  isCompleted: boolean
}

// Utility function to map a single todo item from the API format to the frontend format
const mapTodoFromApi = (apiTodo: ApiTodo): Todo => {
  return {
    id: apiTodo._id,
    text: apiTodo.description,
    completed: apiTodo.isCompleted,
  }
}

// Utility function to map a single todo item from the frontend format to the API format
const mapTodoToApi = (todo: Todo): ApiTodo => {
  return {
    _id: todo.id,
    description: todo.text,
    isCompleted: todo.completed,
  }
}

export { mapTodoFromApi, mapTodoToApi }
export type { Todo }
