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
  createUser({ dispatch }: any, user: any) {
    const userRef = doc(db, 'users', user.uid)

    const userdata: UserState = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      activeVault: null,
    }
    try {
      setDoc(userRef, userdata).then(dispatch('checkUserVault', userdata))
    } catch (err) {
      throw err
    }
  },

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
          userId: user.id,
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
          userId: user.id,
          vaultId: res.id,
        },
      })
      store.commit('SET_APP_STATUS', true)
    })
  },
}
