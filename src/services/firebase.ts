import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

initializeApp({
  apiKey: 'AIzaSyD6RJx5vO_H15eWy7BIPoszYH7UOKN0_sg',
  authDomain: 'rangkoding-todomer.firebaseapp.com',
  projectId: 'rangkoding-todomer',
  storageBucket: 'rangkoding-todomer.appspot.com',
  messagingSenderId: '688740033613',
  appId: '1:688740033613:web:460060c1ec92bff713a804',

  // measurementId: 'G-J4G5WDZYCN',
})

export const db = getFirestore()
