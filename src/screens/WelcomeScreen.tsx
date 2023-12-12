import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppStackParamList, AppStackScreenProps } from '../navigators'
import { remove } from '../utils/storage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

interface WelcomeScreenProps extends AppStackScreenProps<'Welcome'> {}

type NavigationProp = StackNavigationProp<AppStackParamList>;

export const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
    const navigation = useNavigation<NavigationProp>()

    const clearToken = async () => {
        await remove('token')
        navigation.navigate('HomeScreen')
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ padding: 16 }}>
                <Text style={{ color: '#ccc' }}>Welcome</Text>
            </View>

            <View style={{ padding: 16 }}>
                <TouchableOpacity
                    style={{ padding: 16, borderRadius: 20, backgroundColor: '#ccc' }}
                    onPress={clearToken}
                >
                    <Text>Clear token</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
