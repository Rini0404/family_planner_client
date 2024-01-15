import { StyleSheet, Text, View } from 'react-native'
import { UserType } from '../../types/user'
import React from 'react'
import { palette } from '../../theme'

type UserTypeProps = {
    user: UserType
}

export const UserTab: React.FC<UserTypeProps> = ({ user }) => {
    console.log('user', user)
    const { firstName, lastName } = user
    const userInitial =
        firstName && firstName.length > 0 && lastName
            ? firstName[0].toUpperCase() + lastName[0].toUpperCase()
            : ''
    console.log('userInitial', userInitial)
    return (
        <View style={styles.container}>
            <Text>Hello, {user.firstName} !</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'tomato',
        width: '90%',
        height: '5%'
    }
})
