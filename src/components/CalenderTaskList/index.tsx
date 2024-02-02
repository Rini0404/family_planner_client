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
            }

            navigation.navigate('InformationalTask', taskData)
        }

        const handleBackgroundColor = () => {
            switch (item.status) {
                case Status.Completed:
                    return styles.taskIndicatorCompleted
                case Status.Pending:
                    return styles.taskIndicatorPending
                case Status.Overdue:
                    return styles.taskIndicatorOverdue
                default:
                    return styles.taskIndicatorPending
            }
        }
        return (
            <TouchableOpacity onPress={handlePress} key={item._id} style={styles.taskRow}>
                <View style={handleBackgroundColor()}>
                    <Text style={styles.taskText}>{item.title}</Text>
                    <View style={styles.line}></View>
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

    const taskText = filteredTasks.length === 1 ? 'Task' : 'Tasks'

    return (
        <View style={styles.container}>
            <View style={styles.CurrentDaysTasks}>
                <Text style={styles.CurrentDaysTitle}>{displayWhatDayItIs()}</Text>
                <Text style={styles.CurrentDaysTitle}>
                    {filteredTasks.length} {taskText}
                </Text>
            </View>
            <Line />
            <FlatList
                data={filteredTasks}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
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
        padding: 5
    },
    line: {
        width: '90%'
    },
    taskText: {
        fontSize: 14,
        fontFamily: typography.quaternary,
        textAlign: 'center',
        padding: 5
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
        height: 90,
        borderRadius: 20,
        backgroundColor: palette.boxesPastelGreen,
        justifyContent: 'center'
    },
    taskIndicatorPending: {
        height: 90,
        borderRadius: 20,
        backgroundColor: palette.pastelNavbars,
        justifyContent: 'center'
    },
    taskIndicatorOverdue: {
        height: 90,
        borderRadius: 20,
        backgroundColor: palette.pastelOrange,
        justifyContent: 'center'
    },
    taskRow: {
        width: '30%',
        margin: 5
    }
})
