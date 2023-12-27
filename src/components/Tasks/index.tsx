import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Animated, Easing } from 'react-native'
import { palette } from '../../theme'
import { typography } from '../../theme/fonts'
import { InterfaceTask, Status } from '../../types/tasks'
import Overdue from '../../../assets/task-icons/overdue'
import DoneSvg from '../../../assets/task-icons/done'
import { isTaskOverdue } from '../../utils/isTaskOverdue'
import { put } from '../../api/put'

type TaskCardProps = {
    task: InterfaceTask
}

const getBackgroundColor = (status: Status) => {
    switch (status) {
        case Status.Pending:
            return palette.pastelNavbars
        case Status.Completed:
            return palette.boxesPastelGreen
        case Status.Overdue:
            return palette.pastelOrange
        default:
            return palette.pastelNavbars
    }
}

const getText = (status: Status, time: string) => {
    switch (status) {
        case Status.Pending:
            return `Due before: ${time}`
        case Status.Completed:
            return 'Done.'
        case Status.Overdue:
            return 'Overdue!'
        default:
            return 'Pending'
    }
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

    if (isTaskOverdue(task) && task.status !== Status.Overdue) {
        onStatusUpdate(task._id, Status.Overdue)
        updatedStatus = Status.Overdue

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
        updatedStatus === Status.Overdue && animatedBorderStyle // Apply animated border style if overdue
    ]

    const dueOn = new Date(task.dueDate ?? '').toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
    })

    const text = getText(updatedStatus, dueOn)

    return (
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
