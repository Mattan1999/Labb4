import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueOffline from 'vue-offline'

import './main.scss'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueOffline)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
