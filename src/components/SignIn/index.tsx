import React from 'react'
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { typography } from '../../theme/fonts'
import CustomTextInput from '../CustomTextInput'
import PrimaryButton from '../PrimaryButton'
import { post } from '../../api/post'
import { validateEmail } from '../../utils/validators/EmailValidator'
import LoadingOverlay from '../LoadingOverlay'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../../utils/saveUserInApp'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AppStackParamList } from '../../navigators'

type FormErrors = {
    email: string | null
    password: string | null
}

export const SignInForm: React.FC = ({}) => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>()
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

    const [errors, setErrors] = React.useState<FormErrors>({
        email: null,
        password: null
    })

    const dispatch = useDispatch()

    const handleSubmit = async () => {
        Keyboard.dismiss()
        setIsLoading(true)
        // Reset all errors
        setErrors({
            email: null,
            password: null
        })

        let hasError = false
        let newErrors = { ...errors }

        // Basic validation for empty fields
        if (!email.trim()) {
            newErrors.email = 'Email is required'
            hasError = true
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required'
            hasError = true
        }

        // Email format validation
        if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format'
            hasError = true
        }

        if (hasError) {
            setErrors(newErrors)
            setIsLoading(false)
            return
        }

        try {
            const user = await handleLogin(dispatch, { email, password })
            if (user) {
                navigation.navigate({
                    name: 'Tabs',
                    key: 'Tabs'
                })
            }
        } catch (error) {
            const errorResponse = (error as Error).message
            alert(`Something went wrong: ${errorResponse}`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Don't have an account?{' '}
                        <Text
                            style={styles.link}
                            onPress={() => {
                                navigation.navigate('Signup')
                            }}
                        >
                            Register
                        </Text>
                    </Text>
                </View>

                <View style={styles.inputsContainer}>
                    <CustomTextInput
                        label='Email'
                        placeholder='Email'
                        keyboardType='email-address'
                        placeholderTextColor='white'
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text)
                            setErrors({ ...errors, email: null })
                        }}
                        error={errors.email}
                    />
                    <CustomTextInput
                        label='Password'
                        placeholder='Password'
                        placeholderTextColor='white'
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text)
                            setErrors({ ...errors, password: null })
                        }}
                        isPassword={true}
                        isPasswordVisible={isPasswordVisible}
                        onIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        error={errors.password}
                    />

                    <PrimaryButton
                        title='LOG IN'
                        onPress={() => handleSubmit()}
                        disabled={isLoading}
                    />
                </View>
            </View>
            {isLoading && <LoadingOverlay isVisible={isLoading} />}
        </>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        marginTop: 20,
        right: 25
    },
    container: {
        width: '100%',
        paddingTop: '20%',
        alignItems: 'center'
    },
    header: {
        width: '90%',
        padding: '4%'
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: typography.primary
    },
    link: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    inputsContainer: {
        width: '100%',
        height: '80%',
        alignItems: 'center'
    }
})
