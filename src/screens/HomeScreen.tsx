import { Text, View } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../navigators'
import { palette } from '../theme'
import { useSelector } from 'react-redux'

interface HomeScreenProps extends AppStackScreenProps<'HomeScreen'> {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
    const { user } = useSelector((state: any) => state.user)

    console.log('user', user)

    const { family } = useSelector((state: any) => state.family)

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: palette.boxesPastelGreen
            }}
        >
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
                Welcome: {''}
                {user.firstName + ' ' + user.lastName}
            </Text>
            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
                    Family: {''}
                    {family.familyName}
                </Text>
            </View>
        </View>
    )
}
