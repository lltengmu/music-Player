export default {
  namespaced: true,
  state:{
    songSheet:'',
    songList:{}
  },
  getters:{},
  mutations:{
    getMessage(state,payload){
      state.songSheet = payload.Message
    },
    getSonglist(state,payload){
      state.songList = payload.list;
    }
  }
}