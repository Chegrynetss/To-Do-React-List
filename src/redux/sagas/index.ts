import { watchList } from './saga'

export default function* rootSaga() {
  yield watchList()
}
