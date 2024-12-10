<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import $bus from '@/utils/event-bus'
let input = ref('')
const search = () => {
    let data = {
        isShow: true,
    }
    if (input.value === '') {
        $bus.emit("userISShow", data)
    } else {
        let data = {
            isShow: false,
            data: input.value
        }
        $bus.emit("userISShow", data)
    }
}
</script>
<template>
    <el-input v-model="input" style="width: 100%;height: 40px;" placeholder="输入账号添加好友" :prefix-icon="Search"
        @input="search" />
</template>
<style scoped lang='scss'></style>