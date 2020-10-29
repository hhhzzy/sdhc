import { login, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/libs/token'
const state = {
    token: getToken(),
    user: {},
    roles: []
}
const mutations = {
    SET_TOKENS: (state, data) => {
        console.log(1)
        state.token = data
    },
    SET_USERS: (state, data) => {
        state.user = data
    },
    SET_ROLES: (state, data) => {
        state.roles = data
    }
}
const actions = {
    login({ commit }, userInfo) {
        const { userName, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: userName, password: password })
                .then(res => {
                    console.log(res)
                    commit('SET_TOKENS', res)
                    setToken(res)
                    resolve(res)
                }, err => {
                    reject(err)
                })
        })
    },
    getUserInfo({ commit }, data) {
        return new Promise((resolve, reject) => {
            getUserInfo(data)
                .then(res => {
                    console.log(res)
                    // 添加临时的角色权限
                    res.roles = ['admin']

                    commit('SET_USERS', res)
                    commit('SET_ROLES', res.roles ? res.roles : [])
                    resolve(res)
                }, err => {
                    console.log(err)
                    reject(err)
                })
        })
    },
    signOut({ commit }) {
        console.log(11)
        return new Promise((resolve, reject) => {
            removeToken()
            commit('SET_TOKENS', '')
            commit('SET_USERS', '')
            commit('SET_ROLES', '')
            resolve()
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
