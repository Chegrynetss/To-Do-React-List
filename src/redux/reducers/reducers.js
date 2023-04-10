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
} from '../actions/actionTypes'

const initialState = {
  todos: [],
  loading: false,
  error: null,
}

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
      return { ...state, todos: action.payload.todos }
    case CREATE_TODO_SUCCESS:
      return { ...state, todos: [...state.todos, action.payload.todo] }
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todo.id ? action.payload.todo : todo,
        ),
      }
    case UPDATE_TODOS_COMPLETED_STATUS_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo) => ({
          ...todo,
          completed: action.payload.completed,
        })),
      }
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      }
    default:
      return state
  }
}

const loadingReducer = (state = initialState.loading, action) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
    case CREATE_TODO_REQUEST:
    case UPDATE_TODO_REQUEST:
    case UPDATE_TODOS_COMPLETED_STATUS_REQUEST:
    case DELETE_TODO_REQUEST:
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
      return false
    default:
      return state
  }
}

const errorReducer = (state = initialState.error, action) => {
  switch (action.type) {
    case FETCH_TODOS_FAILURE:
    case CREATE_TODO_FAILURE:
    case UPDATE_TODO_FAILURE:
    case UPDATE_TODOS_COMPLETED_STATUS_FAILURE:
    case DELETE_TODO_FAILURE:
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
      return null
    default:
      return state
  }
}

export { todosReducer, loadingReducer, errorReducer }
