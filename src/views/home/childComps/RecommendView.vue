<template><!--首页，推荐-->
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    data() {
      return {
        isLoad: false
      }
    },
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      imageLoad(){
        if (!isLoad)  {
          this.$emit('recommendImageLoad');
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;

    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }

</style>
