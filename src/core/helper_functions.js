import axios from 'axios'
import { requestHeadersWithoutToken, requestHeadersWithToken } from './headers'

export async function getRequest(props) {
    const url = props.url
    const config = { headers: await requestHeadersWithToken(props.accessToken) }
    const response = await axios.get(url, config)
    return response.data
}

export async function postRequest(props) {
    const url = props.url
    const data = props.data
    const config = { headers: props.protected ? requestHeadersWithToken : requestHeadersWithoutToken }
    console.log({url, data, config})
    const response = await axios.post(url, data, config)
    return response.data
}