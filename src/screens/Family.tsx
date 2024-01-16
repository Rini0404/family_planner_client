import { View, Text } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../navigators'


interface FamilyProps extends AppStackScreenProps<'Family'> {}


export const Family: React.FC<FamilyProps> = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
                style={{
                    fontSize: 24,
                    color: 'purple',
                }}
            >Family</Text>
        </View>
    )
}