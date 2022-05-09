<template>
  <div class="hotplayer">
    <div class="headeline">
      <h3>独家放送</h3>
      <div class="icon">
        <i class="iconfont icon-icon-2"></i>
      </div>
    </div>
    <div class="hot-body">
      <div
        class="single-card"
        v-for="item in HotplayerSource"
        :key="item.id"
        @click="
          getVideo(item.id)
        "
      >
        <div class="showPic">
          <img :src="item.picUrl" :title="item.name" />
          <div class="iconplay">
            <i class="iconfont icon-24gf-play"></i>
          </div>
        </div>
        <div class="showtext">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['HotplayerSource'],
  };
</script>

<style lang="scss" scoped>
  .hotplayer {
    margin-top: 25px;
    width: 100%;
    .headeline {
      width: 10%;
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon {
        padding: 2.5px;
      }
    }
    .hot-body {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .single-card {
        cursor: pointer;
        width: 450px;
        margin-top: 10px;
        .showPic {
          position: relative;
          width: 100%;
          height: 180px;
          .iconplay {
            position: absolute;
            left: 2.5%;
            top: 2.5%;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;
            i {
              transform: scale(0.6);
              color: #fff;
            }
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
        }
        .showtext {
          margin-top: 5px;
          font-size: 14px;
          opacity: 0.7;
          color: black;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
