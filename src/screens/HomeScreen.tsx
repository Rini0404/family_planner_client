import { Text, View } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../navigators'

interface HomeScreenProps extends AppStackScreenProps<'HomeScreen'> {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>HomeScreen</Text>
            <View style={{ padding: 16 }}></View>
        </View>
    )
}
