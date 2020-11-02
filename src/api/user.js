import { post, get, put, delPost } from '@/libs/http'

export function login(data) {
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
export function GetUser(data) {
    return get('/api/UserManager/users', data)
}
// 新增用户
export function AddUser(data) {
    return post('/api/UserManager/create', data)
}
// 修改用户信息
export function EditUserInfo(data) {
    return put('/api/UserManager/edit', data)
}
// 获取角色
export function GetRoles() {
    return get('/api/RoleManager/roles')
}
// 获取用户详细信息
export function GetUserInfo(data) {
    return get('/api/UserManager/userdetail/' + data)
}
// 修改用户权限
export function SetUserRole(data) {
    return post('/api/UserManager/setuserrole', data)
}
// 删除用户
export function DelUser(data) {
    console.log(data)
    return delPost('/api/UserManager/delete', data)
}

// 重置用户密码
export function RePassword(data) {
    return put('/api/User/resetpwd', data)
}
