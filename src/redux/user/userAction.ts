import { UserType } from '../../types/user'
import { EDIT_USER, UPDATE_USER } from './userTypes'

export const updateUserDetails = (data: UserType) => {
    return {
        type: UPDATE_USER,
        data
    }
}

export const editUserDetails = (data: UserType) => {
    return {
        type: EDIT_USER,
        data
    }
}
