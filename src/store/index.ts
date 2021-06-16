import { createStore, StoreOptions } from 'vuex'
import { RootState } from './types'
import { user } from '../modules/user/store'

const store: StoreOptions<RootState> = {
  state: {
    toastGeneral: false,
    isAppReady: false,
    activeVault: null,
  },
  mutations: {
    SET_ACTIVE_VAULT(state: any, payload: any) {
      state.activeVault = payload
    },
  },
  modules: {
    user,
  },
}

export default createStore<RootState>(store)
