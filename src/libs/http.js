import axios from 'axios'

import url from './url'
import router from '../router'
import * as aeshelper from './aeshelper'
import { Message } from 'iview'
import { removeToken } from './token'

// todo 这里生成随机key
function getRandKey() {
    const randomStr = Math.random().toString(36).substr(2, 6)
    return randomStr
}
const key = getRandKey()
// todo 获取加密token
function getToken(key) {
    const tokenValue = aeshelper.RsaEncrypt(key)
    if (tokenValue.length !== 512) {
        const key = this.getRandKey()
        this.getToken(key)
        return
    }
    return tokenValue
}
// 解密得到的结果
function pipedata(result) {
    const content = aeshelper.SignAndDecrypt(
        result.data,
        result.sign,
        key
    )
    return JSON.parse(content)
}

const ajax = axios.create({
    baseURL: url, // 请求地址
    timeout: 30000 // 请求超时
})
let requestNum = 0 // 请求的数量
ajax.defaults.headers.post['Content-Type'] = 'application/json' // post 的 请求头设置
ajax.defaults.headers.put['Content-Type'] = 'application/json' // put 的 请求头设置
ajax.defaults.headers.delete['Content-Type'] = 'application/json' // delete 的 请求头设置
// 请求拦截
ajax.interceptors.request.use(config => {
    // 每次请求之前判断vuex中的token是否存在（也可以存在stroge里面）
    // 如果存在，则统一在请求的header中加上token，后台判断是否登录
    // 即使存在token，也有可能过期，所以在响应拦截中也要判断状态
    const token = localStorage.getItem('hzy_admin')
    token && (config.headers.Authorization = 'Bearer ' + token) // jwt验证
    // 加密
    config.headers.token = getToken(key)
    // 全局loading
    if (requestNum === 0) {
        console.log('展示loading')
    }
    requestNum++
    return config
}, error => {
    return Promise.error(error)
})
// 响应拦截
ajax.interceptors.response.use(
    (response) => {
        // 隐藏loading
        requestNum--
        if (requestNum === 0) {
            console.log('隐藏loading')
        }
        if (response.data.errorInfo) {
            Message.error(response.data.errorInfo)
            if (response.data.statusCode === 401) {
                console.log(router)
                // 移除token
                removeToken()
                router.push({
                    path: `/login` // 退出后重新登录回到当前页面
                })
                console.log(response.data.statusCode)
            }
        }
        return response
    },
    // 状态码提示
    (err) => {
        if (err && err.response) {
            switch (err.response.status) {
            case 400:
                err.message = '请求错误(400)'
                break
            case 401:
                // 到登录页面
                router.push({
                    path: 'login'
                })
                err.message = '未授权，请重新登录(401)'
                break
            case 403:
                // 删除token
                localStorage.removeItem('token')
                // 跳转到登录页面可以吧当前浏览的页面传过去，登录成功后返回当前页面
                router.push({
                    path: 'login',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                })
                err.message = '拒绝访问(403)'
                break
            case 404:
                err.message = '请求出错(404)'
                break
            case 408:
                err.message = '请求超时(408)'
                break
            case 500:
                err.message = '服务器错误(500)'
                break
            case 501:
                err.message = '服务未实现(501)'
                break
            case 502:
                err.message = '网络错误(502)'
                break
            case 503:
                err.message = '服务不可用(503)'
                break
            case 504:
                err.message = '网络超时(504)'
                break
            case 505:
                err.message = 'HTTP版本不受支持(505)'
                break
            default:
                err.message = `连接出错(${err.response.status})!`
            }
        } else {
            err.message = '连接服务器失败!'
        }
        return Promise.reject(err.message)
    }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 */
export function get(url, data) {
    return new Promise((resolve, reject) => {
        ajax.get(url, { params: data })
            .then(res => {
                resolve(pipedata(res.data))
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        const dataStr = JSON.stringify(params)
        const dataStrAes = aeshelper.AesEncrypt(dataStr, key) // 加密后的传输数据
        ajax.post(url, dataStrAes)
            .then(res => {
                resolve(pipedata(res.data))
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
/**
 * del方法，对应delete请求，path传参数
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 */
export function del(url, data) {
    return new Promise((resolve, reject) => {
        ajax.delete(url)
            .then(res => {
                resolve(pipedata(res.data))
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 */
export function delPost(url, params) {
    return new Promise((resolve, reject) => {
        const dataStr = JSON.stringify(params)
        const dataStrAes = aeshelper.AesEncrypt(dataStr, key) // 加密后的传输数据
        console.log(dataStrAes)
        ajax.delete(url, { data: dataStrAes })
            .then(res => {
                resolve(pipedata(res.data))
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 */
export function put(url, params) {
    return new Promise((resolve, reject) => {
        const dataStr = JSON.stringify(params)
        const dataStrAes = aeshelper.AesEncrypt(dataStr, key) // 加密后的传输数据
        ajax.put(url, dataStrAes)
            .then(res => {
                resolve(pipedata(res.data))
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
export default ajax
