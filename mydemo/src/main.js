// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入你的store仓库
import store from './store'

//全局引入重置样式表
import './assets/css/normalize.css'
import './assets/css/reset.css'
//全局引入rem布局文件
import './assets/js/remScale.js'

//引入vantUi框架
import VantUI from 'vant'
Vue.use(VantUI)
import 'vant/lib/index.css'

//引入封装好的全局过滤器
import comFilter from './filter'
for(let i in comFilter){
  Vue.filter(i,comFilter[i])
}
//引入封装好的全局组件
import comComponent from './common'
for(let i in comComponent){
  Vue.component(i,comComponent[i])
}

//在vue原型上挂载一个服务器地址
Vue.prototype.$imgUrl='http://localhost:3000'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
