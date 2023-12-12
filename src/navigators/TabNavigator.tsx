import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import React, { ComponentType, FC } from 'react'

import { WelcomeScreen, Settings } from '../screens'
import { AppStackParamList, AppStackScreenProps } from './AppNavigator'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TextStyle, ViewStyle } from 'react-native/types'

export type TabParamList = {
  Settings: undefined,
  Welcome: undefined,
}


export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>


type ScreenComponentType =
  | FC<TabScreenProps<'Welcome'>>
  | FC<TabScreenProps<'Settings'>>
  | ComponentType

interface Screen {
  name: keyof TabParamList
  component: ScreenComponentType
}

// ! Adjust when you know the Types for this screen....
const screens: Screen[] = [
    {
        name: 'Welcome',
        component: WelcomeScreen as unknown as FC<TabScreenProps<'Welcome'>>,
    },
    {
        name: 'Settings',
        component: Settings as unknown as FC<TabScreenProps<'Settings'>>,
    }
]

const Tab = createBottomTabNavigator<TabParamList>()

export function TabNavigator() {

    const { bottom  } = useSafeAreaInsets()

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    ...$tabBar,
                    paddingBottom: bottom,
                },
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
                tabBarLabelStyle: $tabBarLabel,
                tabBarItemStyle: $tabBarItem,
                tabBarAllowFontScaling: false,
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
    backgroundColor: '#9370db',
    borderTopColor: 'transparent',
}

const $tabBarItem: ViewStyle = {
    paddingTop: '5%',
}

const $tabBarLabel: TextStyle = {
    fontSize: 12,
    lineHeight: 16,
    flex: 1,
}
