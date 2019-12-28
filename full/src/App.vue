<template>
  <div id="app">
    
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  import {mapActions} from 'vuex'
  //import {mapState} from 'vuex'
  export default {
    name: 'app',
    methods:{
...mapActions(['autoLogin'])
    },
  components:{
    FooterGuide
  },
  created(){
    //检验token是否存在以及有效，并且这是一个action操作。
    this.autoLogin()
  }
  }
</script>

<style scoped lang="stylus">
 #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
    overflow hidden
</style>
