import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  UPDATE_TODOS_COMPLETED_STATUS_REQUEST,
  UPDATE_TODOS_COMPLETED_STATUS_SUCCESS,
  UPDATE_TODOS_COMPLETED_STATUS_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  DELETE_TODOS_COMPLETED_REQUEST,
  DELETE_TODOS_COMPLETED_SUCCESS,
  DELETE_TODOS_COMPLETED_FAILURE,
} from './actionTypes'

export const fetchTodosRequest = () => ({
  type: FETCH_TODOS_REQUEST,
})

export const fetchTodosSuccess = (todos) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: { todos },
})

export const fetchTodosFailure = (error) => ({
  type: FETCH_TODOS_FAILURE,
  payload: { error },
})

export const createTodoRequest = (text) => ({
  type: CREATE_TODO_REQUEST,
  payload: { text },
})

export const createTodoSuccess = (todo) => ({
  type: CREATE_TODO_SUCCESS,
  payload: { todo },
})

export const createTodoFailure = (error) => ({
  type: CREATE_TODO_FAILURE,
  payload: { error },
})

export const updateTodoRequest = (id, updates) => ({
  type: UPDATE_TODO_REQUEST,
  payload: { id, updates },
})

export const updateTodoSuccess = (todo) => ({
  type: UPDATE_TODO_SUCCESS,
  payload: { todo },
})

export const updateTodoFailure = (error) => ({
  type: UPDATE_TODO_FAILURE,
  payload: { error },
})

export const updateTodosCompletedStatusRequest = () => ({
  type: UPDATE_TODOS_COMPLETED_STATUS_REQUEST,
})

export const updateTodosCompletedStatusSuccess = (allTodosCompleted) => ({
  type: UPDATE_TODOS_COMPLETED_STATUS_SUCCESS,
  payload: { allTodosCompleted },
})

export const updateTodosCompletedStatusFailure = (error) => ({
  type: UPDATE_TODOS_COMPLETED_STATUS_FAILURE,
  payload: { error },
})

export const deleteTodoRequest = (id) => ({
  type: DELETE_TODO_REQUEST,
  payload: { id },
})

export const deleteTodoSuccess = (id) => ({
  type: DELETE_TODO_SUCCESS,
  payload: { id },
})

export const deleteTodoFailure = (error) => ({
  type: DELETE_TODO_FAILURE,
  payload: { error },
})

export const deleteTodosCompletedRequest = () => ({
  type: DELETE_TODOS_COMPLETED_REQUEST,
})

export const deleteTodosCompletedSuccess = () => ({
  type: DELETE_TODOS_COMPLETED_SUCCESS,
})

export const deleteTodosCompletedFailure = (error) => ({
  type: DELETE_TODOS_COMPLETED_FAILURE,
  payload: { error },
})
