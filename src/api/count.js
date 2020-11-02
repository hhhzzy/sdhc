// 表单页接口
import { post } from '@/libs/http'
// 获取详情
export function GetCkTable() {
    return post('/api/MineCheck/StatisticMiningGeneralAsync')
}
