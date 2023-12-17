import React from 'react'
import { TextInput, Text, View, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native'
import ErrorMessage from '../ErrorMessage'
import { palette, colors } from '../../theme/colors'
import { typography } from '../../theme/fonts'

interface CustomTextInputProps extends TextInputProps {
    label: string
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
    label,
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
        <View style={styles.inputContainer}>
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
            {error ? <ErrorMessage message={error} /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '80%',
        height: '10%',
        marginBottom: '5%'
    },
    inputLabel: {
        left: 2,
        paddingHorizontal: 2,
        color: colors.text,
        fontSize: 16,
        marginLeft: 5
    },
    input: {
        height: '100%',
        fontFamily: typography.secondary,
        paddingLeft: '5%',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'white'
    },
    inputError: {
        borderColor: 'red'
    },
    visibilityIcon: {
        position: 'absolute',
        right: 10,
        height: '100%',
        justifyContent: 'center',
        padding: 10
    }
})

export default CustomTextInput
