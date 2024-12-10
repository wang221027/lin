<script lang="ts" setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { reqUsreInfo, reqUserList } from "@/api/ChatRoom"
// 表情
import './font/iconfont.css'
import data from "emoji-mart-vue-fast/data/all.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import $bus from '@/utils/event-bus'
import { reqSearchUserInfo } from "@/api/Search"
const emojiIndex = new EmojiIndex(data)
// 判断表情是否显示
const isShow = ref(false)
const showEmoji = (emoji: any) => {
    content.value = content.value + emoji.native;
}
// 连接服务器
import { io } from 'socket.io-client';
import { ElMessage } from 'element-plus';
const socket = io('https://wangyuanlin.site:8001');
// const socket = io('http://127.0.0.1:4000');
// 定义需要发送的消息
let nickname = ref('')
let avatar = ref('')
let user_id = ref('')
let content = ref('')
let infoType = ref('默认群聊')
let username = ref('')
let isBlock = ref(false)
let login = () => {
    const data = {
        name: nickname.value,
        avatar: avatar.value,
        user_id: user_id.value,
        username: username.value
    }
    socket.emit("login", data)
}
// 监听服务器发送过来的消息
socket.on("reqMessage", () => {
    getUserInfo()
})
// 有新用户加入了
socket.on("updateUserList", () => {
    getUserList();
})

