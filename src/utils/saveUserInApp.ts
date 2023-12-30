import { Dispatch } from 'redux'
import { post } from '../api/post'
import { saveStringToAsyncStorage } from './storage'
import { UserType } from '../types/user'
import { updateFamilyDetails } from '../redux/family/familyActions'
import { updateUserDetails } from '../redux'
// import { setUser } from './pathToYourReduxActions'; // Import your action to set user in Redux

export type UserResponse = {
    data: {
        token: string
        user: UserType
    }
    success: boolean
    error: string
    message: string
}

export const handleLogin = async (
    dispatch: Dispatch,
    userData: { email: string; password: string }
) => {
    try {
        const response = await post<UserResponse>('api/users/login', userData, true)

        // Check if the response contains the required data
        if (!response.data) {
            // You can also check for specific error message if your API provides one
            throw new Error(response.error || 'Login failed')
        }

        // Update Redux state with user data
        dispatch(updateUserDetails(response.data.user))

        dispatch(updateFamilyDetails(response.data.user.family))

        // Save token to AsyncStorage and update Redux state
        await saveStringToAsyncStorage('token', response.data.token)

        return response.data.user // Return user data if needed
    } catch (error) {
        console.error('Login error: ', error)
        throw error // Rethrow the error for the caller to handle
    }
}
