import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { addDoc, collection, doc, getDoc, runTransaction, setDoc } from 'firebase/firestore'
import { ActionTree } from 'vuex'
import router from '../../../router'
import { db } from '../../../services/firebase'
import store from '../../../store'
import { RootState, UserState } from '../../../store/interface'

export const actions: ActionTree<UserState, RootState> = {
  /**
   * Authenticate user
   *
   */
  signIn() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(getAuth(), provider)
  },

  /**
   * @param param0
   * @param payload
   */
  async checkUserInDatabase({ commit, dispatch }: any, user: any) {
    const userRef = doc(db, 'users', user.uid)

    await getDoc(userRef)
      .then((res) => {
        if (res.exists()) {
          const userdata: UserState = {
            id: res.id,
            name: res.data().name,
            email: res.data().email,
            image: res.data().image,
            activeVault: res.data().activeVault,
          }
          commit('SET_USER', userdata)
          console.log('ada')
          dispatch('checkUserVault', userdata)
        } else {
          console.log('gak ada')
          // TODO: Simpan data user kedalam database
          dispatch('createUser', user)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  /**
   * * User baru
   *
   * @param _
   * @param payload
   */
  createUser({ dispatch }: any, payload: any) {
    const userRef = doc(db, 'users', payload.uid)

    const userdata: UserState = {
      id: payload.uid,
      name: payload.displayName,
      email: payload.email,
      image: payload.photoURL,
      activeVault: null,
    }
    try {
      setDoc(userRef, userdata).then(dispatch('checkUserVault', userdata))
    } catch (err) {
      throw err
    }
  },

  /**
   * * Cek apakah user sudah memiliki vault
   *
   * @param _
   * @param user
   */
  checkUserVault(_: any, user: UserState) {
    const userRef = doc(db, 'users', user.id)
    if (user.activeVault == null) {
      // create new vault
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
          }
        })
        router.push({
          name: 'Dashboard',
          params: {
            userId: user.id,
            vaultId: res.id,
          },
        })
        store.commit('SET_APP_STATUS', true)
      })
    } else {
      // redirect ke dashboard
      router.push({
        name: 'Dashboard',
        params: {
          userId: user.id,
          vaultId: user.activeVault,
        },
      })
      store.commit('SET_APP_STATUS', true)
    }
  },
}
