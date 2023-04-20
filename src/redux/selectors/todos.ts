import { RootState } from 'redux/store'

export const GetTodosList = (state: RootState) => state.todos.list

export const GetTodosLoading = (state: RootState) => state.todos.loading

export const GetAllTodosCompleted = (state: RootState) =>
  state.todos.list.every(({ completed }) => completed)
