import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Keyboard, Platform } from 'react-native'
import { palette } from '../../theme'
import { typography } from '../../theme/fonts'
import CalendarSvg from '../../../assets/navbar-icons/calendar'
import TimeSvg from '../../../assets/navbar-icons/time'

type TextInputPostProps = {
    openedDate: boolean
    openedTime: boolean
    setOpenedDate: (openedDate: boolean) => void
    setOpenedTime: (openedTime: boolean) => void
}

export const DateTimeButtons: React.FC<TextInputPostProps> = ({
    openedDate,
    openedTime,
    setOpenedDate,
    setOpenedTime
}) => {
    const [iconSize, setIconSize] = useState(55)

    const [textSize, setTextSize] = useState(18)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            if (Platform.OS === 'android') {
                setIconSize(35)
                setTextSize(14)
            }
        })
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            if (Platform.OS === 'android') {
                setIconSize(55)
                setTextSize(18)
            }
        })

        return () => {
            keyboardDidShowListener.remove()
            keyboardDidHideListener.remove()
        }
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.buttonsRow}>
                <TouchableOpacity
                    onPress={() => {
                        setOpenedDate(true)
                        setOpenedTime(false)
                    }}
                    style={styles.buttons}
                >
                    <CalendarSvg width={iconSize} height={iconSize} />
                    <Text
                        style={{
                            ...styles.buttonText,
                            fontSize: textSize
                        }}
                    >
                        Due Date
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setOpenedDate(false)
                        setOpenedTime(true)
                    }}
                    style={styles.buttons}
                >
                    <TimeSvg width={iconSize} height={iconSize} />
                    <Text
                        style={{
                            ...styles.buttonText,
                            fontSize: textSize
                        }}
                    >
                        Due Time
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: '15%',
        marginTop: '5%',
        alignItems: 'center'
    },
    buttonText: {
        paddingTop: '5%',
        fontFamily: typography.tertiary,
        color: '#fff'
    },
    buttons: {
        backgroundColor: palette.boxesPastelGreen,
        width: '48%',
        height: '100%',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%'
    },
    buttonsRow: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
