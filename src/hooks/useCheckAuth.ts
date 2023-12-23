import React, { useState, useEffect } from 'react'
import { loadString } from '../utils/storage'
import { fetchUserData } from '../utils/fetchUserData'

export default function useCheckAuth() {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const checkAuthToken = async () => {
            const token = await loadString('token')

            if (!token) {
                console.log('No token found')
                setIsAuth(false)
                return
            }
            console.log('Token found: ', token)
            await fetchUserData()

            setIsAuth(true)
        }

        checkAuthToken()
    }, [])

    return isAuth
}
