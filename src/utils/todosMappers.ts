import { Todo, ApiTodo, ApiTodoForCreate } from 'types'

export const mapTodoFromApi = (apiTodo: ApiTodo): Todo => {
  return {
    id: apiTodo._id,
    text: apiTodo.description,
    completed: apiTodo.isCompleted,
  }
}

interface MapTodoToApiParamsForCreate {
  text: string
  type: 'create'
}

interface MapTodoToApiParamsForUpdate {
  todo: Todo
  type: 'update'
}

type MapTodoToApiParams =
  | MapTodoToApiParamsForCreate
  | MapTodoToApiParamsForUpdate

export function mapTodoToApi(
  params: MapTodoToApiParamsForCreate,
): ApiTodoForCreate
export function mapTodoToApi(params: MapTodoToApiParamsForUpdate): ApiTodo
export function mapTodoToApi(
  params: MapTodoToApiParams,
): ApiTodo | ApiTodoForCreate {
  if (params.type === 'create') {
    return {
      description: params.text,
    }
  }

  return {
    _id: params.todo.id,
    description: params.todo.text,
    isCompleted: params.todo.completed,
  }
}
