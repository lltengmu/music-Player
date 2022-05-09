<template>
  <div class="remark">
    <!-- 精彩评论部分 -->
    <div class="remark-title">精彩评论</div>
    <div class="remark-single" v-for="item in hotcomment" :key="item.id">
      <img :src="item.picUrl" alt />
      <div class="single-text">
        <div class="single-title">
          <span class="name">{{ item.name }}：</span>
          <span class="text">{{ item.content }}</span>
        </div>
        <div class="single-time">
          <span class="day">{{ item.time | timeFormat }}</span>
          <span class="time">{{ item.timeStr }}</span>
        </div>
      </div>
      <div class="icon">
        <div class="icon-report">举报</div>
        <div class="icon-likes">
          <i class="iconfont icon-good"></i>{{ item.likedCount | setlike }}
        </div>
        <div class="icon-share"><i class="iconfont icon-fenxiang"></i></div>
        <div class="icon-addremark"><i class="iconfont icon-pinglun"></i></div>
      </div>
    </div>
    <!-- 最新评论部分 -->
    <div class="remark-title">最新评论</div>
    <div class="remark-single" v-for="item in comments" :key="item.id">
      <img :src="item.picUrl" alt />
      <div class="single-text">
        <div class="single-title">
          <span class="name">{{ item.name }}：</span>
          <span class="text">{{ item.content }}</span>
        </div>
        <div class="single-time">
          <span class="day">{{ item.time | timeFormat }}</span>
          <span class="time">{{ item.timeStr }}</span>
        </div>
      </div>
      <div class="icon">
        <div class="icon-report">举报</div>
        <div class="icon-likes">
          <i class="iconfont icon-good"></i>{{ item.likedCount | setlike }}
        </div>
        <div class="icon-share"><i class="iconfont icon-fenxiang"></i></div>
        <div class="icon-addremark"><i class="iconfont icon-pinglun"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment"
  export default {
    props:["comments","hotcomment"],
    filters: {
      timeFormat(val) {
        return moment(val).format('MM月DD日');
      },
      setlike(val) {
        if (val === 0) {
          return '';
        } else {
          return val;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .remark {
    width: 100%;
    .remark-title {
      margin-top: 30px;
    }
    .remark-single {
      position: relative;
      margin-top: 5px;
      width: 100%;
      height: 60px;
      border-bottom: solid 0.5px rgba(189, 195, 199, 0.5);
      &:hover .icon .icon-report {
        opacity: 1;
      }
      img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .single-text {
        position: absolute;
        top: 50%;
        left: 4%;
        transform: translateY(-50%);
        font-size: 12px;
        .single-title {
          .name {
            color: rgba(100, 181, 246, 1);
            cursor: pointer;
          }
        }
        .single-time {
          margin-top: 5px;
          font-size: 12px;
          color: #95a5a6;
          .day {
            margin-right: 10px;
          }
        }
      }
      .icon {
        position: absolute;
        right: 0%;
        top: 50%;
        width: 150px;
        height: 18px;
        display: flex;
        font-size: 12px;
        cursor: pointer;
        .icon-report {
          opacity: 0;
        }
        .icon-likes {
          color: rgba(100, 181, 246, 1);
          i {
            padding: 0 2px;
            color: black;
          }
        }
        div {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: scale(0.8);
          border-right: 1px solid #bdc3c7;
          &:nth-child(4) {
            border: none;
          }
          i {
            opacity: 0.5;
            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
  }
</style>
