import React from 'react'
import { View, Button, StyleSheet, Linking } from 'react-native'
import { GOOGLE_REDIRECT_URI, googleAuthEndpoint } from '../api/baseUrl'
import * as WebBrowser from 'expo-web-browser'
import { handleOpenURL } from '../utils/handleOpenUrl'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AppStackParamList } from '../navigators'

type GoogleSignInProps = {
    onSignInSuccess: (userInfo: unknown) => void;
    onSignInFailure: (error: unknown) => void;
};

type resultType = {
    type: string;
    url: string;
};


const GoogleSignIn: React.FC<GoogleSignInProps> = ({ onSignInSuccess, onSignInFailure }) => {

    React.useEffect(() => {

        Linking.addEventListener('url', handleOpenURL)

        // Handle the initial URL
        Linking.getInitialURL()

    }, [])

    const navigation = useNavigation<NavigationProp<AppStackParamList, 'Tabs'>>()


    const handleWebBrowserResult = React.useCallback(async (result: { type: string; url: string; }) => {



        if (result.type === 'dismiss') return // If user dismissed the web browser

        const url = result.url
        if (url.includes(`${GOOGLE_REDIRECT_URI}/?code=`)) {
            const receivedCode = new URL(url).searchParams.get('code')
            console.log(receivedCode)
            if (receivedCode) {
                handleSignIn(receivedCode)
            }
        }
    }, [])

    const openWebBrowser = async () => {
        // try {
        //     const result = await WebBrowser.openBrowserAsync(googleAuthEndpoint)
            
        //     await handleWebBrowserResult( result as resultType )
        // } catch (error) {
        //     onSignInFailure(error)
        //     console.log('ERROR', error)
        // }
        navigation.navigate('Tabs')
    }

    const handleSignIn = async (receivedCode: string) => {
        try {
            const response = await fetch(`${GOOGLE_REDIRECT_URI}?code=${receivedCode}`)
            const data = await response.json()
            console.log('DATA', data)
            onSignInSuccess(data)
  
            // Close the web browser
            WebBrowser.dismissBrowser()
        } catch (error) {
            onSignInFailure(error)
        }
    }
  

    return (
        <View style={styles.container}>
            <View style={{ padding: 16 }}>
                <Button title="Sign in with Google" 
                    testID='google-sign-in-button'
                    onPress={openWebBrowser} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default GoogleSignIn