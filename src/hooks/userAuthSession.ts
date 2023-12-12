import React from 'react'
import { loadString } from '../utils/storage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'  // if you're using StackNavigator
import { AppStackParamList } from '../navigators'

type NavigationProp = StackNavigationProp<AppStackParamList>;

/**
 * useUserSession - Custom hook to check for user's session token and navigate accordingly.
 */
export function useUserSession(): boolean {
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const navigation = useNavigation<NavigationProp>()

    React.useEffect(() => {
        const checkSession = async () => {
            try {
                const token: string | null = await loadString('token')

                // Assuming token being non-null indicates an existing session
                if (token) {
                    navigation.navigate('Tabs')
                } else {
                    navigation.navigate('HomeScreen')
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    alert(error.message)
                } else {
                    alert('An error occurred.')
                }
            } finally {
                setIsLoading(false)
            }
        }

        checkSession()
    }, [navigation])

    return isLoading
}
