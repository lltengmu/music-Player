export default {
  namespaced: true,
  state:{
    pageSize:16,
    allDataSource:[],
  },
  getters:{
    getRenderList(state){
      return state.allDataSource.slice(0,state.pageSize)
    }
  },
  mutations:{
    setDataSource(state,payload){
      state.allDataSource = payload.dataSource;
    },
    changeCurrentPage(state){
      state.pageSize *= 2;
    }
  }
}