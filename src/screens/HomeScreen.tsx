import { StatusBar, Text, View } from 'react-native'
import React from 'react'
import { AppStackParamList, AppStackScreenProps } from '../navigators'
import { palette } from '../theme'
import { useSelector } from 'react-redux'
import { remove } from '../utils/storage'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { FamilyCard } from '../components/FamilyCard'

interface HomeScreenProps extends AppStackScreenProps<'HomeScreen'> {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
    const { user } = useSelector((state: any) => state.user)

    const { family } = useSelector((state: any) => state.family)

    const navigation = useNavigation<NavigationProp<AppStackParamList>>()

    const clearStorage = async () => {
        await remove('token')
        navigation.navigate('Initial')
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                paddingTop: '15%'
            }}
        >
            <FamilyCard family={family} user={user} />
            {/* clear token */}
            <Text
                style={{
                    fontSize: 20
                }}
                onPress={clearStorage}
            >
                Clear Storage
            </Text>
        </View>
    )
}
