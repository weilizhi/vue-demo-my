import {GETADDRESS} from './mutation-types'
import $http from '@/api'
const OK=0
export default {
  async getAddress(store) {
   const body= await $http.msite.getPosition({
      'latitude': store.state.latitude, 
      'longitude':store.state.longitude,
    })
    console.log(body);
    if(body.code===OK){
      store.commit(GETADDRESS,body.data)
      
    }
  }
}