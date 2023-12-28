import { InterfaceTask, Status } from '../types/tasks'

export const isTaskOverdue = (task: InterfaceTask) => {
    const now = new Date()
    const dueDate = new Date(task.dueDate ?? '')

    // If the due date string ends with 'Z', it means the due date is in UTC
    if (task.dueDate?.toString().endsWith('Z')) {
        // Convert 'now' to UTC for a fair comparison
        const nowUtc = new Date(
            Date.UTC(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                now.getHours(),
                now.getMinutes(),
                now.getSeconds()
            )
        )
        // console.log('Is task overdue?: ', nowUtc > dueDate, 'ID: ', task._id)
        return nowUtc > dueDate
    } else {
        // If due date is not in UTC, compare it directly with the local time
        return now > dueDate
    }
}
