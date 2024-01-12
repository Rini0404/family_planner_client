import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { InterfaceTask, Status } from '../../types/tasks'
import { palette } from '../../theme'
import Line from '../Line'
import { typography } from '../../theme/fonts'
import { extractTaskDates, getTaskIndicatorStyle } from '../../utils/daysUtils'
import { NoListCalendar } from '../NoTaskCalendar'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AppStackParamList } from '../../navigators'

type CalenderTaskListProps = {
    currentDate: Date
    tasks: InterfaceTask[]
}

export const CalenderTaskList: React.FC<CalenderTaskListProps> = ({ tasks, currentDate }) => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>()

    const [taskStatusByDate, setTaskStatusByDate] = useState<Map<string, string>>(new Map())
    const [filteredTasks, setFilteredTasks] = useState<InterfaceTask[]>([])

    useEffect(() => {
        const extractedDates = extractTaskDates(tasks)
        setTaskStatusByDate(extractedDates)
    }, [tasks])

    useEffect(() => {
        filterTasksByDate()
    }, [currentDate, tasks])

    const filterTasksByDate = () => {
        const selectedDateString = currentDate.toISOString().split('T')[0]
        const filtered = tasks.filter((task) => {
            const taskDate = task.dueDate
                ? new Date(task.dueDate).toISOString().split('T')[0]
                : null
            return taskDate === selectedDateString
        })
        setFilteredTasks(filtered)
    }

    const renderItem = ({ item, index }: { item: InterfaceTask; index: number }) => {
        const handlePress = () => {
            const taskData = {
                ...item,
                updatedTextForDueBefore: 'text'
                // backgroundColorUI: backgroundColor
            }

            navigation.navigate('InformationalTask', taskData)
        }

        return (
            <TouchableOpacity onPress={handlePress} key={index} style={styles.taskRow}>
                <View
                    style={getTaskIndicatorStyle(
                        item.dueDate ? new Date(item.dueDate) : undefined,
                        taskStatusByDate,
                        styles
                    )}
                />
                <View style={styles.taskDetails}>
                    <Text style={styles.taskText}>
                        {item.title}. {item.description}
                    </Text>
                    <View style={styles.line}>
                        <Line />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const displayWhatDayItIs = () => {
        // if today say today
        const today = new Date()
        const todayString = today.toISOString().split('T')[0]
        const selectedDateString = currentDate.toISOString().split('T')[0]
        if (todayString === selectedDateString) {
            return 'Today'
        }

        return currentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.CurrentDaysTasks}>
                <Text style={styles.CurrentDaysTitle}>{displayWhatDayItIs()}</Text>
                <Text style={styles.CurrentDaysTitle}>{filteredTasks.length} Tasks</Text>
            </View>
            <Line />
            <FlatList
                data={filteredTasks}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                // empty list component
                ListEmptyComponent={() => <NoListCalendar />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: '2%',
        height: '38%',
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
