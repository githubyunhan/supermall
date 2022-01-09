import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

/*安装toast插件*/
Vue.use(toast)

/*解决移动端300ms延迟*/
FastClick.attach(document.body)
Vue.use(VueLazyLoad,{
  loading: import('./assets/img/detail/detail_bottom.jpg')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
