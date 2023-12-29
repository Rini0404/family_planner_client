import { loadString } from '../utils/storage'
import { BASE_URL } from './baseUrl'

type EndPoint = string
type Data = Record<string, unknown>

type UpdatingTask = {
    _id: string
    isUpdating: boolean
}

export const put = async <T = unknown>(
    endPoint: EndPoint,
    data: Data,
    taskUpdate?: UpdatingTask
): Promise<T> => {
    const token = await loadString('token')

    if (!token) {
        throw new Error('No token found')
    }

    let url = BASE_URL

    if (taskUpdate?.isUpdating) {
        url = `${url}/${endPoint}/${taskUpdate._id}`
    } else {
        url = `${url}/${endPoint}`
    }

    console.log('PUT TO: ', url)

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        const jsonResponse = await response.json()
        return jsonResponse as T
    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
}
