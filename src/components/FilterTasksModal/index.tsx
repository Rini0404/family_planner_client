import React, { useState } from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { typography } from '../../theme/fonts'
import { palette } from '../../theme'
import RadioButton from '../RadioButton'
import { Status } from '../../types/tasks'
import { Picker } from '@react-native-picker/picker'
import { DateChosen, SelectedMember } from '../../types/filter'
import { DatePickerAndTime } from '../DatePicker'
import { useDispatch, useSelector } from 'react-redux'
import { setFilteredTasks } from '../../redux/tasks/tasksActions'

type FilterModalProps = {
    openFilter: boolean
    setOpenFilter: (openFilter: boolean) => void
    selectedByMember: SelectedMember
    setSelectedByMember: (member: SelectedMember) => void
    selectedStatus: Status
    setSelectedStatus: (status: Status) => void
    selectedDate: DateChosen | null
    setSelectedDate: (date: DateChosen | null) => void
    realDateChosen: Date | null
    setRealDateChosen: (date: Date | null) => void
}

export const FilterModal: React.FC<FilterModalProps> = ({
    openFilter,
    setOpenFilter,
    selectedByMember,
    setSelectedByMember,
    selectedStatus,
    setSelectedStatus,
    selectedDate,
    setSelectedDate,
    realDateChosen,
    setRealDateChosen
}) => {
    const dispatch = useDispatch()
    const [isPickerVisible, setIsPickerVisible] = React.useState<boolean>(false)
    const [isDatePickerVisible, setIsDatePickerVisible] = React.useState<boolean>(false)

    const { user } = useSelector((state: any) => state.user)

    const handleDateSelect = (date: DateChosen) => {
        if (date === DateChosen.CUSTOM) {
            setIsDatePickerVisible(true)
        }

        if (date === DateChosen.TODAY) {
            setRealDateChosen(new Date())
        }
        setSelectedDate(date)
    }

    // Function to handle selection change
    const handleSelectionChange = (member: SelectedMember) => {
        setSelectedByMember(member)
    }

    const togglePickerVisibility = () => {
        setIsPickerVisible(!isPickerVisible)
    }

    const handleFilter = () => {
        let userChosenId: string | null = null
        console.log('USER', user)

        if (selectedByMember === SelectedMember.ME) {
            userChosenId = user._id
        } else if (selectedByMember === SelectedMember.EVERYONE) {
            userChosenId = SelectedMember.EVERYONE
        }

        const filterOptions = {
            member: userChosenId || '',
            status: selectedStatus,
            date: realDateChosen ? realDateChosen.toISOString() : null
        }

        dispatch(setFilteredTasks(filterOptions))

        setOpenFilter(!openFilter)
    }

    const handleClearFilter = () => {
        setSelectedByMember(SelectedMember.ME)
        setSelectedStatus(Status.All)
        setSelectedDate(DateChosen.TODAY)
        setRealDateChosen(new Date())
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={openFilter}
            onRequestClose={() => {
                setOpenFilter(!openFilter)
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.filterHeader}>
                        <View style={{ width: 30 }}></View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={styles.filterText}>Filter</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setOpenFilter(!openFilter)
                            }}
                        >
                            <View style={styles.circleX}>
                                <Text style={styles.x}>X</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.filterOptions}>
                        <View style={styles.selfContainer}>
                            <Text style={styles.byDateText}>By date:</Text>
                            <View style={styles.dateOptions}>
                                {Object.values(DateChosen).map((date) => (
                                    <TouchableOpacity
                                        key={date}
                                        style={[
                                            styles.dateButton,
                                            selectedDate === date && styles.selectedDateButton
                                        ]}
                                        onPress={() => handleDateSelect(date)}
                                    >
                                        <Text style={styles.filterTextDate}>{date}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            {selectedDate === DateChosen.CUSTOM && isDatePickerVisible && (
                                <DatePickerAndTime
                                    selectedValue={realDateChosen || new Date()}
                                    onDateChange={(date) => {
                                        setRealDateChosen(date)
                                    }}
                                    openedDate={isDatePickerVisible}
                                    setOpenedDate={setIsDatePickerVisible}
                                />
                            )}
                        </View>

                        <View style={styles.selfContainer}>
                            <Text style={styles.byDateText}>By family member:</Text>
                            <View style={styles.dateOptions}>
                                {Object.values(SelectedMember).map((member) => (
                                    <TouchableOpacity
                                        key={member}
                                        style={styles.memberContainer}
                                        onPress={() => handleSelectionChange(member)}
                                    >
                                        <RadioButton
                                            isSelected={selectedByMember === member}
                                            onPress={() => handleSelectionChange(member)}
                                        />
                                        <Text style={styles.filterTextDate}>{member}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View style={styles.selfContainer}>
                            <Text style={styles.byDateText}>By task status:</Text>
                            <TouchableOpacity
                                style={styles.pickerButton}
                                onPress={togglePickerVisibility}
                            >
                                <Text style={styles.pickerButtonText}>{selectedStatus}</Text>
                            </TouchableOpacity>

                            {isPickerVisible && (
                                <Modal
                                    transparent={true}
                                    visible={isPickerVisible}
                                    onRequestClose={togglePickerVisibility}
                                    animationType='slide'
                                >
                                    <View style={styles.pickerModal}>
                                        <Picker
                                            selectedValue={selectedStatus}
                                            onValueChange={(itemValue) => {
                                                setSelectedStatus(itemValue)
                                                togglePickerVisibility()
                                            }}
                                            style={styles.picker}
                                        >
                                            {Object.values(Status).map((status) => (
                                                <Picker.Item
                                                    key={status}
                                                    label={status}
                                                    value={status}
                                                    style={styles.pickerButtonText}
                                                />
                                            ))}
                                        </Picker>
                                    </View>
                                </Modal>
                            )}
                        </View>

                        <View style={styles.selfContainer}>
                            <Text style={styles.byDateText}>Update</Text>
                            <View style={styles.actions}>
                                <TouchableOpacity
                                    style={styles.dateButtons}
                                    onPress={handleClearFilter}
                                >
                                    <Text style={styles.filterTextDate}>Clear all filters</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.dateButtons} onPress={handleFilter}>
                                    <Text style={styles.filterTextDate}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: 'white',
        width: '100%',
        height: '55%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: '5%',
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
    applyDate: {
        width: '40%',
        height: '10%',
        borderRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '5%'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '90%'
    },
    dateButton: {
        width: '40%',
        height: '70%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: palette.boxesPastelGreen,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    selectedDateButton: {
        backgroundColor: palette.boxesPastelGreen
    },
    memberContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    picker: {
        width: '100%',
        height: '100%'
    },
    pickerButtonText: {
        fontFamily: typography.tertiary,
        fontSize: 16,
        textAlign: 'center'
    },
    pickerButton: {
        width: '40%',
        height: '70%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: palette.boxesPastelGreen,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    datePickerModal: {
        backgroundColor: '#fff',
        width: '100%',
        height: '55%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: '5%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    pickerModal: {
        backgroundColor: palette.neutral100,
        width: '100%',
        height: '30%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    selfContainer: {
        width: '100%',
        height: '20%'
    },
    byDateText: {
        fontFamily: typography.primary,
        fontSize: 16,
        marginBottom: '2%',
        paddingLeft: '4%',
        textAlign: 'left'
    },
    dateButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: palette.boxesPastelGreen,
        width: '45%',
        height: '90%'
    },
    dateOptions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '50%'
    },
    filterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between', // This will space out the items
        alignItems: 'center', // Align items vertically
        width: '100%',
        marginBottom: '5%'
    },
    filterOptions: {
        width: '100%',
        height: '80%',
        justifyContent: 'space-evenly'
    },
    filterTextDate: {
        fontSize: 16,
        fontFamily: typography.tertiary,
        textAlign: 'center'
    },
    filterText: {
        fontSize: 20,
        fontFamily: typography.quaternary,
        textAlign: 'center'
    },
    x: {
        fontFamily: typography.primary,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    circleX: {
        width: 30,
        height: 30,
        borderRadius: 100,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
