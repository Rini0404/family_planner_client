import { loadString } from '../utils/storage'
import { BASE_URL } from './baseUrl'

type EndPoint = string

export const deleteInDb = async <T = unknown>(endPoint: EndPoint, id: string): Promise<T> => {
    let url = BASE_URL

    const token = await loadString('token')

    if (!token) {
        throw new Error('No token found')
    }

    console.log('DSATA: ', id)

    console.log('POST TO: ', `${url}/${endPoint}/${id}`)

    try {
        const response = await fetch(`${url}/${endPoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const jsonResponse = await response.json()
        return jsonResponse as T // Cast the jsonResponse to the generic type T
    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
}
