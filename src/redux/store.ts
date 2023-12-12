import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import RootReducer from './rootReducer'

const store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store