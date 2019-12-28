<template>
  <div class="cart-control">
    <transition name="cartControlRemove">
      <i class="remove damu-remove_circle_outline" v-show="food.count>0" @click="removeCount"></i>
    </transition>
    <transition name="cartControlRemove">
      <span class="text" v-show="food.count>0">{{food.count}}</span>
    </transition>
    <i class="add damu-add_circle" @click="addCount"></i>
  </div>
</template>

<script>
export default {
  name: "ele-control",
  props: {
    food: { type: Object, require: true },
    goodIndex: { type: Number, require: false },
    foodIndex: { type: Number, require: false }
  },

  methods: {
    addCount() {
      //this.$emit("addCount",this.goodIndex,this.foodIndex)
      this.$emit("addCount", this.food);
    },
    removeCount() {
      //this.$emit("removeCount",this.goodIndex,this.foodIndex)
      this.$emit("removeCount", this.food);
    }
  }
};
</script>

<style scoped lang="stylus">
.cart-control {
  display: inline-block;
  font-size: 0;

  .add {
    position: relative;
    z-index: 1;
  }

  .remove, .add {
    display: inline-block;
    color: rgba(0, 160, 220, 1);
    font-size: 24px;
    line-height: 24px;
    vertical-align: middle;
  }

  .text {
    vertical-align: middle;
    display: inline-block;
    width: 24px;
    font-size: 10px;
    line-height: 24px;
    color: rgba(147, 153, 159, 1);
    text-align: center;
  }
}
</style>