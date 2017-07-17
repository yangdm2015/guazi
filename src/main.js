// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router'
import permissions from '@/store/permission' // 权限控制
import '@/styles/index.scss' // 全局自定义的css样式

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
// 这样可以让axios使用.finally()方法
require('promise.prototype.finally').shim()

// console.log('router.options.routes = ', router.options.routes)
permissions.init({roles: {}, router: router.options.routes})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
