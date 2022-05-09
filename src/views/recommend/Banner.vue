<template>
  <div class="banner">
    <el-carousel :interval="5000" type="card" height="250px">
      <el-carousel-item v-for="item in Banner" :key="item.id">
        <img :src="item.img" />
        <div class="title">{{ item.title }}</div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props:['Banner'],
  name: 'Recommend',
};
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  .el-carousel__item {
    border-radius: 15px;
    img {
      border-radius: 15px;
      width: 100%;
      height: 100%;
    }
    .title {
      position: absolute;
      right: 0;
      bottom: 0;
      border-top-left-radius: 10px;
      width: 15%;
      height: 10%;
      color: #000;
      background: rgba(33, 150, 243, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
    }
  }
}
</style>