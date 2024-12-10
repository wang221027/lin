<script lang="ts" setup>
import { useUChatRoomStore } from "@/stores/chatRoom"
import { ref } from "vue";
// 显示哪个聊天界面
const showChatRoom = ref('');
const chatRoomStore = useUChatRoomStore()
// 引入全局bus事件
import $bus from "@/utils/event-bus"
// 连接服务器
import { io } from 'socket.io-client';
const socket = io('https://wangyuanlin.site:8001');
// 点击好友列表让右边显示
const userShow = () => {
    showChatRoom.value = '新的朋友';
}
// const socket = io('http://127.0.0.1:4000');
const consentUser = (item: any) => {
    const data = [
        {
            name: item.name,
            avatar: item.avatar,
            user_id: item.user_id,
            username: item.username,
            myUsername: item.myUsername
        },
        {
            name: localStorage.getItem("nickname"),
            avatar: localStorage.getItem("avatar"),
            user_id: localStorage.getItem("user_id"),
            username: item.myUsername,
            myUsername: item.username
        }
    ];
    socket.emit("consentUser", data);
    socket.emit("consentUser2", data);
    $bus.emit("eventUserList")
}
</script>
<template>
    <section>
        <div class="left">
            <ul class="left_ul">
                <li @click="userShow">
                    <div>
                        <UserFilled style="width: 30px;"></UserFilled>
                    </div>
                    <p>新的朋友</p>
                </li>
            </ul>
        </div>
        <div class="right">
            <div class="right_top">
                新的朋友
            </div>
            <ul class="right_ul">
                <li v-for="item in chatRoomStore.userList" v-show="showChatRoom == '新的朋友'">
                    <div class="right_left">
                        <div class="right_left_l"
                            :style="{ backgroundImage: item.avatar ? `url(${item.avatar})` : 'url(https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png)' }">
                        </div>
                        <div>
                            {{ item.name }}
                        </div>
                    </div>
                    <div>
                        <el-button type="primary" @click="consentUser(item)">接受</el-button>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>
<style scoped lang='scss'>
section {
    display: flex;
    height: calc(100vh - 60px);

    .left {
        flex: .23;
        background-color: #e3e4e5;
        padding-top: 20px;

        .left_ul {


            li {
                width: 100%;
                padding: 20px;
                height: 50px;
                display: flex;
                align-items: center;
                position: relative;

                div {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 4px;
                }
            }

            li:hover {
                background-color: #c5c4c4;
            }
        }
    }

    .right {
        flex: .77;
        background-color: #f5f5f5;

        .right_top {
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #ccc;
        }

        .right_ul {
            li {
                display: flex;
                height: 60px;
                justify-content: space-between;
                align-items: center;
                padding: 0 60px;

                .right_left {
                    display: flex;
                    align-items: center;

                    .right_left_l {
                        width: 40px;
                        height: 40px;
                        background-position: center;
                        background-size: cover;
                        border-radius: 4px;
                        margin-right: 10px;
                    }
                }
            }

            li:hover {
                background-color: #d7d7d7;
            }
        }
    }

}
</style>