export default {
  namespaced: true,
  state: {
    offset:0
  },
  getters: {
    selectoffset(state) {
      return state.offset;
    },
  },
  mutations: {
    setOffset(state, payload) {
      state.offset = payload.offset;
    },
  },
};