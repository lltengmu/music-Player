<template>
  <div class="allRank">
    <div class="headeline">
      <h3>所有榜单</h3>
    </div>
    <div class="rank-body">
      <div
        class="single-rank"
        v-for="item in allRankSource"
        :key="item.id"
        @click="getRankdetail('/playlist/track/all',item.id)"
      >
        <div class="showPic">
          <img :src="item.img" alt />
          <div class="play">
            <i class="iconfont icon-24gf-play"></i>
          </div>
          <div class="playCount">
            <i class="iconfont icon-24gl-play"></i>
            <span>{{ item.playCount | playCount }}</span>
          </div>
          <div class="update">{{ item.update }}</div>
        </div>
        <div class="name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allRankSource: Array
  },
  filters: {
    playCount(count) {
      if (count > 0 && count < 10000) {
        return count;
      } else if (count > 10000 && count < 100000000) {
        return Math.round(count / 10000) + "万";
      } else if (count > 100000000) {
        return Math.round(count / 100000000) + "亿";
      }
    }
  },
  methods: {
    getRankdetail(url, id) {
      this.api.get(url + "?" + "id=" + id).then(data => {
        console.log(data);
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.allRank {
  width: 100%;
  .headeline {
    width: 14%;
    cursor: pointer;
  }
  .rank-body {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .single-rank {
      margin-top: 10px;
      width: 205px;
      .showPic {
        position: relative;
        width: 100%;
        height: 205px;
        border-radius: 10px;
        overflow: hidden;
        &:hover .play {
          opacity: 1;
        }
        &:hover .update {
          transform: translateY(0px);
        }
        img {
          width: 100%;
          height: 100%;
        }
        .play {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 35px;
          height: 35px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: 0.5s;
          i {
            color: rgb(236, 65, 65);
          }
        }
        .playCount {
          position: absolute;
          right: 1%;
          top: 2%;
          width: 40%;
          height: 10%;
          display: flex;
          i {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: 100%;
            color: #fff;
            text-align: center;
            transform: scale(0.8);
          }
          span {
            flex: 1;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 12px;
            color: #fff;
            text-align: start;
          }
        }
        .update {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 30px;
          color: rgba(255, 255, 255, 0.5);
          background: rgba(0, 0, 0, 0.5);
          cursor: pointer;
          transform: translateY(-30px);
          transition: 1s;
          transition-delay: 0.5s;
        }
      }
      .name {
        margin-top: 5px;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>