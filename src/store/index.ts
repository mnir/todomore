import { createStore, StoreOptions } from 'vuex'
import { RootState } from './types'

const store: StoreOptions<RootState> = {
  isAppReady: false,
}

export default createStore<RootState>(store)
