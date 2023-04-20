import { ArgumentTypes } from 'types'
import { config } from '../config'

export const callApi = async <TResponse = any>(
  ...args: ArgumentTypes<typeof fetch>
): Promise<TResponse> => {
  const res = await fetch(`${config.API_URL}/${args[0]}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...args[1],
  })
  return res.json()
}
