import { call, put } from 'redux-saga/effects'
import { config } from '../../config'
import { mapTodoFromApi, mapTodoToApi } from '../../utils/mapTodosApi'

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
    const allTodosCompleted = !todos.every(({ completed }) => completed)
    yield call(fetch, `${config.API_URL}/api/updateTodosCompleted`, {
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
    yield put({
      type: 'UPDATE_TODOS_COMPLETED_STATUS_FAILURE',
      payload: { error: err.message },
    })
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
