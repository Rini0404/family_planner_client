import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { UserType } from '../../types/user'
import { palette } from '../../theme'
import { typography } from '../../theme/fonts'
import { formatDate } from '../../utils/formatDate'

type FamilyData = {
    familyName: string
    id: number
    members: string[]
    invitationCode: string
}

type FamilyCardProps = {
    family: FamilyData
    user: UserType
}

export const FamilyCard: React.FC<FamilyCardProps> = ({ family, user }) => {
    return (
        <View style={styles.container}>
            <View style={styles.familyAndName}>
                <Text style={styles.familyHeader}>
                    The {'\n'} {family?.familyName}'s
                </Text>
                <Text style={styles.userName}>Hello, {user.firstName} !</Text>
            </View>

            <View style={styles.secondContainer}>
                <Text style={styles.todaysTasks}>Today's Tasks</Text>
                <Text style={styles.dateNow}>{formatDate()}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: palette.pastelNavbars,
        borderRadius: 20,
        width: '90%',
        height: '35%'
    },
    dateNow: {
        paddingTop: '3%',
        fontSize: 15,
        fontFamily: typography.quaternary,
        textAlign: 'center'
    },
    todaysTasks: {
        fontSize: 22,
        fontFamily: typography.quaternary,
        textAlign: 'center'
    },
    userName: {
        paddingTop: '1%',
        fontSize: 16,
        fontFamily: typography.tertiary,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    familyHeader: {
        paddingTop: '5%',
        fontSize: 30,
        fontFamily: typography.quaternary,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    familyAndName: {
        alignItems: 'center'
    },
    secondContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '100%',
        height: '45%',
        justifyContent: 'center',
        bottom: 0,
        position: 'absolute'
    }
})
