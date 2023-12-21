import { BASE_URL } from './baseUrl'

type EndPoint = string
type Data = Record<string, unknown>
type PostResponse = Promise<unknown>

export const post = async (endPoint: EndPoint, data: Data,): PostResponse => {
    let url = BASE_URL

    try {
        console.log(`${url}/${endPoint}`)
        const response = await fetch(`${url}/${endPoint}`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log('response: ', response);
        const jsonResponse = await response.json()

        return jsonResponse
    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
}
