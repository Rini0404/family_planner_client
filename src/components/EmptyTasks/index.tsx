import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'
import { AppStackParamList } from '../../navigators'
import { typography } from '../../theme/fonts'
import { palette } from '../../theme'

interface NoTasksProps {
    navigation: NavigationProp<AppStackParamList>
}

export const NoTasks: React.FC<NoTasksProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>No tasks for today</Text>
            <Text style={styles.subtitle}>Create a new task to get started</Text>
            <View style={styles.buttonContainer}></View>
            <View style={{ flex: 1, width: '90%' }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('PostScreen')}
                >
                    <Text style={styles.buttonText}>Create Task</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        width: '90%',
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    button: {
        backgroundColor: palette.pastelNavbars,
        padding: 15,
        width: '100%',
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: typography.primary
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: typography.quaternary,
        marginTop: 20,
        marginBottom: 10
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        fontFamily: typography.primary
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    }
})
