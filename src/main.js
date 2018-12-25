import Vue from 'vue'
import App from './App.vue'
import './cube-ui'
import './register'

// 引入静态资源
import 'common/stylus/index.styl'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
