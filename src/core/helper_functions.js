import axios from 'axios'
import { requestHeaders } from './headers'

export async function getRequest(props) {
    const url = props.url
    const config = { headers: requestHeaders }
    const response = await axios.get(url, config)
    return response.data
}

export async function postRequest(props) {
    const url = props.url
    const data = props.data
    const config = { headers: requestHeaders }
    console.log({url, data, config})
    const response = await axios.post(url, data, config)
    console.log('aaaaaa')
    console.log({response})
    return response.data
}