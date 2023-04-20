import { combineReducers } from 'redux'
import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  CREATE_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODOS_COMPLETED_STATUS_SUCCESS,
  DELETE_TODO_SUCCESS,
  DELETE_TODOS_COMPLETED_REQUEST,
} from '../actions/actionTypes'
import { ListAction } from '../actions/actions'
import { Todo } from 'types'

const list = (state = [] as Todo[], action: ListAction): Todo[] => {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
      return action.payload.todos
    case CREATE_TODO_SUCCESS:
      return [...state, action.payload.todo]
    case UPDATE_TODO_SUCCESS:
      return state.map((todo) =>
        todo.id === action.payload.todo.id ? action.payload.todo : todo,
      )
    case UPDATE_TODOS_COMPLETED_STATUS_SUCCESS:
      return action.payload.todos
    case DELETE_TODO_SUCCESS:
      return state.filter((todo) => todo.id !== action.payload.id)
    case DELETE_TODOS_COMPLETED_REQUEST:
      return state.filter((todo) => !todo.completed)
    default:
      return state
  }
}

const loading = (state = false, action: ListAction) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return true
    case FETCH_TODOS_SUCCESS:
    case FETCH_TODOS_FAILURE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  list,
  loading,
})
