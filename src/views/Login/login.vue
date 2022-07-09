<template>
  <div>
    <!-- 标题导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 登录表单烂 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <i slot="left-icon" class="iconfont icon-shouji"> </i
      ></van-field>
      <van-field
        v-model="user.code"
        name="验证码"
        placeholder="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"> </i>
        <template #button>
          <van-button class="verificationCode" round size="small" type="default"
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
import { login } from "@/api/login";
export default {
  name: "login",
  data() {
    return {
      user: {
        code: "246810",
        mobile: "13911111111",
      },
    };
  },
  methods: {
    async onSubmit() {
      // 获取信息
      const user = this.user;

      //登录提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      // 发送登录请求
      try {
        const res = await login(user);
        console.log("登录成功", res);
        this.$toast.success("登录成功");
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码格式不正确");
        } else {
          this.$toast.fail("登录失败");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 19px;
}
.verificationCode {
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
</style>
