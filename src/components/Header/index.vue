<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const input = ref('')
import { unDateUserCover } from "@/api/Header"
import { ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import $bus from "@/utils/event-bus"
const $router = useRouter();
const $route = useRoute();
const centerDialogVisible = ref(false)
// 发请求根据id获取用户头像url
let avatarUrl = ref('')
// 更换头像
let file = ref(null)
let handleFileUpload = (event: any) => {
    file.value = event.target.files[0];
    uploadAvatar()
}
let uploadAvatar = async () => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id") as string;
    if (!token) {
        return;
    }
    let formData = new FormData();
    // @ts-ignore
    formData.append("avatar", file.value);
    const results = await unDateUserCover(formData, user_id)
    localStorage.setItem("avatarUrl", results.data[0] as string)
    avatarUrl.value = results.data[0] as string
}
// 退出登录
let quit = () => {
    localStorage.clear();
    userStore.token = "";
    ElMessage({
        message: `退出成功`,
        type: 'success'
    })
    $router.push({ name: 'home' })
}
$bus.on("quit", () => {
    quit()
})
// 点击聊天室跳转至聊天室
const goChatRoom = () => {
    if (!userStore.token) {
        return ElMessage.error("登录后才能进入聊天室~")
    }
    $router.push({ name: 'ChatRoom' })
    centerDialogVisible.value = false;
}
// 点击头像跳转至个人主页
const goPersonalCenter = () => {
    $router.push({ name: 'PersonalCenter' })
}
let path = ref('')
watch(() => $route.path, () => {
    path.value = $route.path
}, { immediate: true })

const scrollPosition = ref(0);
const routePlay = ref(false);
const handleScroll = () => {
    // 读取 window 的 scrollY 属性  
    scrollPosition.value = window.scrollY;
};
watch(() => $route.path, () => {
    if ($route.path == '/InRegardTo') {
        routePlay.value = true
    } else {
        routePlay.value = false
    }
})
onMounted(() => {
    if (!localStorage.getItem("token")) {
        userStore.token = ''
    }
    if (localStorage.getItem("avatarUrl")) {
        avatarUrl.value = localStorage.getItem("avatarUrl") as string
    }
    // 在组件挂载时添加滚动事件监听  
    window.addEventListener('scroll', handleScroll);


})
onUnmounted(() => {
    // 在组件卸载时移除滚动事件监听  
    window.removeEventListener('scroll', handleScroll);
});

</script>
<template>
    <header class="scroll-container" @scroll="handleScroll" :class="{
        headerBg: scrollPosition > 60,
        headerRoute: routePlay
    }">
        <el-dialog v-model="centerDialogVisible" title="终于等到你了！" width="500" align-center>
            <span>点击下方按钮加入聊天室，欢迎来聊天！</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">下次一定</el-button>
                    <el-button type="primary" @click="goChatRoom">
                        加入
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- logo -->
        <div class="logo"></div>
        <!-- 导航 -->
        <ul>
            <li :class="{ activeLi: path == '/home' }">
                <router-link to="/home" active-class="active">
                    <HomeFilled style="width: 20px;"></HomeFilled>
                    首页
                </router-link>
            </li>
            <li :class="{ activeLi: path == '/articleHome' }">
                <EditPen style="width: 20px;" :style="{ color: path == '/articleHome' ? '#1994fa' : '#000' }"></EditPen>
                <router-link to="/articleHome">博客</router-link>
            </li>
            <li @click="centerDialogVisible = true"
                :class="{ activeLi: path == '/ChatRoom/message' || path == '/ChatRoom/user' }">
                <Comment style="width: 20px;"
                    :style="{ color: path == '/ChatRoom/message' || path == '/ChatRoom/user' ? '#1994fa' : '#000' }">
                </Comment>
                <a href="##">
                    聊天室
                </a>
            </li>
            <li :class="{ activeLi: path == '/PersonalFiling' }">
                <HelpFilled style="width: 20px;" :style="{ color: path == '/PersonalFiling' ? '#1994fa' : '#000' }">
                </HelpFilled>
                <router-link to="/PersonalFiling">个人归档</router-link>
            </li>
            <li :class="{ activeLi: path == '/InRegardTo' }">
                <UserFilled style="width: 20px;" :style="{ color: path == '/InRegardTo' ? '#1994fa' : '#000' }">
                </UserFilled>
                <router-link to="/InRegardTo">关于</router-link>
            </li>
        </ul>
        <!-- 发布文章 -->
        <section class="put-section">
            <router-link to="/publishArticle">
                <div id="container">
                    <button class="learn-more">
                        <span class="circle" aria-hidden="true">
                            <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">发布文章</span>
                    </button>
                </div>
            </router-link>
        </section>
        <!-- 用户信息 -->
        <section v-if="!userStore.token" class="user-info">
            <router-link to="/login" style="margin-right: 10px;">
                <el-button type="success">登录</el-button>
            </router-link>
            <router-link to="/register">
                <el-button type="success" plain>注册</el-button>
            </router-link>
        </section>
        <section v-if="userStore.token" style="flex: .1;">
            <el-dropdown>
                <span class="el-dropdown-link" style="cursor: pointer;" @click="goPersonalCenter">
                    <el-avatar v-if="!avatarUrl"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <el-avatar :src="avatarUrl" v-if="avatarUrl" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <router-link to="/PersonalCenter">
                                个人主页
                            </router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <router-link to="/publishArticle">
                                发布文章
                            </router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <label for="file2" class="changeFile">更换头像</label>
                            <input type="file" id="file2" style="display: none;" @change="handleFileUpload">
                        </el-dropdown-item>
                        <el-dropdown-item @click="quit">
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </section>
    </header>
