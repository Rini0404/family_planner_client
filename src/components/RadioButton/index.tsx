import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../../theme'

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
        borderColor: colors.palette.primary,
        backgroundColor: colors.palette.emphasis,
        marginRight: 10
    },
    radioButtonChecked: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.palette.primary,
        backgroundColor: colors.palette.emphasis,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    innerCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.palette.primary
    }
})

export default RadioButton
