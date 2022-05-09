<template>
  <div class="main-container">
    <div class="main-center">
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    data: Array
  },
  computed: {
    ...mapState({
      show: state => state.showPlayer.show
    })
  },
  mounted(){
    //获取具有滚动条标签对DOM进行操作
    let scroll = document.querySelector('.main-container');
    scroll.addEventListener('scroll',()=>{
      //监听滚动事件，当滚动条滚动到底部的时候  改变最新音乐组件需要渲染的数据长度
      if( ( scroll.scrollTop + scroll.offsetHeight) >= scroll.scrollHeight){
        this.$store.commit({
          type:'newMusic/changeCurrentPage'
        })
      }
    })
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  position: absolute;
  margin: 20px auto;
  width: 100%;
  height: 90%;
  overflow: auto;
  overflow-x: hidden;
  top: 50px;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bdc3c7;
    border-radius: 2.5px;
  }
  .main-center {
    width: 75%;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 0;
    .slide-fade-enter-active {
      transition: all 0.2s ease;
    }
    .slide-fade-leave-active {
      transition: all 0.2s ease;
    }
    .slide-fade-enter {
      transform: translateX(45%);
    }
    .slide-fade-leave-to {
      /* transform: translateX(-45%); */
      opacity: 0;
    }
  }
}
</style>