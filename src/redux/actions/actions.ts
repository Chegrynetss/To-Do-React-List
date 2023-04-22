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
} from './actionTypes'
import { Todo } from 'types'

export interface FetchTodosRequestAction {
  type: typeof FETCH_TODOS_REQUEST
}

export interface FetchTodosSuccessAction {
  type: typeof FETCH_TODOS_SUCCESS
  payload: { todos: Todo[] }
}

export interface FetchTodosFailureAction {
  type: typeof FETCH_TODOS_FAILURE
  payload: { error: string }
}

export interface CreateTodoRequestAction {
  type: typeof CREATE_TODO_REQUEST
  payload: { text: string }
}

export interface CreateTodoSuccessAction {
  type: typeof CREATE_TODO_SUCCESS
  payload: { todo: Todo }
}

export interface CreateTodoFailureAction {
  type: typeof CREATE_TODO_FAILURE
  payload: { error: string }
}

export interface UpdateTodoRequestAction {
  type: typeof UPDATE_TODO_REQUEST
  payload: {
    todo: Todo
    onSuccess?: () => void
  }
}

export interface UpdateTodoSuccessAction {
  type: typeof UPDATE_TODO_SUCCESS
  payload: { todo: Todo }
}

export interface UpdateTodoFailureAction {
  type: typeof UPDATE_TODO_FAILURE
  payload: { error: string }
}

export interface UpdateTodosCompletedStatusRequestAction {
  type: typeof UPDATE_TODOS_COMPLETED_STATUS_REQUEST
}

export interface UpdateTodosCompletedStatusSuccessAction {
  type: typeof UPDATE_TODOS_COMPLETED_STATUS_SUCCESS
  payload: { todos: Array<Todo> }
}

export interface UpdateTodosCompletedStatusFailureAction {
  type: typeof UPDATE_TODOS_COMPLETED_STATUS_FAILURE
  payload: { error: string }
}

export interface DeleteTodoRequestAction {
  type: typeof DELETE_TODO_REQUEST
  payload: {
    id: string
  }
}

export interface DeleteTodoSuccessAction {
  type: typeof DELETE_TODO_SUCCESS
  payload: {
    id: string
  }
}

export interface DeleteTodoFailureAction {
  type: typeof DELETE_TODO_FAILURE
  error: string
}

export interface DeleteTodosCompletedRequestAction {
  type: typeof DELETE_TODOS_COMPLETED_REQUEST
}

export interface DeleteTodosCompletedSuccessAction {
  type: typeof DELETE_TODOS_COMPLETED_SUCCESS
}

export interface DeleteTodosCompletedFailureAction {
  type: typeof DELETE_TODOS_COMPLETED_FAILURE
  error: string
}

export type ListAction =
  | FetchTodosRequestAction
  | FetchTodosSuccessAction
  | FetchTodosFailureAction
  | CreateTodoRequestAction
  | CreateTodoSuccessAction
  | CreateTodoFailureAction
  | UpdateTodoRequestAction
  | UpdateTodoSuccessAction
  | UpdateTodoFailureAction
  | UpdateTodosCompletedStatusRequestAction
  | UpdateTodosCompletedStatusSuccessAction
  | UpdateTodosCompletedStatusFailureAction
  | DeleteTodoRequestAction
  | DeleteTodoSuccessAction
  | DeleteTodoFailureAction
  | DeleteTodosCompletedRequestAction
  | DeleteTodosCompletedSuccessAction
  | DeleteTodosCompletedFailureAction
