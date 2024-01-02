import { DeleteTaskAction } from '../../types/taskRedux'
import { InterfaceTask } from '../../types/tasks'
import { TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from './tasksTypes'

const initialState = {
    tasks: []
}

// Adjusted TaskAction to include DeleteTaskAction
type TaskAction =
    | {
          type: typeof TASKS | typeof ADD_TASK | typeof UPDATE_TASK
          data: InterfaceTask | InterfaceTask[]
      }
    | DeleteTaskAction

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
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task: InterfaceTask) => {
                    if (
                        Array.isArray(action.data)
                            ? task._id === action.data[0]._id
                            : task._id === action.data._id
                    ) {
                        return action.data
                    }
                    return task
                })
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((task: InterfaceTask) => task._id !== action.data._id)
            }

        default:
            return state
    }
}

export default familyReducer
