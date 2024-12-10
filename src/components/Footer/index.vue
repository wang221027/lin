<script lang="ts" setup>
import { } from 'vue';
</script>
<template>
    <footer>
        <div class="content">
            <ul>
                <li>
                    <a href="##">因为热爱 所以坚持</a>
                    <a href="##">全栈工程师</a>
                    <a href="##">全栈偏前端</a>
                </li>
                <li style="display: flex;align-items: center;justify-content: center;color: #fff;">
                    <Star style="width: 24px;color: #fff;margin-right: 4px;"></Star>
                    2023-2024
                </li>
            </ul>
            <h3>京ICP备2023036449号-2 --- 林King</h3>
        </div>
        <div class="wave"></div>
    </footer>
</template>
<style scoped lang='scss'>
footer {
    width: 100%;
    height: 240px;
    position: relative;
    background-color: #525354;

    .content {
        width: 80%;
        padding-top: 20px;
        margin: 0 auto;
        text-align: center;

        ul {
            li {
                margin: 10px 0;

                a {
                    display: inline-block;
                    margin-right: 10px;
                    font-weight: bold;
                    color: #fff;
                }
            }
        }

        h3 {
            font-size: 14px;
            color: #fff;
        }
    }
}

.wave {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 200px;
    --c: #2196F3;
    --w1: radial-gradient(100% 57% at top, #0000 100%, var(--c) 100.5%) no-repeat;
    --w2: radial-gradient(100% 57% at bottom, var(--c) 100%, #0000 100.5%) no-repeat;
    background: var(--w1), var(--w2), var(--w1), var(--w2);
    background-position-x: -200%, -100%, 0%, 100%;
    background-position-y: 100%;
    background-size: 50.5% 100%;
    animation: m 3s infinite linear;
}

@keyframes m {
    0% {
        background-position-x: -200%, -100%, 0%, 100%
    }

    100% {
        background-position-x: 0%, 100%, 200%, 300%
    }
}
</style>