export const validateName = (name: string) => {
    const MIN_LENGTH = 2
    if (name.length <= MIN_LENGTH) {
        return {
            isValid: false,
            message: `Name must be at least ${MIN_LENGTH} characters long.`,
        }
    }
    return {
        isValid: true,
        message: '',
    }
}