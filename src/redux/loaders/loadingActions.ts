import { LOADING_STATE } from './loadingTypes'

export const setLoadingState = (loadingState: boolean) => {
    return {
        type: LOADING_STATE,
        data: loadingState
    }
}
