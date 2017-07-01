import Vue from 'vue'
import Vuex from 'vuex'
import favorite from './modules/favorite'
// import axios from 'axios'
// var utils = require('../components/shared/utils')

Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: { favorite }
})
