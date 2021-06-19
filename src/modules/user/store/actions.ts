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
          store.dispatch('vault/checkUserVault', userdata)
        } else {
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
  createUser({ commit }: any, user: any) {
    const userRef = doc(db, 'users', user.uid)

    const userdata: UserState = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      activeVault: null,
    }
    try {
      setDoc(userRef, userdata).then(() => {
        commit('SET_USER', userdata)
        store.dispatch('vault/createVault', userdata)
      })
    } catch (err) {
      throw err
    }
  },
}
