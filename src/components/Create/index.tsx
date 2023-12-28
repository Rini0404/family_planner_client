import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Modal } from 'react-native'
import { useSelector } from 'react-redux'
import { CustomPicker } from '../Picker'
import { DatePickerAndTime } from '../DatePicker'
import { TimePicker } from '../TimePicker'

export const CreateTask = () => {
    const { user } = useSelector((state: any) => state.user)
    const { family } = useSelector((state: any) => state.family)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [assignedTo, setAssignedTo] = useState('')

    const familyId = family._id

    const handleSubmit = () => {
        // Convert local time to UTC
        const dueDate = new Date()
        const utcDueDate = new Date(
            dueDate.getTime() - dueDate.getTimezoneOffset() * 60000
        ).toISOString()

        const taskData = {
            title,
            description,
            assignedTo,
            dueDate: utcDueDate, // Use the converted UTC time
            familyId
        }

        console.log(taskData)
        // Here you would send `taskData` to your server or API endpoint
    }

    return (
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
                    paddingTop: '30%'
                }}
            >
                <DatePickerAndTime />
            </View>

            <TimePicker />

            <View
                style={{
                    paddingTop: '30%'
                }}
            >
                <Button title='Create Task' onPress={handleSubmit} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
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
