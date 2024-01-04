import React from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native'
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
                    <CalendarSvg width={60} height={60} />
                    <Text style={styles.buttonText}>Due Date</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setOpenedDate(false)
                        setOpenedTime(true)
                    }}
                    style={styles.buttons}
                >
                    <TimeSvg width={60} height={60} />
                    <Text style={styles.buttonText}>Due Time</Text>
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
        fontSize: 18,
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
        justifyContent: 'center'
    },
    buttonsRow: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
