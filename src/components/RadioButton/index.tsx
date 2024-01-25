import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { palette } from '../../theme'

interface Props {
    isSelected: boolean
    onPress: () => void
}

const RadioButton: React.FC<Props> = ({ isSelected, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={isSelected ? styles.radioButtonChecked : styles.radioButtonUnchecked}>
                {isSelected && <View style={styles.innerCircle} />}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    radioButtonUnchecked: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: palette.boxesPastelGreen,
        backgroundColor: palette.neutral100,
        marginRight: 10
    },
    radioButtonChecked: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: palette.boxesPastelGreen,
        backgroundColor: palette.neutral100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    innerCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: palette.boxesPastelGreen
    }
})

export default RadioButton
