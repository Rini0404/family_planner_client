import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { InterfaceTask } from '../../types/tasks'
import { palette } from '../../theme'

type MainCalendarProps = {
    currentDate: Date
    tasks: InterfaceTask[]
}

export const MainCalendar: React.FC<MainCalendarProps> = ({ currentDate, tasks }) => {
    const [days, setDays] = useState<Date[]>([])
    const [taskStatusByDate, setTaskStatusByDate] = useState<Map<string, string>>(new Map())
    const [taskDates, setTaskDates] = useState<Set<string>>(new Set())

    const getMonthDays = (year: number, month: number) => {
        return new Date(year, month, 0).getDate()
    }

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay()
    }

    const extractTaskDates = () => {
        const statusMap = new Map<string, string>()
        tasks.forEach((task) => {
            const taskDate = new Date(task.dueDate ?? '')
            const dateString = taskDate.toISOString().split('T')[0]
            // Assuming that the most urgent status should be shown if multiple tasks fall on the same day
            const existingStatus = statusMap.get(dateString)
            if (
                !existingStatus ||
                task.status === 'overdue' ||
                (task.status === 'pending' && existingStatus !== 'overdue')
            ) {
                statusMap.set(dateString, task.status)
            }
        })
        setTaskStatusByDate(statusMap)
    }

    const getTaskIndicatorStyle = (day: { toISOString: () => string }) => {
        const dateString = day ? day.toISOString().split('T')[0] : ''
        const status = taskStatusByDate.get(dateString)
        switch (status) {
            case 'completed':
                return styles.taskIndicatorCompleted
            case 'pending':
                return styles.taskIndicatorPending
            case 'overdue':
                return styles.taskIndicatorOverdue
            default:
                return null
        }
    }

    const generateDays = () => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        const numDays = getMonthDays(year, month + 1)
        const firstDay = getFirstDayOfMonth(year, month)

        const daysArray = new Array(firstDay).fill(null)

        for (let day = 1; day <= numDays; day++) {
            daysArray.push(new Date(year, month, day))
        }

        while (daysArray.length % 7 !== 0) {
            daysArray.push(null)
        }

        setDays(daysArray)
    }

    useEffect(() => {
        extractTaskDates()
        generateDays()
    }, [currentDate, tasks])

    const isTaskDay = (day: Date) => {
        return day ? taskDates.has(day.toISOString().split('T')[0]) : false
    }

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {days.map((day, index) => (
                    <View key={index} style={styles.day}>
                        <Text>{day ? day.getDate() : ''}</Text>
                        <View style={getTaskIndicatorStyle(day)} />
                    </View>
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
