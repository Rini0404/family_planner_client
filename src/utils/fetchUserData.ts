import { get } from '../api/get'
import { updateFamilyDetails, updateUserDetails } from '../redux'
import { UserResponseType } from '../types/user'

interface Action {
    type: string
    payload?: any
}

type DispatchFunction = (action: Action) => void

export const fetchUserData = async ({ dispatch }: { dispatch: DispatchFunction }) => {
    try {
        const response = (await get('api/users/getMe', {})) as UserResponseType

        console.log('Response from fetchUserData: ', response)

        if (!response.data) {
            throw new Error(response.error || 'No user found')
        }

        dispatch(updateUserDetails(response.data))

        dispatch(updateFamilyDetails(response.data.family))
    } catch (error) {
        console.log('Error in fetchUserData: ', error)
    }
}
