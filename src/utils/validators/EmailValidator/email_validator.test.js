import { validateEmail } from '.'

describe('Email Validator', () => {
    const validEmails = [
        'test@example.com',
        'test.email+one@gmail.com',
        'test.email@subdomain.example.com',
        '1234567890@example.com',
        'email@123.123.123.123'
    ]

    const invalidEmails = [
        'plainaddress',
        '@missingusername.com',
        'invalid@subdomain@domain.com',
        'missingatsign.net',
        'missingdomain.com',
        'dot@.com',
        'missingtld@com'
    ]

    validEmails.forEach((email) => {
        it(`should return true for valid email address: ${email}`, () => {
            expect(validateEmail(email)).toBe(true)
        })
    })

    invalidEmails.forEach((email) => {
        it(`should return false for invalid email address: ${email}`, () => {
            expect(validateEmail(email)).toBe(false)
        })
    })
})
