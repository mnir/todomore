import { createStore, StoreOptions } from 'vuex'
import { RootState } from './types'

const store: StoreOptions<RootState> = {
  state: {
    toastGeneral: false,
    isAppReady: false,
  },
}

export default createStore<RootState>(store)
