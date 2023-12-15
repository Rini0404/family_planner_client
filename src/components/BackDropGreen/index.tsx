import React from 'react'
import { StyleSheet, View } from 'react-native'
import { palette } from '../../theme'

export const BackDrop: React.FC = () => {
    return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: palette.boxesPastelGreen
    }
})
