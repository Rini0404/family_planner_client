export const validateAge = (birthDate: Date) => {
    const today = new Date()
    const thirteenYearsAgo = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate())

    if (birthDate > thirteenYearsAgo) {
        return {
            isValid: false,
            message: 'You must be at least 13 years old to register.'
        }
    }

    return {
        isValid: true,
        message: 'User is at least 13 years of age.'
    }
}
