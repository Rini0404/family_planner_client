import React, { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useCheckAuth from '../hooks/useCheckAuth'
import { fetchUserData } from '../utils/fetchUserData'

const SplashScreen = () => {
    const isAuth = useCheckAuth()
    const navigation = useNavigation()

    useEffect(() => {
        console.log('isAuth', isAuth)
        if (isAuth) {
            navigation.navigate('HomeScreen')
        } else {
            navigation.navigate('Initial')
        }
    }, [isAuth, navigation])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color='#ccc' />
        </View>
    )
}

export default SplashScreen
