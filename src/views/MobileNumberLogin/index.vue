<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const $router = useRouter();
const username = ref('');
const isShow = ref(false);
const input = ref('');
const goLogin = () => {
    $router.push("/login")
}
onMounted(() => {
    isShow.value = true;
})
</script>
<template>
    <section class="register">
        <div class="register-box">
            <form class="register-form">
                <h2>手机号登录</h2>
                <transition name="slide-fade">
                    <el-input v-show="isShow" v-model="username" style="width: 350px;margin: 10px 0;" placeholder="请输入您的手机号"
                        clearable />
                </transition>
                <transition name="slide-fade2">
                    <el-input v-model="input" style="max-width: 350px" placeholder="请输入验证码">
                        <template #append>
                            <p style="cursor: pointer;">获取验证码</p>
                        </template>
                    </el-input>
                </transition>
                <transition name="slide-fade3">
                    <el-button v-show="isShow" type="primary" plain>登录</el-button>
                </transition>
                <transition name="slide-fade4">
                    <el-button v-show="isShow" plain @click="goLogin">账号密码登录</el-button>
                </transition>
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
.register {
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

        // 注册按钮
        button {
            width: 80%;
            margin: 10px 0;
        }


    }
}
</style>