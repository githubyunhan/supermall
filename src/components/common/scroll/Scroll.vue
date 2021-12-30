<template>
  <div class="wraper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
     /* this.scroll = new BScroll(document.querySelector('.wrapper'),{})*/
      /*refs如果绑定在组件中，那么通过this.$refs.refsname获取的是一个组件对象
refs如果绑定在普通元素（标签）中，那么通过this.$refs.refsname获取的是一个元素对象对象*/
      this.scroll = new BScroll(this.$refs.wrapper,{

      })
    }
  }
</script>

<style scoped>

</style>
