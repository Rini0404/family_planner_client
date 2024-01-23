import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
    NavigatorScreenParams
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { useColorScheme } from 'react-native'
import { colors } from '../theme'
import { TabNavigator, TabParamList } from './TabNavigator'
import { HomeScreen } from '../screens/HomeScreen'
import { Settings } from '../screens/Settings'
import { FamilyScreen } from '../screens/FamilyScreen'
import SplashScreen from '../screens/SplashScreen'
import SignupScreen from '../screens/SignupScreen'
import { Initial } from '../screens/Iniitial'
import { SignInScreen } from '../screens/Signin'
import { InformationalTask } from '../screens/InformationalTask'
import { InterfaceTask } from '../types/tasks'

export type AppStackParamList = {
    Tabs: NavigatorScreenParams<TabParamList>
    Settings: undefined
    HomeScreen: undefined
    SplashScreen: undefined
    Signup: undefined
    Signin: undefined
    Initial: undefined
    CalenderScreen: undefined
    PostScreen: undefined
    InformationalTask: InterfaceTask
    FamilyScreen: undefined
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
                gestureEnabled: false, // Disable the gesture (swiping) to go back
                headerLeft: () => null // Remove the back button from the header
            }}
            initialRouteName={'SplashScreen'}
        >
            <Stack.Screen name='Initial' component={Initial} />
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='Signin' component={SignInScreen} />
            <Stack.Screen name='Tabs' component={TabNavigator} />
            <Stack.Screen name='InformationalTask' component={InformationalTask} />
            <Stack.Screen name='SplashScreen' component={SplashScreen} />
            <Stack.Screen name='Settings' component={Settings} />
            <Stack.Screen name='FamilyScreen' component={FamilyScreen} />
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
                background: colors.palette.pastelBackground
            }
        }
    }, [colorScheme])

    return (
        <NavigationContainer theme={navTheme} {...props}>
            <AppStack />
        </NavigationContainer>
    )
}
