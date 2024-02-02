import { InterfaceTask, Status } from '../types/tasks'

export const getMonthDays = (year: number, month: number) => {
    return new Date(year, month, 0).getDate()
}

export const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
}

export const extractTaskDates = (tasks: InterfaceTask[]) => {
    const statusMap = new Map()
    tasks.forEach((task) => {
        const taskDate = new Date(task.dueDate ?? '')
        const dateString = taskDate.toISOString().split('T')[0]
        const existingStatus = statusMap.get(dateString)
        if (
            !existingStatus ||
            task.status === Status.Overdue ||
            (task.status === Status.Pending && existingStatus !== Status.Overdue)
        ) {
            statusMap.set(dateString, task.status)
        }
    })
    return statusMap
}

export const getTaskIndicatorStyle = (
    dueDate: any,
    taskStatusByDate: { get: (arg0: string) => any },
    styles: { taskIndicatorCompleted: any; taskIndicatorPending: any; taskIndicatorOverdue: any }
) => {
    if (!dueDate) {
        return null // Return null or default style if dueDate is not provided
    }

    const date = new Date(dueDate)
    if (isNaN(date.getTime())) {
        console.error('Invalid dueDate:', dueDate)
        return null // Return null or default style if dueDate is invalid
    }

    const dateString = date.toISOString().split('T')[0]
    const status = taskStatusByDate.get(dateString)
    console.log('status:', status)
    switch (status) {
        case Status.Completed:
            return styles.taskIndicatorCompleted
        case Status.Pending:
            return styles.taskIndicatorPending
        case Status.Overdue:
            return styles.taskIndicatorOverdue
        default:
            return null
    }
}

export const generateDays = (currentDate: { getFullYear: () => any; getMonth: () => any }) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    // Ensure month is within the valid range (0-11)
    if (month < 0 || month > 11) {
        console.error('Invalid month value:', month)
        return []
    }
    const numDays = getMonthDays(year, month + 1)
    const firstDay = getFirstDayOfMonth(year, month)

    const daysArray = new Array(firstDay).fill(null)
    for (let day = 1; day <= numDays; day++) {
        // Add check for valid day
        if (day < 1 || day > getMonthDays(year, month + 1)) {
            console.error('Invalid day value:', day)
            continue
        }
        daysArray.push(new Date(year, month, day))
    }
    while (daysArray.length % 7 !== 0) {
        daysArray.push(null)
    }
    return daysArray
}
