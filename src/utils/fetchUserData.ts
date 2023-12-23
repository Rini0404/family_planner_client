import { get } from '../api/get'
import { UserResponse } from './saveUserInApp'

export const fetchUserData = async () => {
    try {
        const response = await get('api/users/getMe', {})
    } catch (error) {
        console.log('Error in fetchUserData: ', error)
    }
}
