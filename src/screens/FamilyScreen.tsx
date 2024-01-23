import React from 'react'
import { Text, View, StyleSheet, StatusBar, Platform, FlatList } from 'react-native'
import { AppStackParamList, AppStackScreenProps } from '../navigators'
import { typography } from '../theme/fonts'
import BackArrow from '../components/BackArrow'
import { palette } from '../theme'
import { UserType } from '../types/user'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import CopyIcon from '../../assets/navbar-icons/copy'
import * as Clipboard from 'expo-clipboard'
import { InterfaceTask } from '../types/tasks'

interface FamilyScreenProps extends AppStackScreenProps<'FamilyScreen'> {}

export const FamilyScreen: React.FC<FamilyScreenProps> = () => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>()

    const { family } = useSelector((state: any) => state.family)
    const { tasks } = useSelector((state: any) => state.tasks)

    const handleBackPress = () => {
        navigation.goBack()
    }

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(family.invitationCode)
    }

    const getUserInitials = (firstName: string, lastName: string) => {
        return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
    }

    const getTaskCountForUser = (userId: string) => {
        return tasks.filter((task: InterfaceTask) => task.assignedTo?._id === userId).length
    }

    const renderItem = ({ item: member }: { item: any }) => {
        const initials = getUserInitials(member.firstName, member.lastName)
        const taskCount = getTaskCountForUser(member._id)
        const taskText = taskCount === 1 ? 'Task' : 'Tasks'
        return (
            <View style={styles.familyMemberList}>
                <View style={styles.initialCircle}>
                    <Text style={styles.initials}>{initials}</Text>
                </View>
                <Text style={styles.familyMemberText}>
                    {member.firstName} {member.lastName}
                </Text>
                <Text style={styles.familyMemberText}>
                    {taskCount} {taskText}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackArrow onPress={handleBackPress} />
                <Text style={styles.headerText}>Family</Text>
            </View>
            <View style={styles.inviteCard}>
                <Text style={styles.inviteText}>{family.familyName}'s Invite Code:</Text>
                <Text style={styles.inviteCodeText}>
                    {family.invitationCode}
                    <CopyIcon onPress={copyToClipboard} />
                </Text>
            </View>
            <View style={styles.familyMembersCard}>
                <Text style={styles.familyMembersCardText}>Family Members</Text>
                <FlatList
                    data={family.members}
                    renderItem={renderItem}
                    keyExtractor={(member) => member._id}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : '10%',
        paddingHorizontal: 10
    },
    initialCircle: {
        width: 33,
        height: 33,
        borderRadius: 20,
        borderColor: palette.neutral800,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2
    },
    headerText: {
        fontFamily: typography.tertiary,
        fontSize: 30,
        textAlign: 'left',
        paddingLeft: '5%'
    },
    header: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    inviteCard: {
        height: '15%',
        width: '95%',
        backgroundColor: palette.neutral100,
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: '5%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3
    },
    inviteText: {
        fontFamily: typography.primary,
        fontSize: 20,
        textAlign: 'center'
    },
    inviteCodeText: {
        fontFamily: typography.quaternary,
        fontSize: 20,
        textAlign: 'center'
    },
    familyMembersCard: {
        height: '50%',
        width: '95%',
        alignSelf: 'center',
        backgroundColor: palette.neutral100,
        borderRadius: 20,
        padding: 10,
        marginTop: '5%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3
    },
    familyMembersCardText: {
        fontFamily: typography.tertiary,
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 10
    },
    familyMemberList: {
        width: '95%',
        alignSelf: 'center',
        marginBottom: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    familyMemberText: {
        fontFamily: typography.primary,
        fontSize: 20,
        textAlign: 'center'
    },
    initials: {
        fontSize: 16,
        fontFamily: typography.quaternary,
        textAlign: 'center',
        lineHeight: 30
    }
})
