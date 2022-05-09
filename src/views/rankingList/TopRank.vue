<template>
  <div class="topRank">
    <div class="headeline">
      <h3>官方榜</h3>
    </div>
    <div class="topRank-body">
      <div class="rank-card" v-for="item in topRankSource" :key="item.id">
        <div class="rank-card-top">
          <h1>{{ item.name }}</h1>
          <div class="icon">
            <i class="iconfont icon-24gl-play"></i>
          </div>
        </div>
        <div class="rank-card-body">
          <musicList :id="item.id" :updateTime="item.updateTime"></musicList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MusicList from '@/views/rankingList/MusicList.vue';
  import { mapState } from 'vuex';
  export default {
    props: {
      topRankSource: Array,
    },
    computed: {
      //从vuex中获取图片内容
      ...mapState({
        piclist: (state) => state.rank.pic,
      }),
    },
    components: {
      MusicList,
    },
  };
</script>

<style lang="scss" scoped>
  .topRank {
    width: 100%;
    .headeline {
      width: 14%;
      cursor: pointer;
    }
    .topRank-body {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      .rank-card {
        margin-top: 10px;
        width: 440px;
        height: 440px;
        .rank-card-top {
          position: relative;
          width: 100%;
          height: 30%;
          background: linear-gradient(
            to right,
            rgba(89, 159, 228, 1),
            rgba(91, 140, 235, 1)
          );
          h1 {
            position: absolute;
            left: 5%;
            top: 5%;
            color: #fff;
            font-style: italic;
          }
          .icon {
            position: absolute;
            right: 5%;
            top: 5%;
            width: 35px;
            height: 35px;
            font-weight: bold;
            border: 2px solid #fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            i {
              color: #fff;
            }
          }
        }
        .rank-card-body {
          width: 100%;
          height: 70%;
        }
      }
    }
  }
</style>
