<script lang="ts" setup>
import useLogin from '@/hooks/useLogin';
const { username, password, isShow, login, goRegister, goMobileNumberLogin } = useLogin();
</script>
<template>
    <section class="login">
        <div class="login-box">
            <form class="login-form">
                <h2>欢迎登录</h2>
                <transition name="slide-fade">
                    <el-input v-show="isShow" v-model="username" style="width: 350px;margin: 10px 0;" placeholder="请输入您的账号"
                        clearable />
                </transition>
                <transition name="slide-fade2">
                    <el-input v-show="isShow" v-model="password" style="width: 350px;margin: 10px 0;" placeholder="请输入您的密码"
                        clearable />
                </transition>
                <transition name="slide-fade3">
                    <el-button v-show="isShow" type="primary" @click="login">登录</el-button>
                </transition>
                <transition name="slide-fade3">
                    <el-button v-show="isShow" type="primary" plain @click="goRegister">注册</el-button>
                </transition>
                <div style="display: flex;justify-content: center;flex-wrap: wrap;margin-top: 10px;">
                    <div style="width: 100%;text-align: center;">
                        其他登录方式
                    </div>
                    <Iphone style="width: 20px;margin-top: 10px;cursor: pointer;" @click="goMobileNumberLogin"></Iphone>
                </div>
            </form>
        </div>
    </section>
</template>
<style scoped lang='scss'>
.slide-fade-enter-active {
    transition: all 0.5s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(40px);
    opacity: 0;
}

.slide-fade2-enter-active {
    transition: all 0.5s .1s ease-out;
}

.slide-fade2-enter-from,
.slide-fade-leave-to {
    transform: translateX(40px);
    opacity: 0;
}

.slide-fade3-enter-active {
    transition: all 0.5s .2s ease-out;
}

.slide-fade3-enter-from,
.slide-fade4-leave-to {
    transform: translateX(40px);
    opacity: 0;
}

.slide-fade4-enter-active {
    transition: all 0.5s .3s ease-out;
}

.slide-fade4-enter-from,
.slide-fade4-leave-to {
    transform: translateX(40px);
    opacity: 0;
}

// 登录
.login {
    width: 100vw;
    height: calc(100vh - 60px);
    background-color: #eeeeee;

    // 登录背景
    &-box {
        position: absolute;
        @include position();
        width: 440px;
        height: 500px;
        @include flex();
        background-color: #fff;
        border-radius: 34px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        transition: all 0.3s;
    }

    &-box:hover {
        box-shadow: 8px 12px 8px rgba(0, 0, 0, .12), 2px 2px 6px rgba(0, 0, 0, .04);
    }

    // 表单
    &-form {
        @include flex();
        flex-wrap: wrap;

        // 标题
        h2 {
            font-size: 46px;
            text-align: center;
            transform: translateY(-40px);
            background: linear-gradient(to right, #c98ab3, #e6e673);
            /*将设置的背景颜色限制在文字中*/
            background-clip: text;
            /*给文字设置成透明*/
            -webkit-text-fill-color: transparent;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, .3);
            transition: all .3s;
        }

        &:hover h2 {
            text-shadow: 6px 2px 4px rgba(0, 0, 0, .3);
        }

        // 登录按钮
        button {
            width: 80%;
            margin: 10px 0;
        }


    }
}
</style>