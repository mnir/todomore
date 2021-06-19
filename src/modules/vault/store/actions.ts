import { addDoc, collection, doc, getDoc, increment, runTransaction } from 'firebase/firestore'
import { ActionTree } from 'vuex'
import { vault } from '.'
import router from '../../../router'
import { db } from '../../../services/firebase'
import store from '../../../store'
import { RootState, UserState } from '../../../store/interface'
import { VaultState } from './interface'

export const actions: ActionTree<VaultState, RootState> = {
  /**
   * @param _
   * @param user
   */
  checkUserVault({ dispatch, commit }: any, user: UserState) {
    if (user.activeVault == null) {
      // Create new vault
      dispatch('createVault', user)
    } else {
      const vaultRef = doc(db, 'vaults', user.activeVault)
      getDoc(vaultRef)
        .then((res) => {
          const docData = res.data()
          if (docData) {
            const data = {
              id: res.id,
              name: docData.name,
              totalProject: docData.totalProject,
              totalTask: docData.totalTask,
              totalUser: docData.totalUser,
              users: docData.users,
              owner: docData.owner,
            }
            commit('SET_VAULT', data)
          }
        })
        .catch((err) => {
          throw err
        })
      store.commit('SET_ACTIVE_VAULT', user.activeVault)
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
      name: user.name,
      totalProject: Number(0),
      totalTask: Number(0),
      totalUser: Number(0),
      users: [user.id],
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
            image: user.image,
            activeVault: res.id,
          }
          store.dispatch('project/createNewProject', { name: 'Inbox', vaultId: res.id })
          store.commit('user/SET_USER', userdata)
          store.commit('SET_ACTIVE_VAULT', res.id)
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

  fetchVault(_: any, vaultId: string) {
    const vaultRef = doc(db, 'vaults', vaultId)
  },

  updateVaultTotalTask(_: any, payload: any) {
    const vaultRef = doc(db, 'vaults', payload.vaultId)
    if (payload.type == 'add') {
      runTransaction(db, async (t) => {
        await t.get(vaultRef).then(() => {
          t.update(vaultRef, {
            totalTask: increment(Number(1)),
          })
        })
      })
    }
  },
}
