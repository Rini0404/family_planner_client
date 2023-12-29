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
import { updateEditedTask } from '../redux/tasks/tasksActions'

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
            return 'Not done'
        default:
            return 'In Progress'
    }
}

export const InformationalTask: React.FC<InformationalTaskProps> = ({ route }) => {
    const { params } = route ?? {}

    const navigation = useNavigation()

    const backgroundColor = params.backgroundColorUI

    const dispatch = useDispatch()

    const handleUpdateTask = async () => {
        console.log('Task Updated')
        try {
            const response = (await put(
                `api/tasks/edit`,
                {
                    status: Status.Completed
                },
                { isUpdating: true, _id: params._id }
            )) as TaskResponseType

            if (response.message && !response.data) {
                throw new Error(response.message)
            }

            alert('Task Updated!')
            // update task in redux
            dispatch(updateEditedTask(response.data))

            console.log('Response from updating task', response)
        } catch (error) {
            console.log('Error in updating task', error)
        }
    }

    return (
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
                            Status: {generateTextStatus(params.status)}
                        </Text>
                        <View
                            style={{
                                ...styles.statusBox,
                                backgroundColor: backgroundColor
                            }}
                        >
                            <Text style={styles.dueText}>{params.updatedTextForDueBefore}</Text>
                        </View>
                    </View>

                    <View style={styles.additionalDetailsContainer}>
                        <Text style={styles.additionalDetailsText}>Additional Details: </Text>
                        <Text style={styles.additionalDescriptions}>{params.description}</Text>
                    </View>

                    {params.status !== Status.Completed && (
                        <View style={styles.updateTaskContainer}>
                            <Text style={styles.updateTaskText}>Finished with this task?</Text>
                            <TouchableOpacity
                                style={styles.doneButton}
                                onPress={() => {
                                    handleUpdateTask()
                                }}
                            >
                                <Text style={styles.markAsDone}>Mark as done</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </BackDrop>
        </View>
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
        backgroundColor: palette.boxesPastelGreen
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
        flex: 0.4,
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
