import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { typography } from '../../theme/fonts'
import { colors } from '../../theme'
import * as Linking from 'expo-linking'

interface LinkButtonProps {
    url: string
    title: string
}

const openURL = (url: string) => {
    Linking.openURL(url)
        .then(() => {
            console.log('URL opened:', url)
        })
        .catch((error) => {
            console.error('An error occurred while trying to open the URL:', error)
        })
}

export const LinkButton: React.FC<LinkButtonProps> = ({ url, title }) => (
    <TouchableOpacity onPress={() => openURL(url)}>
        <Text style={styles.linkButton}>{title}</Text>
    </TouchableOpacity>
)


const styles = StyleSheet.create({
    linkButton: {
        color: colors.text,
        fontSize: 14,
        fontFamily: typography.thinItalic
    }
})
