import { View, Text } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../navigators'


interface SettingsProps extends AppStackScreenProps<'Settings'> {}


export const Settings: React.FC<SettingsProps> = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
                style={{
                    fontSize: 24,
                    color: 'purple',
                }}
            >Settings Settings</Text>
        </View>
    )
}