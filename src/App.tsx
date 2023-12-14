import React from 'react'
import { AppNavigator } from './navigators'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './redux/store'
import { useFonts } from 'expo-font'
import { fontsToLoad } from './theme/fonts'

export default function App() {
    const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } })

    const [fontsLoaded, fontError] = useFonts(fontsToLoad)

    if (!fontsLoaded || fontError) {
        return
    }

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AppNavigator />
            </QueryClientProvider>
        </Provider>
    )
}
