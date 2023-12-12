import { BASE_URL } from './baseUrl'

type UrlChosen = 'wix' | 'default'
type EndPoint = string
type Data = Record<string, unknown>
type PostResponse = Promise<unknown>

export const post = async (endPoint: EndPoint, data: Data, urlChosen: UrlChosen): PostResponse => {
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

        const jsonResponse = await response.json()

        return jsonResponse
    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
}
