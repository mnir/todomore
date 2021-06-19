import { Module } from 'vuex'
import { RootState, VaultState } from '../../../store/interface'
import { actions } from './actions'

export const vault: Module<VaultState, RootState> = { namespaced: true, actions }
