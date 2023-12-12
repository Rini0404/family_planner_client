


export function getQueryParam(url: string, param: string): string | null {
    const match = url.match(new RegExp(`${param}=([^&]*)`))
    return match ? match[1] : null
}