<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
function updateScroller() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const top = Math.round((scrollY / (documentHeight - viewportHeight)) * 100);
    const bottom = Math.round(
        ((scrollY + viewportHeight - documentHeight) /
            (documentHeight - viewportHeight)) *
        100
    );
    document.querySelector(".one")!.textContent = `${top}%`;
    document.querySelector(".two")!.textContent = `${bottom}%`;
    if (viewportHeight + window.pageYOffset > 1.2 * viewportHeight) {
        //@ts-ignore
        document.querySelector(".scroll").style.opacity = "1";
    } else {
        //@ts-ignore
        document.querySelector(".scroll").style.opacity = "0";
    }
}

const handleScroll = () => {
    updateScroller();
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateScroller);
    updateScroller();
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', updateScroller);
});  
</script>
<template>
    <div class="container-box">
        <div class="ruler">
            <div class="mask one">0%</div>
            <div class="mask two">0%</div>
            <div class="lines">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

            </div>
        </div>
        <main id="main">
            <div class="line top"></div>
            <article>
                <h1>前言</h1>
                <p>本人搭乘上了属于计算机时代的末班车，网络时代的爬虫，熟悉Z-blog、Discuz、PHPwind、WordPress等开源程序；
                    擅长Ai、Fw、Fl、Br、Ae、Pr、Id、PS等软件的安装与卸载；
                    精通CSS、JavaScript、PHP、C、C＋＋、C#、java、Ruby、Perl、Lisp、python、Objective-C、ActionScript等单词的拼写；
                    熟悉windows、Linux、Mac、Android、IOS等系统的开关机；
                    更是爱奇艺、优酷、腾讯、拼多多、饿了么、美团等多家平台VIP会员，其实我也想低调，但实力不允许啊~
                    对网站建站略懂一二！
                </p>
                <h1>技术栈</h1>
                <p>
                    1、熟练掌握web端的架构设计以及实现方案。<br>
                    2、对v8垃圾回收及算法、JavaScript运行机制/底层原理(ECStack/EC(G)/GO...)、浏览器底层原理、数据结构、算法有深入的了解。<br>
                    3、精通Vue全家桶设计原理及源码，对VueRouter、Vuex、Pinia、VueSSR的源码都有深入研究。<br>
                    4、熟练掌握React及周边ReactSSR、UMI3/4源码、Dva、React性能优化。<br>
                    5、熟练使用uniapp、qiankun、ReactNative、原生小程序主多端开发。<br>
                    6、熟练使用Node.js/爬虫，及Express、Egg.js、Nest.js、koa.js框架。<br>
                    7、熟练使用TypeScript、低代码、微前端，掌握其原理。<br>
                    8、在部门内部推行开发规范（CommitLInt+ESLint+Prettier+StyleLint+Husky ）。<br>
                    9、熟练掌握WebSocket运用于社交平台、直播、短视频;对HTTP/S、TCP/IP、UDP、WebSocket、OSI七层模型等也有深入研究。<br>
                    10、熟悉工程化开发，Webpack、Vite、Rollup、ESBuild、Gulp、ESLint等，包括对Webpack核心工作原理、常用Loader和Plugin的理解，掌握热替换基本原理、
                    tree-shaking、CSS工程化方案、babel原理以及项目常用性能优化方案。<br>
                    11、前端性能优化：有一定的性能优化经验，包括代码压缩、懒加载、CDN加速、缓存策略等，具有CRP渲染优化思想，对性能优化、能够对网能进行分析和优化。<br>
                    12、根据公司需求开发对应的UI组件库，熟练使用Element-plus、iview、uview、vant、vuetifyjs等周边UI库。<br>
                    13、熟悉MySQL、Mongodb、Redis数据库。<br>
                    14、有大型平台从0到1的开发经验，跨团队沟通协作能力强，对接100多个业务的前端，对性能优化、前端安全等，也有一定的应用与思考。
                </p>
                <h1>项目</h1>
                <p><img src="https://sourcebyte.vip/profile/customer/git/house-main2.png" alt=""></p>
                <p><img src="https://www.urshop.cn/img/cases/20220322165422.png" alt=""></p>
                <p><img src="https://oss.iteachyou.cc/20190820092158.png" alt=""></p>
                <h1>关于我</h1>
                <p>05年男生一枚 </p>

                <p>喜欢探索新的技术 对代码有很强的执念</p>
                <p>
                    业余喜欢健身、动漫、刷抖音
                </p>
                <p>
                    如果有公司愿意收留小弟，可以在下面加我绿泡泡（微信），或是在聊天室群聊中留言<br>
                    如果你愿意花些时间了解我，那么恭喜你花了些时间<br>
                    注：本人学历不高，成人高考大专
                </p>
                <h1>联系我</h1>
                <p>邮箱：3490995542@qq.com</p>
                <p>Q Q ：3490995542</p>
                <p>绿泡泡：w3490995542</p>
                <p>定位：河南</p>
                <a href="##" target="_blank">谢谢你的坚持看到了最后面</a>
            </article>
            <div class="line bottom"></div>
        </main>

        <a class="scroll" href="#main">
            <div class="container">
                <div class="rectangle"></div>
                <div class="rectangle"></div>
                <div class="rectangle"></div>
                <div class="rectangle"></div>
                <div class="rectangle"></div>
                <div class="rectangle"></div>
                <div class="rectangle"></div>
                <div class="rectangle"></div>
            </div>
            <span class="text">go back to the top</span>
        </a>
    </div>
