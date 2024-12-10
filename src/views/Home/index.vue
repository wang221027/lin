<script lang="ts" setup>
import { Typed } from "@duskmoon/vue3-typed-js";
import type { TypedOptions } from "@duskmoon/vue3-typed-js";
import { onMounted, onBeforeUnmount, ref } from 'vue';
// @ts-ignore
import gsap from 'gsap';
// @ts-ignore
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// 第一屏文字逐个出现
const options: TypedOptions = {
    strings: ["欢迎光临林King个人网站~", "工农阶级万岁！", "数风流人物，还看今朝~", "有什么问题都可以向我反馈，谢谢！"],
    loop: true,
    typeSpeed: 200,
};
// 星空文字逐个出现
const options2: TypedOptions = {
    strings: ["星星之火 可以燎原", "有些梦想虽然遥不可及 但我还是会竭尽所力", "到达胜利之前 无法回头", "人如果连梦想都没没有 那和咸鱼有什么区别"],
    loop: true,
    typeSpeed: 200,
};

// 第二屏动画
let tl: any | null = null;
gsap.registerPlugin(ScrollTrigger);
const createAnimationTimeline = () => {
    return gsap.timeline({
        scrollTrigger: {
            trigger: ".wrapper",
            start: "(100vh - 60px) top",
            end: "+=100%",
            pin: true,
            scrub: true,
            markers: false,
        },
    })
        .to("img", {
            scale: 2,
            z: 350,
            transformOrigin: "center center",
            ease: "power1.inOut",
        })
        .to(
            ".section.hero",
            {
                scale: 1.1,
                transformOrigin: "center center",
                ease: "power1.inOut",
            },
            "<"
        );
};
// 星空
interface Star {
    x: number;
    y: number;
    length: number;
    opacity: number;
    factor: number;
    increment: number;
    draw(context: CanvasRenderingContext2D): void;
}
const canvas = ref<HTMLCanvasElement | null>(null);
const context: any = ref(null);
const stars: Star[] = [];
const FPS = 50;
const numStars = 200;
const canvasWidth = ref(window.innerWidth);
const canvasHeight = ref(window.innerHeight);
const createStars = () => {
    for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvasWidth.value;
        const y = Math.random() * canvasHeight.value;
        const length = 1 + Math.random() * 2;
        const opacity = Math.random();
        stars.push(createStar(x, y, length, opacity));
    }
};

const createStar = (x: number, y: number, length: number, opacity: number): Star => {
    return {
        x,
        y,
        length,
        opacity,
        factor: 1,
        increment: Math.random() * 0.03,
        draw(context) {
            context.save();
            context.translate(this.x, this.y);
            this.opacity += this.factor * this.increment;

            if (this.opacity > 1) {
                this.factor = -1;
            } else if (this.opacity <= 0) {
                this.factor = 1;
                this.x = Math.random() * canvasWidth.value;
                this.y = Math.random() * canvasHeight.value;
            }
            context.beginPath();
            context.rotate((Math.PI * 1) / 10);
            for (let i = 5; i > 0; i--) {
                context.lineTo(0, this.length);
                context.translate(0, this.length);
                context.rotate((Math.PI * 2) / 10);
                context.lineTo(0, -this.length);
                context.translate(0, -this.length);
                context.rotate(-(Math.PI * 6) / 10);
            }
            context.lineTo(0, this.length);
            context.closePath();
            context.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            context.shadowBlur = 5;
            context.shadowColor = '#ffff33';
            context.fill();
            context.restore();
        }
    };
};
const animate = () => {
    if (!context.value) return;
    context.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
    stars.forEach(star => star.draw(context.value));
};

const handleResize = () => {
    canvasWidth.value = window.innerWidth;
    canvasHeight.value = window.innerHeight;
    if (canvas.value) {
        canvas.value.width = canvasWidth.value;
        canvas.value.height = canvasHeight.value;
    }
};
onMounted(() => {
    // 页面加载完成初始化第二屏动画
    tl = createAnimationTimeline();
    // 星空
    if (canvas.value) {
        context.value = canvas.value.getContext('2d');
        createStars();
        setInterval(animate, 1000 / FPS);
        window.addEventListener('resize', handleResize);
    }

});
onBeforeUnmount(() => {
    // 页面销毁时清除动画
    ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    if (tl) {
        tl.kill();
    }
    // 星空
    window.removeEventListener('resize', handleResize);
});

