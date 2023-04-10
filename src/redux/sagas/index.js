import { all } from 'redux-saga/effects'
import {
  watchFetchTodos,
  watchCreateTodo,
  watchUpdateTodo,
  watchUpdateTodosCompletedStatus,
  watchDeleteTodo,
} from './saga'

export default function* rootSaga() {
  yield all([
    yield watchFetchTodos(),
    yield watchCreateTodo(),
    yield watchUpdateTodo(),
    yield watchUpdateTodosCompletedStatus(),
    yield watchDeleteTodo(),
  ])
}