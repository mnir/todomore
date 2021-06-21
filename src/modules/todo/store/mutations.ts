import { MutationTree } from 'vuex'
import { TodoState } from './interface'

export const mutations: MutationTree<TodoState> = {
  SET_TODOS(state: any, payload: any) {
    state.todos = payload
  },
}
