import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入elementUI组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入api模块
import api from '@/api/index.js'
//把api挂载到 Vue 原型上
Vue.prototype.api = api;

//引入获取mv数据的模块
import getVideo from '@/commentfunction/getVidoe.js';
Vue.prototype.getVideo = getVideo;

import resetVideo from '@/commentfunction/resetVideo.js'
Vue.prototype.resetVideo = resetVideo;

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
