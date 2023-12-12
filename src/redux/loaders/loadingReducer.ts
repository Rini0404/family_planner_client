import { LOADING_STATE } from './loadingTypes'

const initialState = {
    isLoading: false
}

type LoadingAction = {
    type: string
    data: boolean
}

const loadingReducer = (state = initialState, action: LoadingAction) => {
    switch (action.type) {
        case LOADING_STATE:
            return {
                ...state,
                isLoading: action.data
            }
        default:
            return state
    }
}

export default loadingReducer
