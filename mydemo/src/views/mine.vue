<template>
  <div>
    <div class="container">
      <!-- 导航栏 -->
      <div class="header">
        <go-back></go-back>
        <div class="header_text">个人中心</div>
        <div class="header_circle">
          <div class="header_circle1"></div>
          <div class="header_circle1"></div>
          <div class="header_circle1"></div>
        </div>
      </div>
      <!-- 个人中心详情 -->
      <div class="message" v-if="userInfo">
        <div class="message_img">
          <img src="@/assets/images/mine_images/head.jpg" alt="" />
        </div>
        <div class="message_text">
          <div class="message_text1">{{ userInfo.nickname }}</div>
          <div class="message_text2">V1</div>
        </div>
        <van-button @click="logout" plain type="info"
          >退出登录</van-button
        >
      </div>
      <div class="message" v-else>
        <div class="message_img">
          <img src="@/assets/images/mine_images/head.jpg" alt="" />
        </div>
        <div class="message_text">
          <div class="message_text1">临时用户</div>
          <div class="message_text2">V1</div>
        </div>
        <van-button @click="$router.push('/login')" plain type="info"
          >未登录,请登录</van-button
        >
      </div>
      <!-- session如果有信息 则渲染登录信息 -->

      <div class="list">
        <div class="list1">
          <div class="list1_img">
            <img src="@/assets/images/mine_images/icon_1.jpg" alt="" />
          </div>
          <div class="list1_text">全部订单</div>
        </div>
        <div class="list2">
          <div class="list2_img">
            <img src="@/assets/images/mine_images/icon_2.jpg" alt="" />
          </div>
          <div class="list2_text">代付款</div>
        </div>
        <div class="list3">
          <div class="list3_img">
            <img src="@/assets/images/mine_images/icon_3.jpg" alt="" />
          </div>
          <div class="list3_text">待收货</div>
        </div>
      </div>
      <div class="space"></div>
      <div class="nav">
        <div class="nav1">
          <div class="nav1_img1">
            <img src="@/assets/images/mine_images/icon_4.jpg" alt="" />
          </div>
          <div class="nav1_text">地址管理</div>
          <div class="nav1_img2">
            <img src="@/assets/images/mine_images/right.jpg" alt="" />
          </div>
        </div>
        <div class="nav1">
          <div class="nav1_img1">
            <img src="@/assets/images/mine_images/icon_5.jpg" alt="" />
          </div>
          <div class="nav1_text">我的钱包</div>
          <div class="nav1_img2">
            <img src="@/assets/images/mine_images/right.jpg" alt="" />
          </div>
        </div>
        <div class="nav1">
          <div class="nav1_img1">
            <img src="@/assets/images/mine_images/icon_6.jpg" alt="" />
          </div>
          <div class="nav1_text">我的优惠劵</div>
          <div class="nav1_img2">
            <img src="@/assets/images/mine_images/right.jpg" alt="" />
          </div>
        </div>
        <div class="nav1">
          <div class="nav1_img1">
            <img src="@/assets/images/mine_images/icon_7.jpg" alt="" />
          </div>
          <div class="nav1_text">我的二维码</div>
          <div class="nav1_img2">
            <img src="@/assets/images/mine_images/right.jpg" alt="" />
          </div>
        </div>
        <div class="nav1">
          <div class="nav1_img1">
            <img src="@/assets/images/mine_images/icon_8.jpg" alt="" />
          </div>
          <div class="nav1_text">我的小伙伴</div>
          <div class="nav1_img2">
            <img src="@/assets/images/mine_images/right.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: "",
    };
  },
  mounted() {
    this.userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : '';
  },
  methods:{
    logout(){
      //删除存储
      sessionStorage.removeItem('userInfo')
      this.$router.push('/login')
    }
  }
};
</script>

<style  lang="" scoped>
@import "../assets/css/mine.css";
.van-button--info {
  border: none;
  width: 2。1rem;
  height: 0.7rem;
  line-height: 0.7rem;
  text-align: center;
  margin-left: 1.8rem;
  margin-top: 0.6rem;
  font-size: 0.24rem;
  color: #f26b11;
  border-radius: 0.05rem;
}
</style>
