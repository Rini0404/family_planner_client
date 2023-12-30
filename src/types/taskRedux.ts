import { DELETE_TASK } from '../redux/tasks/tasksTypes'

export type DeleteTaskAction = {
    type: typeof DELETE_TASK
    data: { _id: string }
}
