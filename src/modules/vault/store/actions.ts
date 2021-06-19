import { addDoc, collection, doc, runTransaction } from 'firebase/firestore'
import { ActionTree } from 'vuex'
import router from '../../../router'
import { db } from '../../../services/firebase'
import store from '../../../store'
import { RootState, UserState, VaultState } from '../../../store/interface'

export const actions: ActionTree<VaultState, RootState> = {
  /**
   * @param _
   * @param user
   */
  checkUserVault({ dispatch }: any, user: UserState) {
    if (user.activeVault == null) {
      // Create new vault
      dispatch('createVault', user)
    } else {
      // Redirect ke dashboard
      router.push({
        name: 'Dashboard',
        params: {
          vaultId: user.activeVault,
        },
      })
      store.commit('SET_APP_STATUS', true)
    }
  },
  /**
   *
   * @param _
   * @param user
   */
  createVault(_: any, user: UserState) {
    const userRef = doc(db, 'users', user.id)
    const vaultRef = collection(db, 'vaults')

    addDoc(vaultRef, {
      owner: {
        id: user.id,
        name: user.name,
      },
    }).then((res) => {
      runTransaction(db, async (t) => {
        const userDoc = await t.get(userRef)
        if (userDoc.exists()) {
          t.update(userRef, {
            activeVault: res.id,
          })

          const userdata: UserState = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.id,
            activeVault: res.id,
          }

          store.commit('user/SET_USER', userdata)
        }
      })

      router.push({
        name: 'Dashboard',
        params: {
          vaultId: res.id,
        },
      })
      store.commit('SET_APP_STATUS', true)
    })
  },
}
