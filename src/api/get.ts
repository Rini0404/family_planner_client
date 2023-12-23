import { loadString } from '../utils/storage'
import { BASE_URL } from './baseUrl'

type EndPoint = string
type Params = Record<string, unknown>

export const get = async <T = unknown>(endPoint: EndPoint, params: Params): Promise<T> => {
    try {
        const token = await loadString('token')

        // Convert params object into a query string
        const queryString = new URLSearchParams(params as Record<string, string>).toString()

        const url = `${BASE_URL}/${endPoint}`

        console.log('URL : ', url)

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const jsonResponse = await response.json()
        console.log('GET response: ', jsonResponse)
        return jsonResponse as T
    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
}
