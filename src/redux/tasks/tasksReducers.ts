import { FilterOptions, SelectedMember } from '../../types/filter'
import { DeleteTaskAction } from '../../types/taskRedux'
import { InterfaceTask, Status } from '../../types/tasks'
import {
    TASKS,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    SET_FILTERED_TASKS,
    SET_FILTERED_TO_ALL
} from './tasksTypes'

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
          type: typeof TASKS | typeof ADD_TASK | typeof UPDATE_TASK | typeof SET_FILTERED_TO_ALL
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
        case SET_FILTERED_TO_ALL:
            return {
                ...state,
                filteredTasks: Array.isArray(action.data)
                    ? action.data
                    : [...state.tasks, action.data]
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
                // Date filtering logic
                let taskDueDate: Date | undefined = task.dueDate
                    ? new Date(task.dueDate)
                    : undefined
                let filterDate: Date | undefined = filterOptions.date
                    ? new Date(filterOptions.date)
                    : undefined
                let dateMatch =
                    filterOptions.date && taskDueDate
                        ? taskDueDate <= (filterDate ?? new Date())
                        : true

                // Status filtering logic
                let statusMatch =
                    filterOptions.status !== Status.All
                        ? task.status === filterOptions.status
                        : true

                // Member/User filtering logic
                let memberMatch = true // Default to true to include all tasks when filter is not applied
                if (filterOptions.member !== SelectedMember.EVERYONE) {
                    // When a specific user is selected, only include tasks assigned to that user
                    memberMatch = task.assignedTo?._id === action.data.member
                }

                // A task must satisfy all conditions to be included
                return dateMatch && statusMatch && memberMatch
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
