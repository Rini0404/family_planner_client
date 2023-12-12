
import * as WebBrowser from 'expo-web-browser'

import { getQueryParam } from './getQueryParam'

import { saveString } from './storage'


export const handleOpenURL = async (event: { url: string; }) => {
    
    try {
    
        const token = getQueryParam(event.url, 'userTkn')
    
        if (!token) {
            throw new Error('Could not process the request, please try again.')
        }

        const savedToken = await saveString('token', token)

        if (!savedToken) {
            throw new Error('Could not process the request, please try again.')
        }

    } catch (error: unknown) {
        if (error instanceof Error) {
            alert(error.message)
        } else {
            alert('An error occurred.')
        }
    }
    finally {
        // execute regardless of the outcome
        WebBrowser.dismissBrowser()
    }
}
