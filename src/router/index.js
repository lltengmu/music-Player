import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Recommend from '@/views/recommend/Recommend.vue'
import RankingList from '@/views/rankingList/RankList.vue'
import LatestMusic from '@/views/LatestMusic/LatestMusic.vue'
import Musicdes from '@/views/Muscides/Musicdes.vue'
import list from '@/views/Muscides/children/list.vue'
import remark from '@/views/Muscides/children/remark.vue'
import Video from '@/views/Video/video.vue'
import Playlists from '@/views/playlists/playlists.vue'
const router = new VueRouter({
  routes:[
    { path:'/', redirect:'/recommend' },
    { path:'/recommend', component:Recommend },
    { path:'/rankinglist', component:RankingList },
    { path:'/latestmusic', component:LatestMusic },
    { path:'/video', component:Video },
    { path:'/playlists', component:Playlists },
    { path:'/musicdes',component:Musicdes,
      redirect:'/musicdes/list',
      children:[
      { path:'list',component:list },
      { path:'remark',component:remark }
    ]}
  ]
})

export default router
