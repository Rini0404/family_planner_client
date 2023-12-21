import React from 'react'
import { TextInput, Text, View, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native'
import ErrorMessage from '../ErrorMessage'
import { palette, colors } from '../../theme/colors'
import { typography } from '../../theme/fonts'
import HidePassword from '../../../assets/password-icons/hide-password'
import ShowPassword from '../../../assets/password-icons/show-password'

interface CustomTextInputProps extends TextInputProps {
    label: string
    onIconPress?: () => void
    placeholder: string
    value: string
    onChangeText: (text: string) => void
    error?: string | null
    isPassword?: boolean
    isPasswordVisible?: boolean
    testID?: string
    togglePasswordVisibility?: () => void
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    onIconPress,
    placeholder,
    value,
    onChangeText,
    error,
    isPassword,
    isPasswordVisible,
    placeholderTextColor,
    testID
}) => {
    return (
        <View style={styles.outerContainer}>
            <View style={[styles.inputContainer, error ? styles.inputError : {}]}>
                <TextInput
                    style={styles.input}
                    testID={testID}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={isPassword && !isPasswordVisible}
                    autoCapitalize='none'
                />
                {isPassword && (
                    <TouchableOpacity onPress={onIconPress} style={styles.eyeIcon}>
                        {isPasswordVisible ? <HidePassword /> : <ShowPassword />}
                    </TouchableOpacity>
                )}
            </View>
            {error && <ErrorMessage message={error} />}
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        width: '80%',
        marginBottom: '5%'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'white',
        padding: 10
    },
    input: {
        flex: 1, // Allows the input to fill the space
        fontFamily: typography.secondary
    },
    inputError: {
        borderColor: 'red'
    },
    eyeIcon: {
        position: 'absolute',
        right: '5%',
        height: '100%',
        justifyContent: 'center'
    }
    // ... other styles
})

export default CustomTextInput
