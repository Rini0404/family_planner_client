import { FilterOptions } from '../../types/filter'
import { DeleteTaskAction } from '../../types/taskRedux'
import { InterfaceTask } from '../../types/tasks'
import { TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK, SET_FILTERED_TASKS } from './tasksTypes'

const initialState = {
    tasks: [],
    filteredTasks: []
}
type SetFilteredTasksAction = {
    type: typeof SET_FILTERED_TASKS
    data: FilterOptions
}

type TaskAction =
    | {
          type: typeof TASKS | typeof ADD_TASK | typeof UPDATE_TASK
          data: InterfaceTask | InterfaceTask[]
      }
    | DeleteTaskAction
    | SetFilteredTasksAction

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
        case SET_FILTERED_TASKS: {
            const tasks: InterfaceTask[] = state.tasks as InterfaceTask[]
            const filterOptions: FilterOptions = action.data

            const filteredTasks = tasks.filter((task) => {
                let taskDueDate
                if (task.dueDate) {
                    taskDueDate = new Date(task.dueDate)
                }

                let filterDate
                if (filterOptions.date) {
                    filterDate = new Date(filterOptions.date)
                }

                // not finnished
                let dateMatch = filterOptions.date ? taskDueDate <= filterDate : true
                let statusMatch =
                    filterOptions.status !== 'all' ? task.status === filterOptions.status : true

                return dateMatch && statusMatch
            })

            return {
                ...state,
                filteredTasks: filteredTasks
            }
        }
        default:
            return state
    }
}

export default familyReducer
