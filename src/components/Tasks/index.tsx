import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Animated, Easing, TouchableOpacity } from 'react-native'
import { palette } from '../../theme'
import { typography } from '../../theme/fonts'
import { InterfaceTask, Status } from '../../types/tasks'
import Overdue from '../../../assets/task-icons/overdue'
import DoneSvg from '../../../assets/task-icons/done'
import { isTaskOverdue } from '../../utils/isTaskOverdue'
import { put } from '../../api/put'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AppStackParamList } from '../../navigators'
import { getBackgroundColor, getText } from '../../utils/taskDataUi'

type TaskCardProps = {
    task: InterfaceTask
}

const getIcon = (status: Status) => {
    switch (status) {
        case Status.Completed:
            return DoneSvg
        case Status.Overdue:
            return Overdue
        default:
            return Overdue
    }
}

export const TaskCard: React.FC<
    TaskCardProps & { onStatusUpdate: (taskId: string, newStatus: Status) => void }
> = ({ task, onStatusUpdate }) => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>()

    const borderColorAnim = useRef(new Animated.Value(0)).current

    const startBorderColorAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(borderColorAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false
                }),
                Animated.timing(borderColorAnim, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false
                })
            ])
        ).start()
    }

    const interpolatedBorderColor = borderColorAnim.interpolate({
        inputRange: [0, 0.5],
        outputRange: ['rgba(0, 0, 0, 0)', palette.pastelOrange] // From transparent to orange
    })

    const animatedBorderStyle = {
        borderColor: interpolatedBorderColor,
        borderWidth: 2,
        borderRadius: 20
    }

    let updatedStatus = task.status

    // console.log('task: ', task)

    if (isTaskOverdue(task) && task.status !== Status.Overdue && task.status !== Status.Completed) {
        onStatusUpdate(task._id, Status.Overdue)
        updatedStatus = Status.Overdue
        console.log('Task is overdue! was due on: ', task.dueDate)

        const dataToUpdate = {
            status: Status.Overdue
        }

        const taskUpdate = {
            _id: task._id,
            isUpdating: true
        }

        put('api/tasks/edit', dataToUpdate, taskUpdate)
    }

    useEffect(() => {
        if (updatedStatus === Status.Overdue) {
            startBorderColorAnimation()
        }
    }, [updatedStatus])

    const backgroundColor = getBackgroundColor(updatedStatus)
    const Icon = getIcon(updatedStatus)

    const finalContainerStyle = [
        styles.container, // Base style
        { backgroundColor }, // Apply the background color
        updatedStatus === Status.Overdue && animatedBorderStyle
    ]

    const text = getText(updatedStatus, task.dueDate ? task.dueDate.toString() : '')

    const navigateToTaskScreen = (task: InterfaceTask) => {
        console.log('TEST', task)

        const taskData = {
            ...task,
            updatedTextForDueBefore: text,
            backgroundColorUI: backgroundColor
        }

        navigation.navigate('InformationalTask', taskData)
    }

    return (
        <TouchableOpacity onPress={() => navigateToTaskScreen(task)}>
            <Animated.View style={finalContainerStyle}>
                <View style={styles.verticalLine} />
                <View style={styles.taskInfo}>
                    <Text style={styles.taskName}>{task.title}</Text>
                </View>
                <View style={styles.status}>
                    {updatedStatus !== Status.Pending ? <Icon /> : <View style={styles.circle} />}
                    <Text style={styles.statusText}>{text}</Text>
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        width: '90%',
        alignSelf: 'center',
        paddingLeft: '3%',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: '5%',
        paddingVertical: '4%'
    },
    circle: {
        width: 25,
        height: 25,
        borderColor: '#FFFF',
        borderRadius: 100,
        borderWidth: 1.2
    },
    status: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: '10%'
    },
    statusText: {
        fontSize: 10,
        fontFamily: typography.tertiary,
        color: '#FFFF',
        width: '80%',
        textAlign: 'center',
        position: 'relative',
        top: '5%'
    },
    taskInfo: {
        width: '70%',
        justifyContent: 'center',
        paddingLeft: '3%'
    },
    taskName: {
        fontSize: 14,
        fontFamily: typography.tertiary,
        color: '#FFFF',
        textAlign: 'left'
    },
    verticalLine: {
        borderLeftWidth: 5,
        borderLeftColor: '#FFFF',
        borderRadius: 20,
        height: '100%'
    }
})
