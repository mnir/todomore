import { Module } from 'vuex'
import { RootState } from '../../../store/interface'
import { TodoState } from './interface'
import { actions } from './actions'
import { mutations } from './mutations'

const state: TodoState = {
  id: '',
  assignUser: {},
  completedDate: null,
  createdAt: null,
  isCompleted: false,
  label: '',
  name: '',
  parent: null,
  project: {},
  stage: 1,
}
export const todo: Module<TodoState, RootState> = { namespaced: true, state, actions, mutations }
