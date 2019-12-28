import VueRouter from "vue-router";
import Vue from "vue";
import routes from "@/routes"
import store from '@/store'
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes,
  linkActiveClass: "active"
})
//全局前置守卫
router.beforeEach(async (to, from, next) => {
  if (to.path !== '/Login') {
    //不是去登录页，需要检验是否有token
    await store.dispatch('autoLogin')
    if (store.state.Login.user._id) {     
      next()
    } else {
      next('/Login')
    }
  } else {
    next() //判断去登录页直接放行
  }

})
//全局解析守卫
router.beforeResolve((to, from, next) => {
  next()
})
//全局后置守卫
router.afterEach((to, from) => {

})
export default router