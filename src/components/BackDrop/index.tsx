import React from 'react'
import { StyleSheet, View } from 'react-native'
import { palette } from '../../theme'

export type BackDropProps = {
    color?: string
    children: React.ReactNode
}

export const BackDrop: React.FC<BackDropProps> = ({ color, children }) => {
    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <View>{children}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        // gives it an 80% height so that when pushed up we have more of the background
        position: 'absolute',
        bottom: '-20%',
        borderTopLeftRadius: 50,
        backgroundColor: palette.pastelBackground,
        borderTopRightRadius: 50
    }
})
