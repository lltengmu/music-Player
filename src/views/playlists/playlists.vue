<template>
  <div class="playlists-container">
    <!-- 头部精品歌单入口卡片 -->
    <div
      class="playlist-high-quality"
      :style="`background-image: url('${topCard.coverImgUrl}')`"
    >
      <div class="playlist-high-quality-mask">
        <div class="show-Pic">
          <img :src="topCard.coverImgUrl" alt="" />
        </div>
        <div class="show-text">
          <h2>精品歌单</h2>
          <h3>{{ topCard.name }}</h3>
          <div class="desc">{{ topCard.description }}</div>
        </div>
      </div>
    </div>
    <!-- 展示分类标签 -->
    <div class="category-tags" ref="tags">
      <div class="tag" v-for="item in Category" :key="item.id" @click="filterplaylist(item.name)">{{ item.name }}</div>
    </div>
    <!-- 展示所有歌单 -->
    <div class="playlist-card-body">
      <playlistCard
        :playlist="renderlist"
      ></playlistCard>
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="pagelength"
          :page-size="pageSize"
          :current-page="currentPage"
          prev-text="上一页"
          next-text="下一页"
        ></el-pagination>
      </div>
    </div>
    <!-- 分页组件 -->
  </div>
</template>

<script>
  import playlistCard from '@/views/recommend/chilren/PlaylistCard.vue';
  import { mapGetters, mapState } from 'vuex';
  export default {
    name: 'playlists',
    data() {
      return {
        topCard: {
          coverImgUrl: '',
          description: '',
          name: '',
        },
        Category: [],
      };
    },
    computed: {
      ...mapState({
        currentPage: (state) => state.paging.currentPage,
        pageSize: (state) => state.paging.pageSize,
      }),
      //从vuex中获取需要被渲染的数组  renderlist 是分类标签未被点击时默认渲染的数组，filter是分类标签被点击之后需要渲染的数组
      ...mapGetters({
        renderlist: 'paging/renderPlaylistArr',
        pagelength:'paging/pageLength',
      }),
    },
    components: {
      playlistCard,
    },
    methods: {
      //定义点击分类标签后背景变化的事件
      controlBg(e){
        console.log(e.target);
      },
      //定义点击分类标签之后的事件处理函数
      filterplaylist(filterTag) {
        this.$store.commit({
          type:'paging/selectFilterTag',
          keyword:filterTag
        })
      },
      //点击分页组件的页码时的事件处理函数
      handleCurrentChange(val) {
        this.$store.commit({
          type: 'paging/selectCurrentPage',
          pageNum: val,
        });
      },
      async getData() {
        //进入加载动画
        const loading = this.$loading({
          lock: true,
          text: 'loading...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        //请求数据 获取顶部精品歌单的渲染数据

        await this.api
          .get('/top/playlist/highquality?limit=10')
          .then((data) => {
            const { coverImgUrl, description, name } = data.data.playlists[0];
            this.topCard.coverImgUrl = coverImgUrl;
            this.topCard.description = description;
            this.topCard.name = name;
          });

        //请求歌单数据
        await this.api.get('/top/playlist?limit=100').then((data) => {
          const dataSource = data.data.playlists.map((item) => ({
            id: item.id,
            text: item.name,
            img: item.coverImgUrl,
            playTime: item.playCount,
            tags: item.tags,
          }));
          this.$store.commit({
            type: 'paging/selectPlaylist',
            allPlaylist: dataSource,
          });
          this.dataToplaylistCard = dataSource;
        });
        await this.api.get('/playlist/hot').then((data) => {
          const tags = data.data.tags.map((item) => ({
            id: item.id,
            name: item.name,
          }));
          this.Category = tags;
        });
        //数据请求结束 关闭加载动画
        loading.close();
      },
    },
    created() {
      this.getData();
    },
    mounted(){
      let tag = document.querySelector('.category-tags');
      let tags = tag.childNodes;
      tag.addEventListener('click',(e)=>{
        //先清除所有子元素的背景颜色
        for(let i = 0; i < tags.length ; i++){
          tags[i].style.background = '';
          tags[i].style.color = '';
        }
        //为目标节点添加想要的背景样式
        e.target.style.background = 'rgba(189,195,199,.5)';
        e.target.style.color = 'rgba(100, 181, 246, 1)';
        //如果不小心点到了父节点，此时父节点的样式会发生变化，需要将这个变化清除
        tag.style.background = '';
      });
    }
  };
</script>

<style lang="scss" scoped>
  .playlists-container {
    width: 100%;
    .playlist-high-quality {
      position: relative;
      width: 100%;
      height: 200px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.2);
      overflow: hidden;
      .playlist-high-quality-mask {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(15px);
        .show-Pic {
          position: absolute;
          left: 2.5%;
          top: 50%;
          transform: translateY(-50%);
          width: 160px;
          height: 160px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .show-text {
          position: absolute;
          right: 2%;
          top: 50%;
          transform: translateY(-50%);
          width: 81%;
          height: 160px;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          cursor: default;
          h2 {
            width: 100px;
            font-size: 18px;
            font-weight: normal;
            color: #f39c12;
            border: 1px solid #f39c12;
            border-radius: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          h3 {
            font-weight: normal;
          }
          .desc {
            width: 100%;
            font-size: 14px;
            // white-space: nowrap;
            // text-overflow: ellipsis;
            // overflow: hidden;
          }
        }
      }
    }
    .category-tags {
      margin-top: 15px;
      width: 100%;
      height: 16px;
      font-size: 12px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .tag {
        margin-right: 10px;
        width: 60px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2px;
        cursor: pointer;
        &:hover {
          background: #bdc3c7;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .playlist-card-body {
      margin-top: 5px;
      width: 100%;
      height: 30px;
      .page {
        margin-top: 30px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
