import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Modal } from 'react-native'
import { palette } from '../../theme'

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
    return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: palette.pastelNavbars,
        width: '90%',
        height: '15%',
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
