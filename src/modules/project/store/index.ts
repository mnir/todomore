import { Module } from 'vuex'
import { ProjectState, RootState } from '../../../store/interface'
import { actions } from './actions'
import { mutations } from './mutations'

const state: ProjectState = {
  id: '',
  name: '',
  taskCount: Number(0),
}

export const project: Module<ProjectState, RootState> = { namespaced: true, state, actions, mutations }
