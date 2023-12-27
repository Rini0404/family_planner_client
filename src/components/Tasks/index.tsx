import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { palette } from '../../theme'
import { typography } from '../../theme/fonts'
import { InterfaceTask, Status } from '../../types/tasks'
import Overdue from '../../../assets/task-icons/overdue'
import DoneSvg from '../../../assets/task-icons/done'
type TaskCardProps = {
    task: InterfaceTask
}

const getBackgroundColor = (status: Status) => {
    switch (status) {
        case Status.Pending:
            return palette.pastelNavbars
        case Status.Completed: // Replace with your actual status
            return palette.boxesPastelGreen
        case Status.Overdue:
            return palette.pastelOrange
        default:
            return palette.pastelNavbars
    }
}

const getText = (status: Status) => {
    switch (status) {
        case Status.Pending:
            return 'Due before: '
        case Status.Completed: // Replace with your actual status
            return 'Done.'
        case Status.Overdue:
            return 'Overdue!'
        default:
            return 'Pending'
    }
}

const getIcon = (status: Status) => {
    switch (status) {
        case Status.Completed: // Replace with your actual status
            return DoneSvg
        case Status.Overdue:
            return Overdue
        default:
            return Overdue
    }
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const backgroundColor = getBackgroundColor(task.status)
    const text = getText(task.status)
    const Icon = getIcon(task.status)

    return (
        <View style={{ ...styles.container, backgroundColor }}>
            <View style={styles.verticalLine} />
            <View style={styles.taskInfo}>
                <Text style={styles.taskName}>{task.title}</Text>
            </View>
            <View style={styles.status}>
                {task.status !== Status.Pending ? <Icon /> : <View style={styles.circle} />}
                <Text style={styles.statusText}>{text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        width: '90%',
        height: '80%',
        alignSelf: 'center',
        paddingLeft: '3%',
        alignItems: 'center',
        flexDirection: 'row'
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
        height: '70%'
    }
})
