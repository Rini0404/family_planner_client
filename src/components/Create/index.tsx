import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform, Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { CustomPicker } from '../Picker'
import { post } from '../../api/post'
import { TaskResponseType } from '../../types/tasks'
import { addTask } from '../../redux/tasks/tasksActions'
import { palette } from '../../theme'
import { typography } from '../../theme/fonts'
import { TextInputPost } from '../TextInputPost'
import { TextDescription } from '../TextDescriptionComponent'
import { DateTimeButtons } from '../DateAndTimeButtons'
import { DatePickerAndTime } from '../DatePicker'
import { TimePicker } from '../TimePicker'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppStackParamList } from '../../navigators'
import LoadingOverlay from '../LoadingOverlay'

export const CreateTask = () => {
    const navigation = useNavigation<StackNavigationProp<AppStackParamList>>()
    const dispatch = useDispatch()
    const { family } = useSelector((state: any) => state.family)
    const [isLoading, setIsLoading] = useState(false)
    const [openPicker, setOpenPicker] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [assignedTo, setAssignedTo] = useState<{ _id: string; firstName: string } | null>(null)
    const [dueDate, setDueDate] = useState<Date | null>()
    const [dueTime, setDueTime] = useState<Date | null>()

    const familyId = family._id

    const [openedDate, setOpenedDate] = useState(false)
    const [openedTime, setOpenedTime] = useState(false)

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
                assignedTo: assignedTo ? assignedTo._id : null,
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

            dispatch(addTask(response.data))

            setTitle('')
            setDescription('')
            setAssignedTo(null)
            setDueDate(new Date())
            setDueTime(new Date())
            navigation.navigate('HomeScreen')
        } catch (error) {
            console.log('Error creating task: ', error)
            alert((error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    const [textSize, setTextSize] = useState(18)

    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            if (Platform.OS === 'android') {
                setTextSize(14)
            }
        })
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            if (Platform.OS === 'android') {
                setTextSize(18)
            }
        })

        return () => {
            keyboardDidShowListener.remove()
            keyboardDidHideListener.remove()
        }
    }, [])

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.chooseMember} onPress={() => setOpenPicker(true)}>
                    <View style={styles.memberText}>
                        <Text style={styles.memberChosenText}>
                            <Text style={styles.memberChosenText}>
                                {assignedTo ? assignedTo.firstName : 'Choose Member'}
                            </Text>
                        </Text>
                    </View>
                    <Text
                        style={{
                            paddingRight: '3%',
                            fontSize: 18,
                            fontFamily: typography.tertiary,
                            color: '#fff'
                        }}
                    >
                        ▼
                    </Text>
                </TouchableOpacity>
                <TextInputPost
                    placeholder='What is the task?'
                    value={title}
                    onChangeText={setTitle}
                />
                <TextDescription
                    placeholder='Description'
                    value={description}
                    onChangeText={setDescription}
                />
                <DateTimeButtons
                    openedDate={openedDate}
                    setOpenedDate={setOpenedDate}
                    openedTime={openedTime}
                    setOpenedTime={setOpenedTime}
                />
                <DatePickerAndTime
                    selectedValue={dueDate}
                    onDateChange={setDueDate}
                    openedDate={openedDate}
                    setOpenedDate={setOpenedDate}
                />
                <TimePicker
                    selectedValue={dueTime}
                    onTimeChange={setDueTime}
                    openedTime={openedTime}
                    setOpenedTime={setOpenedTime}
                    dateChose={dueDate}
                />

                <View style={styles.timeData}>
                    <Text
                        style={{
                            ...styles.dateText,
                            fontSize: textSize
                        }}
                    >
                        Due on:{' '}
                    </Text>
                    <Text
                        style={{
                            ...styles.dateText,
                            fontSize: textSize
                        }}
                    >
                        {dueDate ? dueDate?.toLocaleDateString() : ''} @{' '}
                        {dueTime
                            ? dueTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : ''}
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Create Task</Text>
                </TouchableOpacity>
                <CustomPicker
                    setOpenPicker={setOpenPicker}
                    openPicker={openPicker}
                    options={family.members.map((member: { _id: string; firstName: string }) => ({
                        _id: member._id,
                        firstName: member.firstName
                    }))}
                    onValueChange={(selectedMember) => setAssignedTo(selectedMember)}
                />
            </View>
            {isLoading && <LoadingOverlay isVisible={isLoading} />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '15%',
        alignItems: 'center'
    },
    timeData: {
        marginTop: '5%',
        width: '90%',
        height: '12%',
        borderRadius: 10,
        backgroundColor: palette.pastelNavbars,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateText: {
        fontSize: 20,
        fontFamily: typography.quaternary,
        color: '#fff'
    },
    memberText: {
        paddingLeft: '12%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    memberChosenText: {
        fontSize: 18,
        fontFamily: typography.tertiary,
        color: '#fff'
    },
    chooseMember: {
        backgroundColor: palette.boxesPastelGreen,
        width: '90%',
        height: '8%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
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
    },
    button: {
        backgroundColor: palette.boxesPastelGreen,
        width: '90%',
        height: '8%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%'
    },
    buttonText: {
        fontSize: 20,
        fontFamily: typography.quaternary,
        color: '#fff'
    }
})
