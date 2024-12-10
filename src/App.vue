<script lang="ts" setup>
import FireworkDisplay from "@/components/FireworkDisplay/index.vue"
</script>
<template>
  <Header></Header>
  <!-- 右键菜单 -->
  <ContextMenu></ContextMenu>
  <div>
    <router-view></router-view>
  </div>
  <FireworkDisplay />
</template>
<style scoped lang='scss'></style>