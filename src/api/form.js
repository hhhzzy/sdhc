// 表单页接口
import { get, post } from '@/libs/http'
// 获取详情
export function GetProjectDetail(data) {
    return get('/api/MineCheck/GetProjectBaseDetailAsync/' + data)
}
// 新增项目
export function SaveProject(data) {
    return post('/api/MineCheck/SaveProjectBaseAsync', data)
}
