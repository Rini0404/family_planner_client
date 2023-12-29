import { loadString } from '../utils/storage'
import { BASE_URL } from './baseUrl'

type EndPoint = string
type Data = Record<string, unknown>

export const post = async <T = unknown>(endPoint: EndPoint, data: Data): Promise<T> => {
    let url = BASE_URL

    const token = await loadString('token')

    if (!token) {
        throw new Error('No token found')
    }
    console.log('POST TO: ', `${url}/${endPoint}`)
    try {
        const response = await fetch(`${url}/${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        const jsonResponse = await response.json()
        return jsonResponse as T // Cast the jsonResponse to the generic type T
    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
}