</template>
<style scoped lang='scss'>
/* cyrillic-ext */
@font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZJhiI2B.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}

/* cyrillic */
@font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZthiI2B.woff2) format('woff2');
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}

/* greek-ext */
@font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZNhiI2B.woff2) format('woff2');
    unicode-range: U+1F00-1FFF;
}

/* greek */
@font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZxhiI2B.woff2) format('woff2');
    unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}

/* vietnamese */
@font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZBhiI2B.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}

/* latin-ext */
@font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZFhiI2B.woff2) format('woff2');
    unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* cyrillic-ext */
@font-face {
    font-family: 'Jura';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP1d7ZurR_ibHw.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}

/* cyrillic */
@font-face {
    font-family: 'Jura';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP1d7ZuiR_ibHw.woff2) format('woff2');
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}

/* greek-ext */
@font-face {
    font-family: 'Jura';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP1d7ZuqR_ibHw.woff2) format('woff2');
    unicode-range: U+1F00-1FFF;
}

/* greek */
@font-face {
    font-family: 'Jura';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP1d7ZulR_ibHw.woff2) format('woff2');
    unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}

/* kayah-li */
@font-face {
    font-family: 'Jura';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP1d7ZvuR_ibHw.woff2) format('woff2');
    unicode-range: U+200C-200D, U+2010, U+25CC, U+A900-A92F;
}

/* vietnamese */
@font-face {
    font-family: 'Jura';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP1d7ZupR_ibHw.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}

/* latin-ext */
@font-face {
    font-family: 'Jura';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP1d7ZuoR_ibHw.woff2) format('woff2');
    unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
    font-family: 'Jura';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP1d7ZumR_g.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

:root {
    --c: 238, 199, 99;
    --t: 204, 204, 204;
}

.container-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    font-family: "Jura";
    color: rgb(var(--t));
    position: relative;
    background-color: #000;
}

h1,
h2,
h3,
p {
    font-weight: normal;
    color: #fff;
}

img {
    display: block;
    width: 100%;
}

h1 {
    font-size: 5rem;
    margin: 0 0 3rem 0;
    text-align: center;
}

p {
    line-height: 200%;
    margin-bottom: 3rem;
}

.scroll {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2rem;
    gap: 1rem;
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    cursor: pointer;
    transition: all ease 0.3s;
}

.text {
    text-shadow: 0 0 20px 1px #fff;
    color: #fff;
    font-family: "Jura";
}

.container {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 0.5rem;
}

