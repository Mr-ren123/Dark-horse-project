<template>
  <div class="loginFrom-btn">
    <!-- 标题导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录"
      ><i slot="left" class="iconfont icon-youjiantou" @click="$router.back()"
        >返回</i
      >
    </van-nav-bar>
    <!-- 登录表单烂 -->
    <van-form @submit="onSubmit" ref="loginFrom">
      <van-field
        v-model.number="user.mobile"
        name="mobile"
        placeholder="手机号"
        :rules="userFromRules.mobile"
        maxlength="11"
        type="number"
      >
        <i slot="left-icon" class="iconfont icon-shouji"> </i
      ></van-field>
      <van-field
        v-model.number="user.code"
        name="code"
        placeholder="验证码"
        :rules="userFromRules.code"
        type="number"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"> </i>
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="SendVerificationCode"
            @finish="SendVerificationCode = false"
          />
          <van-button
            v-if="!SendVerificationCode"
            class="verificationCode"
            round
            size="small"
            type="default"
            @click="getCode"
            native-type="button"
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
//type=number 输入框只能输入数字 //maxlength="11" 输入框最大长度为11
//native-type="button" //禁止普通按钮触发表单提交
import { login, sendCode } from "@/api/login";
export default {
  name: "login",
  data() {
    return {
      user: {
        // code: "246810",
        // mobile: "13911111111",
        code: "",
        mobile: "",
      },
      userFromRules: {
        //手机号验证
        mobile: [
          //验证可以有多个对象
          {
            //验证手机号是否为空
            required: true,
            message: "请填写手机号",
          },
          {
            //验证手机号是否合法
            pattern: /^1[3456789]\d{9}$/,
            message: "请填写正确的手机号",
          },
        ],
        //验证码验证
        code: [
          {
            //验证验证码是否为空
            required: true,
            message: "请填写验证码",
          },
          {
            //验证验证码是否为空
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      //发送验证码显示倒计时
      SendVerificationCode: false,
    };
  },
  methods: {
    //登录请求
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
        const { data } = await login(user);
        // console.log("登录成功", res);
        this.$toast.success("登录成功");
        //把taken放到vuex中
        this.$store.commit("setUser", data.data);
        this.$router.push("/my");
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码格式不正确");
        } else {
          this.$toast.fail("登录失败");
        }
      }
    },
    //发送验证码
    async getCode() {
      //1.校验手机号是否合法
      try {
        //返回的是一个promise对象
        await this.$refs.loginFrom.validate("mobile");
      } catch (err) {
        // console.log(err);
        return;
      }

      //2.显示倒计时
      this.SendVerificationCode = true;
      //3.发送验证码请求
      try {
        await sendCode(this.user.mobile);
        this.$toast.fail("发送验证码成功");
      } catch (err) {
        //发送失败关闭倒计时
        this.SendVerificationCode = false;
        if (err.response.status === 429) {
          return this.$toast.fail("发送频繁");
        } else {
          this.$toast.fail("发送验证码失败");
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
.page-nav-bar {
  color: white;
}
.iconfont {
  font-size: 14px;
}
</style>
