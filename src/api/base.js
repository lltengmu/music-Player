const base = {
  banner: '/banner', //个性推荐轮播图请求地址
  recommendPlayList: '/personalized?limit=12', //推荐歌单请求地址
  singleHome: '/personalized/privatecontent', //独家放送请求地址
  newSong: '/personalized/newsong?limit=8', //最新音乐请求地址
  recomMV: '/personalized/mv', //推荐MV请求地址
  rankList: '/toplist/detail', //获取榜单
  musicList: '/playlist/track/all', //获取歌单所有歌曲请求地址
  playlistdetail:'/playlist/detail', //获取歌单详情请求地址 
};

export default base;
