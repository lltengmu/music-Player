<template>
  <div class="newsong">
    <div class="headeline" @click="tolatestMusic">
      <h3>最新音乐</h3>
      <div class="icon">
        <i class="iconfont icon-icon-2"></i>
      </div>
    </div>
    <div class="newsong-body">
      <div
        class="single-card"
        v-for="(item, index) in newsongSource"
        :key="item.id"
      >
        <div class="index">{{ index | indexFormat }}</div>
        <div class="left">
          <img :src="item.picUrl" alt="" />
          <div class="iconplay" @click="selectSong(index)">
            <i class="iconfont icon-24gf-play"></i>
          </div>
        </div>
        <div class="right">
          <div class="musicName">
            {{ item.title
            }}<span v-if="true">{{
              item.alia | aliasformat(item.transName)
            }}</span>
          </div>
          <div class="musicAuthor">
            <span
              v-if="item.mvid !== 0"
              @click="
                getVideo(item.mvid)
              "
              >MV<i class="iconfont icon-24gf-play"></i
            ></span>
            {{ item.singer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    props: ['newsongSource'],
    computed: {
      ...mapState({
        show: (state) => state.showPlayer.show,
      }),
    },
    methods: {
      tolatestMusic() {
        this.$router.push('/latestmusic');
        //移动选项条
        this.$store.commit({
          type:'scrollLine/setOffset',
          offset:75
        })
      },
      selectSong(index) {
        this.$store.commit({
          type: 'play/selectSongByIndex',
          index: index,
          list: this.newsongSource,
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
    },
    filters: {
      indexFormat(val) {
        val += 1;
        if (val < 10) {
          return '0' + val;
        } else {
          return val;
        }
      },
      aliasformat(val, transName) {
        if (val !== undefined && transName == null) {
          return '(' + val + ')';
        } else if (val === undefined && transName != null) {
          return '(' + transName + ')';
        } else {
          return '';
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .newsong {
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
    .newsong-body {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .single-card {
        margin-top: 10px;
        width: 50%;
        display: flex;
        &:hover {
          background: rgba(234, 234, 234, 0.5);
        }
        &:hover .index {
          color: rgba(100, 181, 246, 1);
        }
        .index {
          width: 50px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
        }
        .right {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 310px;
          height: 60px;
          padding-left: 5px;
          font-size: 14px;
          .musicName {
            cursor: default;
            color: black;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            span {
              width: 60%;
              color: #7f8c8d;
            }
          }
          .musicAuthor {
            color: #7f8c8d;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            justify-content: flex-start;
            align-items: center;
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
              i {
                transform: scale(0.7);
              }
            }
          }
        }
        .left {
          position: relative;
          width: 80px;
          height: 80px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
          .iconplay {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 25px;
            height: 25px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            i {
              transform: scale(0.8);
              color: rgba(236, 65, 65, 1);
            }
          }
        }
      }
    }
  }
</style>
