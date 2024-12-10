<template>
    <div ref="container" class="box" @click="handleRandom">
        <span :key="childKey" ref="child" :style="{ color: colorRandom(), left: childLeft, top: childTop }" class="minbox">
            {{ msg }}
        </span>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
const container = ref(null);
const child = ref(null); // 鼠标点击后，在页面展示文本的节点
const childKey = ref(0); // 每次点击后，改变key以触发Vue重新渲染span
// 生成随机颜色
const colorRandom = () => {
    let color;
    do {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        color = `rgb(${r},${g},${b})`;
    } while (color === "rgb(250,235,215)");
    return color;
};
const textArr = [
    "(　＾∀＾)",
    "林King",
    "Σ(ﾟдﾟ；)",
    "加油！",
    "(⊙o⊙)",
    "文明",
    "✈",
    "和谐",
    "☯",
    "自由",
    "☠",
    "平等",
    "〠",
    "公正",
    "❤",
    "爱国",
    "★",
];
// 生成随机数
const randomInd = () => {
    return Math.floor(Math.random() * textArr.length);
};
const msg: any = ref(null); //在页面展示的文本
const childLeft: any = ref(0);
const childTop: any = ref(0);
// 鼠标点击事件
const handleRandom = (e: any) => {
    childLeft.value = `${e.pageX}px`;
    childTop.value = `${e.pageY}px`;

    msg.value = textArr[randomInd()];

    // Increment the key to force Vue to re-render the span  
    childKey.value++;
};
onMounted(() => {
    window.addEventListener("click", handleRandom);
})
onUnmounted(() => {
    window.removeEventListener("click", handleRandom);
})
</script>
   
<style lang="scss" scoped>
.box {
    .minbox {
        width: fit-content;
        position: absolute;
        animation: moveAndFadeout 1s ease-in-out forwards;
        z-index: 9999;
        font-weight: bold;
    }

    // 移动和、淡出以及翻转动画
    @keyframes moveAndFadeout {
        0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacit: 1;
        }

        100% {
            transform: translate(20px, -80px) rotate(180deg) scale(2);
            opacity: 0;
        }
    }
}
</style>