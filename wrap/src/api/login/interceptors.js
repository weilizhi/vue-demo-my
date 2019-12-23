import axios from "axios"
const axiosObj = axios.create({
  // baseURL:"http://localhost:4000/",
  timeout:15000
})

//const CrosUrl='/4000'
axiosObj.interceptors.request.use(function (config) {  
 return config;
}, function (error) {
  return Promise.reject(error);
});


axiosObj.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});


export default axiosObj
