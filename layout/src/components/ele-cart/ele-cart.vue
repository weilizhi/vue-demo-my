<template>
  <div>
    <div class="shop-cart" >
      <div class="left" @click="flodFn">
        <div class="shop-wrap" :class="{ highLight: totalPrice > 0 }">
          <div class="logo">
            <i class="shopping_cart icon-shopping_cart"></i>
          </div>
          <span class="qipao" v-show="totalCount > 0">{{ totalCount }}</span>
        </div>
        <div class="totalPrice">
          <span :class="{ highLight: totalPrice > 0 }">￥{{ totalPrice }}</span>
        </div>
        <div class="deliveryPrice">
          <span>另需配送费￥{{ deliveryPrice }}</span>
        </div>
      </div>
      <div
        class="right"
        :class="{ highlight: this.totalPrice >= this.minPrice }"
      >
        <span>{{ payText }}</span>
      </div>
    </div>
    <transition name="shopCartList">
      <div class="list" v-show="showList">
        <div class="header">
          
          <h2 class="title">购物车</h2>
          <span class="clear">清空</span>
        </div>
        <div class="content" ref="shopCartListContent">
          <ul>
            <li
              class="selectedFood"
              v-for="(selectedFood, selecteIndex) in selectedFoods"
              :key="selecteIndex"
            >
              <span class="name left">{{ selectedFood.name }}</span>
              <div class="right">
                <span class="price"
                  >¥{{ selectedFood.count * selectedFood.price }}</span
                >
                <ele-control class="control" :food="selectedFood">
                </ele-control>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- v-show="!mask" @click="mask" -->
    <div class="mask" v-show="showList" @click="flod=true" ></div>
  </div>
</template>
<script>
import control from "components/ele-control/ele-contorl.vue";
import BScroll from "better-scroll";
export default {
  name: "ele-cart",
  props: {
    selectedFoods: Array,
    deliveryPrice: Number,
    minPrice: Number
  },
  data() {
    return { flod:true };
  },
  components: { "ele-control": control },
  methods: {
    flodFn(){
      if(this.totalCount <= 0){
        return
      }
      return !this.fold
    },
    clear(){
      this.$emit('clear')
    },
    addCount(food){
      this.$emit('addCount',food)
    },
    removeCount(food){
      this.$emit('removeCount',food)
    }
  },
  computed: {
    totalPrice() {
      let totalPrice = 0;
      this.selectedFoods.forEach(food => {
        totalPrice += food.count * food.price;
      });
      return totalPrice;
    },
    totalCount() {
      let totalCount = 0;
      this.selectedFoods.forEach(food => {
        totalCount += food.count;
      });
      return totalCount;
    },
    payText() {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        return `还差¥${this.minPrice - this.totalPrice}起送`;
      } else {
        return `去结算`;
      }
    },
    showList() {
      if (this.totalCount <= 0) {
        this.fold=true
        return false
      }
      return !this.flod
    }
  },
  mounted() {
    new BScroll(this.$refs.shopCartListContent);
  }
};
</script>

<style scoped lang="stylus">
@import "../../common/stylus/mixin.styl"
.shop-cart
    display flex
    position fixed
    z-index 3
    bottom 0
    left 0
    width 100%
    height 48px
    background #141d27
    .left
        display flex
        flex 1
        .shop-wrap
            display flex
            align-items center
            justify-content center
            position relative
            top -10px
            width 56px
            height 56px
            margin-left 12px
            margin-right 12px
            border-radius 50%
            background #141d27
            &.highLight
                .logo
                    background rgba(0,160,220,1)
                    .shopping_cart
                      color rgba(255,255,255,1)
            .logo
                display flex
                align-items center
                justify-content center
                width 44px
                height 44px
                border-radius 50%
                background rgba(255,255,255,.4)
                .shopping_cart
                    font-size 24px
                    line-height 24px
                    color rgba(255,255,255,.6)
            .qipao
                position absolute
                right 0
                top 0
                width 24px
                height 16px
                background rgba(240,20,20,1)
                color white
                text-align center
                border-radius 6px
                box-shadow 0px 4px 8px 0px rgba(0,0,0,.4)
                font-size 9px
                line-height 16px
        .totalPrice
            display flex
            align-items center
            justify-content center
            span
                display inline-block
                border-right 1px solid rgba(255,255,255,.5)
                padding-right 12px
                font-size 16px
                line-height 24px
                color rgba(255,255,255,.4)
                font-weight 700
                &.highLight
                    color rgba(255,255,255,1)
        .deliveryPrice
            display flex
            align-items center
            justify-content center
            padding-left 12px
            span
                font-size 16px
                line-height 24px
                color rgba(255,255,255,.4)
                font-weight 200

    .right
        flex 0 0 105px
        background rgba(255,255,255,.4)
        display flex
        align-items center
        justify-content center
        &.highlight
            background green
            span
                font-weight 800
                color rgba(255,255,255,1)
        span
            color rgba(255,255,255,.6)
.list
    position absolute
    left 0
    bottom  0
    z-index 2
    width 100%
    .header
        one-px(rgba(7,17,27,.1))
        background #f3f5f7
        padding 0 18px
        height 40px
        .title
            float left
            font-size 14px
            font-weight 200
            color rgba(7,17,27,1)
            line-height 40px

        .clear
            float right
            font-size 12px
            color rgba(0,160,220,1)
            line-height 40px

   .content
        max-height 218px
        overflow hidden
        background rgba(255,255,255,1)
        .selectedFood
            one-px(rgba(7,17,27,.1))
            padding  12px 18px
            height 48px

            .left
                float left
                font-size 14px
                color rgba(7,17,27,1)
                line-height 24px

            .right
                float right
                display flex
                align-items center
                .price
                    font-size 14px
                    font-weight 700
                    color rgba(240,20,20,1)
                    line-height 24px
                    margin-right 12px
                    display inline-block
                .control
                    width 88px
.mask
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 1
  background rgba(7,17,27,.6)
  backdrop-filter blur(10px)
</style>
