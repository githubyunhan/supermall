<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="../../../assets/img/common/collect.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {

    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .check {
    border-color: red;
    background-color: red;
  }

  .check-button img {
    width: 10px;
    height: 10px;
  }
</style>
