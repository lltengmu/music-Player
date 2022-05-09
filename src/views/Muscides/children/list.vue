<template>
  <div class="list">
    <table cellpadding="10" cellspacing="0">
      <tr>
        <td></td>
        <td>操作</td>
        <td>标题</td>
        <td>歌手</td>
        <td>专辑</td>
        <td>时间</td>
      </tr>
      <tr
        v-for="(item, index) in list"
        :key="item.id"
        @click="showminiPlayer(index)"
      >
        <td>{{ index + 1 }}</td>
        <td>
          <i class="iconfont icon-xihuan"></i>
        </td>
        <td>{{ item.title }}</td>
        <td>{{ item.singer }}</td>
        <td>{{ item.album }}</td>
        <td>{{ item.dt | timeformat }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import moment from 'moment';
  export default {
    name: 'list',
    computed: {
      ...mapState({
        list: (state) => state.desc.songList,
        show: (state) => state.showPlayer.show,
      }),
    },
    methods: {
      showminiPlayer(index) {
        //进入歌单详情页之后，点击歌曲列表，将歌曲列表和所点击的歌曲下标传入Vuex
        this.$store.commit({
          type: 'play/selectSongByIndex',
          index: index,
          list: this.list,
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
      timeformat(val) {
        return moment(val).format('mm:ss');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .list {
    width: 100%;
    table {
      width: 100%;
      font-size: 14px;
      tr {
        line-height: 32px;
        font-size: 12px;
        border: none;
        color: #7f8c8d;
        cursor: pointer;
        &:hover {
          color: rgba(100, 181, 246, 1);
        }
      }
      td:nth-child(1) {
        width: 3%;
        text-align: left;
      }
      td:nth-child(2) {
        width: 8%;
        text-align: center;
      }
      td:nth-child(3) {
        text-align: left;
        width: 20%;
      }
      td:nth-child(4) {
        text-align: left;
        width: 30%;
      }
      td:nth-child(5) {
        text-align: left;
        width: 40%;
      }
    }
  }
</style>
