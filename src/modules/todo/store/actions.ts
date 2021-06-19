import { addDoc, collection, doc } from 'firebase/firestore'
import { ActionTree } from 'vuex'
import { db } from '../../../services/firebase'
import store from '../../../store'
import { RootState } from '../../../store/interface'
import { TodoState } from './interface'

export const actions: ActionTree<TodoState, RootState> = {
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
      .then(() => {
        store.dispatch('vault/updateVaultTotalTask', { vaultId: payload.vaultId, type: 'add' })
      })
      .catch((err) => {
        throw err
      })
  },
}
