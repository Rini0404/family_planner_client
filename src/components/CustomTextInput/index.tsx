import React from 'react'
import { TextInput, Text, View, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native'
import { typography } from '../../theme/fonts'
import ErrorMessage from '../ErrorMessage'
import { palette, colors } from '../../theme/colors'
import ShowPassword from '../../../assets/welcome-screen-icons/show-password'
import HidePassword from '../../../assets/welcome-screen-icons/hide-password'

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
    testID,
    togglePasswordVisibility
}) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.textInputWrapper}>
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
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={styles.visibilityIcon}
                    >
                        {isPasswordVisible ? <ShowPassword /> : <HidePassword />}
                    </TouchableOpacity>
                )}
            </View>
            {error ? <ErrorMessage message={error} /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%'
    },
    inputLabel: {
        left: 2,
        paddingHorizontal: 2,
        color: palette.emphasis,
        fontSize: 16,
        fontFamily: typography.medium,
        marginLeft: 5
    },
    input: {
        height: 44,
        borderColor: palette.tertiary900,
        color: colors.text,
        paddingLeft: 14,
        borderWidth: 1,
        width: '100%',
        backgroundColor: palette.secondary,
        borderRadius: 8,
    },
    inputError: {
        borderColor: 'red'
    },
    textInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: palette.secondary,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: palette.tertiary900,
        height: 44
    },
    visibilityIcon: {
        position: 'absolute',
        right: 10,
        height: '100%',
        justifyContent: 'center',
        padding: 10,
    }
})

export default CustomTextInput
