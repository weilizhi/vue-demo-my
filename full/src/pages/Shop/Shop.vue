<template>
  <div id="app">
    <ele-header :seller="seller"></ele-header>
    <div class="navs">
      <div class="item">
        <router-link :to="`/Shop/${id}/goods`">商品</router-link>
      </div>
      <div class="item">
        <router-link :to="`/Shop/${id}/ratings`">评价</router-link>
      </div>
      <div class="item">
        <router-link :to="`/Shop/${id}/sellers`">商家</router-link>
      </div>
    </div>
    <!-- keep-aliv是路由懒加载，属性：include中是决定哪个组件不需要二次请求渲染的，是优化路由加载的一种，还有路由懒加载 -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from "components/ele-header/ele-header.vue";

const OK = 0;
export default {
  name: "Shop",
  props: {
    id: String //id 为字符串覆盖范围广，有利于携带其他数据
  },
  data() {
    return {
      seller: {}
    };
  },
  components: {
    "ele-header": header
  },
  async mounted() {
    //根据id在当前数据库中寻找当前商家的数据

    const data = await this.$http.sellers.getSellers();
    if (data.errno === OK) {
      this.seller = data.body;
    }
  },
  //
  beforeRouteUpdate(to, from, next) {
    next();
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin.styl';

#app {
  .navs {
    one-px(rgba(7, 17, 27, 0.1));
    display: flex;
    height: 40px;
    line-height: 40px;

    .item {
      flex: 1;

      a {
        font-size: 14px;
        display: block;
        text-align: center;
        color: rgba(77, 85, 93, 1);

        &.active {
          color: rgba(240, 20, 20, 1);
        }
      }
    }
  }
}
</style>
