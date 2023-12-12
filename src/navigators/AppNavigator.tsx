
import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
    NavigatorScreenParams,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { useColorScheme } from 'react-native'
import { WelcomeScreen} from '../screens'
import { colors } from '../theme'
import { TabNavigator, TabParamList } from './TabNavigator'
import { HomeScreen } from '../screens/HomeScreen'
import SplashScreen from '../screens/SplashScreen'


export type AppStackParamList = {
  Welcome: undefined,
  Tabs: NavigatorScreenParams<TabParamList>
  Settings: undefined,
  HomeScreen: undefined,
  SplashScreen: undefined,
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ 
                headerShown: false, 
                navigationBarColor: colors.background,
                gestureEnabled: false,  // Disable the gesture (swiping) to go back
                headerLeft: () => null // Remove the back button from the header
            }}
            initialRouteName={'SplashScreen'}
        >
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
    )
}


interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
    const colorScheme = useColorScheme()

    const navTheme = React.useMemo(() => {
        const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme
        return {
            ...theme,
            colors: {
                ...theme.colors,
                background: colors.background,
            },
        }
    }, [colorScheme])

    return (
        <NavigationContainer theme={navTheme} {...props}>
            <AppStack />
        </NavigationContainer>
    )
}
