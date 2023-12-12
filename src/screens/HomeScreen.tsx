import { View } from 'react-native'
import React from 'react'
import { AppStackScreenProps } from '../navigators'
import GoogleSignIn from '../components/google'


interface HomeScreenProps extends AppStackScreenProps<'HomeScreen'> {}


export const HomeScreen: React.FC<HomeScreenProps> = () => {
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <GoogleSignIn 
                onSignInSuccess={(data) => console.log(data)}
                onSignInFailure={(error) => console.log(error)}
            />
        </View>
    )
}