import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { colors } from '../../theme'

interface ErrorMessageProps {
    message: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <Text style={styles.errorText} testID='errorMessage'>
            {message}
        </Text>
    )
}

const styles = StyleSheet.create({
    errorText: {
        color: colors.error,
        fontSize: 12,
        marginLeft: 10
    }
})

export default ErrorMessage
