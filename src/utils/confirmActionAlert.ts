import { Alert } from 'react-native'

export const confirmAction = async (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
        Alert.alert(
            'Confirmation',
            message,
            [
                {
                    text: 'Cancel',
                    onPress: () => resolve(false),
                    style: 'cancel'
                },
                { text: 'OK', onPress: () => resolve(true) }
            ],
            { cancelable: false }
        )
    })
}
