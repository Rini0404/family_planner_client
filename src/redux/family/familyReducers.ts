import { FamilyType } from '../../types/family'
import { UPDATE_FAMILY } from './familyTypes'

interface FamilyAction {
    type: typeof UPDATE_FAMILY
    data: FamilyType
}

const initialState = {
    family: {
        familyName: '',
        members: [],
        familyId: '',
        inviteCode: ''
    }
}

const familyReducer = (state = initialState, action: FamilyAction) => {
    switch (action.type) {
        case UPDATE_FAMILY:
            return {
                ...state,
                family: action.data
            }
        default:
            return state
    }
}

export default familyReducer
