import http from '@/libs/http'

export function login(data) {
    return http({
        url: '/api/login',
        method: 'post',
        data
    })
}
export function getUserInfo(data) {
    return http({
        url: '/api/getUserInfo',
        method: 'post',
        data
    })
}
