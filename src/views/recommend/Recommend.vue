<template>
  <div class="recommend">
    <Banner :Banner="bannerSource"></Banner>
    <Tjmusic :musicSource="TjmusicSource"></Tjmusic>
    <Hotplayer :HotplayerSource="HotplayerSource"></Hotplayer>
    <Newsong :newsongSource="newSongSource"></Newsong>
    <RecomMV :recomMVSource="RecomMVSource"></RecomMV>
  </div>
</template>

<script>
  import Banner from '@/views/recommend/Banner.vue';
  import Tjmusic from '@/views/recommend/Tjmusci.vue';
  import Hotplayer from '@/views/recommend/Hotplayer.vue';
  import Newsong from '@/views/recommend/Newsong.vue';
  import RecomMV from '@/views/recommend/RecomMV.vue';
  export default {
    data() {
      return {
        bannerSource: [],
        newSongSource: [],
        TjmusicSource: [],
        RecomMVSource: [],
        HotplayerSource: [],
        params:''
      };
    },
    methods: {
      async getData() {
        //展示加载动画，待数据请求之后关闭
        const loading = this.$loading({
          lock: true,
          text: 'loading...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });

        //发送请求获取数据
        //获取banner组件数据
        await this.api
          .getBanner()
          .then((data) => {
            const dataSource = data.data.banners.map((item) => ({
              encodeId: item.encodeId,
              img: item.imageUrl,
              title: item.typeTitle,
            }));
            //循环遍历过滤后的数据，添加一个 id 值，解决encodeId 重复的问题（encodeId不能作为key的值）
            for (var i = 0; i < dataSource.length; i++) {
              dataSource[i].id = i;
            }
            this.bannerSource = dataSource;
          })
          .catch((error) => {
            console.log('banner组件获取数据异常', error);
          });

        //获取推荐歌单数据
        await this.api
          .getPlayList()
          .then((data) => {
            const dataSource = data.data.result.map((item) => ({
              id: item.id,
              text: item.name,
              img: item.picUrl,
              playTime: item.playCount,
            }));
            this.TjmusicSource = dataSource;
          })
          .catch((error) => {
            console.log('推荐歌单组件获取数据异常', error);
          });

        //获取独家放送组件数据
        await this.api
          .getSingleHome()
          .then((data) => {
            const newData = data.data.result.map((item) => ({
              id: item.id,
              picUrl: item.picUrl,
              name: item.name,
            }));
            this.HotplayerSource = newData;
          })
          .catch((error) => {
            console.log('独家放送组件获取数据异常', error);
          });

        //先获取最新音乐组件所有歌曲的id用于拼接字符串
        await this.api
          .getNewSong()
          .then((data) => {
            const dataSource = data.data.result.map((item) => ({
              id: item.id,
            }));
            //拼接参数用于获取所有的歌曲详情
            let result = '';
            dataSource.map((item) => {
              result += item.id + ',';
              return result;
            });
            result = result.slice(0, result.length - 1);
            this.params = result;
          })
          .catch((error) => {
            console.log('最新音乐组件获取数据异常', error);
          });
          //获取最新音乐组件数据
          await this.api.get('/song/detail?ids=' + this.params).then((data) => {
            const dataSource = data.data.songs.map(item => ({
              id:item.id,
              alia: item.alia[0],
              singer:item.ar[0].name,
              title: item.name,
              picUrl:item.al.picUrl,
              mvid:item.mv,
              dt:item.dt,
              transName:item.tns
            }));
            //把最新音乐的数据当作miniplayer的默认数据
            this.newSongSource = dataSource;
        });

        //获取推荐MV组件数据
        await this.api
          .getMV()
          .then((data) => {
            const newData = data.data.result.map((item) => ({
              id: item.id,
              name: item.artistName,
              desc: item.name,
              img: item.picUrl,
            }));
            this.RecomMVSource = newData;
          })
          .catch((error) => {
            console.log('推荐MV组件获取数据异常', error);
          });
        //关闭加载动画
        loading.close();
      },
    },
    created() {
      this.getData();
    },
    components: {
      Banner,
      Tjmusic,
      Hotplayer,
      Newsong,
      RecomMV,
    },
  };
</script>

<style></style>
