// Utility function to map a single todo item from the API format to the frontend format
const mapTodoFromApi = (apiTodo) => {
  return {
    id: apiTodo._id,
    text: apiTodo.description,
    completed: apiTodo.isCompleted,
  }
}

// Utility function to map an array of todo items from the API format to the frontend format
const mapTodosFromApi = (apiTodos) => {
  return apiTodos.map(mapTodoFromApi)
}

// Utility function to map a single todo item from the frontend format to the API format
const mapTodoToApi = (todo) => {
  return {
    _id: todo.id,
    description: todo.text,
    isCompleted: todo.completed,
  }
}
// Utility function to map an array of todo items from the frontend format to the API format
const mapTodosToApi = (todos) => {
  return todos.map(mapTodoToApi)
}

export { mapTodoFromApi, mapTodosFromApi, mapTodoToApi, mapTodosToApi }
