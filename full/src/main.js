import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import http from "@/api"
import store from "@/store"
import "./validate"
import "./mock"
import '@/common/stylus/style.styl'
import '@/common/stylus/transitions.styl'
import './filters/filters'
Vue.prototype.$http = http
Vue.config.productionTip = false;
import split from 'components/ele-split/ele-split.vue'
// 注册为全局组件标签
Vue.component('ele-split', split)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');