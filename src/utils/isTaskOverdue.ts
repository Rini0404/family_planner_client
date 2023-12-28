import { InterfaceTask, Status } from '../types/tasks'

export const isTaskOverdue = (task: InterfaceTask) => {
    const now = new Date() // Current time in local timezone
    const dueDate = new Date(task.dueDate ?? '')
    console.log('dueDate', dueDate)
    // Convert both dates to UTC for comparison
    const nowUtc = Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
    )
    const dueDateUtc = Date.UTC(
        dueDate.getFullYear(),
        dueDate.getMonth(),
        dueDate.getDate(),
        dueDate.getHours(),
        dueDate.getMinutes(),
        dueDate.getSeconds()
    )
    console.log('nowUtc', nowUtc > dueDateUtc)
    return nowUtc > dueDateUtc
}
