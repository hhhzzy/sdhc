import { post } from '@/libs/http'

export function login(data) {
    console.log(data)
    return post('/api/User/login', data)
}
// export function getUserInfo(data) {
//     return http({
//         url: '/api/getUserInfo',
//         method: 'post',
//         data
//     })
// }
