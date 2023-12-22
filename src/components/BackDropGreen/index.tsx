import React from 'react'
import { StyleSheet, View } from 'react-native'
import { palette } from '../../theme'

export const BackDrop: React.FC = () => {
    return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        // gives it an 80% height so that when pushed up we have more of the background
        position: 'absolute',
        bottom: '-20%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: palette.boxesPastelGreen
    }
})
