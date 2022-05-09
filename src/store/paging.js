export default {
  namespaced: true,
  state: {
    currentPage: 1,
    pageSize: 12,
    //定义需要过滤的标签关键词 String
    filterTag: '',
    text:1,
    allPlaylistArr: [],
    //定义一个可操作的数组
    sequencePlayList: [],
  },
  getters: {
    //对每页需要渲染的数组片段进行管理，将数组过滤和截取数组合并到一起
    renderPlaylistArr(state) {
      state.sequencePlayList = state.allPlaylistArr;
      if (state.filterTag === '') {
        //说明分类标签没有被点击，对原数组进行分页功能导出
        return state.sequencePlayList.slice(
          (state.currentPage - 1) * state.pageSize,
          state.currentPage * state.pageSize
        );
      } else if (state.filterTag !== '') {
        //说明分类标签被点击了，先对原数组进行过滤，对过滤后的数组进行分页导出
        return state.sequencePlayList
          .filter((currentValue) => {
            return currentValue.tags.join('').includes(state.filterTag);
          })
          .slice(
            (state.currentPage - 1) * state.pageSize,
            state.currentPage * state.pageSize
          );
      }else{
        return []
      }
    },
    //对分页页码长度进行管理
    pageLength(state){
      state.sequencePlayList = state.allPlaylistArr;
      if (state.filterTag === '') {
        //说明分类标签没有被点击，对原数组进行分页功能导出
        return state.sequencePlayList.length;
      } else if (state.filterTag !== '') {
        //说明分类标签被点击了，先对原数组进行过滤，对过滤后的数组进行分页导出
        return state.sequencePlayList
          .filter((currentValue) => {
            return currentValue.tags.join('').includes(state.filterTag);
          }).length
      }else{
        return []
      }
    }
  },
  mutations: {
    selectPlaylist(state, payload) {
      state.allPlaylistArr = payload.allPlaylist;
    },
    //分类标签被点击后的事件处理函数
    selectFilterTag(state, payload) {
      state.currentPage = 1;
      state.filterTag = payload.keyword;
    },
    //分页页码被点击后的事件处理函数
    selectCurrentPage(state, payload) {
      state.currentPage = payload.pageNum;
    },
  },
};
