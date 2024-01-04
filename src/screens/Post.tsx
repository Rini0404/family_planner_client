import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../navigators'
import { CreateTask } from '../components/Create'

interface PostScreenProps extends AppStackScreenProps<'PostScreen'> {}

export const PostScreen: React.FC<PostScreenProps> = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            >
                <CreateTask />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
