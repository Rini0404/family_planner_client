import { NavigationProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const SplashScreen = () => {
    const navigation = useNavigation<NavigationProp>()

    React.useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Tabs')
        }, 500)
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color='#ccc' />
        </View>
    )
}

export default SplashScreen
