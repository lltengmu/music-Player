//提供网络请求方法
import axios from '@/utils/request.js';
import base from '@/api/base.js';

const api = {
  getBanner() {
    return axios.get(base.banner);
  },
  getPlayList() {
    return axios.get(base.recommendPlayList);
  },
  getSingleHome() {
    return axios.get(base.singleHome);
  },
  getNewSong() {
    return axios.get(base.newSong);
  },
  getMV() {
    return axios.get(base.recomMV);
  },
  //获取歌单数据
  getrankList() {
    return axios.get(base.rankList);
  },
  //自定义get请求
  get(url) {
    return axios.get(url);
  },
  //获取歌单的所有歌曲
  getMusic(id) {
    return axios.get(base.musicList + '?id=' + id);
  },
  //获取歌单评论
  getRemark(url, id) {
    return axios.get(url + '?id=' + id);
  },

  //定义获取歌单详情API  /playlist/track/all?id=24381616&limit=10&offset=1
  getPlaylistDetail(id){
    return aixos.get(base.playlistdetail + "id=")
  }
};

export default api;
