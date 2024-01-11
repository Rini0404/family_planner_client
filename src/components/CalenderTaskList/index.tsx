import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { InterfaceTask } from '../../types/tasks'
import { palette } from '../../theme'
import Line from '../Line'
import { typography } from '../../theme/fonts'

type CalenderTaskListProps = {
    currentDate: Date
    tasks: InterfaceTask[]
}

export const CalenderTaskList: React.FC<CalenderTaskListProps> = ({ tasks, currentDate }) => {
    const [days, setDays] = useState<Date[]>([])
    const [taskStatusByDate, setTaskStatusByDate] = useState<Map<string, string>>(new Map())

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

    const getTaskIndicatorStyle = (dueDate: string | null) => {
        const dateString = new Date(dueDate ?? '').toISOString().split('T')[0]
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

    const renderItem = ({ item, index }: { item: InterfaceTask; index: number }) => (
        <View key={index} style={styles.taskRow}>
            <View style={getTaskIndicatorStyle(item.dueDate)} />
            <View style={styles.taskDetails}>
                <Text style={styles.taskText}>
                    {item.title}. {item.description}
                </Text>
                <View style={styles.line}>
                    <Line />
                </View>
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            <View style={styles.CurrentDaysTasks}>
                <Text style={styles.CurrentDaysTitle}>Today</Text>
                <Text style={styles.CurrentDaysTitle}>{tasks.length} Tasks</Text>
            </View>
            <Line />
            <FlatList data={tasks} renderItem={renderItem} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: '2%',
        height: '35%',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20,
        padding: 10
    },
    line: {
        width: '90%'
    },
    taskText: {
        fontSize: 14,
        fontFamily: typography.quaternary
    },
    CurrentDaysTasks: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    CurrentDaysTitle: {
        fontSize: 16,
        fontFamily: typography.quaternary
    },
    taskIndicatorCompleted: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: palette.boxesPastelGreen
    },
    taskIndicatorPending: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: palette.pastelNavbars
    },
    taskIndicatorOverdue: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: palette.pastelOrange
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    taskDetails: {
        marginLeft: 10,
        width: '100%'
    }
})
