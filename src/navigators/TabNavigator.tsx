import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import React, { ComponentType, FC } from 'react'

import { HomeScreen, Settings } from '../screens'
import { AppStackParamList, AppStackScreenProps } from './AppNavigator'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TextStyle, ViewStyle } from 'react-native/types'
import { palette } from '../theme'
import { PostScreen } from '../screens/Post'
import { CalenderScreen } from '../screens/Calender'

export type TabParamList = {
    Settings: undefined
    HomeScreen: undefined
    PostScreen: undefined
    CalenderScreen: undefined
}

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
>

type ScreenComponentType =
    | FC<TabScreenProps<'HomeScreen'>>
    | FC<TabScreenProps<'Settings'>>
    | FC<TabScreenProps<'PostScreen'>>
    | FC<TabScreenProps<'CalenderScreen'>>
    | ComponentType

interface Screen {
    name: keyof TabParamList
    component: ScreenComponentType
}

// ! Adjust when you know the Types for this screen....
const screens: Screen[] = [
    {
        name: 'HomeScreen',
        component: HomeScreen as unknown as FC<TabScreenProps<'HomeScreen'>>
    },
    {
        name: 'CalenderScreen',
        component: CalenderScreen as unknown as FC<TabScreenProps<'CalenderScreen'>>
    },
    {
        name: 'PostScreen',
        component: PostScreen as unknown as FC<TabScreenProps<'PostScreen'>>
    },
    {
        name: 'Settings',
        component: Settings as unknown as FC<TabScreenProps<'Settings'>>
    }
]

const Tab = createBottomTabNavigator<TabParamList>()

export function TabNavigator() {
    const { bottom } = useSafeAreaInsets()

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    ...$tabBar
                },
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
                tabBarLabelStyle: $tabBarLabel,
                tabBarItemStyle: $tabBarItem,
                tabBarAllowFontScaling: false
            }}
        >
            {screens.map((screen) => (
                <Tab.Screen
                    key={screen.name}
                    name={screen.name}
                    component={screen.component as ComponentType}
                />
            ))}
        </Tab.Navigator>
    )
}

const $tabBar: ViewStyle = {
    // pastel green background
    backgroundColor: palette.pastelNavbars,
    borderTopColor: 'transparent',
    // bottom: '4%',
    bottom: '30%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20
}

const $tabBarItem: ViewStyle = {
    paddingTop: '5%'
}

const $tabBarLabel: TextStyle = {
    flex: 1
}
