import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { palette } from '../../theme'
import { typography } from '../../theme/fonts'
import { OutlinedButton } from '../OutlinedButton'
import { OptionChosen } from '../../screens/SignupScreen'

type OptionSignupProps = {
    optionChosen: OptionChosen | null
    setOptionChosen: (option: OptionChosen) => void
}

export const OptionSignup: React.FC<OptionSignupProps> = ({ optionChosen, setOptionChosen }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>What would you like to do?</Text>
            </View>
            <View style={styles.buttons}>
                <OutlinedButton
                    title='Create a group'
                    onPress={() => {
                        setOptionChosen(OptionChosen.Creator)
                    }}
                    style={styles.outlinedButton}
                    textStyles={{
                        color: 'white',
                        fontFamily: typography.tertiary,
                        fontSize: 18,
                        textAlign: 'center'
                    }}
                />

                <OutlinedButton
                    title='Join a group'
                    onPress={() => {
                        setOptionChosen(OptionChosen.Member)
                    }}
                    style={styles.outlinedButton}
                    textStyles={{ color: 'white', fontFamily: typography.tertiary, fontSize: 18 }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '40%',
        position: 'absolute',
        bottom: '20%',
        zIndex: 1,
        alignItems: 'center'
    },
    header: {
        width: '90%',
        padding: 10 // Added padding for better text appearance
    },
    title: {
        fontSize: 36,
        fontFamily: typography.tertiary,
        color: 'white',
        textAlign: 'center'
    },
    outlinedButton: {
        width: '90%',
        height: '25%',
        marginBottom: '5%',
        borderRadius: 15
    },
    buttons: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
