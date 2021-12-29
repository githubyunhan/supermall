<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!--具名插槽：插槽标签中定义name属性；使用时，组件标签里，用于替换插槽的标签定义slot属性。
    其属性值和需要替换的插槽的name属性值相同-->
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path: String,/*子组件访问父组件数据，即父传子;定义的是该组件标签的属性，自定义属性(事件)*/
      activeColor: {/*通过父组件传入自定义颜色*/
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
        /*哪个路由组件处于活跃状态，才拥有$route
        * .indexOf(str);判断第一次出现字符的索引位置，没有返回-1，有返回对应的索引
        * */
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods:{
      itemClick() {/*通过监听点击事件，将路径传送给URL，在通过路由进行展示对应组件*/
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;/*均等分*/
    text-align: center;/*文本居中*/
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item  img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;/*去掉图片下的3个（默认）像素*/
  }
</style>
