import { useEffect } from 'react'
import { BackHandler } from 'react-native'
// https://reactnative.dev/docs/backhandler

export const backButtonHandler = () => {
    // arg value will be passed into function when wanting different functionality for back button
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            // Navigate to the device's home screen when the back button is pressed
            BackHandler.exitApp()
            return true // Prevent the default back button behavior.
        })
        return () => {
            backHandler.remove()
        }
    }, [])
}
