export interface RootState {
  isAppReady: boolean
  toastGeneral: boolean
}

export interface UserState {
  id: string
  name: string
  email: string
  image: string
}