</script>
<template>
    <!-- 头部100vh背景 -->
    <section>
        <!-- 文字逐个出现 -->
        <div class="bg">
            <div id="txt">
                <Typed :options="options">
                    <h1 class="typing"></h1>
                </Typed>
            </div>
            <router-link to="/ChatRoom" class="bg-a" style="margin-top: 70px;">进去聊聊~</router-link>
            <img src="./img/mouse-down.png">
        </div>
        <!-- 第二屏动画 -->
        <div class="wrapper">
            <div class="content">
                <section class="section hero"></section>
                <section class="section gradient-purple"></section>
                <section class="section gradient-blue"></section>
            </div>
            <div class="image-container">
                <img src="https://assets-global.website-files.com/63ec206c5542613e2e5aa784/643312a6bc4ac122fc4e3afa_main%20home.webp"
                    alt="image">
            </div>
        </div>
        <!-- 星空 -->
        <div class="starry-sky">
            <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
            <canvas id="canvas"></canvas>
            <!-- 波浪 -->
            <div class="wave"></div>
            <div class="wave wave-tow"></div>
            <div class="wave wave-three"></div>
            <!-- 文字 -->
            <div class="txt">
                <Typed :options="options2">
                    <h1 class="typing"></h1>
                </Typed>
            </div>
        </div>
    </section>
    <!-- 作品展示 -->
    <section class="production">
        <div class="h-scroll">
            <h2>图集展示...</h2>
            <div class="stick">
                <div class="wrap"><img src="https://sourcebyte.vip/profile/customer/git/house-main2.png" />
                    <img src="https://www.urshop.cn/img/cases/20220322165422.png" />
                    <img src="https://www.urshop.cn/img/cases/20220221011037.png" />
                    <img src="https://www.urshop.cn/img/cases/20220322170515.png" />
                    <img src="https://oss.iteachyou.cc/20190820092158.png" />
                </div>
            </div>
        </div>
        <footer>Nice to meet you.</footer>
    </section>
    <Footer class="Footer"></Footer>
</template>
<style scoped lang='scss'>
canvas {
    display: block;
    width: 100%;
    height: 100%;
}

/* 头部100vh背景 */
section .bg {
    width: 100%;
    text-align: center;
    height: calc(100vh);
    animation: AnimationName 115s ease infinite;
    animation-duration: 115s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-fill-mode: none;
    animation-play-state: running;
    animation-name: AnimationName;
    position: relative;
    background: linear-gradient(114deg, #32e4c1, #32e4c1, #32e4c1, #8667f8, #f78893, #8667f8, #32e4c1, #32e4c1);
    background-position-x: initial;
    background-position-y: initial;
    background-size: 2000% 2000%;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: initial;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
}

/* 头部第一屏背景颜色切换 */
@keyframes mouse {
    from {
        bottom: 12%;
    }

    to {
        bottom: 10%;
    }
}

@-webkit-keyframes AnimationName {
    0% {
        background-position: 0 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0 50%;
    }
}

@keyframes AnimationName {
    0% {
        background-position: 0 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0 50%;
    }
}

/* 头部第一屏文字逐个出现 */
#txt {
    font-size: 40px;
    width: 700px;
    height: 160px;

}

