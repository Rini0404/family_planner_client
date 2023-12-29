import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { BackArrowIcon } from '../../../assets/navbar-icons/backArrow'

type BackArrowProps = {
    onPress: () => void
}

const BackArrow: React.FC<BackArrowProps> = ({ onPress }) => {
    return (
        <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={onPress}
            style={styles.backButton}
        >
            <BackArrowIcon />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    backButton: {
        marginLeft: 10
    }
})

export default BackArrow
