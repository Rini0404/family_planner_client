import React, { useState } from 'react'
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native'

interface CustomPickerProps {
    options: string[]
    selectedValue: string
    onValueChange: (value: string) => void
}

export const CustomPicker: React.FC<CustomPickerProps> = ({
    options,
    selectedValue,
    onValueChange
}) => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.pickerButton}>
                <Text>
                    {selectedValue
                        ? `Member ${options.indexOf(selectedValue) + 1}`
                        : 'Select Member'}
                </Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.option}
                            onPress={() => {
                                onValueChange(option)
                                setModalVisible(false)
                            }}
                        >
                            <Text>{`Member ${index + 1}`}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    pickerButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center'
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    option: {
        backgroundColor: 'white',
        padding: 20,
        width: '80%',
        alignItems: 'center',
        margin: 10,
        borderRadius: 4
    }
})
