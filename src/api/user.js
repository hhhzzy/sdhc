import { post, get } from '@/libs/http'

export function login(data) {
    console.log(data)
    return post('/api/User/login', data)
}
export function getUserInfo(data) {
    return get('/api/User', data)
}
