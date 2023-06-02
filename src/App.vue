<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({

  // 监视网络状态，离线则跳转到网络异常页面
  mounted() {
    window.addEventListener('offline', () => {
      // 网络由正常到异常时触发     
      sessionStorage.locationUrl = window.location.href;
      // 切换到网络出错页
      this.$router.replace('/network_error')
    });
    window.addEventListener('online', () => {
      window.location.href = sessionStorage.locationUrl
    });
    window.onpopstate = () => {
      if (!this.allowBack) {    //    这个allowBack 是存在vuex里面的变量
        history.go(1)
      }
    };
  },
})
</script>


<style lang="less">
#app {
  width: 100%;
  height: 100%;
}

html,
body {
  height: 99%;
  background-color: transparent;
}
</style>
