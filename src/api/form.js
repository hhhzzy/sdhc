// 表单页接口
import { get, post, del } from '@/libs/http'
// 获取详情
export function GetProjectDetail(data) {
    return get('/api/MineCheck/GetProjectBaseDetailAsync/' + data)
}
// 新增项目
export function SaveProject(data) {
    return post('/api/MineCheck/SaveProjectBaseAsync', data)
}
// 删除核查资料
export function DeleteAttach(data) {
    console.log(data)
    return del('/api/MineCheck/Deleteattach/' + data)
}
