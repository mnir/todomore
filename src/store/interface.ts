import { ProjectState } from '../modules/project/store/interface'
import { TodoState } from '../modules/todo/store/interface'

export interface RootState {
  isAppReady: boolean
  toastGeneral: boolean
  activeVault: string | null
}

export interface UserState {
  id: string
  name: string
  email: string
  image: string
  activeVault: string | null
}

export interface TrackState {
  id: string
  duration: number
  end: Date | null
  start: Date | null
  todo: Partial<TodoState>
  project: Partial<ProjectState>
}
