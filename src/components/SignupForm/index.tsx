import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { typography } from '../../theme/fonts'
import { OutlinedButton } from '../OutlinedButton'
import CustomTextInput from '../CustomTextInput'

export const SignupForm: React.FC = () => {
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