// 发送信息
const chatRoomData: any = ref([])
const sendInfo = () => {
    const data = {
        content: content.value,
        nickname: nickname.value,
        avatar: avatar.value,
        user_id: user_id.value,
        userName: nickname.value,
        infoType: infoType.value,
        friend_nickname: infoType.value
    }

    socket.emit("sendInfo", data)
    chatRoomData.value.push(data)
    scrollToBottom()
    content.value = ''
}
// 让内容区的滚动条滚动到底部
const scrollToBottom = () => {
    // 滚动到底部
    nextTick(() => {
        let scrollElem = document.getElementById("scrollDiv")
        scrollElem!.scrollTop = scrollElem!.scrollHeight;
    });
}
// 获取所有聊天记录
const cloneChatRoomData: any = ref([]);
const getUserInfo = async () => {
    const result = await reqUsreInfo()
    chatRoomData.value = result.data
    cloneChatRoomData.value = result.data
    scrollToBottom()
}
// 点击表情所有表情出现
const pickerShow = () => {
    isShow.value = !isShow.value;
    textarea.value?.focus()
}
// 获取聊天室所有好友
const userListData: any = ref([])
const getUserList = async () => {
    const result = await reqUserList()
    if (result.status == 200) {
        userListData.value = result.data
    }
}
// 计算出好友列表
const filterUserList = computed(() => {
    let data = userListData.value.filter((item: any) => item.username == username.value)
    let result;
    if (data.length > 0) {
        result = data[0].friends_list;
    }
    return result;
})
const textarea: any = ref(null)
// 计算出群聊总人数
const userNumber = computed(() => {
    return userListData.value ? userListData.value.length : 0;
})
// 计算出群聊最后一条信息
const userFilter = computed(() => {
    let data = cloneChatRoomData.value.filter((item: any) => item.infoType == '默认群聊');
    if (data.length > 0) {
        return data[data.length - 1].content;
    } else {
        return '群里怎么没人说话呢';
    }
})
// 计算出群聊最后一条信息的时间
const userChatTime = computed(() => {
    let data = cloneChatRoomData.value.filter((item: any) => item.infoType == '默认群聊');
    if (data.length > 0) {
        return data[data.length - 1].time;
    } else {
        return '520:1314';
    }
})
// 计算出与每个好友聊天的最后一条信息
const userChatFilter = computed(() => (result: any) => {
    let data = chatRoomData.value.filter((item: any) => (((item.nickname == result.name) && (item.friend_nickname == localStorage.getItem("nickname")) && (item.infoType != '默认群聊')) || ((item.friend_nickname == result.name) && (item.infoType != '默认群聊') && (item.nickname == localStorage.getItem("nickname")))));
    if (data.length > 0) {
        return data[data.length - 1].content;
    } else {
        return '你们两个还没有聊天哟~';
    }
})
// 计算出好友最后一条信息的时间
const userChatFilterTime = computed(() => (result: any) => {
    let data = chatRoomData.value.filter((item: any) => (((item.nickname == result.name) && (item.friend_nickname == localStorage.getItem("nickname")) && (item.infoType != '默认群聊')) || ((item.friend_nickname == result.name) && (item.infoType != '默认群聊') && (item.nickname == localStorage.getItem("nickname")))));
    if (data.length > 0) {
        return data[data.length - 1].time;
    } else {
        return '001:001';
    }
})
const filterChatRoom = computed(() => {
    return chatRoomData.value.filter((item: any) => (item.infoType == infoType.value && infoType.value == '默认群聊') || (item.user_id == user_chat_id.value && item.infoType == localStorage.getItem("nickname")) || (item.infoType == infoType.value && item.user_id == localStorage.getItem("user_id")))
})
let userISShow = ref(true)
let searchInput = ref('')
$bus.on("userISShow", (data: any) => {
    userISShow.value = data.isShow as boolean;
    searchInput.value = data.data;
})
// 网络查询好友
let searchData = ref([])
let isPlay = ref(true)
const search = async () => {
    if (searchInput.value == localStorage.getItem("username")) {
        return ElMessage.error('不能查询自己');
    }
    if (searchInput.value == localStorage.getItem(searchInput.value)) {
        return ElMessage.error('已经发送好友申请');
    }
    if (filterUserList.value) {
        filterUserList.value.forEach((item: any) => {
            if (item.myUsername == searchInput.value) {
                isPlay.value = false
                userISShow.value = true;
                return ElMessage.error('已经有该好友');
            }
        })
    }
    if (isPlay.value) {
        if (searchInput.value == '') return;
        const result = await reqSearchUserInfo(searchInput.value)
        if (result.data.length > 0) {
            searchData.value = result.data;
            isBlock.value = true
        } else {
            return ElMessage.error('请输入正确的账号');
        }
    }
}
// 点击默认群聊切换聊天内容
const navCheckout = () => {
    infoType.value = '默认群聊'
    user_chat_id.value = ''
    scrollToBottom()
}
// 点击好友列表切换聊天内容
const user_chat_id = ref() // 点击好友列表的时候把当前好友的id保存下来
const checkoutLi = (item: any) => {
    user_chat_id.value = item.user_id
    infoType.value = item.name;
    scrollToBottom()
}
socket.on("updateUserInfo", () => {
    getUserList();
})
$bus.on("addUser", () => {
    isBlock.value = false;
    userISShow.value = true;
    localStorage.setItem(searchInput.value, searchInput.value)
})
onMounted(() => {
    if (localStorage.getItem('nickname')) {
        nickname.value = localStorage.getItem('nickname') as string
    }
    if (localStorage.getItem('user_pic')) {
        avatar.value = localStorage.getItem('user_pic') as string
    }
    if (localStorage.getItem('user_id')) {
        user_id.value = localStorage.getItem('user_id') as string
    }
    if (localStorage.getItem('username')) {
        username.value = localStorage.getItem('username') as string
    }
    // 向服务器发送登录信息
    login()
    // 获取所有聊天记录
    getUserInfo()
    // 点击表情后隐藏表情
    document.querySelectorAll(".emoji-mart-emoji").forEach((item: any) => {
        item.addEventListener("click", () => {
            isShow.value = false
            textarea.value?.focus()
        })
    })
    // 元素加载完毕后让光标聚焦
    textarea.value?.focus()
    // 获取聊天室所有好友
    getUserList()
})
</script>
<template>
    <section>
        <!-- 好友列表 -->
        <div class="left" @click="isShow = false">
            <Search />
            <ul v-show="userISShow">
                <li @click="navCheckout" :style="{ backgroundColor: infoType == '默认群聊' ? '#c8c7c5' : '' }">
                    <div class="pic"
                        style="background-image: url(https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png);">
                    </div>
                    <div class="message">
                        <div style="display: flex;">
                            <h3 :style="{ color: infoType == '默认群聊' ? '#000' : '' }">默认群聊</h3>
                            <span style="font-size: 14px;margin-left: 10px;color: #000;">{{ userChatTime }}</span>
                        </div>
                        <p :style="{ color: infoType == '默认群聊' ? '#000' : '' }">{{ userFilter }}</p>
                    </div>
                </li>
                <li v-for="item in filterUserList" :style="{ backgroundColor: infoType == item.name ? '#c8c7c5' : '' }"
                    @click="checkoutLi(item)">
                    <div class="pic"
                        :style="{ backgroundImage: item.avatar ? `url(${item.avatar})` : 'url(https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png)' }">
                    </div>
                    <div class="message">
                        <div style="display: flex;">
                            <h3 :style="{ color: infoType == item.name ? '#000' : '' }">{{ item.name }}</h3>
                            <span style="font-size: 14px;margin-left: 10px;color: #000;">{{ userChatFilterTime(item)
                            }}</span>
                        </div>
                        <p :style="{ color: infoType == item.name ? '#000' : '' }">{{ userChatFilter(item) }}</p>
                    </div>
                </li>
            </ul>
            <div class="search_box" v-show="!userISShow" @click="search">
                <div class="search_box_left">
                    <ZoomIn style="width: 30px;color: #FFF;"></ZoomIn>
                </div>
                <p>网络查找好友</p>
            </div>
        </div>
        <AddUser v-if="searchData.length > 0 && isBlock" :data="searchData"></AddUser>
        <!-- 聊天内容 -->
        <div class="right">
            <div class="top">
                {{ infoType }}
            </div>
            <div class="content" id="scrollDiv" @click="isShow = false">
                <div v-for="item in filterChatRoom" :key="item.id" class="content_box"
                    :style="{ textAlign: item.nickname == nickname ? 'right' : 'left' }">
                    <div class="box_left" v-if="item.nickname != nickname"
                        :style="{ backgroundImage: item.avatar ? `url(${item.avatar})` : 'url(https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png)' }">
                    </div>
                    <div class="box_right">
                        <span v-if="item.nickname != nickname">{{ item.nickname }}</span>
                        <p :style="{
                            backgroundColor: item.nickname == nickname ? '#0099ff' : '#fff', color: item.nickname == nickname ? '#fff' : '#000'
                            , transform: item.nickname == nickname ? 'translateY(-10px)' : 'translateY(0)',
                        }">
                            {{ item.content }}</p>
                    </div>
                    <div class="box_left" v-if="item.nickname == nickname"
                        :style="{ backgroundImage: item.avatar ? `url(${item.avatar})` : 'url(https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png)' }">
                    </div>
                </div>
            </div>
            <div class="send">
                <!-- 表情 -->
                <div>
                    <div class="iconfont icon-xiaolian" style="font-size: 26px;cursor: pointer;display: inline-block;"
                        @click="pickerShow">
                    </div>
                    <Picker :data="emojiIndex" set="twitter" @select="showEmoji" v-show="isShow" class="picker" />
                </div>
                <textarea style="" v-model="content" placeholder="请输入内容" @keydown.enter="sendInfo()" ref="textarea"
                    @click="isShow = false"></textarea>
                <!-- 发送 -->
                <el-button type="primary" @click="sendInfo" :disabled="content == ''">发送</el-button>
            </div>
        </div>
        <!-- 用户信息 -->
        <div class="user_info">
            <div style="padding-bottom: 10px;border-bottom: 1px solid #ccc;margin-bottom: 10px;">
                <p>群聊成员 {{ userNumber }}</p>
            </div>
            <ul>
                <li v-for="item in userListData">
                    <div
                        :style="{ backgroundImage: item.avatar ? `url(${item.avatar})` : 'url(https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png)' }">
                    </div>
                    <p>{{ item.name }}</p>
                </li>
            </ul>
        </div>
    </section>
