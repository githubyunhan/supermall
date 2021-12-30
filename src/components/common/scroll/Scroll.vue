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
    props: {
      probeType: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
     /* this.scroll = new BScroll(document.querySelector('.wrapper'),{})*/
      /*refs如果绑定在组件中，那么通过this.$refs.refsname获取的是一个组件对象
refs如果绑定在普通元素（标签）中，那么通过this.$refs.refsname获取的是一个元素对象对象*/
      /*1.创建better scroll对象*/
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType
      })

      /*监听滚动的位置*/
      this.scroll.on('scroll',(position) => {

      })
    },
    methods: {
      scrollTo(x,y,time=300) {
        this.scroll.scrollTo(x,y,time);
      }
    }
  }
</script>

<style scoped>

</style>
