import { InterfaceTask } from './tasks'

export type FamilyType = {
    id: number
    name: string
    members: string[]
    invitationCode: string
    tasks: InterfaceTask
}
