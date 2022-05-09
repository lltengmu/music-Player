<template>
  <div class="LatestMusic">
    <div
      class="single-music-card"
      v-for="(item, index) in renderlist"
      :key="item.id"
    >
      <div class="index">{{ index | indexformat }}</div>
      <div class="showPic" @click="play(index)">
        <img :src="item.picUrl" alt="" />
        <div class="icon">
          <i class="iconfont icon-24gf-play"></i>
        </div>
      </div>
      <div class="music-text">
        <div class="muisc-name">
          {{ item.title }}
          <span v-if="item.mvid !== 0" @click="getVideo(item.mvid)"
            >MV<i class="iconfont icon-24gf-play"></i
          ></span>
        </div>
        <div class="singer-name">{{ item.singer }}</div>
        <div class="album-name">{{ item.albumName }}</div>
        <div class="duration">{{ item.dt | timeformat }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapGetters, mapState } from 'vuex';
  export default {
    data() {
      return {
        renderSource: [],
      };
    },
    computed: {
      ...mapGetters({
        renderlist: 'newMusic/getRenderList',
      }),
      ...mapState({
        show: (state) => state.showPlayer.show,
      })
    },
    methods: {
      play(index){
        this.$store.commit({
          type:'play/selectSongByIndex',
          index:index,
          list:this.renderSource
        });
        //在改变用于隐藏播放器的状态之前先判断是否为true，是false时才需要隐藏
        if (this.show) {
          this.$store.commit({
            type: 'showPlayer/changeState',
          });
        } else {
          return;
        }
      },
      async getLatestMusicList() {
        await this.api.get('/personalized/newsong?limit=100').then((data) => {
          const dataSource = data.data.result.map((item) => ({
            id: item.id,
            title: item.name,
            picUrl: item.picUrl,
            albumName: item.song.album.name,
            singer: item.song.artists[0].name,
            dt: item.song.duration,
            mvid: item.song.mvid,
          }));
          this.renderSource = dataSource;
          //实现下滑加载功能，需要将数据提交到vuex操作
          this.$store.commit({
            type: 'newMusic/setDataSource',
            dataSource: dataSource,
          });
        });
      },
    },
    created() {
      this.getLatestMusicList();
    },
    filters: {
      indexformat(val) {
        val += 1;
        if (val < 10) {
          return '0' + val;
        } else {
          return val;
        }
      },
      timeformat(val) {
        return moment(val).format('mm:ss');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .LatestMusic {
    width: 100%;
    .single-music-card {
      width: 100%;
      height: 90px;
      display: flex;
      align-items: center;
      font-size: 12px;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      .index {
        width: 80px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(0, 0, 0, 0.3);
      }
      .showPic {
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 3px;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
        .icon {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          i {
            color: rgba(236, 65, 65, 1);
          }
        }
      }
      .music-text {
        flex: 1;
        width: 80%;
        height: 100%;
        display: flex;
        // justify-content:space-between;
        align-items: center;
        padding: 0 15px;
        text-align: left;
        .muisc-name {
          width: 20%;
          display: flex;
          span {
            width: 40px;
            height: 15px;
            color: rgba(236, 65, 65, 1);
            border: 1px solid rgba(236, 65, 65, 1);
            border-radius: 3px;
            transform: scale(0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            i {
              transform: scale(0.7);
            }
          }
        }
        .singer-name {
          width: 20%;
        }
        .album-name {
          width: 45%;
        }
        .duration {
          width: 10%;
          text-align: right;
        }
      }
    }
  }
</style>
