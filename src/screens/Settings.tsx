import { View, Text, Platform, StyleSheet, StatusBar, Touchable } from 'react-native'
import React from 'react'
import { AppStackParamList, AppStackScreenProps } from '../navigators'
import { palette } from '../theme'
import { typography } from '../theme/fonts'
import BackArrow from '../components/BackArrow'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native'

interface SettingsProps extends AppStackScreenProps<'Settings'> {}

export const Settings: React.FC<SettingsProps> = () => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>()

    const { family } = useSelector((state: any) => state.family)
    const { tasks } = useSelector((state: any) => state.tasks)
    const { user } = useSelector((state: any) => state.user)

    const handleBackPress = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackArrow onPress={handleBackPress} />
                <Text style={styles.headerText}>Settings</Text>
            </View>
            <View style={styles.userInfoCard}>
                <Text style={styles.cardText}>
                    {user.firstName} {user.lastName}
                </Text>
                <Text style={styles.cardSubText}>Email: {user.email}</Text>
                <Text style={styles.cardSubText}>Role: {user.role}</Text>
                <TouchableOpacity style={styles.button} onPress={() => {}} activeOpacity={0.7}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.familyCard}>
                <Text style={styles.cardText}>Family: {family.familyName}'s</Text>
                <Text style={styles.cardSubText}>Invite Code: {family.invitationCode}</Text>
                <TouchableOpacity style={styles.button} onPress={() => {}} activeOpacity={0.7}>
                    <Text style={styles.buttonText}>Leave this Family</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.passwordCard}>
                <Text style={styles.cardText}>Password: ********</Text>
                <TouchableOpacity style={styles.button} onPress={() => {}} activeOpacity={0.7}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.reportCard}>
                <Text style={styles.cardText}>Report a Problem</Text>
                <TouchableOpacity style={styles.button} onPress={() => {}} activeOpacity={0.7}>
                    <Text style={styles.buttonText}>Report</Text>
                </TouchableOpacity>
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
    userInfoCard: {
        height: '20%',
        width: '95%',
        alignSelf: 'center',
        backgroundColor: palette.neutral100,
        borderRadius: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3
    },
    familyCard: {
        height: '19%',
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
    passwordCard: {
        height: '19%',
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
    reportCard: {
        height: '19%',
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
    cardText: {
        fontSize: 18,
        fontFamily: typography.tertiary,
        color: palette.neutral800,
        marginBottom: 5
    },
    cardSubText: {
        fontSize: 16,
        fontFamily: typography.primary,
        color: palette.neutral300
    },
    button: {
        backgroundColor: palette.pastelNavbars,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    buttonText: {
        color: palette.neutral100,
        fontFamily: typography.tertiary,
        fontSize: 16
    }
})
