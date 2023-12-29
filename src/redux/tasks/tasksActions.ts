import { InterfaceTask } from '../../types/tasks'
import { ADD_TASK, TASKS } from './tasksTypes'

export const updateTasks = (data: InterfaceTask) => {
    return {
        type: TASKS,
        data
    }
}

export const addTask = (data: InterfaceTask) => {
    return {
        type: ADD_TASK,
        data
    }
}
