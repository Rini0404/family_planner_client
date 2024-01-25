import React from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { typography } from '../../theme/fonts'
import { palette } from '../../theme'
import RadioButton from '../RadioButton'
import { Status } from '../../types/tasks'
import { Picker } from '@react-native-picker/picker'

type FilterModalProps = {
    openFilter: boolean
    setOpenFilter: (openFilter: boolean) => void
}

enum SelectedMember {
    ME = 'Me',
    EVERYONE = 'Everyone'
}

export const FilterModal: React.FC<FilterModalProps> = ({ openFilter, setOpenFilter }) => {
    const [selectedByMember, setSelectedByMember] = React.useState<SelectedMember>(
        SelectedMember.ME
    )

    // Function to handle selection change
    const handleSelectionChange = (member: SelectedMember) => {
        setSelectedByMember(member)
    }
    const [selectedStatus, setSelectedStatus] = React.useState<Status>(Status.Pending)
    const [isPickerVisible, setIsPickerVisible] = React.useState<boolean>(false)

    const togglePickerVisibility = () => {
        setIsPickerVisible(!isPickerVisible)
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
                                <TouchableOpacity style={styles.dateButtons}>
                                    <Text style={styles.filterTextDate}>Today</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.dateButtons}>
                                    <Text style={styles.filterTextDate}>Future date</Text>
                                </TouchableOpacity>
                            </View>
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
                                >
                                    <View style={styles.pickerModal}>
                                        <Picker
                                            selectedValue={selectedStatus}
                                            onValueChange={(itemValue) => {
                                                setSelectedStatus(itemValue)
                                                togglePickerVisibility()
                                            }}
                                            style={styles.picker} // Your picker styles
                                        >
                                            {Object.values(Status).map((status) => (
                                                <Picker.Item
                                                    key={status}
                                                    label={status}
                                                    value={status}
                                                />
                                            ))}
                                        </Picker>
                                    </View>
                                </Modal>
                            )}
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
        marginTop: '2%',
        width: '40%',
        height: '70%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: palette.boxesPastelGreen,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    pickerModal: {
        backgroundColor: palette.boxesPastelGreen,
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
