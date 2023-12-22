import { UserType } from '../../types/user'
import { UPDATE_USER } from './userTypes'

interface UserAction {
    type: typeof UPDATE_USER
    data: UserType
}

const initialState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
        role: ''
    }
}

const userReducer = (state = initialState, action: UserAction) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                user: action.data
            }
        default:
            return state
    }
}

export default userReducer
