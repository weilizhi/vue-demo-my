export default {
  //发送一次性验证码接口
  sendcode: {
    url: "/sendcode",
    method: "get",
    corsUrl: '/4000' //代表当前地址是需要跨域的
  },
  //发送短信验证登录请求接口
  loginSms: {
    url: "/login_sms",
    method: "post",
    corsUrl: '/4000' //代表当前地址是需要跨域的
  },
  //发送密码登录请求接口
  loginPwd: {
    url: "/login_pwd",
    method: "post",
    corsUrl: '/4000', //代表当前地址是需要跨域的
  },

}