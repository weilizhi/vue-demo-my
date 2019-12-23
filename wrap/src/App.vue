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
    this.autoLogin()
  }
  }
</script>

<style scoped lang="stylus">
 
</style>
