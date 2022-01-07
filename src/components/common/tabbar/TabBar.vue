<template>
  <div id="tab-bar">
    <slot></slot><!-- 组件标签内部的内容用于替换插槽-->
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar {
    display: flex;/*水平放置*/
    background-color: #f6f6f6;
    height: 49px;

    position: fixed;/*固定位置*/
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0px -3px 1px rgba(100,100,100,.2);
    border-top: 1px solid rgba(100,100,100,.1);

    /*z-index: 10;*/
  }
</style>
