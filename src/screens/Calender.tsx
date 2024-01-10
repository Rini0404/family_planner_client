import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../navigators'
import { SwipableMonthYear } from '../components/SwipyMonthYear'
import { typography } from '../theme/fonts'
import { weekDays } from '../constants/dates'
import { palette } from '../theme'

interface CalenderScreenProps extends AppStackScreenProps<'CalenderScreen'> {}

export const CalenderScreen: React.FC<CalenderScreenProps> = () => {
    return (
        <View style={styles.container}>
            <SwipableMonthYear />
            <View style={styles.weekDaysView}>
                {weekDays.map((dayName, index) => (
                    <Text key={index} style={styles.weekDay}>
                        {dayName}
                    </Text>
                ))}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '15%'
    },
    weekDaysView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        alignSelf: 'center',
        paddingVertical: '2%',
        backgroundColor: palette.pastelLightGreen,
        borderRadius: 5,
        marginBottom: '2%'
    },
    weekDay: {
        width: '14.28%',
        textAlign: 'center',
        fontFamily: typography.primary
    }
})
