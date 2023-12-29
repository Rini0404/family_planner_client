import { InterfaceTask } from '../../types/tasks'
import { TASKS, ADD_TASK } from './tasksTypes'

const initialState = {
    tasks: []
}

// Adjust TaskAction to handle different types of actions
type TaskAction = {
    type: typeof TASKS | typeof ADD_TASK
    data: InterfaceTask | InterfaceTask[] // Single task or array of tasks
}

// Modify reducer to handle different action types
const familyReducer = (state = initialState, action: TaskAction) => {
    switch (action.type) {
        case TASKS:
            // Ensure that data is an array when type is TASKS
            return {
                ...state,
                tasks: Array.isArray(action.data) ? action.data : [...state.tasks, action.data]
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    ...(Array.isArray(action.data) ? action.data : [action.data])
                ]
            }
        default:
            return state
    }
}

export default familyReducer
