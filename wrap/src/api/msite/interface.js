export default {
  getPosition: {
    url: "/position",
    method: "get",
    corsUrl: '/4000' //代表当前地址是需要跨域的
  },
  getShops: {
    url: "/shops",
    method: "get",
    corsUrl: '/4000'
  },
  getCategories: {
    url: "/index_category",
    method: "get",
    corsUrl: '/4000' //代表当前地址是需要跨域的
  }
}