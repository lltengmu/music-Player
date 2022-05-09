const playMode = {
  sequence: 0, //顺序播放
  loop: 1, //单曲循环
  random: 2, //随机播放
};

export default {
  namespaced: true,
  state: {
    //是否要全屏播放
    fullScreen: false,
    //当前音乐是否在播放
    playing: false,
    //播放歌曲列表
    playLisi: [],
    //顺序的歌曲列表,原始的歌单列表
    sequencePlayList: [],
    //播放模式
    mode: playMode.sequence,
    //给播放器的默认数据
    defaultMusicList:[],
    //当前播放歌曲在歌曲列表中的下标
    currentIndex: -1,
  },
  getters: {
    //当前歌曲信息
    currentSong(state) {
      if (state.currentIndex >= 0 && state.currentIndex < state.sequencePlayList.length) {
        //选中了歌曲要播放
        return state.sequencePlayList[state.currentIndex];
      } else {
        return {};
      }
    },
  },
  mutations: {
    //歌单中点击歌曲后的处理事件
    selectSongByIndex(state, payload) {
      //设置歌曲的下标
      state.currentIndex = payload.index;
      //歌单列表的原始数据需要一直保留，不能被其他事件影响到歌单顺序
      state.sequencePlayList = [...payload.list];
      //播放音乐
      state.playing = true;
    },
    //在抽屉列表中点击歌曲播放
    indexChange(state, payload) {
      state.currentIndex = payload.index;
    },
    //定义播放状态的处理函数
    setPlaying(state) {
      state.playing = !state.playing;
    },
    //定义切换播放模式的处理函数
    setMode(state, payload) {
      state.mode = payload.mode;
    },
    //定义顺序播放的事件处理函数
    ListLoop(state) {
      state.currentIndex += 1;
      /* state.playing = true; */
    },
    //顺序播放模式时点击下一首的事件处理函数
    nextSong(state){
      if(state.currentIndex <= state.sequencePlayList.length - 1){
        state.currentIndex += 1
      }
    },
    //顺序播放模式时点击上一首的事件处理函数
    prevSong(state){
      if( -1 < state.currentIndex <= state.sequencePlayList.length - 1){
        state.currentIndex -= 1
      }
    }
  },
};
