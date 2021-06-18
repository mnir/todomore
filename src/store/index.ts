import { createStore, StoreOptions } from 'vuex'
import { RootState } from './interface'
import { user } from '../modules/user/store'
import { project } from '../modules/project/store'

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
    SET_APP_STATUS(state: any, status: boolean) {
      state.isAppReady = status
    },
  },
  modules: {
    user,
    project,
  },
}

export default createStore<RootState>(store)
