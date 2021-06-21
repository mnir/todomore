import { addDoc, collection, doc, getDoc, increment, onSnapshot, runTransaction } from 'firebase/firestore'
import { ActionTree } from 'vuex'
import { db } from '../../../services/firebase'
import store from '../../../store'
import { RootState } from '../../../store/interface'
import { ProjectState } from './interface'

export const actions: ActionTree<ProjectState, RootState> = {
  /**
   * * Create new project
   * @param _
   * @param payload
   */
  async createNewProject(_: any, payload: any) {
    const vaultRef = doc(db, 'vaults', payload.vaultId)
    const projectRef = collection(vaultRef, 'projects')

    await addDoc(projectRef, {
      name: payload.name,
      taskCount: Number(0),
      isDefault: Boolean(true),
    })
  },

  /**
   * Fetch the projects
   * @param param0
   * @param vaultId
   */
  fetchProjects({ commit }: any, vaultId: string) {
    const vaultRef = doc(db, 'vaults', vaultId)
    const projectRef = collection(vaultRef, 'projects')

    onSnapshot(projectRef, (snap) => {
      const array: any = []
      snap.forEach((doc) => {
        const docData = doc.data()
        if (docData) {
          const data: ProjectState = {
            id: doc.id,
            name: docData.name,
            taskCount: docData.taskCount,
          }
          array.push(data)
        }
      })
      commit('SET_PROJECTS', array)
    })
  },

  /**
   *
   * @param _
   * @param payload vaultId, projectId
   */
  updateTaskCount(_: any, payload: any) {
    console.log(payload)
    const vaultRef = doc(db, 'vaults', payload.vaultId)
    const projectRef = doc(vaultRef, 'projects', payload.projectId)

    runTransaction(db, async (t) => {
      await getDoc(projectRef).then(() => {
        t.update(projectRef, {
          taskCount: increment(Number(1)),
        })
      })
    })

    store.dispatch('vault/updateVaultTotalTask', { vaultId: payload.vaultId, type: 'add' })
  },
}
