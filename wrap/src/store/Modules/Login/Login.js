import {
  GETUSER,
  RESETUSER,
  AUTOLOGIN
} from '../../mutation-types'
import router from '@/router'
import {Toast} from 'vant'
import $http from '@/api'
const OK = 0;
const ERROR = 1;

function loginSuccess(commit, user, resetData) {
  //提交用户登录信息
  commit(GETUSER, user)
  //跳转到主页
  router.replace('/Msite')
  //清空登录界面的信息
  //resetData()
  //将返回的token持久化localStorage中
  localStorage.setItem('ele-token', user.token)
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
  //resetData()

}
export default {
  state: {
    user: {},
    token: localStorage.getItem('ele-token')
  },
  mutations: {
    [GETUSER](state, user) {
      state.user = user;
      state.token = user.token;
    },
    //不需要数据参数
    [RESETUSER](state) {
      state.user = {}, //退出时清空登录信息
        state.token = '' //清除的时候也要将token清除
    },
    [AUTOLOGIN](state, user) {
      state.user = user;
    },
  },
  actions: {
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
    async resetUser({
      commit
    }) {
      commit(RESETUSER)
      //清除localStorage中的token
      localStorage.removeItem('ele-token')
      //第一种退出登录的地方
      //router.replace('/Login')
    },
    async autoLogin({
      commit
    }) {
      try {
        const body = await $http.msite.autoLogin()
        if (body.code === OK) {
          //token在有效期内，在数据库中有对应的用户
          commit(AUTOLOGIN, body.data)
        } else if (body.code === ERROR) {
          //代表进入的时候token过期,之前的登录信息需要清除
          commit(RESETUSER)
          //清除localStorage中的token
          localStorage.removeItem('ele-token')
          Toast({
            message: body.msg,
            duration: 5000,
            type: 'fail',
            onClose() {
              router.replace('/Login')
            }
          })
        }
      } catch (e) {
        Toast({
          message: e.response.data.message,
          duration: 5000,
          type: 'fail',
          onClose() {
            router.replace('/Login')
          }
        })

      }
    }
  },
  getters: {},
}