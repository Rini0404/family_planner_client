import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { colors } from '../../theme'

interface LoadingOverlayProps {
    isVisible: boolean
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible }) => {
    if (!isVisible) return null

    return (
        <View style={styles.overlay}>
            <ActivityIndicator size='large' color={colors.text} />
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        zIndex: 100,
        backgroundColor: colors.transparent
    }
})

export default LoadingOverlay
