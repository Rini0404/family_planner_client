import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { typography } from '../../theme/fonts'
import { OutlinedButton } from '../OutlinedButton'
import CustomTextInput from '../CustomTextInput'
import { OptionChosen } from '../../screens/SignupScreen'
import PrimaryButton from '../PrimaryButton'
import { post } from '../../api/post'

type SignupFormProps = {
    optionChosen: OptionChosen | null
}

export const SignupForm: React.FC<SignupFormProps> = ({ optionChosen }) => {
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [firstName, setFirstName] = React.useState<string>('')
    const [lastName, setLastName] = React.useState<string>('')
    const [error, setError] = React.useState<string | null>(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
    const [userRole, setUserRole] = React.useState<string | null>(null)
    const [familyName, setFamilyName] = React.useState('')
    const [memberType, setMemberType] = React.useState(null)
    const [groupCode, setGroupCode] = React.useState('')

    const handleSubmit = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const userData = {
                email,
                password,
                firstName,
                lastName,
                // Include conditional fields based on the option chosen
                ...(optionChosen === OptionChosen.Member ? { groupCode } : { familyName })
            }
            
            await post('api/users/signup', userData)
            // console.log('userData', userData)
            // const response = await fetch('http://localhost:3001/api/users/signup', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(userData)
            // })

            // console.log('response', response)
            // const data = await response.json()

            // console.log('data', data)
            // if (!response.ok) {
            //     Alert.alert(data.message || 'Failed to create account')
            //     throw new Error(data.message || 'Failed to create account')
            // }
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
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
                        setError(null)
                    }}
                    error={error}
                />
                <CustomTextInput
                    label='Last Name'
                    placeholder='Last Name'
                    placeholderTextColor='white'
                    autoCorrect={false}
                    value={lastName}
                    onChangeText={(text) => {
                        setLastName(text)
                        setError(null)
                    }}
                    error={error}
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
                        setError(null)
                    }}
                    error={error}
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
                        setError(null)
                    }}
                    isPassword={true}
                    isPasswordVisible={isPasswordVisible}
                    error={error}
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
                            setError(null)
                        }}
                        error={error}
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
                            setError(null)
                        }}
                        error={error}
                    />
                )}
                <PrimaryButton title='CREATE' onPress={() => handleSubmit()} disabled={isLoading} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '75%',
        position: 'absolute',
        bottom: '2%',
        zIndex: 1,
        alignItems: 'center'
    },
    header: {
        width: '90%',
        padding: 10
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
