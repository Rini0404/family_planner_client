import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { palette } from '../../theme'
import { typography } from '../../theme/fonts'
import { formatDate } from '../../utils/formatDate'
import FamilyIcon from '../../../assets/navbar-icons/family'
import FilterIcon from '../../../assets/navbar-icons/filter'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AppStackParamList } from '../../navigators'
import { FilterModal } from '../FilterTasksModal'
import { DateChosen, SelectedMember } from '../../types/filter'
import { Status } from '../../types/tasks'

type FamilyData = {
    familyName: string
    id: number
    members: string[]
    invitationCode: string
}

type FamilyCardProps = {
    family: FamilyData
}

export const FamilyCard: React.FC<FamilyCardProps> = ({ family }) => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>()

    const [openFilter, setOpenFilter] = React.useState<boolean>(false)

    const [selectedByMember, setSelectedByMember] = React.useState<SelectedMember>(
        SelectedMember.EVERYONE
    )

    const [selectedStatus, setSelectedStatus] = React.useState<Status>(Status.All)

    const [selectedDate, setSelectedDate] = React.useState<DateChosen | null>(DateChosen.TODAY)

    const [realDateChosen, setRealDateChosen] = React.useState<Date | null>(new Date())

    return (
        <>
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
                                setOpenFilter(!openFilter)
                            }}
                        >
                            <FilterIcon />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.secondContainer}>
                    <Text style={styles.todaysTasks}>Today's Tasks</Text>
                    <Text style={styles.dateNow}>{formatDate()}</Text>
                </View>
            </View>
            {openFilter && (
                <FilterModal
                    openFilter={openFilter}
                    setOpenFilter={setOpenFilter}
                    selectedByMember={selectedByMember}
                    setSelectedByMember={setSelectedByMember}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    realDateChosen={realDateChosen}
                    setRealDateChosen={setRealDateChosen}
                />
            )}
        </>
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
