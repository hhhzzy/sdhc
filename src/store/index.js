import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import user from './module/user'
import permission from './module/permission'
import getters from './getters'

export default new Vuex.Store({
    state: {},
    actions: {},
    mutations: {},
    modules: {
        user,
        permission
    },
    getters
})
