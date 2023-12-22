import { FamilyType } from '../../types/family'
import { UPDATE_FAMILY } from './familyTypes'

export const updateFamilyDetails = (data: FamilyType) => {
    return {
        type: UPDATE_FAMILY,
        data
    }
}
