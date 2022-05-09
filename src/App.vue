<template>
  <div id="app">
    <Header></Header>
    <Main></Main>
    <Player></Player>
  </div>
</template>

<script>
import Header from '@/components/header/index.vue';
import Main from '@/components/main/index.vue';
import Player from '@/views/Player/index.vue';
export default {
  data() {
    return {
      MainBanner: [],
    };
  },
  name: 'App',
  components: {
    Header,
    Main,
    Player,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  width: 100vw;
  height: 100vh;
}
#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>