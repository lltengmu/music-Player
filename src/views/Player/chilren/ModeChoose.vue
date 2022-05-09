<template>
  <div class="modechoose">
    <el-col :span="12">
      <el-dropdown trigger="click" :hide-on-click="true" placement="top">
        <span class="el-dropdown-link">
          <i class="iconfont" :class="classlist[mode].className"></i>
        </span>
        <el-dropdown-menu slot="dropdown" :divided="true">
          <div class="el-dropdown-item" v-for="item in classlist" :key="item.id" @click="modeChoose(item.index)">
            <i :class="item.className"></i>{{ item.mode }}
          </div>
          <!-- <el-dropdown-item v-for="item in classlist" :key="item.id" :icon="item.className" @click="modeChoose(item.index)">{{ item.mode }}</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </div>
</template>

<script>
import { mapState } from 'vuex';
  export default {
    data() {
      return {
        classindex: 0,
        classlist: [
          {
            id: 1,
            index: 0,
            className: 'iconfont icon-liebiaoxunhuan',
            mode: '顺序播放',
          },
          {
            id: 2,
            index: 1,
            className: 'iconfont icon-24gl-repeatOnce2',
            mode: '单曲循环',
          },
          {
            id: 3,
            index: 2,
            className: 'iconfont icon-suijibofang',
            mode: '随机播放',
          },
        ],
      };
    },
    computed:{
      ...mapState({ 
        mode:state => state.play.mode,
       })
    },
    methods: {
      modeChoose(index) {
        this.$store.commit({
          type:'play/setMode',
          mode:index,
        })
      },
    },
  };
</script>

<style lang="scss" scoped>
  .el-dropdown-menu {
    .el-dropdown-item {
      width: 90px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      color: rgba(96,98,102,1);
      cursor: pointer;
      &:hover{
        color: rgba(64,158,255, 1);
        background: rgba(64,158,255,.1);
      }
      i {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right:5px;
      }
    }
  }
</style>
