<template>
  <div class="PlayerIndex">
    <miniPlayer :progress="progress" :currentTime="currentTime"></miniPlayer>
    <!-- 定义媒体播放器 -->
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"
    ></audio>
  </div>
</template>

<script>
  import miniPlayer from '@/views/Player/miniPlayer.vue';
  import { mapGetters, mapState } from 'vuex';
  export default {
    data() {
      return {
        //定义歌曲的总时长
        duration: 0,
        //定义歌曲当前的播放时间
        currentTime: 0,
      };
    },
    components: {
      miniPlayer,
    },
    methods: {
      //定义一个消息提示
      prompt_1() {
        this.$message('已经是最后一首了哟...');
      },
    },
    computed: {
      ...mapGetters({
        currentSong: 'play/currentSong',
      }),
      ...mapState({
        playing: (state) => state.play.playing,
        playmode: (state) => state.play.mode,
        currentIndex: (state) => state.play.currentIndex,
        sequencePlayList: (state) => state.play.sequencePlayList,
      }),
      id() {
        return this.currentSong.id;
      },
      progress() {
        const result = (this.currentTime / this.duration) * 100;
        const newResult = Math.ceil(result) < 100 ? Math.ceil(result) : 100;
        return isNaN(newResult) ? 0 : newResult;
      },
    },
    watch: {
      playing(newVal) {
        this.$nextTick(() => {
          if (newVal) {
            this.audio.play();
          } else {
            this.audio.pause();
          }
        });
      },
      id(newVal, oldVal) {
        if (!oldVal) {
          return;
        }
        //有上一首歌才重载歌曲
        this.$nextTick(() => {
          this.audio.load();
          this.audio.play();
        });
      },
    },
    mounted() {
      //标签已经被渲染可以获取到audio标签
      let audio = document.querySelector('audio');
      //把audio标签挂载到组件实例上
      this.audio = audio;
      //添加事件
      this.audio.addEventListener('canplay', () => {
        this.duration = this.audio.duration;
      });

      this.audio.addEventListener('timeupdate', () => {
        //监听事件获取到歌曲当前播放的时间
        this.currentTime = Math.round(this.audio.currentTime);
      });

      //监听歌曲播放结束事件，当歌曲播放结束时判断是否顺序播放，是则按照播放列表自动播放下一曲
      this.audio.addEventListener('ended', () => {
        //播放模式为顺序播放并且播放歌曲的下标小于播放歌曲的数组长度时，提交 mutation
        if (
          this.playmode === 0 &&
          this.currentIndex < this.sequencePlayList.length - 1
        ) {
          this.$store.commit({
            type: 'play/ListLoop',
          });
        } else {
          this.prompt_1();
        }
      });
    },
  };
</script>

<style lang="scss" scoped>
  .PlayerIndex {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>
