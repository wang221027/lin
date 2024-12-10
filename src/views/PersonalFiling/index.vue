<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
var items: any;
function isElementInViewport(el: any) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
            items[i].classList.add("in-view");
        }
    }
}

onMounted(() => {
    items = document.querySelectorAll(".timeline li");
    callbackFunc();
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);

})
onUnmounted(() => {
    window.removeEventListener("resize", callbackFunc);
    window.removeEventListener("scroll", callbackFunc);
})
</script>
<template>
    <section class="intro">
        <div class="container">
            <h1>个人归档 &darr;</h1>
            <p>时间轴</p>
        </div>
    </section>

    <section class="timeline">
        <ul>
            <li>
                <div>
                    <time>2021/8/21</time>
                    第一次打算开发一个网站，但技术不到位，接着学习后端、数据库、Nginx等
                </div>
            </li>
            <li>
                <div>
                    <time>2022/1/21</time>
                    首次购买腾讯云服务器，第一代网站问世
                </div>
            </li>
            <li>
                <div>
                    <time>2022/2/12</time>
                    首次开发小程序并上架
                </div>
            </li>
            <li>
                <div>
                    <time>2022/3/1</time>
                    重构网站，注重用户体验、SEO优化、代码优化、性能优化，虽然做了很多优化，但由于服务器性能问题，性能还是没达到理想状态
                </div>
            </li>
            <li>
                <div>
                    <time>2022/6/15</time>
                    为网站开发后台管理系统，管理网站的所有用户、文章、性能、图片等
                </div>
            </li>
            <li>
                <div>
                    <time>2023/1/4</time>
                    为小程序开发后台管理系统
                </div>
            </li>
            <li>
                <div>
                    <time>2023/3/4</time>
                    做完网站后，开始为各大插件库开发插件，例如jq22、HTML网站库等
                </div>
            </li>
            <li>
                <div>
                    <time>2023/3/12</time>
                    首次向GitHub贡献我的一份力量
                </div>
            </li>
            <li>
                <div>
                    <time>2023/4/23</time>
                    为网站新添加聊天室功能，所有功能基本都开发完毕，后续有做个联机小游戏的想法。
                </div>
            </li>
            <li>
                <div>
                    <time>2023/7/6</time>
                    用uni-app多端发布
                </div>
            </li>
            <li>
                <div>
                    <time>2023/9/20</time>
                    继续卷底层源码
                </div>
            </li>
            <li>
                <div>
                    <time>2024/3/12</time>
                    找到第一份工作
                </div>
            </li>
        </ul>
    </section>
</template>
<style scoped lang='scss'>
a {
    color: inherit;
}

.intro {
    background: red;
    padding: 100px 0;
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}

h1 {
    font-size: 2.5rem;
}

.timeline ul {
    background: #456990;
    padding: 50px 0;
}

.timeline ul li {
    list-style-type: none;
    position: relative;
    width: 6px;
    margin: 0 auto;
    padding-top: 50px;
    background: #fff;
}

.timeline ul li::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: inherit;
    z-index: 1;
}

.timeline ul li div {
    position: relative;
    bottom: 0;
    width: 400px;
    padding: 15px;
    background: #f45b69;
    border-radius: 12px;
}

.timeline ul li div::before {
    content: "";
    position: absolute;
    bottom: 7px;
    width: 0;
    height: 0;
    border-style: solid;
}

.timeline ul li:nth-child(odd) div {
    left: 45px;
}

.timeline ul li:nth-child(odd) div::before {
    left: -15px;
    border-width: 8px 16px 8px 0;
    border-color: transparent #f45b69 transparent transparent;
}

.timeline ul li:nth-child(even) div {
    left: -439px;
}

.timeline ul li:nth-child(even) div::before {
    right: -15px;
    border-width: 8px 0 8px 16px;
    border-color: transparent transparent transparent #f45b69;
}

time {
    display: block;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 8px;
}

.timeline ul li::after {
    transition: background 0.5s ease-in-out;
}

.timeline ul li.in-view::after {
    background: #f45b69;
}

.timeline ul li div {
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s ease-in-out;
}

.timeline ul li:nth-child(odd) div {
    transform: translate3d(200px, 0, 0);
}

.timeline ul li:nth-child(even) div {
    transform: translate3d(-200px, 0, 0);
}

.timeline ul li.in-view div {
    transform: none;
    visibility: visible;
    opacity: 1;
}

@media screen and (max-width: 900px) {
    .timeline ul li div {
        width: 250px;
    }

    .timeline ul li:nth-child(even) div {
        left: -289px;
    }
}

@media screen and (max-width: 600px) {
    .timeline ul li {
        margin-left: 20px;
    }

    .timeline ul li div {
        width: calc(100vw - 91px);
    }

    .timeline ul li:nth-child(even) div {
        left: 45px;
    }

    .timeline ul li:nth-child(even) div::before {
        left: -15px;
        border-width: 8px 16px 8px 0;
        border-color: transparent #f45b69 transparent transparent;
    }
}

.timeline-clippy ul li::after {
    width: 40px;
    height: 40px;
    border-radius: 0;
}

.timeline-rhombus ul li::after {
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.timeline-rhombus ul li div::before {
    bottom: 12px;
}

.timeline-star ul li::after {
    clip-path: polygon(50% 0%,
            61% 35%,
            98% 35%,
            68% 57%,
            79% 91%,
            50% 70%,
            21% 91%,
            32% 57%,
            2% 35%,
            39% 35%);
}

.timeline-heptagon ul li::after {
    clip-path: polygon(50% 0%,
            90% 20%,
            100% 60%,
            75% 100%,
            25% 100%,
            0% 60%,
            10% 20%);
}

.timeline-infinite ul li::after {
    animation: scaleAnimation 2s infinite;
}

@keyframes scaleAnimation {
    0% {
        transform: translateX(-50%) scale(1);
    }

    50% {
        transform: translateX(-50%) scale(1.25);
    }

    100% {
        transform: translateX(-50%) scale(1);
    }
}

.page-footer {
    position: fixed;
    right: 0;
    bottom: 20px;
    display: flex;
    align-items: center;
    padding: 5px;
    color: black;
    background: rgba(255, 255, 255, 0.65);
}

.page-footer a {
    display: flex;
    margin-left: 4px;
}
</style>