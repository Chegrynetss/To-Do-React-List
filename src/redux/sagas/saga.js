import { call, put, select, takeLatest } from 'redux-saga/effects'
import { config } from '../../config'
import { mapTodoFromApi, mapTodoToApi } from '../../utils/mapTodosApi'
import {
  FETCH_TODOS_REQUEST,
  CREATE_TODO_REQUEST,
  UPDATE_TODO_REQUEST,
  UPDATE_TODOS_COMPLETED_STATUS_REQUEST,
  DELETE_TODO_REQUEST,
  DELETE_TODOS_COMPLETED_REQUEST,
} from '../actions/actionTypes'

export function* fetchTodosSaga() {
  try {
    const response = yield call(fetch, `${config.API_URL}/api/todos`)
    const data = yield response.json()
    const todos = data.payload.list.map(mapTodoFromApi)
    yield put({ type: 'FETCH_TODOS_SUCCESS', payload: { todos } })
  } catch (err) {
    console.log(err)
    yield put({ type: 'FETCH_TODOS_FAILURE' })
  }
}

export function* createTodoSaga(action) {
  const { todo } = action.payload
  try {
    const response = yield call(fetch, `${config.API_URL}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mapTodoToApi(todo)),
    })
    const data = yield response.json()
    const createdTodo = mapTodoFromApi(data.payload?.dto)
    yield put({ type: 'CREATE_TODO_SUCCESS', payload: { createdTodo } })
  } catch (err) {
    console.log(err)
    yield put({ type: 'CREATE_TODO_FAILURE' })
  }
}

export function* updateTodoSaga(action) {
  const { todo } = action.payload
  try {
    const response = yield call(
      fetch,
      `${config.API_URL}/api/todos/${todo.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapTodoToApi(todo)),
      },
    )
    const data = yield response.json()
    const updatedTodo = mapTodoFromApi(data.payload.dto)
    yield put({ type: 'UPDATE_TODO_SUCCESS', payload: { updatedTodo } })
  } catch (err) {
    console.log(err)
    yield put({ type: 'UPDATE_TODO_FAILURE' })
  }
}

export function* updateTodosCompletedStatusSaga() {
  try {
    // const todos = yield select((state) => state.todos.todos)
    const todos = yield select((state) => state.todos.list)
    const allTodosCompleted = !todos.every(({ completed }) => completed)
    yield call(fetch, `${config.API_URL}/api/todos/completed`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: allTodosCompleted }),
    })
    yield put({
      type: 'UPDATE_TODOS_COMPLETED_STATUS_SUCCESS',
      payload: { allTodosCompleted },
    })
  } catch (err) {
    console.log(err)
    yield put({ type: 'UPDATE_TODOS_COMPLETED_STATUS_FAILURE' })
  }
}

export function* deleteTodoSaga(action) {
  const { id } = action.payload
  try {
    yield call(fetch, `${config.API_URL}/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    yield put({ type: 'DELETE_TODO_SUCCESS', payload: { id } })
  } catch (err) {
    console.log(err)
    yield put({ type: 'DELETE_TODO_FAILURE' })
  }
}

function* deleteTodosCompletedSaga() {
  try {
    yield call(fetch, `${config.API_URL}/api/clearCompletedTodos`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const allTodosCompleted = yield call(fetch, `${config.API_URL}/api/todos`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    yield put({
      type: 'DELETE_TODOS_COMPLETED_SUCCESS',
      payload: { allTodosCompleted },
    })
  } catch (error) {
    yield put({ type: 'DELETE_TODOS_COMPLETED_FAILURE' })
  }
}

export function* watchFetchTodos() {
  yield takeLatest(FETCH_TODOS_REQUEST, fetchTodosSaga)
}

export function* watchCreateTodo() {
  yield takeLatest(CREATE_TODO_REQUEST, createTodoSaga)
}

export function* watchUpdateTodo() {
  yield takeLatest(UPDATE_TODO_REQUEST, updateTodoSaga)
}

export function* watchUpdateTodosCompletedStatus() {
  yield takeLatest(
    UPDATE_TODOS_COMPLETED_STATUS_REQUEST,
    updateTodosCompletedStatusSaga,
  )
}

export function* watchDeleteTodo() {
  yield takeLatest(DELETE_TODO_REQUEST, deleteTodoSaga)
}

export function* watchDeleteCompletedTodos() {
  yield takeLatest(DELETE_TODOS_COMPLETED_REQUEST, deleteTodosCompletedSaga)
}
