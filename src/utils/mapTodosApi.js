// Utility function to map a single todo item from the API format to the frontend format
const mapTodoFromApi = (apiTodo) => {
  return {
    id: apiTodo._id,
    text: apiTodo.description,
    completed: apiTodo.isCompleted,
  }
}

// Utility function to map a single todo item from the frontend format to the API format
const mapTodoToApi = (todo) => {
  return {
    _id: todo.id,
    description: todo.text,
    isCompleted: todo.completed,
  }
}

export { mapTodoFromApi, mapTodoToApi }
