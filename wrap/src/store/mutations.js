import {GETADDRESS,GETCATEGORIES,GETSHOPS} from './mutation-types'
export default {
  [GETADDRESS](state,address){
state.address=address
  },
  [GETSHOPS](state,shops){
    state.shops=shops
      },
  [GETCATEGORIES](state,categories){
    state.categories=categories
      },

}