</template>
<style scoped lang='scss'>
.activeLi::before {
    width: 100% !important;
}

.activeLi a {
    color: #1994fa;
}

.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

.headerBg {
    background-color: hsla(0, 0%, 100%, .8);
    box-shadow: 4px 10px 12px rgba(0, 0, 0, .1);
}

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    @include flex();
    justify-content: space-around;
    z-index: 9999;
    transition: all .3s;

    ul {
        @include flex();
        height: 60px;
        flex: .5;

        li {
            margin: 0 6px;
            height: 100%;
            @include flex();
            position: relative;
            cursor: pointer;

            a {
                padding: 0 2px;
                width: 100%;
                font-weight: bold;
                color: #000;
                transition: all .2s;
                display: flex;
                height: 100%;
                display: flex;
                align-items: center;
            }
        }

        li:hover a {
            color: #1994fa;
        }

        li:before {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: 2px;
            background-color: #0188fb;
            transition: all .4s;
        }

        li:hover:before {
            width: 100% !important;
        }
    }
}

.headerRoute {
    background-color: #fff !important;
}

// 用户信息
.user-info {
    flex: .15;
}

// logo
.logo {
    width: 45px;
    height: 45px;
    background-image: url(https://wangyuanlin.site:8001/head/xinyang.png);
    background-position: center center;
    background-size: 100% 100%;
}

// 发布文章按钮
@import url('https://fonts.googleapis.com/css?family=Mukta:700');
$bg: #f3f8fa;
$white: #fff;
$black: #282936;

.put-section {
    flex: .05;
}

@mixin transition($property: all, $duration: 0.45s, $ease: cubic-bezier(0.65, 0, .076, 1)) {
    transition: $property $duration $ease;
}

#container button {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    background: transparent;
    padding: 0;
    font-size: inherit;
    font-family: inherit;

    &.learn-more {
        width: 11rem;
        height: auto;

        .circle {
            @include transition(all, 0.45s, cubic-bezier(0.65, 0, .076, 1));
            position: relative;
            display: block;
            margin: 0;
            width: 2.6rem;
            height: 2.6rem;
            background: $black;
            border-radius: 1.625rem;

            .icon {
                @include transition(all, 0.45s, cubic-bezier(0.65, 0, .076, 1));
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                background: $white;

                &.arrow {
                    @include transition(all, 0.45s, cubic-bezier(0.65, 0, .076, 1));
                    left: 0.58rem;
                    width: 1rem;
                    height: 0.125rem;
                    background: none;

                    &::before {
                        position: absolute;
                        content: '';
                        top: -0.25rem;
                        right: 0.0625rem;
                        width: 0.625rem;
                        height: 0.625rem;
                        border-top: 0.125rem solid #fff;
                        border-right: 0.125rem solid #fff;
                        transform: rotate(45deg);
                    }
                }
            }
        }

        .button-text {
            @include transition(all, 0.45s, cubic-bezier(0.65, 0, .076, 1));
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 0.6rem 0;
            margin: 0 0 0 1rem;
            color: $black;
            font-weight: 700;
            text-align: center;
            text-transform: uppercase;
        }
    }

    &:hover {
        .circle {
            width: 100%;

            .icon {
                &.arrow {
                    background: $white;
                    transform: translate(1rem, 0);
                }
            }
        }

        .button-text {
            color: $white;
        }
    }
}

// 媒体查询
@media screen and (max-width: 1200px) {

    // 导航
    header ul {
        flex: 0.6;
    }

    // 发布文章
    .put-section {
        flex: .1;
    }

    // 用户信息（登录注册）
    .user-info {
        flex: .26;
    }
}

@media screen and (max-width: 900px) {

    // 导航栏
    header ul li {
        margin: 0 2px;
    }
}

@media screen and (max-width: 768px) {

    // 头部
    header {
        display: none;
    }
}
</style>