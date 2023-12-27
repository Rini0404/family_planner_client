import { combineReducers } from 'redux'

import userReducer from './user/userReducer'

import familyReducer from './family/familyReducers'

import taskReducer from './tasks/tasksReducers'

const rootReducer = combineReducers({
    user: userReducer,
    family: familyReducer,
    tasks: taskReducer
})

export default rootReducer
