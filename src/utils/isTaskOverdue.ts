import { InterfaceTask, Status } from '../types/tasks'

export const isTaskOverdue = (task: InterfaceTask) => {
    const now = new Date()
    const dueDate = new Date(task.dueDate ?? '')
    // if true then task is overdue and make a request to update the task status in the database
    const isOverdue = dueDate < now && task.status !== Status.Completed

    return isOverdue
}
