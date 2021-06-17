import { getAuth, onAuthStateChanged } from 'firebase/auth'
import router from './router'
import store from './store'

onAuthStateChanged(getAuth(), (user) => {
  if (!user) {
    router.push({ name: 'Home' })
  } else {
    store.dispatch('user/checkUserInDatabase', user)
  }
})
