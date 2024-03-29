import { FilterOptions } from '../../types/filter'
import { DeleteTaskAction } from '../../types/taskRedux'
import { InterfaceTask } from '../../types/tasks'
import {
    ADD_TASK,
    DELETE_TASK,
    REVERT_FILTERED_TASKS,
    SET_FILTERED_TASKS,
    SET_FILTERED_TO_ALL,
    TASKS,
    UPDATE_TASK
} from './tasksTypes'

export const revertFilteredTasks = (data: InterfaceTask) => {
    return {
        type: REVERT_FILTERED_TASKS,
        data
    }
}

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

export const setFilteredTasks = (data: FilterOptions) => {
    return {
        type: SET_FILTERED_TASKS,
        data
    }
}

export const setFilteredToAll = (data: InterfaceTask) => {
    return {
        type: SET_FILTERED_TO_ALL,
        data: data
    }
}
