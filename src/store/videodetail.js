export default {
  namespaced: true,
  state: {
    videoMessage: {},
  },
  getters: {
    selectMessage(state) {
      return state.videoMessage;
    },
  },
  mutations: {
    selectVideo(state, payload) {
      state.videoMessage = payload.object;
    },
  },
};
