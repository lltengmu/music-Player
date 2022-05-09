<template>
  <div class="recommendMV">
    <div class="headeline">
      <h3>推荐MV</h3>
      <div class="icon">
        <i class="iconfont icon-icon-2"></i>
      </div>
    </div>
    <div class="MV-body">
      <div class="single-MV" v-for="item in recomMVSource" :key="item.id">
        <div class="showPic" @click="getVideo(item.id)">
          <img :src="item.img" alt="">
          <div class="iconplay"><i class="iconfont icon-24gf-play"></i></div>
        </div>
        <div class="showtext">
          <div class="descText">{{ item.desc }}</div>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["recomMVSource"],
}
</script>

<style lang="scss" scoped>
.recommendMV {
  width: 100%;
  margin-top: 30px;
  .headeline {
      width: 10%;
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon {
        padding: 2.5px;
      }
    }
  .MV-body {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .single-MV {
      position: relative;
      width: 340px;
      margin-top: 10px;
      .showPic {
        width: 100%;
        height: 190px;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
        &:hover .iconplay{
          opacity: 1;
        }
        .iconplay{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255,255,255,.3);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          i{
            font-size: 24px;
            color: rgba(236, 65, 65, 1);
          }
        }
      }
      .showtext {
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        .descText {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          opacity: .8;
          &:hover{
            opacity: 1;
          }
        }
        .name {
          flex: 1;
          opacity: .3;
          &:hover{
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>