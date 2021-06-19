import { Module } from 'vuex'
import { RootState } from '../../../store/interface'
import { actions } from './actions'
import { ProjectState } from './interface'
import { mutations } from './mutations'

const state: ProjectState = {
  id: '',
  name: '',
  taskCount: Number(0),
}

export const project: Module<ProjectState, RootState> = { namespaced: true, state, actions, mutations }
