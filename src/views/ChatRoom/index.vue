<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import { reqUser } from "@/api/ChatRoom"
import { useUChatRoomStore } from "@/stores/chatRoom"
import $bus from "@/utils/event-bus"
const chatRoomStore = useUChatRoomStore()
// 连接服务器
import { io } from 'socket.io-client';
import { ElMessage } from 'element-plus';
const socket = io('https://wangyuanlin.site:8001');
// const socket = io('http://127.0.0.1:4000');
const getUser = async () => {
    if (localStorage.getItem("username")) {
        const result = await reqUser(localStorage.getItem("username") as string)
        if (result.data == null) return;
        chatRoomStore.userList = result.data;
        chatRoomStore.userListLength = result.data.length;
    }
}
socket.on("getAddUser", () => {
    ElMessage.success("申请好友成功")
    getUser()
})
// 定义全局事件，触发的时候重新获取好友列表
$bus.on("eventUserList", () => {
    console.log('bus触发了');
    getUser()
})
let path = ref('')
const $route = useRoute();
let avatar = ref('')
watch(() => $route.path, () => {
    path.value = $route.path;
})
onMounted(() => {
    if (localStorage.getItem("avatarUrl")) {
        avatar.value = localStorage.getItem("avatarUrl") as string;
    }
    if ($route.path === '/ChatRoom/message') {
        path.value = '/ChatRoom/message'
    }
    if ($route.path === '/ChatRoom/user') {
        path.value = '/ChatRoom/user'
    }
    getUser()
})
</script>
<template>
    <section class="container">
        <div class="left">
            <div class="left_div"
                :style="{ backgroundImage: avatar ? `url(${avatar})` : 'url(https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png)' }">
                <div></div>
            </div>
            <router-link to="/ChatRoom/message">
                <div class="message_box">
                    <Comment :style="{ color: path == '/ChatRoom/message' ? '#07c160' : '#fff' }" style="width: 30px;">
                    </Comment>
                </div>
            </router-link>
            <router-link to="/ChatRoom/user">
                <div class="message_box">
                    <UserFilled :style="{ color: path == '/ChatRoom/user' ? '#07c160' : '#fff' }" style="width: 30px;">
                    </UserFilled>
                    <div class="user_message"
                        v-if="chatRoomStore.userListLength != null && chatRoomStore.userListLength > 0">{{
                            chatRoomStore.userListLength }}
                    </div>
                </div>
            </router-link>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </section>
</template>
<style scoped lang='scss'>
.container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: calc(100vh - 60px);
    margin-top: 60px;

    .left {
        flex: .02;
        background-color: #2e2e2e;
        padding: 10px;

        .left_div {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
            margin-bottom: 20px;
            position: relative;
            margin-top: 20px;

            div {
                position: absolute;
                bottom: -2px;
                right: 0;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background-color: #25e68a;
                border: 2px solid #fff;
            }
        }
    }

    .right {
        flex: .98;
    }
}

.message_box {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .user_message {
        position: absolute;
        top: 4px;
        right: 2px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: red;
        text-align: center;
        line-height: 16px;
        color: #fff;
        font-weight: bold;
        font-size: 12px;
    }
}
</style>