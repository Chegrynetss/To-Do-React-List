import { combineReducers } from 'redux'
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
} from '../actions/actionTypes'

const list = (state = [], action) => {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
      return action.payload.todos
    case CREATE_TODO_SUCCESS:
      return [...state.todos, action.payload.todo]
    case UPDATE_TODO_SUCCESS:
      return state.todos.map((todo) =>
        todo.id === action.payload.todo.id ? action.payload.todo : todo,
      )
    case UPDATE_TODOS_COMPLETED_STATUS_SUCCESS:
      return state.todos.map((todo) => ({
        ...todo,
        completed: action.payload.completed,
      }))
    case DELETE_TODO_SUCCESS:
      return state.todos.filter((todo) => todo.id !== action.payload.id)

    case DELETE_TODOS_COMPLETED_REQUEST:
      return state.todos.filter((todo) => !todo.completed)
    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
    case CREATE_TODO_REQUEST:
    case UPDATE_TODO_REQUEST:
    case UPDATE_TODOS_COMPLETED_STATUS_REQUEST:
    case DELETE_TODO_REQUEST:
    case DELETE_TODOS_COMPLETED_REQUEST:
      return true
    case FETCH_TODOS_SUCCESS:
    case FETCH_TODOS_FAILURE:
    case CREATE_TODO_SUCCESS:
    case CREATE_TODO_FAILURE:
    case UPDATE_TODO_SUCCESS:
    case UPDATE_TODO_FAILURE:
    case UPDATE_TODOS_COMPLETED_STATUS_SUCCESS:
    case UPDATE_TODOS_COMPLETED_STATUS_FAILURE:
    case DELETE_TODO_SUCCESS:
    case DELETE_TODO_FAILURE:
    case DELETE_TODOS_COMPLETED_SUCCESS:
    case DELETE_TODOS_COMPLETED_FAILURE:
      return false
    default:
      return state
  }
}

const error = (state = false, action) => {
  switch (action.type) {
    case FETCH_TODOS_FAILURE:
    case CREATE_TODO_FAILURE:
    case UPDATE_TODO_FAILURE:
    case UPDATE_TODOS_COMPLETED_STATUS_FAILURE:
    case DELETE_TODO_FAILURE:
    case DELETE_TODOS_COMPLETED_FAILURE:
      return action.payload.error
    case FETCH_TODOS_REQUEST:
    case FETCH_TODOS_SUCCESS:
    case CREATE_TODO_REQUEST:
    case CREATE_TODO_SUCCESS:
    case UPDATE_TODO_REQUEST:
    case UPDATE_TODO_SUCCESS:
    case UPDATE_TODOS_COMPLETED_STATUS_REQUEST:
    case UPDATE_TODOS_COMPLETED_STATUS_SUCCESS:
    case DELETE_TODO_REQUEST:
    case DELETE_TODO_SUCCESS:
    case DELETE_TODOS_COMPLETED_REQUEST:
    case DELETE_TODOS_COMPLETED_SUCCESS:
      return null
    default:
      return state
  }
}

export default combineReducers({ list, loading, error })
