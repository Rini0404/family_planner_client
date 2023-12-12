
import { 
    UPDATE_USER,
} from './userTypes'


const initialState = {
    user: {
        name: '',
        email: '',
    },
}

const userReducer = (state = initialState, action: undefined) => {
    switch (action.type) {
    case UPDATE_USER: return {
        ...state,
        user: action.data,
    }
    default: return state
    }
}

export default userReducer