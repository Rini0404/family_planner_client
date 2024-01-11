import {
    View,
    Text,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet
} from 'react-native'
import React from 'react'
import { AppStackParamList } from '../navigators'
import { StackScreenProps } from '@react-navigation/stack'
import BackArrow from '../components/BackArrow'
import { BackDrop } from '../components/BackDrop'
import { typography } from '../theme/fonts'
import { SignInForm } from '../components/SignIn'
import { palette } from '../theme'

type SignInProps = StackScreenProps<AppStackParamList, 'Signin'>

export const SignInScreen: React.FC<SignInProps> = ({ navigation, route }) => {
    const handleBackPress = () => {
        navigation.goBack()
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <BackArrow onPress={handleBackPress} />
                        <Text style={styles.headerText}>Log in</Text>
                    </View>
                    <BackDrop color={palette.boxesPastelGreen} />
                    <SignInForm />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    scrollviewContainer: {
        paddingTop: StatusBar.currentHeight
    },
    container: {
        flex: 1
    },
    headerText: {
        fontFamily: typography.tertiary,
        fontSize: 30,
        textAlign: 'left',
        paddingLeft: '5%'
    },
    header: {
        height: '10%',
        top: '10%',
        flexDirection: 'row',
        alignItems: 'center'
    }
})
