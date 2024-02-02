import { FilterOptions, SelectedMember } from '../../types/filter'
import { DeleteTaskAction } from '../../types/taskRedux'
import { InterfaceTask, Status } from '../../types/tasks'
import {
    TASKS,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    SET_FILTERED_TASKS,
    SET_FILTERED_TO_ALL,
    REVERT_FILTERED_TASKS
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
          type:
              | typeof TASKS
              | typeof ADD_TASK
              | typeof UPDATE_TASK
              | typeof SET_FILTERED_TO_ALL
              | typeof REVERT_FILTERED_TASKS
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
        case REVERT_FILTERED_TASKS:
            return {
                ...state,
                filteredTasks: state.tasks
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
                ],
                filteredTasks: [
                    ...state.filteredTasks,
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
                }),
                filteredTasks: state.tasks.map((task: InterfaceTask) => {
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
                tasks: state.tasks.filter((task: InterfaceTask) => task._id !== action.data._id),
                filteredTasks: state.filteredTasks.filter(
                    (task: InterfaceTask) => task._id !== action.data._id
                )
            }
        case SET_FILTERED_TASKS: {
            const tasks: InterfaceTask[] = state.tasks as InterfaceTask[]
            const filterOptions: FilterOptions = action.data

            const filteredTasks = tasks.filter((task) => {
                // Date filtering logic
                let dateMatch = true
                if (filterOptions.date && task.dueDate) {
                    const taskDueDate = new Date(task.dueDate).setHours(0, 0, 0, 0)
                    const startOfDayFilter = new Date(filterOptions.date).setHours(0, 0, 0, 0)
                    const endOfDayFilter = new Date(filterOptions.date).setHours(23, 59, 59, 999)
                    dateMatch = taskDueDate >= startOfDayFilter && taskDueDate <= endOfDayFilter
                }

                // Member filtering logic
                let memberMatch =
                    filterOptions.member === SelectedMember.EVERYONE ||
                    task.assignedTo?._id === filterOptions.member

                // Status filtering logic (no change needed if "all" includes every task)
                let statusMatch =
                    filterOptions.status === Status.All || task.status === filterOptions.status

                // A task must satisfy all conditions to be included
                return dateMatch && memberMatch && statusMatch
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
