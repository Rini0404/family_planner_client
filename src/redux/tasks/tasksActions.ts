import { InterfaceTask } from '../../types/tasks'
import { TASKS } from './tasksTypes'

export const updateTasks = (data: InterfaceTask) => {
    return {
        type: TASKS,
        data
    }
}
