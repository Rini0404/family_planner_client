import { palette } from '../theme'
import { Status } from '../types/tasks'

export const getBackgroundColor = (status: Status) => {
    switch (status) {
        case Status.Pending:
            return palette.pastelNavbars
        case Status.Completed:
            return palette.boxesPastelGreen
        case Status.Overdue:
            return palette.pastelOrange
        default:
            return palette.pastelNavbars
    }
}

export const getText = (status: Status, dueDate: string) => {
    const dueDateObject = new Date(dueDate)

    const options = {
        hour: 'numeric' as const,
        minute: 'numeric' as const,
        timeZone: 'UTC' // or specify your desired time zone
    }
    const dueTime = dueDateObject.toLocaleTimeString('en-US', options)

    switch (status) {
        case Status.Pending:
            return `Due before: ${dueTime}`
        case Status.Completed:
            return 'Done.'
        case Status.Overdue:
            return 'Overdue!'
        default:
            return 'Pending'
    }
}
