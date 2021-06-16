import { Module } from 'vuex'
import { RootState, UserState } from '../../../store/types'
import { actions } from './actions'
import { mutations } from './mutations'

const state: UserState = {
  id: '',
  name: '',
  email: '',
  image: '',
  activeVault: null,
}

export const user: Module<UserState, RootState> = { namespaced: true, state, actions, mutations }
