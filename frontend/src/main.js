import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import axios from 'axios'
import router from './router'
import store from './store'
import App from './App.vue'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'

// Global Components
import './global-components'

// Global variable
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
