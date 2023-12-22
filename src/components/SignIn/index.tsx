import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { typography } from '../../theme/fonts'
import CustomTextInput from '../CustomTextInput'
import { OptionChosen } from '../../screens/SignupScreen'
import PrimaryButton from '../PrimaryButton'
import { post } from '../../api/post'
import { validateEmail } from '../../utils/validators/EmailValidator'

type FormErrors = {
    email: string | null
    password: string | null
}

export const SignInForm: React.FC = ({}) => {
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

    const [errors, setErrors] = React.useState<FormErrors>({
        email: null,
        password: null
    })

    const handleSubmit = async () => {
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
            const userData = {
                email,
                password
            }

            const response = await post('api/users/login', userData)
            console.log('response: ', response)
        } catch (error) {
            console.log('error in signup: ', error)
            const errorResponse = (error as Error).message
            const errorMessage = 'Something went wrong!: ' + errorResponse
            alert(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Don't have an account?
                    <Text style={styles.link}> Register</Text>
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

                <PrimaryButton title='CREATE' onPress={() => handleSubmit()} disabled={isLoading} />
            </View>
        </View>
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
