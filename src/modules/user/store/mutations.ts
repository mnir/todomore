import { MutationTree } from 'vuex'
import { UserState } from '../../../store/interface'
export const mutations: MutationTree<UserState> = {
  SET_USER(state: any, user: any) {
    state.id = user.id
    state.name = user.name
    state.email = user.email
    state.image = user.image
    state.activeVault = user.activeVault
  },
}
