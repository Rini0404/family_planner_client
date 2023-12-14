import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { palette } from '../theme'
import { OutlinedButton } from '../components/OutlinedButton'
import { typography } from '../theme/fonts'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AppStackParamList } from '../navigators'

export const Initial: React.FC = () => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>()

    return (
        <View style={styles.container}>
            <Image
                style={styles.initialImage}
                source={require('../../assets/images/initial.png')}
            />
            <View style={styles.greenBox}>
                <View style={styles.buttonGroup}>
                    <OutlinedButton
                        title='Sign up'
                        onPress={() => {
                            navigation.navigate('Signup')
                        }}
                        textStyles={styles.textStyles}
                        style={styles.button}
                    />
                    <OutlinedButton
                        title='Log in'
                        style={styles.button}
                        onPress={() => {
                            alert('Log in screen not done')
                            // navigation.navigate('Sigin')
                        }}
                        textStyles={styles.textStyles}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    initialImage: {
        width: '100%',
        height: '85%'
    },
    greenBox: {
        position: 'absolute',
        width: '100%',
        height: '20%',
        backgroundColor: palette.boxesPastelGreen,
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center'
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textStyles: {
        color: 'white',
        fontFamily: typography.quaternary
    },
    button: {
        width: '40%',
        height: '60%'
    }
})
