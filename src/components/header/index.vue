<template>
  <div class="header-contain">
    <nav>
      <div class="tab" @click="move(0)"><router-link to="/"><i class="iconfont icon-yinle"></i>推荐音乐</router-link></div>
      <div class="tab" @click="move(25)"><router-link to="/rankinglist"><i class="iconfont icon-paixingbang"></i>排行榜</router-link></div>
      <div class="tab" @click="move(50)"><router-link to="/playlists"><i class="iconfont icon-bofangliebiao"></i>歌单</router-link></div>
      <div class="tab" @click="move(75)"><router-link to="/latestmusic"><i class="iconfont icon-zuixin"></i>最新音乐</router-link></div>
      <div class="line" ref="line"></div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "index",
  data() {
    return {
      activeName: "second"
    };
  },
  computed:{
    ...mapGetters({
      offSet:'scrollLine/selectoffset'
    })
  },
  watch:{
    offSet(newValue){
      this.$refs.line.style.left = newValue + "%";
    }
  },
  methods:{
    move(offset){
      this.$refs.line.style.left = offset + "%";
    }
  },
};
</script>

<style lang="scss" scoped>
.header-contain {
  margin-top: 10px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  nav {
    margin: 0px auto;
    display: flex;
    width: 40%;
    position: relative;
    .tab{
      position: relative;
      flex: 1;
      width: 25%;
      height: 100%;
      cursor: pointer;
      text-align: center;
      font-size:16px;
      a{
        width: 100%;
        height: 100%;
        color: black;
        text-decoration: none;
        i{
          color: rgba(100,181,246,1);
          padding: 3px;
        }
      }
    }
    .line {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 25%;
      height: 2px;
      background: rgba(100, 181, 246, 1);
      transition: 0.6s ease;
    }
  }
}
</style>