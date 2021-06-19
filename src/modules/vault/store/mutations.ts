import { MutationTree } from 'vuex'
import { VaultState } from './interface'

export const mutations: MutationTree<VaultState> = {
  SET_VAULT(state: any, vault: any) {
    state.id = vault.id
    state.name = vault.name
    state.totalProject = vault.totalProject
    state.totalTask = vault.totalTask
    state.totalUser = vault.totalUser
    state.users = vault.users
    state.owner = vault.owner
  },
}
