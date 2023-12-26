import { Text, View } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../navigators'
import { palette } from '../theme'
import { useSelector } from 'react-redux'
import { remove } from '../utils/storage'
import { useNavigation } from '@react-navigation/native'

interface HomeScreenProps extends AppStackScreenProps<'HomeScreen'> {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
    const { user } = useSelector((state: any) => state.user)

    const { family } = useSelector((state: any) => state.family)

    const navigatae = useNavigation()

    const clearStorage = async () => {
        await remove('token')
        navigatae.navigate('Initial')
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Text>
                {user?.firstName} {user?.lastName}{' '}
            </Text>
            <Text>The: {family?.familyName}'s</Text>

            <Text
                style={{
                    color: palette.boxesPastelGreen
                }}
                onPress={clearStorage}
            >
                Clear Storage
            </Text>
        </View>
    )
}
