<template>
  <div class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link slot="search" to="/search" class="header_search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link slot="login" to="/login" class="header_login">
        <span class="header_login_text">登录|注册</span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(categoryItem, Index) in categoryArray"
            :key="Index"
          >
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(category, Cindex) in categoryItem"
              :key="Cindex"
            >
              <div class="food_container">
                <img :src="baseImgUrl + category.image_url" />
              </div>
              <span>{{ category.title }}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList />
    </div>
  </div>
</template>

<script>
import HeaderTop from "components/HeaderTop/HeaderTop";
import ShopList from "components/ShopList/ShopList";
import { mapActions, mapState } from "vuex";
import _ from "lodash"; //使用chunk方法将原数组拆分成按个数分配的新数组,(每份放8个自己根据场景设置)
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  name: "Msite",
  methods: {
    ...mapActions(["getAddress", "getCategories"]),

    swiperRender() {
      new Swiper(".swiper-container", {
        autoplay: true,
        pagination: {
          el: ".swiper-pagination"
        }
      });
    }
  },
  components: {
    HeaderTop,
    ShopList
  },
  computed: {
    // ...mapState(["address", "categories", "baseImgUrl"]),
    ...mapState(
      { address: state => state.Msite.address,
       categories: state => state.Msite. categories,
       baseImgUrl: state => state.Msite.baseImgUrl}),
    categoryArray() {
      return _.chunk(this.categories, 8);
    }
  },
  //在生命周期钩子中调用
  async created() {
    this.getAddress();
    await this.getCategories(this.swiperRender);
    this.swiperRender(); //完全渲染成功后才会不会有问题。确保用户这边的渲染环境也没有问题
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixins.styl';
.msite
  width 100%
  .header
    background-color #02a774
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px

    .header_search
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 10%
      height 50%

      .icon-sousuo
        font-size 25px
        color #fff



    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      text-align center

      .header_title_text
        font-size 20px
        color #fff
        display block



    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)

      .header_login_text
        color #fff


  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff

    .swiper-container
      width 100%
      height 100%

      .swiper-wrapper
        width 100%
        height 100%

        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap

          .link_to_food
            width 25%

            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0

              img
                display inline-block
                width 50px
                height 50px


            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666


      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774


  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff

    .shop_header
      padding 10px 10px 0 10px

      .shop_icon
        margin-left 5px
        color #999


      .shop_header_title
        color #999;
        font-size 14px
        line-height 20px
</style>
