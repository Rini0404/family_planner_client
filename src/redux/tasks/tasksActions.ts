import { DeleteTaskAction } from '../../types/taskRedux'
import { InterfaceTask } from '../../types/tasks'
import { ADD_TASK, DELETE_TASK, TASKS, UPDATE_TASK } from './tasksTypes'

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

export const updateEditedTask = (data: InterfaceTask) => {
    return {
        type: UPDATE_TASK,
        data
    }
}

export const deleteTask = (id: string): DeleteTaskAction => {
    return {
        type: DELETE_TASK,
        data: { _id: id }
    }
}
