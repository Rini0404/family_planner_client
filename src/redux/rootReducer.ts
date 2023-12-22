import { combineReducers } from 'redux'

import userReducer from './user/userReducer'

import familyReducer from './family/familyReducers'

const rootReducer = combineReducers({
    user: userReducer,
    family: familyReducer
})

export default rootReducer