</template>
<style scoped lang='scss'>
// 滚动条
.content::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

.content::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #448ef6;
}

section {
    display: flex;
    justify-content: space-between;

    .left {
        flex: .2;
        border-right: 1px solid #ccc;

        ul {
            li {
                display: flex;
                padding: 16px;
                background-color: #e5e4e4;

                .pic {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-size: cover;
                    background-position: center;
                }

                .message {
                    margin-left: 10px;

                    h3 {
                        font-size: 14px;
                    }

                    p {
                        font-size: 14px;
                        margin-top: 2px;
                    }
                }
            }

            li:hover {
                background-color: #e7e7e7;
            }
        }

        .search_box {
            width: 100%;
            height: 60px;
            display: flex;
            padding: 0 10px;
            align-items: center;
            cursor: pointer;
            margin-top: 10px;

            &_left {
                width: 40px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #07c160;
                border-radius: 6px;
            }

            p {
                font-size: 16px;
                margin-left: 10px;
            }
        }

        .search_box:hover {
            background-color: #ccc;
        }
    }

    .right {
        flex: .66;

        .top {
            height: 8vh;
            background-color: #f2f2f2;
            border-bottom: 1px solid #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .content {
            height: calc(62vh - 60px);
            background-color: #f2f2f2;
            border-bottom: 1px solid #ccc;
            overflow-y: scroll;

            .content_box {
                margin: 14px 0;
            }

            .box_left {
                display: inline-block;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-size: cover;
                background-position: center;
                margin: 0 6px;
            }

            .box_right {
                display: inline-block;

                span {
                    font-size: 14px;
                }

                p {
                    padding: 4px 10px;
                    border-radius: 6px;
                    margin-top: 2px;
                }
            }
        }
    }

    .send {
        height: 30vh;
        background-color: #f2f2f2;
        position: relative;

        textarea {
            width: 100%;
            border: 0;
            padding-left: 12px;
            font-size: 16px;
            height: calc(100% - 54px);
            background-color: #f2f2f2;
        }

        textarea:focus-visible {
            outline: -webkit-focus-ring-color auto 0px;
        }

        button {
            position: absolute;
            bottom: 20px;
            right: 40px;
            width: 100px;
        }

        div {
            height: 40px;
            padding-top: 4px;
            padding-left: 4px;
        }
    }
}

// 表情
.picker {
    position: absolute;
    top: -340px;
    height: 340px;

    ::v-deep .emoji-mart-bar:last-child {
        display: none;
    }
}

.user_info {
    flex: .14;
    padding-top: 40px;
    background-color: #f2f2f2;
    border-left: 1px solid #ccc;

    div {
        display: flex;
        justify-content: space-around;
    }

    ul {
        li {
            display: flex;
            align-items: center;
            padding: 10px;
            cursor: pointer;

            div {
                width: 26px;
                height: 26px;
                border-radius: 50%;
                background-size: cover;
                background-position: center;
                margin-right: 10px;
            }
        }

        li:hover {
            background-color: #e9e9e9;
        }
    }
}
</style>