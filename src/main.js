import Vue from 'vue'
console.log(Vue.use);
import App from './App.vue'
import router from '@/router' // 路由对象
import "@/styles/index.less"
import store from "@/store/index"


//引入字体图标
import "@/assets/iconfont/iconfont.css"
//引入vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';
//动态加载rem单位
import "amfe-flexible"
Vue.use(Vant);


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
   router,
}).$mount('#app')
