// 列表页接口
import { get, post } from '@/libs/http'

// 获取区县
export function GetAllRegion(data) {
    return get('/api/Dictionary/GetAllRegionAsync', data)
}
// 数据字典
export function Dictionary(data) {
    return get('/api/Dictionary/GetAllEnableDictDataAsync', data)
}
// 核查项目添加
export function CreateProject(data) {
    return post('/api/MineCheck/CreateProjectAsync', data)
}
// 核查项目列表查询
export function GetMyProjects(data) {
    return post('/api/MineCheck/GetMyProjectsAsync', data)
}
