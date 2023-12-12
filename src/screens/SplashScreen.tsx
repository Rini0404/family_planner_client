import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useUserSession } from '../hooks/userAuthSession'

const SplashScreen = () => {
    // Here, you can use your hook.
    const isLoading = useUserSession()

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return null
}

export default SplashScreen
