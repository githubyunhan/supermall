<template>
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="../../../assets/img/home/feature.jpg" alt="" @load="imageLoad">
    </a>
  </div>
</template>

<script>
  export default {
    name: "FeatureView",
    data() {
      return {
        isLoad: false
      }
    },
    methods: {
      imageLoad(){
        if (!isLoad)  {
          this.$emit('featureImageLoad');
        }
      }
    }
  }
</script>

<style scoped>

  .feature {
    width: 100%;
  }
</style>
