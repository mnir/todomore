import { MutationTree } from 'vuex'
import { ProjectState } from './interface'

export const mutations: MutationTree<ProjectState> = {
  SET_PROJECTS(state: any, payload: any) {
    state.projects = payload
  },
}
