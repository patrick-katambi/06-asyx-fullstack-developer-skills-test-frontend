const baseUrl = 'http://localhost:8000'
// const baseUrl = 'http://127.0.0.1:8000'
const baseApiUrl = `${baseUrl}/api`
const userApiUrl = `${baseApiUrl}/user`

export const urls = {
    user: { register: `${userApiUrl}/register` },
    ticket: {getAll: `${baseApiUrl}/tickets`}
}