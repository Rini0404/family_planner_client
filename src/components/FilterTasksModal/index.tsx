import React from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { typography } from '../../theme/fonts'
import { palette } from '../../theme'

type FilterModalProps = {
    openFilter: boolean
    setOpenFilter: (openFilter: boolean) => void
}

export const FilterModal: React.FC<FilterModalProps> = ({ openFilter, setOpenFilter }) => {
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

                    <View style={styles.filterOptions}></View>
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'pink'
    },
    modalView: {
        backgroundColor: 'white',
        width: '100%',
        height: '60%',
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
