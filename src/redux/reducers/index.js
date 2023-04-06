import { combineReducers } from 'redux'
import {
  todosReducer,
  loadingReducer,
  errorReducer,
} from '../reducers/reducers'

const rootReducer = combineReducers({
  todos: todosReducer,
  loading: loadingReducer,
  error: errorReducer,
})

export default rootReducer
