import { isValidZipCode } from './index'

describe('isValidZipCode', () => {
    // these test should check to make sure that there is a zipcode
    // and is atleast 5 digits long
    // and that it is a number with no letters
    const testCases = [
        { zipCode: '12345', expected: true },
        { zipCode: '1234', expected: false },
        { zipCode: '123456', expected: false },
        { zipCode: '1234A', expected: false },
        { zipCode: '', expected: false },
        { zipCode: null, expected: false },
        { zipCode: undefined, expected: false }
    ]

    testCases.forEach(({ zipCode, expected }) => {
        it(`returns ${expected} for the zip code "${zipCode}"`, () => {
            const result = isValidZipCode(zipCode)
            expect(result.isValid).toBe(expected)
        })
    })
})
