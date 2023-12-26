import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { typography } from '../../theme/fonts'
import CustomTextInput from '../CustomTextInput'
import { OptionChosen } from '../../screens/SignupScreen'
import PrimaryButton from '../PrimaryButton'
import { post } from '../../api/post'
import { validateEmail } from '../../utils/validators/EmailValidator'
import { validatePassword } from '../../utils/validators/PasswordValidator'
import LoadingOverlay from '../LoadingOverlay'
import { UserResponseType, UserSignUpResponseType } from '../../types/user'
import { useDispatch } from 'react-redux'
import { updateFamilyDetails, updateUserDetails } from '../../redux'
import { saveStringToAsyncStorage } from '../../utils/storage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppStackParamList } from '../../navigators'

type SignupFormProps = {
    optionChosen: OptionChosen | null
}

type FormErrors = {
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    groupCode: string | null
    familyName: string | null
}

export const SignupForm: React.FC<SignupFormProps> = ({ optionChosen }) => {
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [firstName, setFirstName] = React.useState<string>('')
    const [lastName, setLastName] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
    const [familyName, setFamilyName] = React.useState('')
    const [groupCode, setGroupCode] = React.useState('')

    const dispatch = useDispatch()
    const navigation = useNavigation<StackNavigationProp<AppStackParamList>>()

    const [errors, setErrors] = React.useState<FormErrors>({
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        groupCode: null,
        familyName: null
    })

    const handleSubmit = async () => {
        setIsLoading(true)
        // Reset all errors
        setErrors({
            email: null,
            password: null,
            firstName: null,
            lastName: null,
            groupCode: null,
            familyName: null
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

        const validPassword = validatePassword(password)

        if (!validPassword.isValid) {
            console.log('valid password: ', validPassword)
            newErrors.password = validPassword.message
            hasError = true
        }

        if (!firstName.trim()) {
            newErrors.firstName = 'First name is required'
            hasError = true
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Last name is required'
            hasError = true
        }

        // Email format validation
        if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format'
            hasError = true
        }

        if (optionChosen === OptionChosen.Member && !groupCode.trim()) {
            newErrors.groupCode = 'Group code is required'
            hasError = true
        }

        if (optionChosen === OptionChosen.Creator && !familyName.trim()) {
            newErrors.familyName = 'Family name is required'
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
                password,
                firstName,
                lastName,
                // Include conditional fields based on the option chosen
                ...(optionChosen === OptionChosen.Member
                    ? { invitationCode: groupCode }
                    : { familyName })
            }

            const response = (await post('api/users/signup', userData)) as UserSignUpResponseType

            console.log('response: ', response)

            // Handle errors
            if (response.message && !response.data) {
                console.log('response.message: ', response.message)

                // Directly use the response message for error handling
                const errorMessage = response.message

                // Handle specific errors
                if (errorMessage.startsWith('Email')) {
                    setErrors({ ...errors, email: errorMessage })
                } else if (errorMessage.startsWith('No')) {
                    setErrors({ ...errors, groupCode: errorMessage })
                } else {
                    console.log('Other error: ', errorMessage)
                }
                setIsLoading(false)
                return
            }

            // Update Redux state with user data
            dispatch(updateUserDetails(response.data.user))

            dispatch(updateFamilyDetails(response.data.family))

            // Save token to AsyncStorage and update Redux state
            await saveStringToAsyncStorage('token', response.data.token)

            // Navigate to the next screen
            navigation.navigate({ name: 'Tabs', key: 'Tabs' })
        } catch (error) {
            if (error instanceof Error) {
                // Now TypeScript knows error is of type Error
                console.log('Error message:', error.message)
                alert('Something went wrong! Please try again.')
            } else {
                // Handle the case where error is not an Error object
                console.log('An unknown error occurred')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Have an account?
                        <Text style={styles.link}> Log in</Text>
                    </Text>
                </View>

                <View style={styles.inputsContainer}>
                    <CustomTextInput
                        label='First Name'
                        placeholder='First Name'
                        placeholderTextColor='white'
                        autoCorrect={false}
                        value={firstName}
                        onChangeText={(text) => {
                            setFirstName(text)
                            setErrors({ ...errors, firstName: null })
                        }}
                        error={errors.firstName}
                    />
                    <CustomTextInput
                        label='Last Name'
                        placeholder='Last Name'
                        placeholderTextColor='white'
                        autoCorrect={false}
                        value={lastName}
                        onChangeText={(text) => {
                            setLastName(text)
                            setErrors({ ...errors, lastName: null })
                        }}
                        error={errors.lastName}
                    />
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

                    {optionChosen === OptionChosen.Member ? (
                        <CustomTextInput
                            label='Group Code'
                            placeholder='Group Code'
                            placeholderTextColor='white'
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={groupCode}
                            onChangeText={(text) => {
                                setGroupCode(text)
                                setErrors({ ...errors, groupCode: null })
                            }}
                            error={errors.groupCode}
                        />
                    ) : (
                        <CustomTextInput
                            label='Family Name'
                            placeholder='Family Name'
                            placeholderTextColor='white'
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={familyName}
                            onChangeText={(text) => {
                                setFamilyName(text)
                                setErrors({ ...errors, familyName: null })
                            }}
                            error={errors.familyName}
                        />
                    )}
                    <PrimaryButton
                        title='CREATE'
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
