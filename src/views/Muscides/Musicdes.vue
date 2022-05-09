<template>
  <div class="musicDes">
    <div class="musicdetail">
      <div class="left">
        <img :src="message.coverImgUrl" alt />
      </div>
      <div class="right">
        <div class="title">
          <span class="kind">歌单</span>
          <span class="title-text">{{ message.name }}</span>
        </div>
        <div class="creator">
          <div class="creator-pic">
            <img :src="message.creator.avatarUrl" alt />
          </div>
          <div class="creator-name">{{ message.creator.nickname }}</div>
          <div class="creator-time">
            {{ message.createTime | timeFormat }}创建
          </div>
        </div>
        <div class="btn">
          <div class="btn-playall">
            <i class="iconfont icon-24gf-play"></i>
            播放全部
            <i class="iconfont add icon-tianjia"></i>
          </div>
          <div class="btn-collection">
            <i class="iconfont icon-ziyuan"></i>收藏
          </div>
          <div class="btn-share">
            <i class="iconfont icon-fenxiang"></i>分享
          </div>
          <div class="btn-loadall">
            <i class="iconfont icon-tubiaozhizuomoban"></i>下载全部
          </div>
        </div>
        <div class="desc">
          <div class="desc-tag">
            标签：
            <span>{{
              message.tags
                .map((item) => {
                  return item;
                })
                .join('/')
            }}</span>
          </div>
          <div class="desc-count">
            <span class="list-count">
              歌曲：
              <span>{{ message.trackCount }}</span>
            </span>
            <span class="play-count">
              播放：
              <span>{{ message.playCount | setCount }}万</span>
            </span>
          </div>
          <div class="desc-text">
            简介：
            <span>{{ message.description }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tab">
      <div class="musiclist" @click="changecss(0)">
        <router-link to="/musicdes/list" :class="{ change: !changeCss }"
          >歌曲列表</router-link
        >
      </div>
      <div class="musicremark" @click="changecss(50)">
        <router-link to="/musicdes/remark" :class="{ change: changeCss }"
          >评论({{ total }})</router-link
        >
      </div>
      <div class="line" ref="line"></div>
    </div>
    <div class="tab-router">
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapState } from 'vuex';
  export default {
    name: 'musicdes',
    data() {
      return {
        owncss: true,
      };
    },
    computed: {
      ...mapState({
        message: (state) => state.desc.songSheet,
        total: (state) => state.remark.total,
        changeCss: (state) => state.remark.changeCss,
      }),
    },
    created() {
      if (this.message === '') {
        this.$router.replace('/recommend');
        return;
      }
    },
    filters: {
      setCount(val) {
        return Math.ceil(val / 10000);
      },
      timeFormat(val) {
        return moment(val).format('YYYY-MM-DD');
      },
    },
    methods: {
      changecss(offset) {
        this.$store.commit({
          type: 'remark/changecss',
        });
        this.$refs.line.style.left = offset + '%';
      },
    },
  };
</script>

<style lang="scss" scoped>
  .musicDes {
    width: 100%;
    .musicdetail {
      display: flex;
      height: 182px;
      margin-bottom: 30px;
      .left {
        width: 182px;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        flex: 1;
        padding: 0px 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          width: 100%;
          .kind {
            font-size: 12px;
            border: 1px solid red;
            border-radius: 3px;
            margin-right: 10px;
          }
          .title-text {
            font-weight: bold;
          }
        }
        .creator {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .creator-name {
            color: rgba(100, 181, 246, 1);
            cursor: pointer;
          }
          .creator-pic,
          .creator-name,
          .creator-time {
            margin-right: 5px;
            font-size: 12px;
          }
          .creator-pic {
            width: 23px;
            height: 23px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              cursor: pointer;
            }
          }
        }
        .btn {
          width: 500px;
          height: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .btn-playall {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 120px;
            height: 100%;
            font-size: 12px;
            color: #fff;
            background: rgba(236, 65, 65, 1);
            border-radius: 20px;
            overflow: hidden;
            cursor: pointer;
            &:hover {
              background: rgba(204, 50, 50, 1);
            }
            i {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 21%;
              height: 100%;
              &:nth-child(2) {
                border-left: 1px solid rgba(255, 255, 255, 0.2);
              }
            }
          }
          .btn-collection,
          .btn-share,
          .btn-loadall {
            width: 110px;
            height: 100%;
            font-size: 12px;
            border: 1px solid #bdc3c7;
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &:hover {
              background: rgba(242, 242, 242, 1);
            }
            i {
              margin-right: 5px;
              font-size: 18px;
            }
          }
        }
        .desc {
          width: 100%;
          height: 60px;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .desc-tag {
            span {
              color: rgba(100, 181, 246, 1);
              cursor: pointer;
            }
          }
          .desc-count {
            width: 18%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .list-count,
            .play-count {
              span {
                color: #95a5a6;
                margin-right: 10px;
              }
            }
          }
          .desc-text {
            width: 800px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            span {
              color: #7f8c8d;
            }
          }
        }
      }
    }
    .tab {
      position: relative;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin: 0 auto;
      width: 20%;
      height: 45px;
      cursor: pointer;
      margin-bottom: 10px;
      a {
        padding: 0 5px;
        text-align: center;
        text-decoration: none;
        color: black;
        transition: 0.5s;
        &.change {
          // font-weight: bold;
          // font-size: 18px;
          color: #fff;
        }
      }
      .line {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 50%;
        height: 100%;
        border-radius: 10px;
        background: rgba(100, 181, 246, 1);
        transition: 0.5s ease;
        z-index: -1;
      }
    }
    .tab-router {
      width: 100%;
      .slide-fade-enter-active {
        transition: all 0.4s ease;
      }
      .slide-fade-leave-active {
        transition: all 0.4s ease;
      }
      .slide-fade-enter {
        transform: translateX(45%);
      }
      .slide-fade-leave-to {
        /* transform: translateX(-45%); */
        opacity: 0;
      }
    }
  }
</style>
