export default {
  namespaced: true,
  state:{
    show:true
  },
  mutations: {
    changeState(state){
      state.show = !state.show;
    }
  },
}