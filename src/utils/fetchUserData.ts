import { get } from '../api/get'
import { updateFamilyDetails, updateUserDetails } from '../redux'
import { updateTasks } from '../redux/tasks/tasksActions'
import { UserResponseType } from '../types/user'

interface Action {
    type: string
    payload?: any
}

type DispatchFunction = (action: Action) => void

export const fetchUserData = async ({ dispatch }: { dispatch: DispatchFunction }) => {
    try {
        const response = (await get('api/users/getMe', {})) as UserResponseType

        if (!response.data) {
            throw new Error(response.error || 'No user found')
        }

        dispatch(updateUserDetails(response.data))

        dispatch(updateFamilyDetails(response.data.family))

        dispatch(updateTasks(response.data.family.tasks))
    } catch (error) {
        console.log('Error in fetchUserData: ', error)
    }
}
