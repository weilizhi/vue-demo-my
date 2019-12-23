<template>
  <div>
    <br />

    <span href="javascript:" class="goback" @click="$router.replace(`/Profile`)">
      <i class="iconfont icon-jiantou2"></i>
    </span>
    <br />
    <div style="text-align:center" margin:30px auto>
      <br />
      <h2 style="color:green" font-size:80px font-weight:700>个性化设置中心</h2>
      <br />
      <br />
      <br />
      <van-button type="primary" @click="logout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
//import {mapAction} from 'vuex'
export default {
  name: "UserDetail",
  components: {
    [Button.name]: Button
  },
  methods: {
    //...mapAction(['resetUser'])
    logout() {
      this.$store.dispatch("resetUser");
      //第二种退出登录的地方
      this.$router.push("/Login");
    }
  }
};
</script>
<style scoped lang="stylus">
.goback
  text-align left 
</style>
