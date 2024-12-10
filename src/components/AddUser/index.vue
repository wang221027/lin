<script lang="ts" setup>
let data = defineProps(['data'])
import { ElMessage } from "element-plus"
// 连接服务器
import { io } from 'socket.io-client';
const socket = io('https://wangyuanlin.site:8001');
// const socket = io('http://127.0.0.1:4000');
import $bus from "@/utils/event-bus"
const applyForUser = async () => {
    if (localStorage.getItem("username") == data.data[0].username) {
        return ElMessage.error("不能添加自己");
    }
    const dataList = {
        avatar: localStorage.getItem("avatar"),
        name: localStorage.getItem("nickname"),
        username: data.data[0].username,
        user_id: localStorage.getItem("user_id"),
        myUsername: localStorage.getItem("username"),
    }
    socket.emit("addUser", dataList)
    $bus.emit("addUser")
}
</script>
<template>
    <el-card style="width: 300px;" class="box">
        <template #header>
            <div class="card-header" style="display: flex;">
                <div class="pic"
                    :style="{ backgroundImage: data.data[0].avatar ? `url(${data.data[0].avatar})` : 'url(https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png)' }">
                </div>
                <p style="display: flex;align-items: center;">
                    {{ data.data[0].name }}
                    <Avatar style="color: #10aeff;width: 20px;margin-left: 10px;" />
                </p>
            </div>
        </template>
        <div style="display: flex;justify-content: center;margin: 20px 0;">
            <el-button type="success" @click="applyForUser">添加到通讯录</el-button>
        </div>
    </el-card>
</template>
<style scoped lang='scss'>
.box {
    position: absolute;
    left: 24vw;
    top: 80px;
    z-index: 10;

    .pic {
        width: 50px;
        height: 50px;
        border-radius: 4px;
        background-size: cover;
        background-position: center;
        box-shadow: 0 0px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-right: 16px;
    }
}
</style>