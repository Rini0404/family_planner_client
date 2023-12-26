import { Text, View } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../navigators'

interface CalenderScreenProps extends AppStackScreenProps<'CalenderScreen'> {}

export const CalenderScreen: React.FC<CalenderScreenProps> = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Text>Calender Screen</Text>
        </View>
    )
}
