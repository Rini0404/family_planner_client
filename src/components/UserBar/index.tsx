import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BellIcon from '../../../assets/navbar-icons/bell'
import SettingsIcon from '../../../assets/navbar-icons/settings'
import { UserType } from '../../types/user'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AppStackParamList } from '../../navigators'
import { typography } from '../../theme/fonts'
import { colors, palette } from '../../theme'

type FamilyData = {
    familyName: string
    id: number
    members: string[]
    invitationCode: string
}

type UserBarProps = {
    user: UserType
    family: FamilyData
}

export const UserBar: React.FC<UserBarProps> = ({ user, family }) => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>()

    const userInitials =
        user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()

    return (
        <View style={styles.container}>
            <View style={styles.user}>
                <TouchableOpacity onPress={() => {
                    Alert.alert('Profile')
                }}>
                <Text style={styles.initials}>{userInitials}</Text>
                </TouchableOpacity>
                <Text style={styles.userName}>
                    {user.firstName} {user.lastName}
                </Text>
            </View>
            <View style={styles.notifications}>
                <BellIcon onPress={()=>{
                    Alert.alert('Notifications')
                }}/>
                    <SettingsIcon onPress={() => {
                            navigation.navigate('Settings')
                        }}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '88%',
        height: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userName: {
        fontSize: 16,
        fontFamily: typography.quaternary
    },
    initials: {
        width: 31,
        height: 31,
        borderRadius: 50,
        borderColor: palette.neutral800,
        borderWidth: 1,
        backgroundColor: palette.pastelNavbars,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 10,
        fontSize: 16,
        fontFamily: typography.quaternary

    },
    notifications: {
        width: '22%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
