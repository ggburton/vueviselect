import Vue from 'vue'
import axios from 'axios'
import moment from 'moment-timezone'

import App from './App'
import router from './router'
import store from './store'

moment.tz.setDefault('UTC')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.moment = Vue.prototype.$moment = moment
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
