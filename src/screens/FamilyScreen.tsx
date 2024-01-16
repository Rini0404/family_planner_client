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

interface FamilyScreenProps extends AppStackScreenProps<'FamilyScreen'> {}

export const FamilyScreen: React.FC<FamilyScreenProps> = () => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>()

    const { user } = useSelector((state: any) => state.user)
    const { family } = useSelector((state: any) => state.family)
    const { tasks } = useSelector((state: any) => state.tasks)

    const userInitials =
        user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()

    const handleBackPress = () => {
        navigation.goBack()
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackArrow onPress={handleBackPress} />
                <Text style={styles.headerText}>Family</Text>
            </View>
            <View style={styles.inviteCard}>
                <Text style={styles.inviteText}>{family.familyName}'s Invite Code:</Text>
                <Text style={styles.inviteText}>
                    {family.invitationCode}
                    <CopyIcon />
                </Text>
            </View>
            <View style={styles.familyMembersCard}>
                <Text style={styles.familyMembersCardText}>Family Members</Text>
                {family.members.map((member: UserType, index: number) => (
                    <View key={index} style={styles.familyMemberList}>
                        <Text style={styles.initials}>{userInitials}</Text>
                        <Text style={styles.familyMemberText}>
                            {member.firstName} {member.lastName}
                        </Text>
                        <Text style={styles.familyMemberText}>{tasks.length}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
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
        width: '90%',
        backgroundColor: palette.neutral100,
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%'
    },
    inviteText: {
        fontFamily: typography.primary,
        fontSize: 20,
        textAlign: 'center',
    },
    familyMembersCard: {
        height: '50%',
        width: '90%',
        alignSelf: 'center',
        backgroundColor: palette.neutral100,
        borderRadius: 20,
        marginTop: '5%'
    },
    familyMembersCardText: {
        fontFamily: typography.tertiary,
        fontSize: 30,
        textAlign: 'center'
    },
    familyMemberList: {
        height: '12%',
        width: '90%',
        backgroundColor: palette.pastelNavbars,
        borderRadius: 20,
        alignSelf: 'center',
        marginBottom: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '5%'
    },
    familyMemberText: {
        fontFamily: typography.primary,
        fontSize: 20,
        textAlign: 'center'
    },
    initials: {
        width: 31,
        height: 31,
        borderRadius: 50,
        borderColor: palette.neutral800,
        borderWidth: 1,
        backgroundColor: palette.pastelNavbars,
        fontSize: 16,
        fontFamily: typography.quaternary,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})
