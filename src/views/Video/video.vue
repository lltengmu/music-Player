<template>
  <div class="video-container">
    <div class="video-control">
      <video
        controls="controls"
        width="100%"
        height="100%"
        ref="video"
        :src="videoMessage.videoUrl"
        autoplay="autoplay"
      ></video>
    </div>
    <div class="title">
      <h3>{{ videoMessage.name }}</h3>
    </div>
    <div class="detail">
      <span class="singer">演唱：{{ videoMessage.artists }}</span>
      <span class="play-count">{{ videoMessage.playCount }}万次观看</span>
      <span class="publish-time">发布时间：{{ videoMessage.publishTime }}</span>
      <div class="desc">
        <span>简介：{{ videoMessage.desc }}</span>
      </div>
    </div>
    <div class="similar-MV">
      <div class="similar-title">
        <h3>相似推荐</h3>
      </div>
      <div class="similar-MV-body">
        <div
          class="single-card"
          v-for="item in videoMessage.recomvideolist"
          :key="item.id"
        >
          <div class="show-Pic">
            <img
              :src="item.cover"
              :alt="item.name"
              @click="resetVideo(item.id)"
            />
          </div>
          <div class="show-Text">
            <div class="mv-title">{{ item.name }}</div>
            <div class="mv-author">{{ item.artistName }}</div>
            <div class="duration">{{ item.duration | timeFormat }}</div>
            <div class="play-count">
              <i class="iconfont icon-24gl-play"></i>
              {{ item.playCount | Countformat }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <remark
      :comments="videoMessage.comments"
      :hotcomment="videoMessage.hotComments"
    ></remark>
  </div>
</template>

<script>
  import remark from '@/views/Video/chilren/videoRemark.vue';
  import moment from 'moment';
  import { mapState, mapGetters } from 'vuex';
  export default {
    name: 'video-container',
    computed: {
      ...mapGetters({
        videoMessage: 'videodetail/selectMessage',
      }),
    },
    components: {
      remark,
    },
    filters: {
      timeFormat(val) {
        return moment(val).format('mm:ss');
      },
      Countformat(value) {
        if (value < 10000) {
          return value;
        } else {
          return Math.ceil(value / 10000) + '万';
        }
      },
    },
    mounted() {
      //操作DOM，把video标签挂载到Vue实例上
      this.video = this.$refs.video;
    },
  };
</script>

<style lang="scss" scoped>
  .video-container {
    width: 100%;
    .video-control {
      width: 100%;
      height: 400px;
    }
    .title {
      margin-top: 10px;
    }
    .detail {
      margin-top: 10px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.5);
      .play-count,
      .publish-time {
        margin-left: 15px;
      }
      .desc {
        margin-top: 5px;
      }
    }
    .similar-MV {
      margin-top: 15px;
      width: 100%;
      .similar-title {
        margin-bottom: 10px;
      }
      .similar-MV-body {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .single-card {
          margin-bottom: 10px;
          width: 50%;
          height: 70px;
          font-size: 12px;
          display: flex;
          &:hover {
            background: rgba(0, 0, 0, 0.1);
          }
        }
        .show-Pic {
          width: 130px;
          position: relative;
          border-radius: 5px;
          overflow: hidden;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
          &::after {
            position: absolute;
            content: '';
            left: 0%;
            top: 50%;
            transform: translateY(-50%);
            width: 2px;
            height: 80%;
            border-radius: 2px;
            background: rgb(35, 195, 119);
          }
        }
        .show-Text {
          position: relative;
          width: 400px;
          padding-left: 5px;
          .mv-title {
            position: absolute;
            left: 2%;
            top: 0;
          }
          .mv-author {
            position: absolute;
            left: 2%;
            top: 40%;
          }
          .play-count {
            position: absolute;
            left: 2%;
            bottom: 0;
            width: 65px;
            height: 20px;
            border-radius: 3px;
            color: rgba(100, 181, 246, 1);
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(0, 0, 0, 0.1);
            i {
              transform: scale(0.8);
            }
          }
          .duration {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 20%;
            bottom: 0;
            width: 65px;
            height: 20px;
            color: rgba(100, 181, 246, 1);
            border-radius: 3px;
            background: rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }
</style>
