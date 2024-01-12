import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { InterfaceTask } from '../../types/tasks'
import { palette } from '../../theme'
import { extractTaskDates, generateDays, getTaskIndicatorStyle } from '../../utils/daysUtils'

type MainCalendarProps = {
    currentDate: Date
    tasks: InterfaceTask[]
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>
}

export const MainCalendar: React.FC<MainCalendarProps> = ({
    currentDate,
    tasks,
    setCurrentDate
}) => {
    const [days, setDays] = useState<Date[]>([])
    const [taskStatusByDate, setTaskStatusByDate] = useState<Map<string, string>>(new Map())

    useEffect(() => {
        const extractedDates = extractTaskDates(tasks)
        setTaskStatusByDate(extractedDates)

        const daysGenerated = generateDays(currentDate)
        setDays(daysGenerated)
    }, [currentDate, tasks])

    const handleDayPress = (day: Date) => {
        setCurrentDate(day)
    }

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {days.map((day, index) => (
                    <TouchableOpacity
                        onPress={() => handleDayPress(day)}
                        key={index}
                        style={styles.day}
                    >
                        <Text>{day ? day.getDate() : ''}</Text>
                        <View style={getTaskIndicatorStyle(day, taskStatusByDate, styles)} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '40%',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20,
        padding: 10
    },
    taskIndicatorCompleted: {
        marginTop: 5,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: palette.boxesPastelGreen
    },
    taskIndicatorPending: {
        marginTop: 5,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: palette.pastelNavbars
    },
    taskIndicatorOverdue: {
        marginTop: 5,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: palette.pastelOrange
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    day: {
        width: '14%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    taskIndicator: {
        marginTop: 5,
        width: 6,
        height: 6,
        borderRadius: 3
    }
})
