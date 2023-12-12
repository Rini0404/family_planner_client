import {
    UPDATE_USER,
} from './userTypes'

export const updateUserDetails = ( data:  undefined) => {
    return {
        type: UPDATE_USER,
        data,
    }
}
