<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {getHomeMultdata} from 'network/home'

  export default {
    name: "Home",
    components: {
      NavBar
    },
    data() {
      return {/*data中的定义的属性，通过在网络请求中得到的数据中，查找需要的的数据资源进行定义*/
        banners: [],
        recommends: []
      }
    },
    created() {
      /*请求多个数据*/
      getHomeMultdata().then(res=>{/*箭头函数中的this引用的就是作用域，向外层查找，最近的作用域对象就是this*/

        this.banners = res.data.banner.list;
        this.recommends =res.data.recommend.list
      })
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
