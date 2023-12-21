import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { BackArrowIcon } from '../../../assets/navbar-icons/backArrow'


const BackArrow = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.backButton}>
            <BackArrowIcon />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    backButton: {
        marginLeft: 10,
    }
})

export default BackArrow
