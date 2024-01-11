import React, { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { palette } from '../../theme'
import { typography } from '../../theme/fonts'

type TextInputPostProps = {
    placeholder: string
    value: string
    onChangeText: (text: string) => void
}

export const TextInputPost: React.FC<TextInputPostProps> = ({
    placeholder,
    value,
    onChangeText
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.textInput}>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor='#d3d3d3'
                    value={value}
                    onChangeText={onChangeText}
                    multiline
                    textAlignVertical='center'
                    style={styles.input}
                    maxLength={70}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: palette.pastelNavbars,
        width: '90%',
        height: '15%',
        borderRadius: 20,
        marginTop: '5%',
        alignItems: 'center'
    },
    input: {
        fontSize: 18,
        fontFamily: typography.tertiary,
        color: '#fff',
        height: Platform.OS === 'android' ? '100%' : undefined
    },
    textInput: {
        width: '90%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
