import { UserType } from '../../types/user'
import { UPDATE_USER } from './userTypes'

export const updateUserDetails = (data: UserType) => {
    return {
        type: UPDATE_USER,
        data
    }
}
