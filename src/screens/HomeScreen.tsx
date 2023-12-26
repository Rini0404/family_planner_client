import { Text, View } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../navigators'
import { palette } from '../theme'
import { useSelector } from 'react-redux'

interface HomeScreenProps extends AppStackScreenProps<'HomeScreen'> {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
    const { user } = useSelector((state: any) => state.user)

    const { family } = useSelector((state: any) => state.family)

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Text>{user?.name} HOME SCREEN</Text>
        </View>
    )
}
