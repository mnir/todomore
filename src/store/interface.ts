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

export interface VaultState {
  id: string
  name: string
  totalProject: number
  totalTask: number
  totalUser: number
  users: Array<UserState>
  owner: UserState
}

export interface ProjectState {
  id: string
  name: string
  taskCount: number
}

export interface TodoState {
  id: string
  assignUser: Partial<UserState>
  completedDate: Date | null
  createdAt: Date
  isCompleted: boolean
  label: string
  name: string
  parent: string | null
  project: ProjectState
  stage: number
}

export interface TrackState {
  id: string
  duration: number
  end: Date | null
  start: Date | null
  todo: TodoState
  project: ProjectState
}