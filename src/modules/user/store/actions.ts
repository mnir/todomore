import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { ActionTree } from 'vuex'
import router from '../../../router'
import { db } from '../../../services/firebase'
import { RootState, UserState } from '../../../store/types'

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
   * Cek apakah user sudah ada didalam database
   *
   * @param param0
   * @param payload
   */
  async checkUserInDatabase({ commit, dispatch }: any, user: any) {
    const userRef = doc(db, 'users', user.uid)

    await getDoc(userRef)
      .then((res) => {
        if (res.exists()) {
          console.log(res.data())
          const userdata: UserState = {
            id: res.id,
            name: res.data().name,
            email: res.data().email,
            image: res.data().image,
            activeVault: res.data().activeVault,
          }
          commit('SET_USER', userdata)
          dispatch('checkUserVault', userdata)
        } else {
          console.log('gak ada')
          // TODO: Simpan data user kedalam database
          // dispatch(createUser, payload.user)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  /**
   * User baru
   *
   * @param _
   * @param payload
   */
  createUser(_: any, payload: any) {
    console.log(payload)
  },

  /**
   * Cek apakah user sudah memiliki vault
   *
   * @param _
   * @param user
   */
  checkUserVault(_: any, user: any) {
    console.log(user)
    if (user.activeVault == null) {
      // create new vault
      console.log('heresd')
    } else {
      // redirect ke dashboard
      console.log('here')
      router.push({ name: 'Dashboard', params: { userId: user.id, vaultId: user.activeVault } })
    }
  },
}
