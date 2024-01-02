import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { InterfaceTask, Status, TaskResponseType } from '../types/tasks'
import BackArrow from '../components/BackArrow'
import { useNavigation } from '@react-navigation/native'
import { typography } from '../theme/fonts'
import { BackDrop } from '../components/BackDrop'
import { palette } from '../theme'
import { put } from '../api/put'
import { useDispatch } from 'react-redux'
import { deleteTask, updateEditedTask } from '../redux/tasks/tasksActions'
import { getBackgroundColor, getText } from '../utils/taskDataUi'
import { post } from '../api/post'
import { deleteInDb } from '../api/delete'
import { confirmAction } from '../utils/confirmActionAlert'
import LoadingOverlay from '../components/LoadingOverlay'

// Extend InterfaceTask with additional properties specific to your component
type ExtendedTask = InterfaceTask & {
    backgroundColorUI: string
    updatedTextForDueBefore: string
}

// Update InformationalTaskProps to use ExtendedTask for params
type InformationalTaskProps = {
    route: {
        params: ExtendedTask
    }
}

const generateTextStatus = (status: string) => {
    switch (status) {
        case Status.Pending:
            return 'In Progress'
        case Status.Completed:
            return 'Done'
        case Status.Overdue:
            return 'In Progress'
        default:
            return 'In Progress'
    }
}

