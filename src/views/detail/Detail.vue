<template>
  <div id="detail" class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scrollPosition="scrollPosition" :probe-type="2">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods-info="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommendInfo" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
  import {debounce} from 'common/utils'

  import Toast from 'components/common/toast/Toast'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Scroll,
      BackTop,
      Toast
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendInfo: [],
        itemImageListener: null,
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        isShowBackTop: false,
        message: '',
        show: false
      }
    },
    created() {
      /*1.获取iid*/
      /*console.log(this.$route);*/
      this.iid = this.$route.params.id

      /*2.请求详情数据*/
      getDetail(this.iid).then(res => {
        //console.log(res);
        //console.log(res.result.itemInfo.topImages);
        /*2.1.轮播图数据*/
        this.topImages = res.result.itemInfo.topImages

        /*2.2.创建商品对象*/
        this.goodsInfo = new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services);

        /*2.3.创建店铺信息*/
        this.shop = new Shop(res.result.shopInfo)

        /*2.4.保存商品的详情数据*/
        this.detailInfo = res.result.detailInfo;

        /*2.5.获取参数信息*/
        this.paramInfo = new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)

        /*2.6.获取评论信息*/
        if (res.result.rate.cRate !== 0) {
          //console.log(res.result.rate);
          this.commentInfo = res.result.rate.list[0]
        }
      })

      /*3.请求推荐的数据*/
      getRecommend().then(res => {
        //console.log(res);
        this.recommendInfo = res.data.list
      })

      /*4.给getThemeTopY赋值(对给this.getThemeTopY赋值的操作进行防抖操作)*/
      /*this.getThemeTopY = debounce(() => {
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);
      })*/
    },
    mounted() {
      const  refresh = debounce(this.$refs.scroll.refresh(),200);
      this.itemImageListener = () => {
        refresh()
      }
      this.$bus.$on('itemImageLoad',this.itemImageListener)
    },
    updated() {
      this.themeTopYs = []

      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()

        this.getThemeTopY()
      },
      titleClick(index) {
        //console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0);
      },
      scrollPosition(position) {
        //console.log(position);
        /*1.获取y值*/
        const positionY = -position.y
        /*2.positionY和主题中的值进行对比*/
        /*for (let i in this.themeTopYs) {
          console.log(i);/!*i为字符串类型*!/
        }*/
        let length = this.themeTopYs.length
        for (let i = 0; i < length; i++) {
          if (this.currentIndex !== i && ((i<length - 1 && positionY >=this.themeTopYs[i]) && positionY || (i ===length - 1 && positionY >= this.themeTopYs[i]))) {
            this.currentIndex = i
            console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        /*3.是否显示回到顶部*/
        this.isShowBackTop = (-position.y) > 1000;
      },

      addToCart() {
        console.log('加入到购物车');
        /*1.获取购物车展示的信息*/
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goodsInfo.title;
        product.desc = this.goodsInfo.desc;
        product.price = this.goodsInfo.price;
        /*必传，商品的唯一标识iid*/
        product.iid = this.iid;
        //console.log(this.iid);
        /*2.将商品添加到购物车中*/
        /*this.$store.cartList.push(product)/!*不建议这样属性*!/*/
        //this.$store.commit('addCart1',product)
        /*dispatch函数可以返回Promise类型结果，需在dispatch对应的action中的方法里返回Promise对象*/
        this.$store.dispatch('addCart2',product).then(res => {
          this.$toast.show(res,2000)
        })
      }
    }
  }
</script>

<style scoped>
  .detail {
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }
  .content {
    background-color: #fff;
    height: calc(100% - 44px);
  }
</style>
