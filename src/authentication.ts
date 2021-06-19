import { getAuth, onAuthStateChanged } from 'firebase/auth'
import router from './router'
import store from './store'

onAuthStateChanged(getAuth(), (user) => {
  // Check user state
  if (!user) {
    router.push({ name: 'Home' })
  } else {
    store.commit('SET_APP_STATUS', false)
    store.dispatch('user/checkUserInDatabase', user)
  }
})
