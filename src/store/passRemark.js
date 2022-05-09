export default {
  namespaced: true,
  state:{
    total:0,
    changeCss:false
  },
  mutations:{
    setTotal(state,payload){
      state.total = payload.total;
    },
    changecss(state){
      state.changeCss = !state.changeCss
    }
  }
}