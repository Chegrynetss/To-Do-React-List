export interface Todo {
  id: string
  text: string
  completed: boolean
}

export interface ApiTodo {
  _id: string
  description: string
  isCompleted: boolean
}

export type ApiTodoForCreate = Pick<ApiTodo, 'description'>

export type ArgumentTypes<T> = T extends (...args: infer A) => any ? A : never

export interface ApiResponse<TPayload> {
  payload: TPayload
}

export interface ReduxAction<TPayload = any> {
  type: string
  payload: TPayload
}
