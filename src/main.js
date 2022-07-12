import Vue from 'vue'
// console.log(Vue.use)
import App from './App.vue'
import router from '@/router' // 路由对象
// 缓存
import store from './store'
// import request from '@/utils/request' // 请求模块
import "@/styles/index.less"

//引入字体图标
import "@/assets/iconfont/iconfont.css"

// import router from './router/index'
//引入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
//动态加载rem单位
import "amfe-flexible"
Vue.use(Vant)


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),

}).$mount('#app')