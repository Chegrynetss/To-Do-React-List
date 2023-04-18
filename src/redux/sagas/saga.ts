import { call, put, select, takeLatest } from 'redux-saga/effects'
import { config } from '../../config'
import { mapTodoFromApi, mapTodoToApi } from '../../utils/mapTodosApi'
import { Response } from 'node-fetch'
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
import {
  Todo,
  ListAction,
  CreateTodoRequestAction,
  CreateTodoSuccessAction,
  DeleteTodoFailureAction,
  DeleteTodoRequestAction,
  DeleteTodosCompletedFailureAction,
  DeleteTodosCompletedSuccessAction,
  DeleteTodoSuccessAction,
  UpdateTodoRequestAction,
  UpdateTodosCompletedStatusFailureAction,
  UpdateTodosCompletedStatusSuccessAction,
  UpdateTodoSuccessAction,
} from '../actions/actions'

export function* fetchTodosSaga(): Generator {
  try {
    const response: Response = yield call(fetch, `${config.API_URL}/api/todos`)
    const data = yield response.json()
    const todos: Todo[] = data.payload.list.map(mapTodoFromApi)
    yield put({ type: FETCH_TODOS_SUCCESS, payload: { todos } })
  } catch (err) {
    console.log(err)
    yield put({ type: FETCH_TODOS_FAILURE })
  }
}

export function* createTodoSaga(action: ListAction): Generator {
  const { text } = (action as CreateTodoRequestAction).payload
  try {
    const response: Response = yield call(
      fetch,
      `${config.API_URL}/api/todos`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapTodoToApi({ text })),
      },
    )
    const data: any = yield response.json()
    const todo: Todo = mapTodoFromApi(data.payload.todo)
    yield put<CreateTodoSuccessAction>({
      type: CREATE_TODO_SUCCESS,
      payload: { todo },
    })
  } catch (err) {
    console.log(err)
    yield put({ type: CREATE_TODO_FAILURE, payload: { error: err.message } })
  }
}

export function* updateTodoSaga(action: ListAction): Generator {
  const { id, updates } = (action as UpdateTodoRequestAction).payload
  try {
    const response: Response = yield call(
      fetch,
      `${config.API_URL}/api/todos/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapTodoToApi(updates)),
      },
    )
    const data: any = yield response.json()
    const todo: Todo = mapTodoFromApi(data.payload.todo)
    yield put<UpdateTodoSuccessAction>({
      type: UPDATE_TODO_SUCCESS,
      payload: { todo },
    })
  } catch (err) {
    console.log(err)
    yield put({ type: UPDATE_TODO_FAILURE, payload: { error: err.message } })
  }
}

export function* updateTodosCompletedStatusSaga() {
  try {
    const todos: Todo[] = yield select((state) => state.todos)
    const allTodosCompleted = !todos.every(({ completed }) => completed)
    yield call(fetch, `${config.API_URL}/api/todos/completed`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: allTodosCompleted }),
    })
    yield put<UpdateTodosCompletedStatusSuccessAction>({
      type: UPDATE_TODOS_COMPLETED_STATUS_SUCCESS,
      payload: { allTodosCompleted },
    })
  } catch (err) {
    console.log(err)
    yield put<UpdateTodosCompletedStatusFailureAction>({
      type: UPDATE_TODOS_COMPLETED_STATUS_FAILURE,
      payload: { error: err.message },
    })
  }
}

export function* deleteTodoSaga(action: DeleteTodoRequestAction) {
  const { id } = action.payload
  try {
    yield call(fetch, `${config.API_URL}/api/todos/${id}`, { method: 'DELETE' })
    yield put<DeleteTodoSuccessAction>({
      type: DELETE_TODO_SUCCESS,
      payload: { id },
    })
  } catch (err) {
    console.log(err)
    yield put<DeleteTodoFailureAction>({
      type: DELETE_TODO_FAILURE,
      error: err.message,
    })
  }
}

export function* deleteTodosCompletedSaga() {
  try {
    yield call(fetch, `${config.API_URL}/api/todos/completed`, {
      method: 'DELETE',
    })
    yield put<DeleteTodosCompletedSuccessAction>({
      type: DELETE_TODOS_COMPLETED_SUCCESS,
    })
  } catch (err) {
    console.log(err)
    yield put<DeleteTodosCompletedFailureAction>({
      type: DELETE_TODOS_COMPLETED_FAILURE,
      error: err.message,
    })
  }
}

export function* watchList() {
  yield takeLatest(FETCH_TODOS_REQUEST, fetchTodosSaga)
  yield takeLatest(CREATE_TODO_REQUEST, createTodoSaga)
  yield takeLatest(UPDATE_TODO_REQUEST, updateTodoSaga)
  yield takeLatest(
    UPDATE_TODOS_COMPLETED_STATUS_REQUEST,
    updateTodosCompletedStatusSaga,
  )
  yield takeLatest(DELETE_TODO_REQUEST, deleteTodoSaga)
  yield takeLatest(DELETE_TODOS_COMPLETED_REQUEST, deleteTodosCompletedSaga)
}
