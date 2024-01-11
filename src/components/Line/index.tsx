import React from 'react'
import { View, StyleSheet } from 'react-native'

const Line: React.FC = () => {
    return <View style={styles.line} />
}

const styles = StyleSheet.create({
    line: {
        height: 1,
        backgroundColor: 'black',
        marginVertical: '2%',
    }
})

export default Line
