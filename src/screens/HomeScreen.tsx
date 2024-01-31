import { FlatList, View } from 'react-native'
import React from 'react'
import { AppStackParamList, AppStackScreenProps } from '../navigators'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { FamilyCard } from '../components/FamilyCard'
import { TaskCard } from '../components/Tasks'
import { InterfaceTask, Status } from '../types/tasks'
import { updateTasks } from '../redux/tasks/tasksActions'
import { NoTasks } from '../components/EmptyTasks'
import { UserBar } from '../components/UserBar'

interface HomeScreenProps extends AppStackScreenProps<'HomeScreen'> {}

const statusOrder: { [key in Status]: number } = {
    [Status.Overdue]: 1,
    [Status.Pending]: 2,
    [Status.Completed]: 3,
    [Status.InProgress]: 0,
    [Status.All]: -1
}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
    const { user } = useSelector((state: any) => state.user)

    const { family } = useSelector((state: any) => state.family)

    const { filteredTasks } = useSelector((state: any) => state.tasks)

    const navigation = useNavigation<NavigationProp<AppStackParamList>>()

    // Sort tasks based on the defined status order
    const sortedTasks = React.useMemo(() => {
        const today = new Date()
        today.setHours(0, 0, 0, 0) // Reset time to the start of the day

        const tasksForToday = filteredTasks.filter((task: { dueDate: string | number | Date }) => {
            const taskDueDate = new Date(task.dueDate)
            taskDueDate.setHours(0, 0, 0, 0) // Reset time for accurate date comparison
            return taskDueDate.getTime() === today.getTime()
        })

        return tasksForToday.sort((a: { status: Status }, b: { status: Status }) => {
            const orderA = statusOrder[a.status as Status]
            const orderB = statusOrder[b.status as Status]
            return orderA - orderB
        })
    }, [filteredTasks])

    const dispatch = useDispatch()

    const handleStatusUpdate = (taskId: string, newStatus: Status) => {
        // Find the task and update its status
        const updatedTasks = filteredTasks.map((task: { _id: string }) =>
            task._id === taskId ? { ...task, status: newStatus } : task
        )

        // Dispatch an action to update tasks in your global state

        dispatch(updateTasks(updatedTasks))
    }

    const renderItems = ({ item }: { item: InterfaceTask }) => {
        return <TaskCard task={item} onStatusUpdate={handleStatusUpdate} />
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: '15%' }}>
            <UserBar family={family} user={user} />
            <FamilyCard family={family} />

            <View style={{ width: '100%', height: '57%' }}>
                <FlatList
                    data={sortedTasks}
                    renderItem={renderItems}
                    keyExtractor={(item) => item._id}
                    style={{ marginTop: '5%' }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<NoTasks navigation={navigation} />}
                />
            </View>
        </View>
    )
}
