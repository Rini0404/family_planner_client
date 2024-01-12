import React, { useState, useEffect } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { typography } from '../../theme/fonts'
import { palette } from '../../theme'

export const NoListCalendar: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={{ width: '100%', height: '100%', borderRadius: 100 }}
                    source={require('../../../assets/images/initial.png')}
                />
            </View>
            <Text style={styles.text}>No tasks today, you can relax!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 125,
        height: 125,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: palette.pastelNavbars,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '6%'
    },
    text: {
        textAlign: 'center',
        fontFamily: typography.quaternary,
        fontSize: 16
    }
})
