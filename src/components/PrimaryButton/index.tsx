import React from 'react'
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { colors, palette } from '../../theme'

interface PrimaryButtonProps {
    onPress: () => void
    title: string
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    testId?: string
    disabled?: boolean
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    onPress,
    title,
    style,
    textStyle,
    disabled = false
}) => {
    const handlePress = () => {
        if (!disabled) {
            onPress()
        }
    }
    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[styles.buttonContainer, style, disabled && styles.disabledButton]}
            disabled={disabled}
        >
            <Text
                testID='primary-button'
                style={[styles.buttonText, textStyle, disabled && styles.disabledButtonText]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: palette.highlight500,
        width: '90%',
        padding: 10,
        borderRadius: 12
    },
    buttonText: {
        fontSize: 12,
        color: colors.text,
    },
    disabledButton: {
        backgroundColor: palette.secondary400
    },
    disabledButtonText: {
        color: colors.text
    }
})

export default PrimaryButton