export const InformationalTask: React.FC<InformationalTaskProps> = ({ route }) => {
    const { params } = route ?? {}

    const navigation = useNavigation()

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = React.useState(false)

    const [backgroundColor, setBackgroundColor] = React.useState(params.backgroundColorUI)

    const [taskStatus, setTaskStatus] = React.useState(params.status)

    const [statusText, setStatusText] = React.useState(params.updatedTextForDueBefore)

    const [generateStatusText, setGenerateStatusText] = React.useState(
        generateTextStatus(params.status)
    )

    const handleUpdateTask = async (status: Status) => {
        setIsLoading(true)
        try {
            const response = (await put(
                `api/tasks/edit`,
                {
                    status: status
                },
                { isUpdating: true, _id: params._id }
            )) as TaskResponseType

            if (response.message && !response.data) {
                throw new Error(response.message)
            }

            // update task in redux
            setTaskStatus(status)
            dispatch(updateEditedTask(response.data))

            console.log('Response from updating task', response)
        } catch (error) {
            console.log('Error in updating task', error)
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        const text = getText(taskStatus, params.dueDate ? params.dueDate.toString() : '')
        setStatusText(text)

        const backgroundColor = getBackgroundColor(taskStatus)
        setBackgroundColor(backgroundColor)

        const generateStatusText = generateTextStatus(taskStatus)
        setGenerateStatusText(generateStatusText)
    }, [taskStatus, backgroundColor, generateStatusText])

    const handleDeleteTask = async (id: string) => {
        setIsLoading(true)
        try {
            // First confirmation
            const firstConfirm = await confirmAction('Are you sure you want to delete this task?')
            if (!firstConfirm) return

            const response = (await deleteInDb(`api/tasks/delete`, id)) as TaskResponseType

            console.log('Response from deleting task', response)
            if (response.message && !response.data) {
                throw new Error(response.message)
            }

            // update task in redux
            dispatch(deleteTask(id))

            navigation.goBack()
        } catch (error) {
            console.log('Error in deleting task', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.arrow}>
                    <BackArrow onPress={() => navigation.goBack()} />
                </View>

                <View style={styles.taskHeader}>
                    <Text style={styles.taskName}>{params.title}</Text>
                </View>

                <BackDrop color='#fff'>
                    <View style={styles.backDropContainer}>
                        <View style={styles.assignedCard}>
                            <Text style={styles.assignedBy}>Assigned by: {'\n'} Natalie Roman</Text>
                            <Text style={{ ...styles.assignedBy, paddingTop: '3%' }}>
                                Status: {generateStatusText}
                            </Text>
                            <View
                                style={{
                                    ...styles.statusBox,
                                    backgroundColor: backgroundColor
                                }}
                            >
                                <Text style={styles.dueText}>{statusText}</Text>
                            </View>
                        </View>

                        <View style={styles.additionalDetailsContainer}>
                            <Text style={styles.additionalDetailsText}>Additional Details: </Text>
                            <Text style={styles.additionalDescriptions}>{params.description}</Text>
                        </View>

                        {taskStatus !== Status.Completed && (
                            <View style={styles.updateTaskContainer}>
                                <Text style={styles.updateTaskText}>Finished with this task?</Text>
                                <TouchableOpacity
                                    style={styles.doneButton}
                                    onPress={() => {
                                        handleUpdateTask(Status.Completed)
                                    }}
                                >
                                    <Text style={styles.markAsDone}>Mark as done</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {taskStatus === Status.Completed && (
                            <View style={styles.updateTaskContainer}>
                                <Text style={styles.updateTaskText}>Is this not done?</Text>
                                <TouchableOpacity
                                    style={{
                                        ...styles.doneButton,
                                        backgroundColor: palette.pastelOrange
                                    }}
                                    onPress={() => {
                                        handleUpdateTask(Status.Pending)
                                    }}
                                >
                                    <Text style={styles.markAsDone}>Undo as done</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {taskStatus === Status.Completed && (
                            <View style={styles.updateTaskContainer}>
                                <Text style={styles.updateTaskText}>
                                    Do you want to delete this task?
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        ...styles.doneButton,
                                        backgroundColor: palette.angry500
                                    }}
                                    onPress={() => {
                                        handleDeleteTask(params._id)
                                    }}
                                >
                                    <Text style={styles.markAsDone}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </BackDrop>
            </View>
            {isLoading && <LoadingOverlay isVisible={isLoading} />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '90%',
        width: '100%',
        bottom: 0,
        position: 'absolute'
    },
    markAsDone: {
        fontSize: 18,
        fontFamily: typography.quaternary,
        textAlign: 'center',
        color: '#FFFF'
    },
    doneButton: {
        width: '90%',
        alignSelf: 'center',
        padding: '3%',
        borderRadius: 15,
        justifyContent: 'center',
        backgroundColor: palette.boxesPastelGreen,
        marginTop: '1%'
    },
    updateTaskContainer: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '8%'
    },
    updateTaskText: {
        fontSize: 20,
        fontFamily: typography.tertiary,
        textAlign: 'center'
    },
    backDropContainer: {
        height: '100%',
        width: '100%'
    },
    additionalDescriptions: {
        fontSize: 16,
        fontFamily: typography.quaternary,
        textAlign: 'center',
        marginTop: '3%'
    },
    additionalDetailsContainer: {
        height: 'auto',
        alignSelf: 'center',
        width: '90%',
        backgroundColor: palette.pastelBackground,
        borderRadius: 25,
        marginTop: '5%',
        borderWidth: 1,
        borderColor: palette.pastelNavbars,
        padding: '5%'
    },
    additionalDetailsText: {
        fontSize: 18,
        fontFamily: typography.quaternary,
        textAlign: 'center'
    },
    dueText: {
        fontSize: 20,
        fontFamily: typography.tertiary,
        textAlign: 'center',
        color: '#FFFF'
    },
    statusBox: {
        height: '25%',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        marginTop: '5%',
        justifyContent: 'center'
    },
    assignedCard: {
        flex: 0.45,
        alignSelf: 'center',
        width: '90%',
        backgroundColor: palette.pastelBackground,
        borderRadius: 25,
        marginTop: '5%',
        borderWidth: 1,
        borderColor: palette.pastelNavbars
    },
    assignedBy: {
        fontSize: 20,
        width: '80%',
        marginTop: '5%',
        alignSelf: 'center',
        fontFamily: typography.quaternary,
        textAlign: 'center'
    },
    arrow: {
        marginLeft: '5%'
    },
    taskHeader: {
        marginTop: '3%',
        width: '100%'
    },
    taskName: {
        fontSize: 20,
        fontFamily: typography.quaternary,
        textAlign: 'center',
        width: '75%',
        alignSelf: 'center'
    }
})
