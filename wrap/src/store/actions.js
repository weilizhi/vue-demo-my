import {
  GETADDRESS,
  GETSHOPS,
  GETCATEGORIES,
  GETUSER,
  RESETUSER,
  AUTOLOGIN,
} from './mutation-types'
//import $http from '@/api'
import router from '@/router'
import {
  Toast
} from 'vant'
import $http from '@/api'
const OK = 0;
const ERROR = 1;
//定义两个方法
function loginSuccess(commit, user, resetData) {
  //提交用户登录信息
  commit(GETUSER, user)
  //跳转到主页
  router.replace('/Msite')
  //清空登录界面的信息
  resetData()
   //将返回的token持久化localStorage中
   localStorage.setItem('ele-token',user.token)
}

function loginFail(error, loginWay, getCaptcha, resetData) {
  Toast.fail("登录失败 请校验参数", {
    duration: 3000
  })
  //登录失败，更新图片验证码
  if (loginWay === 'password') {
    //这是一个方法，判断是否登录失败
    getCaptcha()
  }
  //清空登录界面的信息                                                                                                          
  resetData()
 
}
export default {
  async getAddress(store) {
    const body = await $http.msite.getPosition({
      'latitude': store.state.latitude,
      'longitude': store.state.longitude,
    })
    //console.log(body);
    if (body.code === OK) {
      store.commit(GETADDRESS, body.data)
    }
  },
  async getShops(store) {
    const body = await $http.msite.getShops({
      'latitude': store.state.latitude,
      'longitude': store.state.longitude,
    })
    if (body.code === OK) {
      store.commit(GETSHOPS, body.data)
    }
  },
  async getCategories(store) {
    const body = await $http.msite.getCategories() //无参数，不需传
    if (body.code === OK) {
      store.commit(GETCATEGORIES, body.data)
    }
  },
  //store等于commit
  async getUser({
    commit
  }, {
    loginWay,
    phone,
    code,
    name,
    pwd,
    captcha,
    getCaptcha,
    resetData,
  }) {
    let body = ''
    if (loginWay === 'message') {
      body = await $http.login.loginSms({
        phone,
        code
      })
    } else if (loginWay === 'password') {
      body = await $http.login.loginPwd({
        name,
        pwd,
        captcha
      })
    }
    body.code === OK && loginSuccess(commit, body.data, resetData)
    body.code === ERROR && loginFail(body.data, loginWay, getCaptcha, resetData)
  },
  async resetUser({commit}){
   commit(RESETUSER)
   //清除localStorage中的token
   localStorage.removeItem('ele-token')
   //第一种退出登录的地方
   //router.replace('/Login')
  },
  async autoLogin({commit}){
  const body= await $http.msite.autoLogin()
commit(AUTOLOGIN,body.data)
  }
}