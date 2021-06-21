import { initializeApp } from 'firebase/app'
import { getFirestore, useFirestoreEmulator } from 'firebase/firestore'

initializeApp({
  // Firebase config settings here...
})

export const db = getFirestore()
useFirestoreEmulator(db, 'localhost', 8080)
