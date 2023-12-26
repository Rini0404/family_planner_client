import { Text, View } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../navigators'

interface PostScreenProps extends AppStackScreenProps<'PostScreen'> {}

export const PostScreen: React.FC<PostScreenProps> = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Text>Post Screen</Text>
        </View>
    )
}
