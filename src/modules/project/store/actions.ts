import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore'
import { ActionTree } from 'vuex'
import { db } from '../../../services/firebase'
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
}
