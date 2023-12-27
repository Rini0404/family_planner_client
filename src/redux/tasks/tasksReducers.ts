import { InterfaceTask } from '../../types/tasks'
import { TASKS } from './tasksTypes'

const initialState = {
    tasks: []
}

// Adjust TaskAction to handle an array of tasks
interface TaskAction {
    type: typeof TASKS
    data: InterfaceTask[] // Array of tasks
}

// Modify reducer to handle an array
const familyReducer = (state = initialState, action: TaskAction) => {
    switch (action.type) {
        case TASKS:
            return {
                ...state,
                tasks: action.data
            }
        default:
            return state
    }
}

export default familyReducer
