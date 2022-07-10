<template>
  <div>
    <div class="header" v-if="!user">
      <div class="login-btn" @click="$router.push('/login')">
        <img src="@/assets//mobile.png" alt="" />
        <span class="login-sign">登录 / 注册</span>
      </div>
    </div>
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image
            round
            fit="cover"
            class="img-info"
            :src="Information.photo"
          />
          <span class="name">{{ Information.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-info">
        <div class="data-item">
          <span>{{ Information.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{ Information.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{ Information.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{ Information.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      class="logout-cell"
      title="退出登录"
      center
      clickable
      v-if="user"
      @click="quitCode"
    />
  </div>
</template>

<script>
import { getInformation } from "@/api/login";
import { mapState } from "vuex";
export default {
  data() {
    return {
      Information: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    quitCode() {
      //组件中使用组件结构需要加上this.$
      this.$dialog
        .confirm({
          title: "确定退出吗？",
        })
        .then(() => {
          //确认退出删除vuex和本地存储的taken
          //直接把vuex里setItem设置为null
          //依赖这个数据的组件都会更新
          this.$store.commit("setUser", null);
        })
        .catch(() => {});
    },
    //获取用户信息
    async getFormation() {
      try {
        const { data } = await getInformation(this.user.token);
        this.Information = data.data;
      } catch (error) {
        this.$toast("获取用户信息失败");
      }
    },
  },
  //页面加载完成后获取用户信息
  created() {
    if (this.user) {
      this.getFormation();
    }
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 201px;
  background: url(@/assets/banner.png);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 66px;
    height: 66px;
  }
  .login-sign {
    color: #ffffff;
    font-size: 14px;
    margin-top: 8px;
  }
}
.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .base-info {
    width: 100%;
    height: 130px;
    // background-color: pink;
    z-index: 99;
    padding: 38px 16px 11.5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .img-info {
      width: 66px;
      height: 66px;
      border: 2px solid #fff;
    }
    .name {
      font-size: 20px;
      margin-left: 10px;
      color: #ffffff;
    }
  }
  .data-info {
    width: 100%;
    height: 70px;
    display: flex;
    .data-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 14px;
    }
  }
  .left {
    display: flex;
    align-items: center;
  }
}
.grid-nav {
  .grid-item {
    height: 70px;
    i.iconfont {
      font-size: 20px;
    }
    span {
      font-size: 14px;
    }
    i.icon-shoucang {
      color: #ffb6c5;
    }
    i.icon-lishi {
      color: #ffb961;
    }
  }
}
.logout-cell {
  text-align: center;
  color: #d86262;
  margin: 10px 0;
  font-size: 15px;
}
</style>
