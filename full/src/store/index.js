import Vue from 'vue'
import  Vuex from 'vuex'
import Login from './Modules/Login/Login'
import Msite from './Modules/Msite/Msite'
Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    Login,
    Msite,
  }
  
})