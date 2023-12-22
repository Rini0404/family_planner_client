import { FamilyType } from './family'

export type UserType = {
    _id: string
    email: string
    firstName: string
    lastName: string
    role: string
    family: FamilyType
}
