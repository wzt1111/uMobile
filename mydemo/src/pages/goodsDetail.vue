<template>
  <div>
    <div class="container">
      <div class="header">
        <go-back></go-back>
        <div class="header_text">商品详情</div>
        <div class="header_circle">
          <div class="header_circle1"></div>
          <div class="header_circle1"></div>
          <div class="header_circle1"></div>
        </div>
      </div>
      <!-- 商品详情渲染 -->
      <div class="goods" v-if="goodsInfo">
        <img
          class="goodsImg"
          :src="
            goodsInfo.img
              ? $imgUrl + goodsInfo.img
              : 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2813350528,1657210790&fm=11&gp=0.jpg'
          "
          alt=""
        />
        <div class="con_price">
          <div class="price_text1">商品名称：{{ goodsInfo.goodsname }}</div>
          <div class="price_text2">
            价格：<span>&yen;{{ goodsInfo.price.toFixed(2) }}</span>
          </div>
        </div>
        <div class="space"></div>
        <div class="discount">
          <div class="discount1">
            <div class="discount1_1">促销：</div>
            <div class="discount1_2">满&nbsp;&nbsp;减</div>
            <div class="discount1_3">满2件9折；3件8折</div>
            <div class="discount1_4">
              <img src="@/assets/images/detail_images/arrow.jpg" alt="" />
            </div>
          </div>
          <div class="purchase">
            <div class="purchase1">购买数量</div>
            <div class="purchase2">
              <van-stepper v-model="value" />
            </div>
          </div>
        </div>
        <div class="attributes">
          <div class="attributes1">
            <div class="attributes1_1">商品属性</div>
            <div class="attributes1_2">
              <img src="@/assets/images/detail_images/arrow.jpg" alt="" />
            </div>
          </div>
          <div class="attributes2">
            <div class="attributes2_1">{{ goodsInfo.specsname }}</div>
            <van-tag v-for="item in specsAttr" :key="item" type="success">{{
              item
            }}</van-tag>
          </div>
        </div>
        <div class="space"></div>
        <div class="message">商品详情</div>
        <p v-html="goodsInfo.description"></p>
        <!-- 商品导航 -->
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
          <van-goods-action-icon icon="cart-o" text="购物车" />
          <van-goods-action-button @click="goCart" type="warning" text="加入购物车" />
          <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsInfo, getCartAdd } from "../util/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      goodsInfo: "",
      value: 1,
      specsAttr: [],
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    //封装获取详情事件
    getInfo() {
      getGoodsInfo({
        id: this.$route.query.id,
      }).then((res) => {
        if (res.code == 200) {
          this.goodsInfo = res.list[0];
          this.specsAttr = this.goodsInfo.specsattr
            ? this.goodsInfo.specsattr.split(",")
            : [];
        }
      });
    },
    //封装加入购物车事件
    goCart(){
      if(sessionStorage.getItem('userInfo')){
        //判断已登录 调取加入购物车的接口，并跳转到购物车列表
        getCartAdd({
          uid:JSON.parse(sessionStorage.getItem('userInfo')).uid,
          goodsid:this.goodsInfo.id,
          num:this.value
        }).then(res=>{
          Toast.success(res.msg)
          this.$router.push(
            {
              path:'/cart',
              query:{
                id:JSON.parse(sessionStorage.getItem('userInfo')).uid
              }
            }
          )
        })
      }else{
        Toast.fail('检测到您未登录，请登录')
      }
    }
  },
};
</script>

<style  lang="" scoped>
@import "../assets/css/goodsdetail.css";
.goodsImg {
  width: 100%;
  height: 4rem;
}
.goods p {
  font-size: 18px;
}
.van-stepper {
  display: inline;
}
.van-tag {
  margin-top: 0.1rem;
  margin-right: 0.2rem;
}
.van-goods-action{
  width: 7.5rem;
}
</style>
