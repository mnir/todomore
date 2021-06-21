import { addDoc, collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { ActionTree } from 'vuex'
import { db } from '../../../services/firebase'
import store from '../../../store'
import { RootState } from '../../../store/interface'
import { TodoState } from './interface'

export const actions: ActionTree<TodoState, RootState> = {
  /**
   * * Create new todo
   * @param _
   * @param payload
   */
  async createNewTodo(_: any, payload: any) {
    const vaultRef = doc(db, 'vaults', payload.vaultId)
    const todoRef = collection(vaultRef, 'todos')

    await addDoc(todoRef, {
      name: payload.name,
      project: {
        id: payload.project.id,
        name: payload.project.name,
      },
      createdAt: new Date(),
      isCompleted: false,
      completedDate: null,
      assignUser: null,
      label: 'open',
      parent: null,
      stage: Number(1),
    })
      .then(async () => {
        await store.dispatch('project/updateTaskCount', { projectId: payload.project.id, vaultId: payload.vaultId, type: 'add' })
      })
      .catch((err) => {
        throw err
      })
  },

  /**
   * * Fetch all todos
   * @param param0
   * @param vaultId
   */
  fetchTodos({ commit }: any, vaultId: any) {
    const vaultRef = doc(db, 'vaults', vaultId)
    const todoRef = collection(vaultRef, 'todos')
    const q = query(todoRef, orderBy('createdAt', 'desc'))
    onSnapshot(todoRef, (snap) => {
      const array: any = []
      snap.forEach((doc) => {
        const data: TodoState = {
          id: doc.id,
          assignUser: doc.data().assignUser,
          completedDate: doc.data().completedDate,
          isCompleted: doc.data().isCompleted,
          createdAt: doc.data().createdAt,
          label: doc.data().label,
          name: doc.data().name,
          parent: doc.data().parent,
          project: doc.data().project,
          stage: doc.data().stage,
        }
        array.push(data)
      })
      commit('SET_TODOS', array)
    })
  },
}
