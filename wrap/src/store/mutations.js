import {
  GETADDRESS,
  GETCATEGORIES,
  GETSHOPS,
  GETUSER,
  RESETUSER,
  AUTOLOGIN,
} from './mutation-types'
export default {
  [GETADDRESS](state, address) {
    state.address = address
  },
  [GETSHOPS](state, shops) {
    state.shops = shops
  },
  [GETCATEGORIES](state, categories) {
    state.categories = categories
  },
  [GETUSER](state, user) {
    state.user = user;
    state.token=user.token;
  },
  //不需要数据参数
[RESETUSER](state){
  state.user={}, //退出时清空登录信息
  state.token='' //清除的时候也要将token清除
},
[AUTOLOGIN](state, user) {
  state.user = user;
},
}