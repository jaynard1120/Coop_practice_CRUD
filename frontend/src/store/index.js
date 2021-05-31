import Vue from 'vue'
import Vuex from 'vuex'
import loans from './modules/index'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    loans,
  },
  strict: process.env.DEV,
})
