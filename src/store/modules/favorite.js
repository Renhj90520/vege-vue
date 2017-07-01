import * as utils from '../../components/shared/utils'
import axios from 'axios'
import { baseUrl } from '../../components/shared/settings'

const state = {
  favorites: []
}

const getters = {
  favorites: state => {
    return state.favorites
  }
}

const mutations = {
  increment: (state, index) => {
    let product = state.favorites[index]
    product.Count = utils.add(product.Count, product.Step)
    state.favorites.splice(index, 1, product)
  },
  decrement: (state, index) => {
    let product = state.favorites[index]
    product.Count = utils.subtraction(product.Count, product.Step)
    if (product.Count < 0) {
      product.Count = 0
    }
    state.favorites.splice(index, 1, product)
  },
  setData: (state, data) => {
    state.favorites = data.favs
  }
}

const actions = {
  loadData: ({ commit }) => {
    let openid = sessionStorage.getItem('openid') || 'undefined' // TODO

    axios.get(baseUrl + 'favorites/' + openid).then(res => {
      if (res.data.state === 1) {
        res.data.body.forEach(f => {
          f.Count = 0
        })
        commit('setData', { favs: res.data.body })
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