.rectangle {
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    transform: translateY(20px);
    box-shadow: 0 0 200px 5px rgb(#edc764, 1), 0 0 20px 1px rgb(#edc764, 0.3);
}

.rectangle:first-child {
    opacity: 1;
    transform: translateY(0);
    background-color: #edc663;
}

.scroll:hover .rectangle:not(:first-child) {
    opacity: 1;
    transform: translateY(0);
}

.rectangle:nth-child(1) {
    width: 100px;
    height: 15px;
}

.rectangle:nth-child(2) {
    width: 70px;
    height: 12px;
    transition-delay: 0.05s;
    background-color: rgba(237, 198, 99, 0.9);
}

.rectangle:nth-child(3) {
    width: 50px;
    height: 9px;
    transition-delay: 0.1s;
    background-color: rgba(237, 198, 99, 0.8);
}

.rectangle:nth-child(4) {
    width: 40px;
    height: 7px;
    transition-delay: 0.15s;
    background-color: rgba(237, 198, 99, 0.7);
}

.rectangle:nth-child(5) {
    width: 32px;
    height: 6px;
    transition-delay: 0.2s;
    background-color: rgba(237, 198, 99, 0.6);
}

.rectangle:nth-child(6) {
    width: 28px;
    height: 5px;
    transition-delay: 0.25s;
    background-color: rgba(237, 198, 99, 0.5);
}

.rectangle:nth-child(7) {
    width: 25px;
    height: 4px;
    transition-delay: 0.3s;
    background-color: rgba(237, 198, 99, 0.4);
}

.rectangle:nth-child(8) {
    width: 22px;
    height: 3px;
    transition-delay: 0.35s;
    background-color: rgba(237, 198, 99, 0.3);
}

.scroll:not(:hover) .rectangle:nth-child(2) {
    transition-delay: 0.35s;
}

.scroll:not(:hover) .rectangle:nth-child(3) {
    transition-delay: 0.3s;
}

.scroll:not(:hover) .rectangle:nth-child(4) {
    transition-delay: 0.25s;
}

.scroll:not(:hover) .rectangle:nth-child(5) {
    transition-delay: 0.2s;
}

.scroll:not(:hover) .rectangle:nth-child(6) {
    transition-delay: 0.15s;
}

.scroll:not(:hover) .rectangle:nth-child(7) {
    transition-delay: 0.05s;
}

.scroll:not(:hover) .rectangle:nth-child(8) {
    transition-delay: 0s;
}

/* extra */

main {
    border-style: solid;
    border-color: #292929;
    border-width: 0 1px 0 1px;
    width: 60%;
    height: auto;
    margin: 0 15rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

.line {
    width: 100%;
    height: 1px;
    position: relative;
    background-color: rgb(var(--t), 0.2);
}

.top {
    top: 5rem;
}

.bottom {
    bottom: 5rem;
}

article {
    position: relative;
    margin: 10rem 4rem;
}

a {
    color: #edc663;
    text-decoration: none;
}

@media screen and (max-width: 850px) {
    main {
        width: 100%;
        margin: 0 5rem;
    }

    .ruler {
        left: 0rem !important;
    }
}


.ruler {
    width: 2rem;
    height: calc(100% - 60px);
    position: absolute;
    left: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
}

.lines {
    width: 1px;
    height: calc(100% - 60px);
    background-color: #eec763;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 60px;
}

.lines span {
    width: 1rem;
    background-color: #eec763;
    height: 1px;
    position: absolute;
}

.mask {
    position: fixed;
    height: 10%;
    width: 1rem;
    background-color: #000;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: #eec763;
}

.one {
    top: 60px;
    border-width: 0 0 1px 0;
    border-color: rgb(var(--c));
    border-style: solid;

}

.two {
    bottom: 0;
    border-width: 1px 0 0px 0;
    border-color: rgb(var(--c));
    border-style: solid;
}

.lines span:nth-child(1) {
    top: 4%;
}

.lines span:nth-child(2) {
    top: 8%;
}

.lines span:nth-child(3) {
    top: 12%;
}

.lines span:nth-child(4) {
    top: 16%;
}

.lines span:nth-child(5) {
    top: 20%;
}

.lines span:nth-child(6) {
    top: 24%;
}

.lines span:nth-child(7) {
    top: 28%;
}

.lines span:nth-child(8) {
    top: 32%;
}

.lines span:nth-child(9) {
    top: 36%;
}

.lines span:nth-child(10) {
    top: 40%;
}

.lines span:nth-child(11) {
    top: 44%;
}

.lines span:nth-child(12) {
    top: 48%;
}

.lines span:nth-child(13) {
    top: 52%;
}

.lines span:nth-child(14) {
    top: 56%;
}

.lines span:nth-child(15) {
    top: 60%;
}

.lines span:nth-child(16) {
    top: 64%;
}

.lines span:nth-child(17) {
    top: 68%;
}

.lines span:nth-child(18) {
    top: 72%;
}

.lines span:nth-child(19) {
    top: 76%;
}

.lines span:nth-child(20) {
    top: 80%;
}

.lines span:nth-child(21) {
    top: 84%;
}

.lines span:nth-child(22) {
    top: 88%;
}

.lines span:nth-child(23) {
    top: 92%;
}

.lines span:nth-child(24) {
    top: 96%;
}

.lines span:nth-child(25) {
    top: 100%;
}
</style>