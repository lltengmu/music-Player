<template>
  <div class="RankingList">
    <TopRank :topRankSource="TopSource"></TopRank>
    <Allrank :allRankSource="allrankSource"></Allrank>
  </div>
</template>

<script>
  import Allrank from '@/views/rankingList/Allrank.vue';
  import TopRank from '@/views/rankingList/TopRank.vue';
  export default {
    data() {
      return {
        TopSource: [],
        allrankSource: [],
        idList: [],
        musicList:[]
      };
    },
    components: {
      TopRank,
      Allrank,
    },
    methods: {
      async getrankList() {
        //展示加载动画
        let loading = this.$loading({
          lock: true,
          text: 'loading...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        //发起数据请求获取榜单
        await this.api
          .getrankList()
          .then((data) => {
            const newdata = data.data.list.map((item) => ({
              id: item.id,
              name: item.name,
              des: item.description,
              update: item.updateFrequency,
              img: item.coverImgUrl,
              playCount: item.playCount,
              updateTime: item.updateTime,
            }));
            //删除最后一个对象
            // newdata.pop();
            //提取出前6个对象
            this.TopSource = [...newdata.splice(0, 6)];
            this.allrankSource = newdata;
          })
          .catch((error) => {
            this.$message.error('网络资源请求错误，请刷新');
          });
        //数据请求结束关闭加载动画
        loading.close();
      },
    },
    created() {
      this.getrankList();
    },
  };
</script>

<style lang="scss" scoped>
  .RankingList {
    width: 100%;
  }
</style>
