import { UserType } from './user'

export enum Status {
    Pending = 'pending',
    InProgress = 'in progress',
    Completed = 'completed',
    Overdue = 'overdue'
}

export interface InterfaceTask {
    _id: string
    title: string
    description?: string
    createdBy: string
    assignedTo?: UserType
    family: string
    dueDate?: Date
    status: Status
}

export interface TaskResponseType {
    data: InterfaceTask
    success: boolean
    error: string
    message: string
    status: number
}
