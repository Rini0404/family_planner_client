import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

type OutlinedButtonProps = {
    title: string
    textStyles: object
    style: object
    onPress: () => void
}

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({
    textStyles,
    title,
    onPress,
    style
}) => {
    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...style
            }}
            onPress={onPress}
        >
            <Text style={textStyles}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
