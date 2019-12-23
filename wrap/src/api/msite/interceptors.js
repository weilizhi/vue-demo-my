import axios from "axios"
import store from '@/store'
import {
  Toast
} from 'vant'
import router from '@/router'
const axiosObj = axios.create({
  // baseURL:"http://localhost:4000/",
  timeout: 15000
})

//const CrosUrl='/4000'
axiosObj.interceptors.request.use(function (config) {
  if (config.url === '/4000/position') {
    config.url = `${config.url}/${config.params.latitude},${config.params.longitude}`;
    config.params = {} //params中不需要带东西，置为空
  }
  //config.url=CrosUrl+config.url
  //console.log(config);
  //请求头可以携带参数,这个方法会将所有的请求都带上token
  //config.headers.Authorization = store.state.token;
  //判断哪些接口2需要携带token
  if (config.headers.needToken) {
    config.headers.Authorization = store.state.token;
  }
  //为防止config被污染，将needToken清除，对象上删除属性
  delete config.headers.needToken
  return config;
}, function (error) {
  return Promise.reject(error);
});


axiosObj.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
 // console.dir(error)
  //拦截不带token的登录，无效登录
  Toast.loading({
    //判断是否存在error.response
    message: (error.response&&error.response.data&&error.response.data.message)?error.response.data.message:"token失效，请重新登录",
    duration: 5000,
    type: 'fail',
    onClose() {
      router.replace('/Login')
    }
  })

  return Promise.reject(error);
});


export default axiosObj