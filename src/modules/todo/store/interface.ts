import { UserState } from '../../../store/interface'
import { ProjectState } from '../../project/store/interface'

export interface TodoState {
  id: string
  assignUser: Partial<UserState> | null
  completedDate: Date | null
  createdAt: Date | null
  isCompleted: boolean
  label: string
  name: string
  parent: string | null
  project: Partial<ProjectState>
  stage: number
}
