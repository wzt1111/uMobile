<template>
  <div>
    <div class="container">
      <div class="header">
        <go-back></go-back>
        <div class="header_text">购物车</div>
        <div class="header_circle">
          <div class="header_circle1"></div>
          <div class="header_circle1"></div>
          <div class="header_circle1"></div>
        </div>
      </div>
      <!-- 滑动单元格 -->
      <div v-if="cartList.length > 0 && userInfo">
        <div class="cartInfo" v-for="item in cartList" :key="item.id">
          <van-checkbox v-model="item.status" @change="checkOne"></van-checkbox>
          <van-swipe-cell>
            <van-card
              :num="item.num"
              :price="item.price.toFixed(2)"
              desc="描述信息"
              :title="item.goodsname"
              class="goods-card"
              :thumb="
                item.img
                  ? $imgUrl + item.img
                  : 'https://img.yzcdn.cn/vant/cat.jpeg'
              "
            >
              <template #footer>
                <div>
                  <van-stepper v-model="item.num" />
                </div>
              </template>
            </van-card>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="delInfo(item.id)"
              />
            </template>
          </van-swipe-cell>
          <!-- 底部提交订单栏 -->
          <van-submit-bar
            :price="allPrice"
            button-text="提交订单"
            @submit="goOrder"
          >
            <van-checkbox v-model="allCheck" @click="checkAll"></van-checkbox
            >全选
          </van-submit-bar>
        </div>
      </div>
      <div v-else-if="cartList.length == 0 && userInfo">
        <van-empty description="购物车空空如也，快去买买买！！！" />
      </div>
      <div v-else>
        <van-button @click="$router.push('/login')" type="warning"
          >请先登录，再查看</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getCartList, getCartDelete } from "../util/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      goodsNum: 1,
      cartList: [],
      userInfo: "",
      allCheck: false,
    };
  },
  computed: {
    allPrice() {
      let sum = 0;
      this.cartList.map((item, i) => {
        if (item.status == true) {
          sum += item.price * item.num;
        }
      });
      return sum*100;
    },
  },
  mounted() {
    //组件加载调取购物车
    this.cartListInfo();
    this.userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : "";
  },
  methods: {
    //封装获取列表接口
    cartListInfo() {
      getCartList({
        uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
      }).then((res) => {
        if (res.code == 200) {
          this.cartList = res.list;
          res.list.map((item) => {
            item.status = this.allCheck;
          });
        }
      });
    },
    //封装删除事件
    delInfo(id) {
      getCartDelete({ id }).then((res) => {
        if (res.code == 200) {
          Toast.success(res.msg);
          this.cartListInfo();
        } else {
          Toast.error(res.msg);
        }
      });
    },
    //全选 事件
    checkAll() {
      this.cartList.map((item) => (item.status = this.allCheck));
    },
    // 单选 事件
    checkOne() {
      this.allCheck = this.cartList.every((item) => item.status);
    },
    //提交订单
    goOrder() {},
  },
};
</script>

<style  lang="" scoped>
@import "../assets/css/cart.css";
.goods-card {
  margin: 0;
}

.delete-button {
  height: 100%;
}
.cartInfo {
  display: flex;
}
.van-swipe-cell {
  flex: 1;
}
.van-checkbox {
  padding-left: 15px;
  margin-top: 15px;
  width: 20px;
  height: 30px;
}
.van-submit-bar {
  bottom: 1rem;
}
</style>
