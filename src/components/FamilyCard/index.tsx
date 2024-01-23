import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { UserType } from '../../types/user'
import { palette } from '../../theme'
import { typography } from '../../theme/fonts'
import { formatDate } from '../../utils/formatDate'
import FamilyIcon from '../../../assets/navbar-icons/family'
import FilterIcon from '../../../assets/navbar-icons/filter'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AppStackParamList } from '../../navigators'

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
    const navigation = useNavigation<NavigationProp<AppStackParamList>>()

    return (
        <View style={styles.container}>
            <View style={styles.familyAndName}>
                <View style={styles.familyIcon}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('FamilyScreen')
                        }}
                    >
                        <FamilyIcon />
                    </TouchableOpacity>
                </View>
                <Text style={styles.familyHeader}>
                    The {'\n'} {family?.familyName}'s
                </Text>
                <View style={styles.filterIcon}>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert('Filter')
                        }}
                    >
                        <FilterIcon />
                    </TouchableOpacity>
                </View>
                {/* <Text style={styles.userName}>Hello, {user.firstName} !</Text> */}
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
        height: '26%'
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
    // userName: {
    //     fontSize: 16,
    //     fontFamily: typography.tertiary,
    //     fontWeight: 'bold',
    //     color: 'white',
    //     textAlign: 'center'
    // },
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
    familyIcon: {
        position: 'absolute',
        alignSelf: 'flex-start',
        top: '8%',
        left: '3%'
    },
    filterIcon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: '6%',
        right: '3%'
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
