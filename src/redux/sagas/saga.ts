import { call, put, select, takeLatest } from 'redux-saga/effects'
import { mapTodoFromApi, mapTodoToApi } from '../../utils/todosMappers'
import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODOS_COMPLETED_STATUS_REQUEST,
  UPDATE_TODOS_COMPLETED_STATUS_SUCCESS,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODOS_COMPLETED_REQUEST,
  DELETE_TODOS_COMPLETED_SUCCESS,
} from '../actions/actionTypes'
import { callApi } from '../../utils'
import { ApiResponse, ApiTodo } from '../../types'
import { GetAllTodosCompleted } from '../selectors/todos'
import {
  CreateTodoRequestAction,
  CreateTodoSuccessAction,
  DeleteTodoRequestAction,
  DeleteTodoSuccessAction,
  FetchTodosSuccessAction,
  UpdateTodoRequestAction,
  UpdateTodosCompletedStatusSuccessAction,
  UpdateTodoSuccessAction,
} from '../actions/actions'

export function* fetchTodosSaga() {
  try {
    const response: ApiResponse<{ list: Array<ApiTodo> }> = yield call(
      callApi,
      `api/todos`,
    )

    const payload: FetchTodosSuccessAction['payload'] = {
      todos: response.payload.list.map(mapTodoFromApi),
    }
    yield put({
      type: FETCH_TODOS_SUCCESS,
      payload: payload,
    })
  } catch (err) {
    console.log('fetchTodosSaga', err)
  }
}

export function* createTodoSaga(action: CreateTodoRequestAction) {
  const { text } = action.payload
  try {
    const response: ApiResponse<{ dto: ApiTodo }> = yield call(
      callApi,
      `api/todos`,
      {
        method: 'POST',
        body: JSON.stringify(mapTodoToApi({ type: 'create', text })),
      },
    )
    const payload: CreateTodoSuccessAction['payload'] = {
      todo: mapTodoFromApi(response.payload.dto),
    }
    yield put({
      type: CREATE_TODO_SUCCESS,
      payload: payload,
    })
  } catch (err) {
    console.log('createTodoSaga', err)
  }
}

export function* updateTodoSaga(action: UpdateTodoRequestAction) {
  const { todo, onSuccess } = action.payload
  try {
    const response: ApiResponse<{ dto: ApiTodo }> = yield call(
      callApi,
      `api/todos/${todo.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(
          mapTodoToApi({
            type: 'update',
            todo: todo,
          }),
        ),
      },
    )

    if (onSuccess) {
      onSuccess()
    }

    const payload: UpdateTodoSuccessAction['payload'] = {
      todo: mapTodoFromApi(response.payload.dto),
    }
    yield put({
      type: UPDATE_TODO_SUCCESS,
      payload: payload,
    })
  } catch (err) {
    console.log('updateTodoSaga', err)
  }
}

export function* updateTodosCompletedStatusSaga() {
  try {
    const allTodosCompleted: boolean = yield select(GetAllTodosCompleted)

    const response: ApiResponse<{ list: Array<ApiTodo> }> = yield call(
      callApi,
      `api/updateTodosCompleted`,
      {
        method: 'PUT',
        body: JSON.stringify({ isCompleted: !allTodosCompleted }),
      },
    )
    const payload: UpdateTodosCompletedStatusSuccessAction['payload'] = {
      todos: response.payload.list.map(mapTodoFromApi),
    }
    yield put({
      type: UPDATE_TODOS_COMPLETED_STATUS_SUCCESS,
      payload: payload,
    })
  } catch (err) {
    console.log('updateTodosCompletedStatusSaga', err)
  }
}

export function* deleteTodoSaga(action: DeleteTodoRequestAction) {
  const { id } = action.payload
  try {
    yield call(callApi, `api/todos/${id}`, {
      method: 'DELETE',
    })
    const payload: DeleteTodoSuccessAction['payload'] = {
      id,
    }
    yield put({
      type: DELETE_TODO_SUCCESS,
      payload: payload,
    })
  } catch (err) {
    console.log('deleteTodoSaga', err)
  }
}

export function* deleteTodosCompletedSaga() {
  try {
    yield call(callApi, `api/clearCompletedTodos`, {
      method: 'DELETE',
    })
    yield put({
      type: DELETE_TODOS_COMPLETED_SUCCESS,
    })
  } catch (err) {
    console.log('deleteTodosCompletedSaga', err)
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
