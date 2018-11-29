<template>
  <div class="main">
    <div id="hoodle">
      <div :class="{hoodle_show : hoodleShow}" class="hoodle">
        <img src="./imgs/hoodle.png" width="800" @click="skip">
        <div class="hoodle-close" @click="hoodleShow = false;"/>
      </div>
      <div class="hoodle_button" @click="changeHoodleShow">PK</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { hoodleShow: false }
  },
  mounted() {
    setTimeout(this.changeHoodleShow, 1000)
  },
  methods: {
    changeHoodleShow: function() {
      this.hoodleShow = !this.hoodleShow
    },
    skip: function() {
      window.location.href = 'pc-index.html'
    }
  }
}
</script>

<style scoped>
  .hoodle{
    position: fixed;
    top: 20%;
    left: 50%;
    margin-top: -240px;
    margin-left: -400px;
    border-radius: 10px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.31);
    visibility: hidden;
    transition: all 1s;
    -webkit-transition: all 1s;
    -moz-transition: all 1s;
    -o-transition: all 1s;
    opacity: 0;
  }
  .hoodle_show{
    top: 40%;
    visibility: visible;
    opacity: 1;
  }
  .hoodle .hoodle-close{
    width: 40px;
    height: 40px;
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
  }
  .hoodle .hoodle-close:hover{
    background-color: rgba(0, 0, 0, 0.2);
  }
  .hoodle_button{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    background-color: #20180a;
    position: fixed;
    bottom: 100px;
    right: 20px;
    color: #d4af62;
    text-align: center;
    line-height: 60px;
    font-size: 30px;
    font-family: fantasy;
    cursor: pointer;
  }
</style>
