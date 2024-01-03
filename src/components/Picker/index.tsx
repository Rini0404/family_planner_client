import React, { useState } from 'react'
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native'

interface CustomPickerProps {
    options: string[]
    openPicker: boolean
    onValueChange: (value: string) => void
    setOpenPicker: (value: boolean) => void
}

export const CustomPicker: React.FC<CustomPickerProps> = ({
    options,
    onValueChange,
    openPicker,
    setOpenPicker
}) => {
    return (
        <View>
            {openPicker && (
                <Modal
                    transparent={true}
                    visible={openPicker}
                    onRequestClose={() => setOpenPicker(false)}
                >
                    <View style={styles.modalView}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.option}
                                onPress={() => {
                                    onValueChange(option)
                                    setOpenPicker(false)
                                }}
                            >
                                <Text>{`Member ${index + 1}`}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Modal>
            )}
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
