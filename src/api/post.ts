import { BASE_URL } from './baseUrl'

type EndPoint = string
type Data = Record<string, unknown>

export const post = async <T = unknown>(endPoint: EndPoint, data: Data): Promise<T> => {
    let url = BASE_URL

    try {
        const response = await fetch(`${url}/${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
