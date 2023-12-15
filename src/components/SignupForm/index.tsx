import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { typography } from '../../theme/fonts'
import { OutlinedButton } from '../OutlinedButton'

export const SignupForm: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Have an account?
                    <Text style={styles.link}> Log in</Text>
                </Text>
            </View>

            <View style={styles.inputsContainer}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '75%',
        position: 'absolute',
        bottom: '2%',
        zIndex: 1,
        alignItems: 'center'
    },
    header: {
        width: '90%',
        padding: 10
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: typography.primary
    },
    link: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    inputsContainer: {
        width: '100%',
        height: '80%',
        justifyContent: 'space-evenly'
    }
})
