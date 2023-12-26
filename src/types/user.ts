import { FamilyType } from './family'

export type UserType = {
    _id: string
    email: string
    firstName: string
    lastName: string
    role: string
    family: FamilyType
}

export type UserResponseType = {
    data: UserType
    success: boolean
    error: string
    message: string
}

export type UserSignUpResponseType = {
    data: {
        user: UserType
        family: FamilyType
        token: string
    }
    message: string
}
