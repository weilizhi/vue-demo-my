<template>
  <div id="app">
    
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  //import {mapState} from 'vuex'
  export default {
    name: 'app',
  components:{
    FooterGuide
  },
  
  }
</script>

<style scoped lang="stylus">
 
</style>
