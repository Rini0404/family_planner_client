export const isValidZipCode = (zipCode: string) => {
    const regex = /^\d{5}$/.test(zipCode)
    if (!regex) {
        return {
            isValid: false,
            message: 'Please enter a valid 5 digit zip code'
        }
    }  
    return {
        isValid: true,
        message: 'zipcode is valid'
    }

};