import { get, post, put, delPost } from '@/libs/http'
// 新增角色
export function CreateRole(data) {
    return post('/api/RoleManager/create', data)
}
// 获取角色信息
export function GetRoleInfo(data) {
    return get('/api/RoleManager/roleinfo/' + data)
}
// 获取角色信息权限
export function GetRolePerInfo(data) {
    return get('/api/RoleManager/permission/' + data)
}
// 编辑角色信息
export function EditRoleInfo(data) {
    return put('/api/RoleManager/edit', data)
}
// 编辑角色权限
export function SetPermission(data) {
    return put('/api/RoleManager/setpermission', data)
}
// 删除角色
export function DeleteRole(data) {
    return delPost('/api/RoleManager/delete', data)
}

