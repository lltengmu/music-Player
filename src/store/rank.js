export default {
  namespaced: true,
  state:{
    pic:[]
  },
  mutations:{
    setPic(state,payload){
      state.pic = payload.list;
    }
  }
}