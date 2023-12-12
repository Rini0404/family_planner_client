import React from 'react'
import { AppNavigator } from './navigators'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './redux/store'

export default function App() {

    const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } })
    
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AppNavigator />
            </QueryClientProvider>
        </Provider>
    )
    
}