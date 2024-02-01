import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../navigators'
import { SwipableMonthYear } from '../components/SwipyMonthYear'
import { typography } from '../theme/fonts'
import { weekDays } from '../constants/dates'
import { palette } from '../theme'
import { MainCalendar } from '../components/MainCalendar'
import { useSelector } from 'react-redux'
import { CalenderTaskList } from '../components/CalenderTaskList'

interface CalenderScreenProps extends AppStackScreenProps<'CalenderScreen'> {}

export const CalenderScreen: React.FC<CalenderScreenProps> = () => {
    const [currentDate, setCurrentDate] = React.useState(new Date())
    const { tasks } = useSelector((state: any) => state.tasks)

    return (
        <View style={styles.container}>
            <SwipableMonthYear currentDate={currentDate} setCurrentDate={setCurrentDate} />

            <View style={styles.weekDaysView}>
                {weekDays.map((dayName, index) => (
                    <Text key={index} style={styles.weekDay}>
                        {dayName}
                    </Text>
                ))}
            </View>
            <MainCalendar tasks={tasks} currentDate={currentDate} setCurrentDate={setCurrentDate} />
            <CalenderTaskList tasks={tasks} currentDate={currentDate} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? '15%' : '7%',
    },
    weekDaysView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        alignSelf: 'center',
        paddingVertical: '3%',
        backgroundColor: palette.boxesPastelGreen,
        borderRadius: 5,
        marginBottom: '2%'
    },
    weekDay: {
        width: '14.28%',
        textAlign: 'center',
        fontFamily: typography.quaternary,
        color: '#fff'
    }
})
