import { UserState } from '../../../store/interface'

export interface VaultState {
  id: string
  name: string
  totalProject: number
  totalTask: number
  totalUser: number
  users: Array<UserState>
  owner: Partial<UserState>
}
