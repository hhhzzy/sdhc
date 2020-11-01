import { post, get } from '@/libs/http'

export function login(data) {
    console.log(data)
    return post('/api/User/login', data)
}
export function getUserInfo(data) {
    return get('/api/User')
}
// 获取所有单位
export function GetOrganization() {
    return get('/api/UserManager/organizations')
}
// 获取所有用户
export function GetUser() {
    return get('/api/UserManager/users')
}
// 新增用户
export function AddUser(data) {
    return post('/api/UserManager/create', data)
}
// 获取角色
export function GetRples() {
    return get('/api/RoleManager/roles')
}
