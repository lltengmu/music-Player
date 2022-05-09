<template>
  <div class="miniPlayer" :class="{ hiddenPlayer: show }">
    <div class="info">
      <div class="showPic">
        <img :src="currentSong.picUrl" alt :class="{ pause: !playing }" />
      </div>
      <div class="info-text">
        <div class="musicName">{{ currentSong.title }}</div>
        <div class="info-singer">{{ currentSong.singer }}</div>
      </div>
    </div>
    <div class="center">
      <div class="buttonCut">
        <div class="icon">
          <ModeChoose></ModeChoose>
        </div>
        <div class="icon" @click="prevSong">
          <i class="iconfont icon-shangyishou"></i>
        </div>
        <div class="icon">
          <i
            class="iconfont middle"
            :class="[playing ? 'icon-zanting' : 'icon-24gf-play']"
            @click="playState"
          ></i>
        </div>
        <div class="icon" @click="nextSong">
          <i class="iconfont icon-xiayishou"></i>
        </div>
        <div class="icon">
          <i class="iconfont icon-geci-copy"></i>
        </div>
        <div class="icon" @click="drawer = true">
          <i class="iconfont icon-yinleliebiao"></i>
        </div>
      </div>
      <div class="progress">
        <span class="startTime">{{ currentTime | timeformat2 }}</span>
        <el-progress
          :percentage="progress"
          color="rgba(100,181,246,1)"
          :show-text="false"
          :stroke-width="2"
        ></el-progress>
        <span class="endTime">{{ currentSong.dt | timeformat }}</span>
      </div>
    </div>
    <div class="close">
      <i class="iconfont icon-tianjia" @click="hidden"></i>
    </div>
    <!-- 定义抽屉 -->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :modal="false"
      size="250px"
      :show-close="false"
    >
      <!-- 展示播放列表 -->
      <div class="music-list">
        <div class="list-title">
          <h2>播放队列</h2>
          <p>{{ list.length + 1 }}首歌曲</p>
        </div>
        <div class="list-body">
          <div class="list-card" v-for="(item, index) in list" :key="item.id" @click="drawerIndex(index, item)">
            <div class="index">{{ index + 1 }}</div>
            <div class="left">
              <p class="name">{{ item.title }}</p>
              <p class="singer">{{ item.singer }}</p>
            </div>
            <div class="right">
              <i class="iconfont icon-xihuan1"></i>
              <i class="iconfont icon-gengduo"></i>
            </div>
            <div class="showTime">{{ item.dt | timeformat }}</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapState, mapGetters } from 'vuex';
  import ModeChoose from '@/views/Player/chilren/ModeChoose.vue'
  export default {
    props: ['progress','currentTime'],
    data() {
      return {
        drawer: false,
        direction: 'rtl',
      };
    },
    components:{
      ModeChoose
    },
    computed: {
      ...mapState({
        show: (state) => state.showPlayer.show,
        playing: (state) => state.play.playing,
        list: (state) => state.play.sequencePlayList,
        currentIndex: (state) => state.play.currentIndex,
        playmode: (state) => state.play.mode,
      }),
      //获取到被点击的歌曲信息
      ...mapGetters({
        currentSong: 'play/currentSong',
      }),
    },
    methods: {
      //点击关闭按钮之后，改变VueX中的状态用于隐藏播放器
      hidden() {
        this.$store.commit({
          type: 'showPlayer/changeState',
        });
      },
      playState() {
        this.$store.commit({
          type: 'play/setPlaying',
        });
      },
      //定义抽屉内歌曲被点击后的处理函数
      drawerIndex(index, item) {
        this.$store.commit({
          type: 'play/indexChange',
          index: index,
        });
      },
      //定义一个消息提示
      prompt_1(text) {
        this.$message(text);
      },
      //点击上一首时的事件处理函数
      prevSong(){
        if( this.playmode === 0 && 0 < this.currentIndex ){
            this.$store.commit({
                type: 'play/prevSong',
            })
        }else {
          let tips = "已经到顶啦..."
          this.prompt_1(tips);
        }
      },
      //点击下一首时的事件处理函数
      nextSong(){
        if( this.playmode === 0 && this.currentIndex < this.list.length - 1 ){
            this.$store.commit({
                type: 'play/nextSong',
            })
        }else {
          let tips = "已经是最后一首了哟..."
          this.prompt_1(tips);
        }
      }
    },
    filters: {
      timeformat(val) {
        return moment(val).format('mm:ss');
      },
      timeformat2(val) {
        function showNum(num) {
          if (num < 10) {
            return '0' + num;
          }
          return num;
        }
        return `${showNum(parseInt(val / 60) % 60)}:${showNum(val % 60)}`;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .miniPlayer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background: #fff;
    border-top: 1px solid #95a5a6;
    transition: 1s;
    &.hiddenPlayer {
      visibility: hidden;
      bottom: -55px;
    }
    .info {
      position: absolute;
      left: 2.5%;
      top: 50%;
      transform: translateY(-50%);
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .showPic {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          animation: animate 10s infinite linear;
          &.pause {
            animation-play-state: paused;
          }
        }
      }
      .info-text {
        margin-left: 5px;
        .musicName {
          font-size: 14px;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .info-singer {
          font-size: 12px;
        }
      }
    }
    .center {
      width: 50%;
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .buttonCut {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        width: 40%;
        height: 60%;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          cursor: pointer;
          i {
            transform: scale(0.9);
            &:hover {
              color: rgba(100, 181, 246, 1);
            }
          }
          .middle:hover {
            color: black;
          }
        }
        .icon:nth-child(3) {
          background: rgba(229, 229, 229, 0.5);
          &:hover {
            background: rgba(229, 229, 229, 1);
          }
        }
      }
      .progress {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 90%;
        height: 40%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 10px;
        .el-progress {
          width: 90%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .showMusicList {
      position: absolute;
      right: 5%;
      top: 50%;
      transform: translateY(-50%);
    }
    .close {
      position: absolute;
      right: 1%;
      top: 0;
      transform: rotate(45deg);
      cursor: pointer;
    }
    .el-drawer {
      position: relative;
      .music-list {
        position: absolute;
        margin: auto;
        top: 0;
        width: 100%;
        height: 100%;
        font-size: 12px;
        .list-title {
          margin-top: 20px;
          width: 100%;
          text-align: center;
          z-index: -1;
          h2 {
            font-weight: normal;
          }
          p {
            margin-top: 5px;
          }
        }
        .list-body {
          margin-top: 10px;
          width: 100%;
          height: 84%;
          overflow-y: auto;
          overflow-x: hidden;
          &::-webkit-scrollbar {
            width: 5px;
          }
          &::-webkit-scrollbar-track {
            background-color: rgba(255, 255, 255, 0);
          }
          &::-webkit-scrollbar-thumb {
            background-color: #bdc3c7;
            border-radius: 2.5px;
          }
          .list-card {
            position: relative;
            padding: 5px 0px;
            width: 100%;
            height: 60px;
            display: flex;
            transition: 0.2s ease;
            &:hover {
              background: rgba(189, 195, 199, 0.2);
            }
            &:hover .right {
              opacity: 1;
            }
            &:hover .showTime {
              opacity: 0;
            }
            .index {
              position: absolute;
              width: 25px;
              height: 100%;
              top: 50%;
              transform: translateY(-50%);
              display: flex;
              justify-content: center;
              align-items: center;
              &::after {
                content: '';
                position: absolute;
                right: 0;
                top: 0;
                width: 1px;
                height: 100%;
                background: linear-gradient(to top, #fff, #bdc3c7, #fff);
              }
            }
            .left {
              width: 60%;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: flex-start;
              p {
                width: 100px;
                margin-left: 40px;
                font-size: 12px;
                transform: scale(0.9);
                transform-origin: left top;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &:nth-child(2) {
                  color: rgba(100, 181, 246, 1);
                }
              }
            }
            .right {
              width: 40%;
              display: flex;
              justify-content: space-around;
              align-items: center;
              opacity: 0;
              transition: 0.8s ease;
              transform: scale(0.8);
              i {
                cursor: pointer;
              }
            }
            .showTime {
              position: absolute;
              right: 6%;
              top: 57%;
              color: rgba(0, 0, 0, 0.5);
              transition: 0.8s ease;
            }
          }
        }
      }
    }
  }
</style>
