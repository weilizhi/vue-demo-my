<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: loginWay === `message` }"
            @click="loginWay = `message`"
          >短信登录</a>
          <a
            href="javascript:;"
            :class="{ on: loginWay === `password` }"
            @click="loginWay = `password`"
          >密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{ on: loginWay === `message` }">
            <section class="login_message">
              <input
                v-model.trim="phoneNumber"
                type="tel"
                maxlength="11"
                name="phone"
                v-validate="'required|mobile'"
                placeholder="手机号"
              />
              <span style="color: red" v-show="errors.has('phone')">
                {{
                errors.first("phone")
                }}
              </span>
              <button
                :disabled="!isRightphoneNumber||(times>0)"
                class="get_verification"
                :class="{hightLight:isRightphoneNumber}"
                @click.prevent="getCode"
              >{{times>0?`验证码已发送(${times}s)`:`获取验证码`}}</button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
                name="code"
                v-validate="{ required: true, regex: /^\d{6}$/ }"
              />
              <span style="color: red;" v-show="errors.has('code')">
                {{
                errors.first("code")
                }}
              </span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: loginWay === `password` }">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                  name="name"
                  v-validate="'required'"
                />
                <span style="color: red;" v-show="errors.has('name')">
                  {{
                  errors.first("name")
                  }}
                </span>
              </section>
              <section class="login_verification">
                <input
                  :type="right ? `text` : `password`"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                  name="pwd"
                  v-validate="'required'"
                />
                <div class="switch_button" :class="right ? `on` : `off`" @click="right = !right">
                  <div class="switch_circle" :class="{ right: right }"></div>
                  <span class="switch_text">123</span>
                </div>
                <span style="color: red;" v-show="errors.has('pwd')">
                  {{
                  errors.first("pwd")
                  }}
                </span>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                  name="captcha"
                  v-validate="{ required: true, regex: /^[0-9a-zA-Z]{4}$/ }"
                />
                <img
                  ref="captcha"
                  @click="getCaptcha"
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                />
                <span style="color: red;" v-show="errors.has('captcha')">
                  {{
                  errors.first("captcha")
                  }}
                </span>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.replace(`/Profile`)">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Toast } from "vant";
const OK = 0;
const ERROR = 1;
export default {
  name: "Login",
  data() {
    return {
      loginWay: "message", //根据判断是短信message登录还是密码登录password，显示相应的页面。
      phoneNumber: "",
      times: 0,
      reg_phone: /^1\d{10}$/gim, //手机号
      right: false,
      code: "",
      name: "",
      pwd: "",
      captcha: ""
    };
  },
  methods: {
    //登录失败时候清空以下数据h
    resetData() {
      this.code = "";
      this.name = "";
      this.pwd = "";
      this.captcha = "";
      this.phoneNumber = "";
    },
    ...mapActions(["getUser"]),
    getCaptcha() {
      this.$refs.captcha.src = `http://localhost:4000/captcha?time=${new Date().getTime()}`;
    },
    async getCode() {
      clearInterval(this.timer);
      //倒计时
      this.times = 60;
      this.timer = setInterval(() => {
        if (this.times > 0) {
          this.times--;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
      //获取验证码

      const body = await this.$http.login.sendcode({
        phone: this.phoneNumber
      });
      if (body.code === OK) {
        Toast.success("验证码发送成功");
      } else if (body.code === ERROR) {
        Toast.fail("验证码发送失败");
      }
      //短信请求发送成功，将倒计时定时器停止
      this.times = 0;
    },
    async login() {
      if (this.loginWay === "message") {
        const messageFlag = await this.$validator.validateAll([
          "phone",
          "code"
        ]);
        if (messageFlag) {
          this.getUser({
            loginWay: this.loginWay,
            phone: this.phoneNumber,
            code: this.code,
            resetData: this.resetData
          });
        }
      } else if (this.loginWay === "password") {
        const passwordFlag = await this.$validator.validateAll([
          "name",
          "pwd",
          "captcha"
        ]);
        if (passwordFlag) {
          this.getUser({
            loginWay: this.loginWay,
            name: this.name,
            pwd: this.pwd,
            captcha: this.captcha,
            getCaptcha: this.getCaptcha,
            resetData: this.resetData
          });
          // console.log(this.getUser);
        }
      }
    }
  },
  computed: {
    isRightphoneNumber() {
      return this.reg_phone.test(this.phoneNumber);
      //以1开头的11位数字
      // return /^1\d{10}$/.test(this.phone);
    },
    //销毁定时器，以免影响每次点击倒计时的时间累加
    destroyed() {
      clearInterval(this.timer);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';

.loginContainer 
  width 100%
  height 100%
  background #fff

  .loginInner  
    padding-top 60px
    width 80%
    margin 0 auto

    .login_header 
      .login_logo 
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      

      .login_header_title 
        padding-top 40px
        text-align center

        >a 
          color #333
          font-size 14px
          padding-bottom 4px

          &:first-child 
            margin-right 40px
          

          &.on 
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
          
        
      
    

    .login_content 
      >form 
        >div 
          display none

          &.on 
            display block
          

          input 
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial

            &:focus 
              border 1px solid #02a774
            
          

          .login_message 
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .get_verification 
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent

              &.hightLight 
                color green 
                font-weight 700
                
              

          .login_verification 
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .switch_button 
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50
              right 10px
              transform translateY(-50%)

              &.off 
                background #fff

                .switch_text 
                  float right
                  color #ddd
                
              

              &.on 
                background #02a774
              

              >.switch_circle 
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s

                &.right 
                  transform translateX(27px);
                
              
            
          

          .login_hint 
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px

            >a 
              color #02a774
            
          
        

        .login_submit 
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
        
      

      .about_us 
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
      
    

    .go_back 
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px

      >.iconfont 
        font-size 20px
        color #999
      
    
  

</style>
