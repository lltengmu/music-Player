export default async function (mvid,detail = '/mv/detail', url = '/mv/url',similar = '/simi/mv',comment = '/comment/mv') {

  //声明一个空对象存储数据
  const allMVmessage = {};
  //进入加载动画
  const loading = this.$loading({
    lock: true,
    text: 'loading...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  //获取到mv详情
  await this.api
  .get(detail + '?' + 'mvid=' + mvid)
  .then((data) => {
    const {
      artists,
      artistId,
      commentCount,
      desc,
      name,
      playCount,
      publishTime,
      shareCount,
      subCount,
    } = data.data.data;
    allMVmessage.artists = artists.map((item) => item.name).join('/');
    allMVmessage.name = name;
    allMVmessage.artistId = artistId;
    allMVmessage.commentCount = commentCount;
    allMVmessage.desc = desc;
    allMVmessage.playCount = playCount;
    allMVmessage.publishTime = publishTime;
    allMVmessage.shareCount = shareCount;
    allMVmessage.subCount = subCount;
  });

  //获取到mv的url地址   /mv/url?id=5436712
  await this.api
  .get(url + '?' + 'id=' + mvid)
  .then((data) => {
    allMVmessage.videoUrl = data.data.data.url;
  });

  //获取到相关mv   /simi/mv?mvid=5436712
  await this.api
  .get(similar + '?' + 'mvid=' + mvid)
  .then((data) => {
    allMVmessage.recomvideolist = data.data.mvs;
  });

  //获取mv评论
  await this.api
  .get(comment + '?' + 'id=' + mvid)
  .then((data) => {
    const commentData = data.data.comments.map((item) => ({
      content: item.content,
      likedCount: item.likedCount,
      time: item.time,
      timeStr: item.timeStr,
      name: item.user.nickname,
      picUrl: item.user.avatarUrl,
    }));
    for (let i = 0; i < commentData.length; i++) {
      commentData[i].id = i + 1;
    }
    allMVmessage.comments = commentData;
    const hotcomment = data.data.hotComments.map((item) => ({
      id: item.commentId,
      content: item.content,
      likedCount: item.likedCount,
      time: item.time,
      timeStr: item.timeStr,
      name: item.user.nickname,
      picUrl: item.user.avatarUrl,
    }));
    allMVmessage.hotComments = hotcomment;
  });

  //数据请求结束关闭加载动画
  loading.close();
  //数据处理完毕提交到Vuex
  this.$store.commit({
    type: 'videodetail/selectVideo',
    object:allMVmessage,
  });
  //页面跳转到视频详情组件
  this.$router.push('/video');
}
