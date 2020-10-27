import Vue from 'vue'
import App from './App.vue'

import Axios from './libs/http.js'
import iView from 'iview'
import store from './store/index'
import Router from './router/index'
import 'iview/dist/styles/iview.css'
require('../mock/mock')

Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.use(iView)
new Vue({
    router: Router,
    store,
    render: h => h(App)
}).$mount('#app')
