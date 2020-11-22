<template>
  <div>
    <div class="container">
      <div class="header">
        <div class="header">
          <go-back></go-back>
          <div class="header_text">登录</div>
          <div class="header_name">
            <button @click="$router.push('/register')">注册</button>
          </div>
        </div>
      </div>
      <div class="regCon">
        <!-- 表单项 -->
        <van-form @submit="login">
          <van-field
            v-model="loginInfo.phone"
            name="手机号"
            label="手机号"
            placeholder="请输入手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            v-model="loginInfo.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div class="btn">
            <van-button square block  native-type="submit">
              登录
            </van-button>
          </div >
          <div class="btn">
            <van-button square block @click="$router.push('/register')" 
              >未注册，先去注册</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogin } from "../util/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      loginInfo: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    //封装一个登录事件
    login() {
      getLogin(this.loginInfo).then((res) => {
        if (res.code == 200) {
          Toast.success(res.msg);
          //把数据存储到本地存储中
          sessionStorage.setItem('userInfo',JSON.stringify(res.list))
          //成功之后跳转到个人中心
          this.$router.push("/mine");
        } else {
          Toast.fail(res.msg);
        }
      });
    },
  },
};
</script>

<style  lang="" scoped>
@import "../assets/css/login.css";
.van-cell {
  margin-top: 0.5rem;
  border-bottom: 1px solid #999;
}
.btn {
  margin-top: 0.5rem;
}
.van-button {
  border: none;
}
</style>
