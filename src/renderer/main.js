import Vue from 'vue'
import axios from 'axios'
import moment from 'moment-timezone'

import App from './App'
import router from './router'
import store from './store'
import coreapi from 'coreapi'
import { WebSocketBridge } from 'django-channels'

const webSocketBridge = new WebSocketBridge()
const client = new coreapi.Client()
webSocketBridge.connect('ws://localhost:8000/binding/')
webSocketBridge.listen()

moment.tz.setDefault('UTC')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(require('moment-duration-format'))
Vue.http = Vue.prototype.$http = axios
Vue.moment = Vue.prototype.$moment = moment
Vue.client = Vue.prototype.$client = client
Vue.webSocketBridge = Vue.prototype.$bridge = webSocketBridge
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
