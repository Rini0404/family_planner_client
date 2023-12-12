import { validateAge } from './index'

describe('validateAge', () => {
    const today = new Date()
    const oneDay = 24 * 60 * 60 * 1000

    it('returns true for a date more than 13 years ago', () => {
        const overThirteenYearsOld = new Date(
            today.getFullYear() - 13,
            today.getMonth(),
            today.getDate() - 1
        )
        expect(validateAge(overThirteenYearsOld).isValid).toBeTruthy()
    })

    it('returns false for a date less than 13 years ago', () => {
        const lessThanThirteenYearsOld = new Date(
            today.getFullYear() - 13,
            today.getMonth(),
            today.getDate() + 1
        )
        expect(validateAge(lessThanThirteenYearsOld).isValid).toBeFalsy()
    })

    it('returns true for a date exactly 13 years ago', () => {
        const exactlyThirteenYearsOld = new Date(
            today.getFullYear() - 13,
            today.getMonth(),
            today.getDate()
        )
        expect(validateAge(exactlyThirteenYearsOld).isValid).toBeTruthy()
    })

    it("returns false for today's date", () => {
        expect(validateAge(new Date()).isValid).toBeFalsy()
    })

    it('returns false for a date in the future', () => {
        const tomorrow = new Date(today.getTime() + oneDay)
        expect(validateAge(tomorrow).isValid).toBeFalsy()
    })
})
