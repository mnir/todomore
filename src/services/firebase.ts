import { initializeApp } from 'firebase/app'
import { getFirestore, useFirestoreEmulator } from 'firebase/firestore'

initializeApp({
  // Firebase project config here...
})

export const db = getFirestore()
useFirestoreEmulator(db, 'localhost', 8080)
