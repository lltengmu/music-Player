<template>
  <div class="tjmusic">
    <div class="header" @click="toPlaylist">
      <!-- <h3>推荐歌单</h3> -->
      <div class="icon">
        <i class="iconfont icon-icon-2"></i>
      </div>
    </div>
    <div class="card">
      <div
        class="single-card"
        v-for="item in musicSource"
        :key="item.id"
        @click="getRankdetail({ url: '/playlist/track/all', id: item.id })"
      >
        <div class="showPic">
          <img :src="item.img" alt />
          <div class="playTime">
            <i class="iconfont icon-tingshu"></i>
            <span class="playCount">{{
              Math.ceil(item.playTime / 10000)
            }}</span>
            <span>万</span>
          </div>
          <div class="iconplay">
            <i class="iconfont icon-24gf-play"></i>
          </div>
        </div>
        <div class="text">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['musicSource'],
    data() {
      return {
        musicMessage: {},
      };
    },
    methods: {
      //当点击""推荐歌单"时前往歌单页面
      toPlaylist() {
        this.$router.push('/playlists');
        //移动选项条
        this.$store.commit({
          type: 'scrollLine/setOffset',
          offset: 50,
        });
      },
      //单独的歌单被点击时的事件处理函数
      async getRankdetail(option) {
        //展示加载动画，待数据请求之后关闭
        const loading = this.$loading({
          lock: true,
          text: 'loading...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        //获取点击对应的歌单的所有歌曲列表
        await this.api
          .get(option.url + '?' + 'id=' + option.id)
          .then((data) => {
            const musicList = data.data.songs.map((item) => ({
              id: item.id,
              //dt为歌曲时长
              dt: item.dt,
              title: item.name,
              album: item.al.name,
              picUrl: item.al.picUrl,
              singer: item.ar
                .map((item) => ({ name: item.name }))
                .map((item) => {
                  return item.name;
                })
                .join('/'),
            }));
            this.$store.commit({
              type: 'desc/getSonglist',
              list: musicList,
            });
          })
          .catch((error) => {
            loading.close();
            this.$message.error('请求被中断了，请检查网络连接');
          });

        //点击歌单之后的事件处理函数
        //发送请求获取歌单详情
        await this.api.get('/playlist/detail?id=' + option.id).then((data) => {
          //数据处理
          const messageToDesc = data.data.playlist;
          this.musicMessage.type = '歌单';
          this.musicMessage = messageToDesc;
        });
        this.$store.commit({
          type: 'desc/getMessage',
          Message: this.musicMessage,
        });
        //这里获取到对应歌单的总评论数
        await this.api
          .getRemark('/comment/playlist', this.musicMessage.id)
          .then((data) => {
            const totalCount = data.data.total;
            this.$store.commit({
              type: 'remark/setTotal',
              total: totalCount,
            });
          });
        //关闭加载动画
        loading.close();
        this.$router.push('/musicdes'); //点击之后进入歌单详情组件
      },
    },
  };
</script>

<style lang="scss" scoped>
  .tjmusic {
    width: 100%;
    .header {
      width: 10%;
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon {
        padding: 2.5px;
      }
    }
    .card {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .single-card {
        position: relative;
        width: 230px;
        margin-top: 10px;
        border-radius: 10px;
        cursor: pointer;
        color: #fff;
        .showPic {
          position: relative;
          width: 100%;
          height: 230px;
          border-radius: 10px;
          &:hover .iconplay {
            opacity: 1;
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
          .playTime {
            position: absolute;
            top: 2.5%;
            right: 2.5%;
            width: 37%;
            height: 15px;
            color: #fff;
            font-size: 14px;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            i {
              transform: scale(1.3);
            }
            .playCount {
              padding: 0px 3px;
              font-weight: bold;
              color: rgba(100, 181, 246, 1);
            }
          }
          .iconplay {
            position: absolute;
            right: 5%;
            bottom: 2.5%;
            width: 25px;
            height: 25px;
            background: white;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: 0.5s linear;
            i {
              color: red;
              transform: scale(0.8);
            }
          }
        }
        .text {
          position: relative;
          top: 0%;
          left: 0%;
          width: 100%;
          color: black;
          font-size: 14px;
        }
      }
    }
  }
</style>
