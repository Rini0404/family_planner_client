import { validatePassword } from '.'

describe('Password Validator', () => {
    const validPasswords = ['1234', 'asdfg', 'acbd1', 'testing']
    const invalidPasswords = ['123', 'asd', 'acb', 'tes']

    validPasswords.forEach((password) => {
        it(`should return true for valid password: ${password}`, () => {
            const validationResult = validatePassword(password)
            expect(validationResult.isValid).toBe(true)
        })
    })

    invalidPasswords.forEach((password) => {
        it(`should return false for invalid password: ${password}`, () => {
            const validationResult = validatePassword(password)
            expect(validationResult.isValid).toBe(false)
        })
    })
})
