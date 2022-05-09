<template>
  <div class="musicList">
    <div class="user-pic">
      <div v-for="item in dataSource" :key="item.id">
        <img :src="item.picUrl" alt="">
      </div>
      <span class="updateTime">{{ updateTime | timeFormat }}</span>
    </div>
    <div class="single-message" v-for="(item, index) in dataSource" :key="item.id">
      <div class="index">{{ index + 1 }}</div>
      <div class="song-name">{{ item.name }}</div>
      <div class="singer-name">{{ item.singer }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
  export default {
    props: ['id','updateTime'],
    data() {
      return {
        dataSource: [],
      };
    },
    methods: {
      async getRankdetail(id,url = '/playlist/track/all') {
        await this.api.get(url + '?' + 'id=' + id).then((data) => {
          const songlist = data.data.songs.map((item) => ({
            name: item.name,
            alia: item.alia.join(''),
            singer: item.ar[0].name,
            picUrl: item.al.picUrl,
          }));
          this.dataSource = songlist.splice(0, 5);
          // console.log(this.dataSource);
          //提交到Vuex供父组件获取到图片内容
          this.$store.commit({
            type: 'rank/setPic',
            list: this.dataSource,
          });
        });
      },
    },
    created() {
      this.getRankdetail(this.id);
    },
    filters:{
      timeFormat(val) {
        return moment(val).format('MM月DD日');
      },
    }
  };
</script>

<style lang="scss" scoped>
  .musicList {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    .user-pic {
      position: absolute;
      top: -15%;
      left: 5%;
      width: 100%;
      height: 25px;
      background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
      display: flex;
      div {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: black;
        border: 1px solid #fff;
        transform: scale(1.5);
        transform-origin: left bottom;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      span{
        position: absolute;
        right: 10%;
        width: 100px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-style: italic;
        color: #fff;
      }
    }
    .single-message {
      flex: 1;
      width: 100%;
      height: 20px;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 5px;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      &:nth-child(2),&:nth-child(3),&:nth-child(4){
        div:nth-child(1){
          color:rgba(100, 181, 246, 1);
        }
      }
      .index {
        width: 10%;
        color: #bdc3c7;
        text-align: center;
      }
      .song-name {
        width: 40%;
        text-align: left;
      }
      .singer-name {
        width: 50%;
        color: #bdc3c7;
        text-align: right;
        padding: 0px 10px 0px 0px;
      }
    }
  }
</style>
