import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Modal } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { CustomPicker } from '../Picker'
import { DatePickerAndTime } from '../DatePicker'
import { TimePicker } from '../TimePicker'
import { post } from '../../api/post'
import LoadingOverlay from '../LoadingOverlay'
import { TaskResponseType } from '../../types/tasks'
import { addTask } from '../../redux/tasks/tasksActions'

export const CreateTask = () => {
    const dispatch = useDispatch()
    const { family } = useSelector((state: any) => state.family)
    const [isLoading, setIsLoading] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [assignedTo, setAssignedTo] = useState('')
    const [dueDate, setDueDate] = useState<Date | null>(new Date())
    const [dueTime, setDueTime] = useState<Date | null>(new Date())

    const familyId = family._id

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            if (!title || !description || !assignedTo || !dueDate || !dueTime) {
                throw new Error('Please fill out all fields')
            }

            // Extracting date components
            const year = dueDate.getFullYear()
            const month = dueDate.getMonth() // getMonth() returns 0-11
            const day = dueDate.getDate()

            // Extracting time components
            const hours = dueTime.getHours()
            const minutes = dueTime.getMinutes()

            // Combining date and time into a single local Date object
            const combinedDateTime = new Date(year, month, day, hours, minutes)

            // Adjust for local timezone offset to get UTC
            const utcDueDate = new Date(
                combinedDateTime.getTime() - combinedDateTime.getTimezoneOffset() * 60000
            ).toISOString()

            const taskData = {
                title,
                description,
                assignedTo,
                dueDate: utcDueDate,
                familyId
            }

            console.log('For submit data: ', taskData)
            // Here you would send `taskData` to your server or API endpoint

            const response = (await post('api/tasks/create', taskData)) as TaskResponseType

            console.log('response: ', response)

            if (response.message && !response.data) {
                throw new Error(response.message)
            }

            alert('Task created successfully!')
            dispatch(addTask(response.data))

            setTitle('')
            setDescription('')
            setAssignedTo('')
            setDueDate(new Date())
            setDueTime(new Date())
        } catch (error) {
            console.log('Error creating task: ', error)
            alert((error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <View style={styles.container}>
                <Text>Create a Task</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Title'
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Description'
                    value={description}
                    onChangeText={setDescription}
                />
                <CustomPicker
                    options={family.members}
                    selectedValue={assignedTo}
                    onValueChange={setAssignedTo}
                />

                <View
                    style={{
                        paddingTop: '5%'
                    }}
                >
                    <DatePickerAndTime selectedValue={dueDate} onDateChange={setDueDate} />
                    <TimePicker selectedValue={dueTime} onTimeChange={setDueTime} />
                </View>

                <View style={styles.timeDateData}>
                    <Text>Due Date: {dueDate?.toLocaleDateString()}</Text>
                    <Text>
                        Due Time:{' '}
                        {dueTime?.toTimeString().split(':')[0] +
                            ':' +
                            dueTime?.toTimeString().split(':')[1]}
                    </Text>
                </View>

                <View
                    style={{
                        paddingTop: '30%'
                    }}
                >
                    <Button title='Create Task' onPress={handleSubmit} />
                </View>
            </View>
            {isLoading && <LoadingOverlay isVisible={isLoading} />}
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    timeDateData: {
        paddingTop: '5%'
    },
    picker: {
        width: '100%',
        height: '10%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4
    },
    datePickerButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 4,
        marginBottom: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
})
