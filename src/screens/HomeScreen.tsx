import { FlatList, StatusBar, Text, View } from 'react-native'
import React from 'react'
import { AppStackParamList, AppStackScreenProps } from '../navigators'
import { useSelector } from 'react-redux'
import { remove } from '../utils/storage'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { FamilyCard } from '../components/FamilyCard'
import { TaskCard } from '../components/Tasks'
import { InterfaceTask, Status } from '../types/tasks'

interface HomeScreenProps extends AppStackScreenProps<'HomeScreen'> {}

const statusOrder: { [key in Status]: number } = {
    [Status.Overdue]: 1,
    [Status.Pending]: 2,
    [Status.Completed]: 3,
    [Status.InProgress]: 0
}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
    const { user } = useSelector((state: any) => state.user)

    const { family } = useSelector((state: any) => state.family)

    const { tasks } = useSelector((state: any) => state.tasks)

    const navigation = useNavigation<NavigationProp<AppStackParamList>>()

    const clearStorage = async () => {
        await remove('token')
        navigation.navigate('Initial')
    }

    // Sort tasks based on the defined status order
    const sortedTasks = React.useMemo(() => {
        return [...tasks].sort((a, b) => {
            const orderA = statusOrder[a.status as Status]
            const orderB = statusOrder[b.status as Status]
            return orderA - orderB
        })
    }, [tasks])

    const renderItems = ({ item }: { item: InterfaceTask }) => {
        return <TaskCard task={item} />
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: '15%' }}>
            <Text onPress={clearStorage}>Logout</Text>
            <FamilyCard family={family} user={user} />

            <FlatList
                data={sortedTasks}
                renderItem={renderItems}
                keyExtractor={(item) => item._id}
                style={{ width: '100%', marginTop: '5%' }}
            />
        </View>
    )
}
