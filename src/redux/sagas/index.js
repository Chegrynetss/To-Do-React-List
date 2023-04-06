import { all } from 'redux-saga/effects'
import {
  fetchTodosSaga,
  createTodoSaga,
  updateTodoSaga,
  updateTodosCompletedStatusSaga,
  deleteTodosSaga,
} from './saga'

export default function* rootSaga() {
  yield all([
    fetchTodosSaga(),
    createTodoSaga(),
    updateTodoSaga(),
    updateTodosCompletedStatusSaga(),
    deleteTodosSaga(),
  ])
}
