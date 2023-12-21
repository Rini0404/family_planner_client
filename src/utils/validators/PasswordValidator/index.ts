export const validatePassword = (password: string) => {
    // Check for minimum length
    const minLength = 7
    if (password.length < minLength) {
        return {
            isValid: false,
            message: `Password must be at least ${minLength} characters long.`
        }
    }

    /*
     * Currently, the password validator only checks for minimum length.
     * Just like blackinHR.com, we will not require any other password criteria.
     */

    // Check for lowercase letters
    // if (!/[a-z]/.test(password)) {
    //     return {
    //         isValid: false,
    //         message: 'Password must contain at least one lowercase letter.',
    //     }
    // }

    // Check for uppercase letters
    // if (!/[A-Z]/.test(password)) {
    //     return {
    //         isValid: false,
    //         message: 'Password must contain at least one uppercase letter.',
    //     }
    // }

    // Check for numbers
    // if (!/\d/.test(password)) {
    //     return {
    //         isValid: false,
    //         message: 'Password must contain at least one number.',
    //     }
    // }

    // Check for symbols
    // if (!/\W|_/.test(password)) {
    //     return {
    //         isValid: false,
    //         message: 'Password must contain at least one symbol.',
    //     }
    // }

    return {
        isValid: true,
        message: 'Password is valid.'
    }
}
