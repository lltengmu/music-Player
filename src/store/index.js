import Vue from 'vue'
import Vuex from 'vuex'


import showPlayer from './showPlayer.js';
import play from './play.js';
import desc from './desc.js';
import remark from './passRemark.js';
import videodetail from './videodetail.js';
import paging from './paging.js'
import rank from './rank.js'
import newMusic from './newMusic.js';
import scrollLine from './scrollLine.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    showPlayer,
    play,
    desc,
    remark,
    videodetail,
    paging,
    rank,
    newMusic,
    scrollLine
  }
})
