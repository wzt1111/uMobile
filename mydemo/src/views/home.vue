<template>
  <div>
    <!-- 导航栏 -->
    <div class="container">
      <div class="header">
        <img src="@/assets/images/index_images/logo.jpg" alt="" />
        <input type="text" placeholder="寻找商品" />
        <div class="more">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </div>
      <div class="nav">
        <ul>
          <li>推荐</li>
          <li>女装</li>
          <li>鞋包</li>
          <li>居家</li>
          <li>母婴儿童</li>
          <li>美食</li>
          <li><img src="@/assets/images/index_images/arrow.jpg" alt="" /></li>
        </ul>
      </div>
      <!-- 
  轮播图
  autoplay  自动轮播间隔，单位为ms
  indicator-color 指示器颜色
  vertical 是否为纵向滚动
 -->
      <van-swipe class="my-swipe" :autoplay="2000" indicator-color="#f26c10">
        <van-swipe-item v-for="item in bannerList" :key="item.id">
          <img class="img" :src="$imgUrl + item.img" alt="" />
        </van-swipe-item>
      </van-swipe>
      <!-- 宫格展示 -->
      <div class="menu">
        <div class="box">
          <img src="@/assets/images/index_images/icon_1.jpg" alt="" />
          <div class="text">限时抢购</div>
        </div>
        <div class="box">
          <img src="@/assets/images/index_images/icon_2.jpg" alt="" />
          <div class="text">积分商城</div>
        </div>
        <div class="box">
          <img src="@/assets/images/index_images/icon_3.jpg" alt="" />
          <div class="text">联系我们</div>
        </div>
        <div class="box" @click="$router.push('/sort')">
          <img src="@/assets/images/index_images/icon_4.jpg" alt="" />
          <div class="text">商品分类</div>
        </div>
      </div>
      <!-- 商品秒杀 -->
      <div class="goods">
        <div class="left">
          <div class="img1">
            <img src="@/assets/images/index_images/timer.jpg" alt="" />
            <div class="text1">限时秒杀</div>
          </div>

          <div class="text2">每天零点场 好货秒不停</div>
          <div class="time">
            <div class="box">02</div>
            <span>:</span>
            <div class="box">16</div>
            <span>:</span>
            <div class="box">45</div>
            <div class="text3">秒杀</div>
          </div>
          <div class="goods1">
            <div class="price">&yen;14.8</div>
          </div>
        </div>
        <div class="right">
          <div class="content1">
            <div class="con1left">
              <div class="box1">
                <div class="text1">品牌上新</div>
                <div class="zhe">折</div>
              </div>
              <div class="text2">每日九点 抢大牌</div>
              <div class="img1">
                <img src="@/assets/images/index_images/brand.jpg" alt="" />
              </div>
            </div>
            <div class="con1right"></div>
          </div>
          <div class="content2">
            <div class="con2left">
              <div class="text3">每日十件</div>
              <div class="text4">只为你选好货</div>
              <div class="img3">
                <img src="@/assets/images/index_images/shop_2.jpg" alt="" />
              </div>
            </div>
            <div class="con2right">
              <div class="text3">拼啊</div>
              <div class="text4">超级好价拼团</div>
              <div class="img4">
                <img src="@/assets/images/index_images/shop_3.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="space"></div>
      <div class="ad"></div>
      <div class="space"></div>
      <!-- 商品选项卡 -->
      <van-tabs type="card">
        <van-tab title="发现新品">
          <!-- 商品卡片 -->
          <van-card
            v-for="item in newsList"
            :key="item.id"
            :price="item.price | toPrice(2)"
            desc="已售200件"
            :title="item.goodsname"
            :thumb="
              item.img
                ? $imgUrl + item.img
                : 'https://img.yzcdn.cn/vant/ipad.jpeg'
            "
          />
        </van-tab>
        <van-tab title="热门推荐">
          <!-- 商品卡片 -->
          <van-card
            v-for="item in hotsList"
            :key="item.id"
            :price="item.price |toPrice(2)"
            desc="已售200件"
            :title="item.goodsname"
            :thumb="
              item.img
                ? $imgUrl + item.img
                : 'https://img.yzcdn.cn/vant/ipad.jpeg'
            "
          />
        </van-tab>
        <van-tab title="所有商品">
          <!-- 商品卡片 -->
          <van-card
            v-for="item in goodsList"
            :key="item.id"
            :price="item.price | toPrice(2)"
            desc="已售200件"
            :title="item.goodsname"
            :thumb="
              item.img
                ? $imgUrl + item.img
                : 'https://img.yzcdn.cn/vant/ipad.jpeg'
            "
          />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { getBanner, getIndexGoods } from "../util/axios";
//单独调用axios
import axios from "axios";
//调用轻提示
import { Toast } from "vant";
export default {
  data() {
    return {
      bannerList: [],
      newsList: [],
      hotsList: [],
      goodsList: [],
    };
  },
  mounted() {
    //组件加载获取轮播图接口
    //组件加载获取商品信息
    /* 
    并发处理
    import axios from 'axios'
    axios.all([接口1，接口2...])
    .then(axios.spread((响应1,响应2)=>{

    }))
    */
    //并发处理
    axios.all([getBanner(), getIndexGoods()]).then(
      axios.spread((bannerList, indexGoods) => {
        if (bannerList.code == 200) {
          this.bannerList = bannerList.list;
        } else {
          Toast.fail(bannerList.msg);
        }
        if (indexGoods.code == 200) {
          this.newsList = indexGoods.list[0].content;
          this.hotsList = indexGoods.list[1].content;
          this.goodsList = indexGoods.list[2].content;
        } else {
          Toast.fail(indexGoods.msg);
        }
      })
    );
  },
  methods: {},
};
</script>

<style lang="" scoped>
@import url("../assets/css/home.css");
.img {
  width: 100%;
  height: 4rem;
}
.gridTitle {
  font-size: 0.3rem;
}
</style>
