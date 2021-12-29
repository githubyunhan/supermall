<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home">
        <img slot="item-icon" src="../../../assets/img/tabbar/home.jpeg" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/home1.jpeg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="../../../assets/img/tabbar/category.jpeg" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/category1.jpeg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img slot="item-icon" src="../../../assets/img/tabbar/cart.jpeg" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/cart1.jpeg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-icon" src="../../../assets/img/tabbar/profile.jpeg" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/profile1.jpeg" alt="">
        <div slot="item-text">档案</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: "MainTabBar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
