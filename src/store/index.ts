import { createStore, StoreOptions } from 'vuex'
import { RootState } from './types'
import { user } from '../modules/user/store'

const store: StoreOptions<RootState> = {
  state: {
    toastGeneral: false,
    isAppReady: false,
  },
  modules: {
    user,
  },
}

export default createStore<RootState>(store)
