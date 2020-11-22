<template>
  <div>
    <div class="container">
      <div class="header">
        <div class="header">
          <go-back></go-back>
          <div class="header_text">注册</div>
          <div class="header_name">
            <button @click="$router.push('/login')">登录</button>
          </div>
        </div>
      </div>
      <!-- 表单项 -->
      <div class="regCon">
        <van-form @submit="register">
          <van-field
            v-model="regInfo.nickname"
            name="昵称"
            label="昵称"
            placeholder="请输入昵称"
            :rules="[{ required: true, message: '请填写昵称' }]"
          />
          <van-field
            v-model="regInfo.phone"
            name="手机号"
            label="手机号"
            placeholder="请输入手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            v-model="regInfo.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div class="btn">
            <van-button square block  native-type="submit">
             注册
            </van-button>
          </div>
          <div class="btn">
            <van-button square block  native-type="submit" @click="$router.push('/login')">
             已有账号，快去登录
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import {getRegister} from '../util/axios'
import {Toast} from 'vant'
export default {
  data() {
    return {
        regInfo:{
            nickname:'',
            phone:'',
            password:''
        }
    };
  },
  methods:{
      register(){
         getRegister(this.regInfo)
         .then(res=>{
             if(res.code==200){
                Toast.success(res.msg)
                //成功之后跳转到登录页
                this.$router.push('/login')
             }else{
                 Toast.fail(res.msg)
             }
         })
      }
  }
};
</script>

<style  lang="" scoped>
@import "../assets/css/register.css";
.van-cell{
    margin-top: .5rem;
    border-bottom:1px solid #999;
}
.btn{
    margin-top: .5rem;
}
.van-button{
    border:none;
}
</style>
