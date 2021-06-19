import { Module } from 'vuex'
import { VaultState } from './interface'
import { RootState } from '../../../store/interface'
import { actions } from './actions'
import { mutations } from './mutations'

const state: VaultState = {
  id: '',
  name: '',
  totalProject: Number(0),
  totalTask: Number(0),
  totalUser: Number(0),
  users: [],
  owner: {
    id: '',
    name: '',
  },
}
export const vault: Module<VaultState, RootState> = { namespaced: true, state, actions, mutations }
