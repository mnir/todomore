import { collection, doc, onSnapshot } from 'firebase/firestore'
import { ActionTree } from 'vuex'
import { db } from '../../../services/firebase'
import { ProjectState, RootState } from '../../../store/interface'

export const actions: ActionTree<ProjectState, RootState> = {
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
