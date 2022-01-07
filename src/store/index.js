import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart1(state,payload) {
      let oldProduct = null;

      for (let item of state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item;
        }
      }

      if (oldProduct) {
        oldProduct.count += 1
      } else  {
        payload.count = 1
        state.cartList.push(payload)
      }
    },
    addCounter(state,payload) {
      payload.count++
    },
    addToCart(state,payload) {
      state.cartList.push(payload)
    }

  },
  actions: {
    addCart1(context,payload) {
      /*1.查找之前数组中是否有该商品*/
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      /*2.判断oldProduct*/
      if (oldProduct) {
        context.commit('addCounter',oldProduct)
      } else  {
        payload.count = 1
        /*context.state.cartList.push(payload)*/
        context.commit('addToCart',payload)
      }
    }
  }

})

export default store
