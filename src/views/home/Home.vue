<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabControl="tabControl"></tab-control>
    <goods-list :goods="goods[currentType].list"></goods-list>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getHomeMultidata,getHomeGoods} from 'network/home'

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList
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
        currentType: 'pop'
      }
    },
    created() {
      /*1.请求多个数据*/
      this.getHomeMultidata1();

      /*2.请求商品数据*/
      this.getHomeGoods1('pop');
      this.getHomeGoods1('new');
      this.getHomeGoods1('sell')
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
          this.goods[type].page +=1
        })
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;

    z-index: 5;
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>
