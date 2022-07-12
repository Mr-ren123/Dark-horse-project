<template>
  <div>
    <!-- 标题导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 登录表单烂 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        :rules="userFormRules.mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"> </i
      ></van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"> </i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="3000 * 5"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            class="van-button-bn"
            native-type="button"
            round
            size="small"
            type="default"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template></van-field
      >
      <div style="margin: 16px" class="sendbtn">
        <van-button class="sendbtnback" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginApi, sendSmsApi } from "@/api"
export default {
  data() {
    return {
      user: {
        code: "",
        mobile: "",
      },
      // 倒计时组件控制
      isCountDownShow: false,
      // 表单验证规则
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    }
  },

  methods: {
    async onSendSms() {
      console.log("onSendSms")
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate("mobile")
        console.log("验证通过")
      } catch (err) {
        return console.log("验证失败", err)
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        await sendSmsApi(this.user.mobile)
        this.$toast("发送成功")
      } catch (err) {
        // 发送失败，关闭倒计时
        // console.log(err)
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast("发送太频繁了，请稍后重试")
        } else {
          this.$toast("发送失败，请稍后重试")
        }
      }
    },
    async onSubmit() {
      // 获取信息
      const user = this.user
      //登录提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      })

      // 发送登录请求
      try {
        const res = await loginApi(user)
        console.log("登录成功", res)
        this.$store.commit("setUser", res.data.data)
        this.$toast.success("登录成功")
      } catch (err) {
        console.log(err)
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码格式不正确")
        } else {
          this.$toast.fail("登录失败")
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 19px;
}
.van-button-bn {
  background-color: #ededed;
  height: 23px;
  width: 80px;
  font-size: 11px;
  color: #666666;
  line-height: 23px;
  // border-left: 1px solid #666666;
}
.sendbtn {
  padding: 27px 14px;
}
.sendbtnback {
  background-color: #6db4fb;
  border: none;
}
.send-sms-btn {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
</style>
