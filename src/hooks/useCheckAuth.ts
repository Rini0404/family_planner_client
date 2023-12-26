import React, { useState, useEffect } from 'react'
import { loadString } from '../utils/storage'
import { fetchUserData } from '../utils/fetchUserData'
import { useDispatch } from 'react-redux'
import { updateFamilyDetails, updateUserDetails } from '../redux'

export default function useCheckAuth() {
    const [isAuth, setIsAuth] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const checkAuthToken = async () => {
            const token = await loadString('token')

            if (!token) {
                console.log('No token found')
                setIsAuth(false)
                return
            }

            await fetchUserData({ dispatch })

            setIsAuth(true)
        }

        checkAuthToken()
    }, [])

    return isAuth
}