.bg .bg-a {
    padding: 17px 20px;
    color: #000;
    background-image: linear-gradient(to top, #e3eda8 0%, #fed6e3 100%);
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: inherit;
    font-size: 14px;
    border-radius: 12px;
    font-weight: bold;
}

.bg img {
    width: 40px;
    position: absolute;
    text-align: center;
    bottom: 10%;
    left: 0;
    right: 0;
    margin: 0 auto;
    cursor: pointer;
    animation: mouse 1s infinite;
    animation-direction: alternate;
}

// 星空
.starry-sky {
    width: 100%;
    height: 110vh;
    background-image: url(https://wangyuanlin.site:8001/head/xingkong.jpg);
    background-size: 100% 100%;
    background-position: center center;
    position: relative;
}

// 波浪
.wave {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 200px;
    --c: #f9f9f9;
    --w1: radial-gradient(100% 57% at top, #0000 100%, var(--c) 100.5%) no-repeat;
    --w2: radial-gradient(100% 57% at bottom, var(--c) 100%, #0000 100.5%) no-repeat;
    background: var(--w1), var(--w2), var(--w1), var(--w2);
    background-position-x: -200%, -100%, 0%, 100%;
    background-position-y: 100%;
    background-size: 50.5% 100%;
    animation: m 3s infinite linear;
    z-index: 9;
}

.wave-tow {
    bottom: 20px;
    --c: #e9ecee;
    z-index: 9;
    animation: m 4s infinite linear;
}

.wave-three {
    bottom: 40px;
    z-index: 9;
    animation: m 5s infinite linear;
    --c: #dee0e2;
}

// 文字
.txt {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
    font-size: 30px;
    color: #fff;
}

@keyframes m {
    0% {
        background-position-x: -200%, -100%, 0%, 100%
    }

    100% {
        background-position-x: 0%, 100%, 200%, 300%
    }
}

// 第二屏动画
.wrapper,
.content {
    position: relative;
    width: 100%;
    z-index: 1;
}

::v-deep .pin-spacer,
::v-deep .wrapper {
    height: 200vh !important;
    z-index: -1;
}

::v-deep .gradient-blue {
    display: none !important;
}

::v-deep .gsap-marker-scroller-end,
::v-deep .gsap-marker-scroller-start {
    display: none !important;
}

.content {
    overflow-x: hidden;
}

.content .section {
    width: 100%;
    height: 100vh;
}

.content .section.hero {
    background-image: url(https://wangyuanlin.site:8001/head/hongqi.jpg);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

.image-container {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    perspective: 500px;
    overflow: hidden;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
}

.read-more-btn {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-radius: 100%;
    margin: auto;
    background: #fff;
    transform: translateX(-10px);
    opacity: 0;
    visibility: hidden;
    border-color: #ffee02;
    transition: .3s ease-in-out;
    text-decoration: none;
}

.read-more-btn i {
    color: #000;
    font-size: 12px;
}

// 作品展示
@import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@700&family=Great+Vibes&display=swap');

@property --k {
    syntax: '<number>';
    initial-value: 0;
    inherits: true;
}

.production {

    footer {
        display: grid;
        place-content: center;
        min-height: 100vh;
        background: silver;
        font-size: 2em;
        font: 700 4em oxanium, sans-serif;
        text-align: center;
        text-shadow: 1px 1px 3px;
        font-family: Great Vibes, cursive;

    }

    .h-scroll {
        height: 500vh;
        background: #212121;

        @supports (animation-timeline: view()) {
            background:
                linear-gradient(90deg,
                    rgba(gold, calc(1 - round(down, var(--k)))) calc(var(--k)*100%),
                    #0000 0) 0 0/ 100% .5rem no-repeat fixed #212121;
            animation: k 1s both;
            animation-timeline: view();
            animation-range: contain
        }
    }

    @keyframes k {
        to {
            --k: 1;
        }
    }

    h2 {
        color: #ededed;
        text-align: center;
        font-size: 30px;
    }

    img {
        width: 400px;
        aspect-ratio: 2;
        object-fit: cover;
        box-shadow: 2px 2px 5px;
        margin-left: 200px;
    }

    .stick {
        box-sizing: border-box;
        display: grid;
        align-content: center;
        container-type: inline-size;
        position: sticky;
        top: 50px;
        padding: 20px;
        height: 100vh;
    }

    .wrap {
        display: grid;
        grid-auto-flow: column;
        grid-gap: 260px;
        translate: calc(var(--k)*(50cqw - 100%));
        padding-left: 100px;
    }
}

// 媒体查询
@media screen and (max-width: 1200px) {

    // 星空
    .starry-sky {
        height: 90vh;
    }
}

@media screen and (max-width: 768px) {

    // 底部
    .Footer {
        display: none;
    }
}
</style>