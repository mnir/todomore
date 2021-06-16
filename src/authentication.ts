import { getAuth, onAuthStateChanged } from 'firebase/auth'
import store from './store'

onAuthStateChanged(getAuth(), (user) => {
  if (!user) {
    console.log('gak ada')
  } else {
    console.log('ada')
    store.dispatch('user/checkUserInDatabase', user)
  }
})
