<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabControl="tabControl"
                 ref="tabControl1"
                 v-show="isTabFixed"></tab-control>
    <scroll class="scroll-content"
            ref="topScroll"
            :probe-type="3"
            @scrollPosition="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"
                      @recommendImageLoad="recommendImageLoad"></recommend-view>
      <feature-view @featureImageLoad="featureImageLoad"></feature-view>
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabControl="tabControl"
                   ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata,getHomeGoods} from 'network/home'

  import {debounce} from 'common/utils'

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {/*data中的定义的属性，通过在网络请求中得到的数据中，查找需要的的数据资源进行定义*/
        banners: [],
        recommends: [],
        goods: {/*多数据存储设计*/
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        topOffsetTop: 0,
        isTabFixed: false,
        swiperImage: false,
        recommendImage: false,
        featureImage:false,
        saveY: 0,
        itemImageListener: null
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.topScroll.scrollTo(0,this.saveY,0);

      this.$refs.topScroll.refresh()/*切换数据好，最好refresh一下*/
    },
    deactivated() {
      /*保存y值*/
      this.saveY = this.$refs.topScroll.scroll.y

      /*取消全局事件的监听*/
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
    created() {
      /*1.请求多个数据*/
      this.getHomeMultidata1();

      /*2.请求商品数据*/
      this.getHomeGoods1('pop');
      this.getHomeGoods1('new');
      this.getHomeGoods1('sell')
    },
    mounted() {
      /*3.通过事件总线监听图片加载完成*/
      /*this.$bus.$on('itemImageLoad',() => {
        this.$refs.topScroll.refresh()
      })*/
      const  refresh = debounce(this.$refs.topScroll.refresh(),200);

      /*对监听事件进行保存*/
      this.itemImageListener = () => {
        refresh()
      }
      this.$bus.$on('itemImageLoad',this.itemImageListener)
    },
    methods: {
      /*事件监听相关的方法*/
      tabControl(index) {
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break
        }
        /*保证两个组件效果相同*/
        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index;
      },
      backClick() {
        /*console.log(this.$refs.topScroll);*/
        this.$refs.topScroll.scrollTo(0,0);
      },
      contentScroll(position) {
        /*1.判断BackTop是否显示*/
        this.isShowBackTop = (-position.y) > 1000;

        /*2.决定tobControl是否吸顶*/
        this.isTabFixed = (-position.y) > this.topOffsetTop;
      },
      loadMore() {
        console.log('加载更多')
        this.getHomeGoods1(this.currentType)
      },
      swiperImageLoad() {
        /*console.log(this.$refs.tabControl2.$el.offsetTop);
        this.topOffsetTop = this.$refs.tabControl2.$el.offsetTop*/
        this.swiperImage = !this.swiperImage
      },
      recommendImageLoad(){
        this.recommendImage = !this.recommendImage
      },
      featureImageLoad() {
        this.featureImage = !this.featureImage;
        if (this.swiperImage == true && this.recommendImage == true && this.recommendImage == true){
          this.topOffsetTop = this.$refs.tabControl2.$el.offsetTop
        }
      },

      /*网络请求相关的方法*/
      getHomeMultidata1() {
        getHomeMultidata().then(res=>{/*箭头函数中的this引用的就是作用域，向外层查找，最近的作用域对象就是this*/
          //console.log(res);
          this.banners = res.data.banner.list;
          this.recommends =res.data.recommend.list
        })
      },
      getHomeGoods1(type) {
        const page = this.goods[type].page+1;
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page +=1;
          //console.log(res)
          this.$refs.topScroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;

    z-index: 5;
  }

  .tab-control {
    position: sticky;/*停留效果*/
    top: 44px;

    z-index: 5;
  }

  .scroll-content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.scroll-content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }*/
</style>
