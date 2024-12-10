<script lang="ts" setup>
import { onMounted, ref, computed, reactive } from 'vue';
import { reqArticleHome, reqUserLike, reqBrowseArticle } from "@/api/ArticleHome"
import { useArticleHomeStore } from "@/stores/articleHome"
import { reqComments } from "@/api/ArticleCover"
import type { ArticleList } from "@/api/ArticleHome/type";
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
// 引入字体图标样式
import '@/views/ArticleHome/font/iconfont.css';
const $router = useRouter();
const articleHomeStore = useArticleHomeStore()
const currentPage: Ref<number> = ref(1)
const pageSize = ref(10)
const total = ref(0)
const totalSplice = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
let currentSlide = ref(0)
let isPreviousSlide = ref(false)
let isFirstLoad = ref(true)
let slides = ref([
    {
        headlineFirstLine: "林King",
        headlineSecondLine: "Blog",
        sublineFirstLine: "全栈开发工程师",
        sublineSecondLine: "finish",
        bgImg: "https://images.unsplash.com/photo-1638091986258-0c285a62defd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        rectImg: "https://images.unsplash.com/photo-1638091986258-0c285a62defd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
        headlineFirstLine: "欢迎光临",
        headlineSecondLine: "welcome",
        sublineFirstLine: "看到这祝你天天开心",
        sublineSecondLine: "finish",
        bgImg: "https://images.unsplash.com/photo-1579885487896-abc1a9ebb77b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1477&q=80",
        rectImg: "https://images.unsplash.com/photo-1579885487896-abc1a9ebb77b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1477&q=80"
    },
    {
        headlineFirstLine: "事业有成",
        headlineSecondLine: "Yes",
        sublineFirstLine: "看到这祝你事业有成",
        sublineSecondLine: "finish",
        bgImg: "https://images.unsplash.com/photo-1637512853371-3a788ce5eaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
        rectImg: "https://images.unsplash.com/photo-1637512853371-3a788ce5eaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80"
    }
])
// 随机展示10条文章列表
const randomArticles: any = ref([]);
const reqArticles: any = ref([])
const getArticleList = async () => {
    const result: ArticleList = await reqArticleHome()
    console.log(result.data);

    if (result.status === 200) {
        articleHomeStore.getArticleList(result.data)
        total.value = result.data.length;
        articleHomeStore.articleList.forEach(element => {
            element.content = element.content.replace(/<[^>]+>/g, "");
        });
    }
    randomDisplay(randomArticles.value)
    randomDisplay(reqArticles.value)
}
// 文章列表一页显示几个
const showDataList = computed(() => {
    const startIndex = pageSize.value * (currentPage.value - 1);
    const endIndex = total.value >= 10 ? pageSize.value * currentPage.value : total.value;
    const filterData = articleHomeStore.articleList.filter((item: any) => item.is_delete == 0)
    totalSplice.value = filterData.length
    return filterData.slice(startIndex, endIndex);
})
// 点击标题跳转至文章详情页且让浏览数量增加
const goArticleCover = async (id: number) => {
    const nickname = localStorage.getItem("nickname") as string;
    if (nickname) {
        await reqBrowseArticle(id, nickname)
    }
    $router.push({ name: 'articleCover', query: { articleId: id } })

}
// 点赞
const like = async (id: number) => {
    if (!localStorage.getItem("token")) {
        return ElMessage({
            message: '登录后解锁点赞功能！',
            type: 'error',
            offset: 100
        })
    }
    await reqUserLike(id, localStorage.getItem("nickname") as string);
    getArticleList();
}
// 点赞高亮是否显示
const isLike = computed(() => (likeList: any) => {
    if (likeList) {
        let result = likeList.filter((element: any) => element.nickname == localStorage.getItem("nickname"))
        if (result.length > 0) {
            return result[0].is_like;
        } else {
            return false;
        }
    }
})
// 过滤出点赞数量
const computedLike = computed(() => (likeList: any) => {
    if (likeList) {
        let result = likeList.filter((element: any) => element.is_like == true);
        return result.length;
    }
})
// 过滤出浏览数量
const browseLength = computed(() => (likeList: any) => {
    if (likeList) {
        return likeList.length;
    }
})
// 获取用户所有评论
let userComment: any = reactive([])
let isUserCommentBlock: any = ref(false)
let getUserComment = async () => {
    const result = await reqComments();
    userComment = result.data;
    isUserCommentBlock.value = true;
}
let computedUserComment = computed(() => (id: number) => {
    if (userComment) {
        return userComment.filter((element: any) => element.commentId == id)
    }
})

const randomDisplay = (data: any) => {
    const randomIndexes: number[] = [];
    const articles = articleHomeStore.articleList;
    while (randomIndexes.length < articles.length) {
        const randomIndex = Math.floor(Math.random() * articles.length);
        if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
        }
    }
    randomIndexes.slice(0, 10).forEach((index: any) => {
        data.push(articles[index]);
    });
}
let updateSlide = (index: any) => {
    index < currentSlide.value ? isPreviousSlide.value = true : isPreviousSlide.value = false;
    currentSlide.value = index;
    isFirstLoad.value = false;
}
onMounted(() => {
    // 获取文章列表
    getArticleList();
    getUserComment()
    var productRotatorSlide = document.getElementById("app");
    var startX = 0;
    var endX = 0;
    productRotatorSlide!.addEventListener("touchstart", (event) => startX = event.touches[0].pageX);
    productRotatorSlide!.addEventListener("touchmove", (event) => endX = event.touches[0].pageX);
    productRotatorSlide!.addEventListener("touchend", function (event: any) {
        var threshold = startX - endX;
        if (threshold < 150 && 0 < currentSlide.value) {
            currentSlide.value--;
        }
        if (threshold > -150 && currentSlide.value < slides.value.length - 1) {
            currentSlide.value++;
        }
    }.bind(this));
})
</script>
<template>
    <div class="wrapper" v-cloak v-bind:class="{ 'is-previous': isPreviousSlide, 'first-load': isFirstLoad }">
        <div class="slide-wrapper" v-for="(slide, index) in slides" v-bind:class="{ active: index === currentSlide }"
            v-bind:style="{ 'z-index': (slides.length - index), 'background-image': 'url(' + slide.bgImg + ')' }">
            <div class="slide-inner">
                <div class="slide-bg-text">
                    <p>{{ slide.headlineFirstLine }}</p>
                    <p>{{ slide.headlineSecondLine }}</p>
                </div>
                <div class="slide-rect-filter">
                    <div class="slide-rect" v-bind:style="{ 'border-image-source': 'url(' + slide.rectImg + ')' }"></div>
                </div>
                <div class="slide-content">
                    <h1 class="slide-content-text">
                        <p>{{ slide.headlineFirstLine }}</p>
                        <p>{{ slide.headlineSecondLine }}</p>
                    </h1><a class="slide-content-cta">Call To Action</a>
                </div>
                <h2 class="slide-side-text"><span>{{ slide.sublineFirstLine }} / </span><span>{{ slide.sublineSecondLine
                }}</span></h2>
            </div>
        </div>
        <div class="controls-container">
            <button class="controls-button" v-for="(slide, index) in slides"
                v-bind:class="{ active: index === currentSlide }" v-on:click="updateSlide(index)">{{ slide.headlineFirstLine
                }} {{ slide.headlineSecondLine }}</button>
        </div>
        <div class="pagination-container">
            <span class="pagination-item" v-for="(slide, index) in slides" v-bind:class="{ active: index === currentSlide }"
                v-on:click="updateSlide(index)"></span>
        </div>
    </div>
    <section class="container">
        <div class="content">
            <div class="content_left">
                <!-- 最新文章 -->
                <div class="content_title">
                    <h2>最新文章</h2>
                </div>
                <ul>
                    <li v-for="item in showDataList" :key="item.id" class="wow bounceInUp" data-wow-delay="0.5s"
                        style="visibility: visible; animation-delay: 0.5s; animation-name: bounceInUp;">
                        <!-- 文章封面 -->
                        <div class="article_cover" :style="{
                            backgroundImage: item.cover ? `url(${item.cover})` : 'none',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }" v-if="item.cover">
                        </div>
                        <!-- 文章内容 -->
                        <div class="article_content" :style="{ flex: item.cover ? '0.65' : '1' }">
                            <h3 @click="goArticleCover(item.id)">
                                <el-link type="info" style="font-size: 24px;">{{ item.title }}</el-link>
                            </h3>
                            <p @click="goArticleCover(item.id)"
                                style="font-size: 18px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;white-space: normal;text-overflow: ellipsis;-o-text-overflow: ellipsis;">
                                {{ item.content }}</p>
                            <!-- 类型/日期 -->
                            <div class="article_type_date">
                                <p class="article_type">类型：{{ item.type }}</p>
                                <p class="article_date">日期：{{ item.time }}</p>
                            </div>
                            <!-- 作者/评论/点赞 -->
                            <div class="person">
                                <p>作者：{{ item.nickname }}</p>
                                <div style="font-size: 14px;display: flex;align-items: center;position: relative;">
                                    <el-icon style="font-size: 16px;">
                                        <View />
                                    </el-icon>
                                    <span style="margin-right: 10px;margin-left: 4px;">{{
                                        browseLength(item.browse_list) || 0 }}</span>
                                    <span class="iconfont icon-dianzan" style="cursor: pointer;" @click="like(item.id)"
                                        :style="{ color: isLike(item.likeList) == true ? 'red' : '' }"></span>
                                    <span>{{ computedLike(item.likeList) || 0 }}</span>
                                    <ChatDotRound style="width: 16px;margin-left: 10px;" />
                                    ({{ isUserCommentBlock && computedUserComment(item.id)?.length || 0 }})
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="content_right">
                <div>
                    <div class="title" style="border-bottom: 1px solid #ccc;margin-bottom: 10px;">
                        <span
                            style="font-size: 24px;border-bottom: 2px solid #0d6cbf;padding-bottom: 10px;display: inline-block">随机推荐</span>
                    </div>
                </div>
                <ul class="random_list">
                    <li v-for="(item, index) in randomArticles">
                        <span
                            :style="{ backgroundColor: index == 0 ? 'red' : index == 1 ? 'green' : index == 2 ? '#ffad38' : '#ccc' }">{{
                                index + 1 }}</span>
                        <a href="javascript:;" @click="goArticleCover(item.id)">{{ item.title }}</a>
                    </li>
                </ul>
                <div>
                    <div class="title" style="border-bottom: 1px solid #ccc;margin: 10px 0;">
                        <span
                            style="font-size: 24px;border-bottom: 2px solid #0d6cbf;padding-bottom: 10px;display: inline-block">热门推荐</span>
                    </div>
                    <!-- 热门推荐 -->
                    <ul class="random_list">
                        <li v-for="(item, index) in reqArticles">
                            <span
                                :style="{ backgroundColor: index == 0 ? 'red' : index == 1 ? 'green' : index == 2 ? '#ffad38' : '#ccc' }">{{
                                    index + 1 }}</span>
                            <a href="javascript:;" @click="goArticleCover(item.id)">{{ item.title }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 分页器 -->
        <div class="demo-pagination-block" style="width: 100%;margin-top: 20px;margin-bottom: 40px;">
            <el-pagination style="justify-content: center;" v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 40]" :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="totalSplice" />
        </div>
    </section>
    <el-backtop :right="30" :bottom="100" />
    <Footer></Footer>
</template>
<style scoped lang='scss'>
// 顶部
.controls-button,
.slide-side-text,
.slide-content-cta {
    font-family: "Montserrat";
    text-transform: uppercase;
    color: #fff;
    letter-spacing: 0.12rem;
    font-size: 0.7rem;
    line-height: 1;
}

[v-cloak] {
    opacity: 0;
}

.wrapper {
    height: calc(100vh - 60px);
    min-height: 36rem;
    position: relative;
}

@media (max-width: 630px) {
    .wrapper {
        height: 100vh;
        min-height: 0;
    }
}

.slide-wrapper {
    background-size: cover;
    height: 100%;
    background-position: center center;
    position: absolute;
    width: 100%;
    background-blend-mode: darken;
}

.slide-wrapper:nth-child(1) {
    background-color: rgba(115, 129, 153, 0.4);
}

.slide-wrapper:nth-child(1):before {
    background-color: rgba(115, 129, 153, 0.25);
}

.slide-wrapper:nth-child(1) .slide-content-text {
    text-shadow: 2px 5px 45px rgba(85, 96, 113, 0.25);
}

.slide-wrapper:nth-child(2) {
    background-color: rgba(144, 171, 184, 0.7);
}

.slide-wrapper:nth-child(2):before {
    background-color: rgba(144, 171, 184, 0.3);
}

.slide-wrapper:nth-child(2) .slide-content-text {
    text-shadow: 2px 5px 45px rgba(121, 142, 152, 0.2);
}

.slide-wrapper:nth-child(3) {
    background-color: rgba(86, 125, 156, 0.5);
}

.slide-wrapper:nth-child(3):before {
    background-color: rgba(86, 125, 156, 0.2);
}

.slide-wrapper:nth-child(3) .slide-content-text {
    text-shadow: 2px 5px 55px rgba(57, 83, 103, 0.4);
}

.slide-wrapper:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.slide-inner {
    position: relative;
    z-index: 2;
    height: 100%;
    overflow: hidden;
}

.slide-bg-text {
    font-family: "Playfair Display";
    color: #000;
    font-size: 42vh;
    line-height: 0.8;
    opacity: 0.03;
    font-weight: 900;
    margin-top: -4rem;
    position: absolute;
    top: 50%;
    left: 5vw;
    transform: translateY(-50%);
}

.slide-bg-text>p:last-child {
    padding-left: 4rem;
}

.slide-content {
    color: #fff;
    margin-top: 5rem;
    position: absolute;
    top: 50%;
    left: calc(13vw + (.7) * 48vh);
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
}

@media (max-width: 1000px) {
    .slide-content {
        left: calc(13vw + 1rem);
    }
}

@media (max-height: 730px) {
    .slide-content {
        top: 30%;
        transform: translateY(-30%);
        left: calc(9vw + (.7) * 16vw);
    }
}

.slide-content-text {
    font-family: "Playfair Display";
    font-size: 9rem;
    letter-spacing: 0.2rem;
    line-height: 0.87;
    font-weight: 700;
    will-change: auto;
}

@media (max-height: 790px) {
    .slide-content-text {
        font-size: 7rem;
    }
}

@media (max-width: 1150px) {
    .slide-content-text {
        font-size: 7rem;
    }
}

@media (max-width: 840px) {
    .slide-content-text {
        font-size: 5.5rem;
    }
}

@media (max-width: 630px) {
    .slide-content-text {
        margin-bottom: 5.5rem;
    }
}

@media (max-width: 500px) {
    .slide-content-text {
        font-size: 3.5rem;
    }
}

.slide-content-text>p:last-child {
    padding-left: 3rem;
}

.slide-content-cta {
    cursor: pointer;
    align-self: flex-start;
    margin-top: 4.5rem;
    margin-left: calc((.3) * 48vh + 4.5rem);
    padding: 0.9rem 2.2rem;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    transition: 0.18s ease-in-out;
    font-weight: 700;
}

@media (max-width: 1000px) {
    .slide-content-cta {
        background-color: rgba(255, 255, 255, 0.3);
        padding-top: 1.2rem;
        padding-bottom: 1.2rem;
    }
}

@media (max-width: 630px) {
    .slide-content-cta {
        display: none;
    }
}

.slide-content-cta:hover {
    color: #000;
    background-color: #fff;
}

.slide-rect {
    height: 62vh;
    width: 48vh;
    border-image-slice: 10%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 13vw;
    border-width: 5vh;
    border-style: solid;
    box-shadow: 2px 2px 90px 30px rgba(41, 50, 61, 0.22);
    will-change: auto;
}

@media (max-height: 790px) {
    .slide-rect {
        left: 9vw;
        height: 20vw;
        width: 16vw;
        border-width: 5vh;
    }
}

@media (max-height: 730px) {
    .slide-rect {
        top: 30%;
        transform: translateY(-30%);
    }
}

.slide-rect-filter {
    filter: brightness(110%) contrast(110%) saturate(110%);
}

.slide-side-text {
    position: absolute;
    left: calc(13vw - 3rem);
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    top: calc((50% - (62vh / 2)) + (5vh / 2));
}

@media (max-height: 790px) {
    .slide-side-text {
        left: calc(9vw - 3rem);
        top: calc((50% - (20vw / 2)) + (5vh / 2));
    }
}

@media (max-height: 730px) {
    .slide-side-text {
        top: calc((40% - (20vw / 2)) + (5vh / 2));
    }
}

.slide-side-text>span:first-child {
    font-weight: 700;
}

.slide-side-text:after {
    content: "";
    width: 1px;
    background-color: #fff;
    height: 40px;
    display: block;
    position: absolute;
    top: calc(100% + 25px);
    left: 50%;
    transform: translateX(-50%);
}

.controls-container {
    position: absolute;
    z-index: 4;
    display: flex;
    bottom: 0;
    right: 0;
    align-items: flex-end;
}

@media (max-width: 630px) {
    .controls-container {
        display: none;
    }
}

.controls-button {
    cursor: pointer;
    background-color: rgba(208, 206, 204, 0.32);
    border: 0;
    padding: 1.6rem 2.2rem;
    flex-basis: 0;
    flex-grow: 1;
    min-width: 15rem;
    transition: 0.25s ease-in-out;
    outline: 0;
}

@media (max-width: 730px) {
    .controls-button {
        padding: 1.2rem 1.4rem;
        min-width: 13rem;
    }
}

.controls-button:not(.active):hover {
    color: #000;
    background-color: #fff;
}

.controls-button.active {
    cursor: default;
    font-weight: 700;
    background-color: #3b3e45;
    padding-top: 1.9rem;
    padding-bottom: 1.9rem;
    margin-bottom: -0.3rem;
    position: relative;
}

@media (max-width: 730px) {
    .controls-button.active {
        padding-top: 1.4rem;
        padding-bottom: 1.4rem;
        margin-bottom: -0.15rem;
    }
}

.controls-button.active:after {
    content: "";
    background-color: #e3e3e3;
    height: 5px;
    width: calc(100% - 8px);
    position: absolute;
    top: 100%;
    left: 4px;
}

.controls-button:not(.active)+.controls-button {
    border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.pagination-container {
    position: absolute;
    z-index: 200;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
}

@media (max-width: 920px) {
    .pagination-container {
        display: none;
    }
}

.pagination-item {
    width: 30px;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.6);
    transition: 0.18s ease-in-out;
}

.pagination-item+.pagination-item {
    margin-top: 1rem;
}

.pagination-item.active {
    background-color: #fff;
    position: relative;
    transform: translateX(-0.6rem);
    width: 35px;
}

.pagination-item.active:after {
    content: "";
    height: 4px;
    width: 2px;
    border-radius: 35%;
    background-color: #fff;
    display: inline-block;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateX(0.6rem) translateY(-50%);
}

.pagination-item:not(.active) {
    cursor: pointer;
}

.pagination-item:not(.active):hover {
    background-color: #fff;
    width: 35px;
}

@-webkit-keyframes slideLeft {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-100%);
    }
}

@keyframes slideLeft {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-100%);
    }
}

@-webkit-keyframes slideRight {
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0);
    }
}

@keyframes slideRight {
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0);
    }
}

@-webkit-keyframes cutTextUp {
    from {
        -webkit-clip-path: inset(0 0 -10% 0);
        clip-path: inset(0 0 -10% 0);
    }

    to {
        -webkit-clip-path: inset(0 0 100% 0);
        clip-path: inset(0 0 100% 0);
    }
}

@keyframes cutTextUp {
    from {
        -webkit-clip-path: inset(0 0 -10% 0);
        clip-path: inset(0 0 -10% 0);
    }

    to {
        -webkit-clip-path: inset(0 0 100% 0);
        clip-path: inset(0 0 100% 0);
    }
}

@-webkit-keyframes cutTextDown {
    from {
        -webkit-clip-path: inset(100% 0 0 0);
        clip-path: inset(100% 0 0 0);
    }

    to {
        -webkit-clip-path: inset(-10% 0 -20% 0);
        clip-path: inset(-10% 0 -20% 0);
        opacity: 1;
    }
}

@keyframes cutTextDown {
    from {
        -webkit-clip-path: inset(100% 0 0 0);
        clip-path: inset(100% 0 0 0);
    }

    to {
        -webkit-clip-path: inset(-10% 0 -20% 0);
        clip-path: inset(-10% 0 -20% 0);
        opacity: 1;
    }
}

@-webkit-keyframes cutTextDownFromTop {
    from {
        -webkit-clip-path: inset(0 0 100% 0);
        clip-path: inset(0 0 100% 0);
    }

    to {
        -webkit-clip-path: inset(0 0 -30% 0);
        clip-path: inset(0 0 -30% 0);
        opacity: 1;
    }
}

@keyframes cutTextDownFromTop {
    from {
        -webkit-clip-path: inset(0 0 100% 0);
        clip-path: inset(0 0 100% 0);
    }

    to {
        -webkit-clip-path: inset(0 0 -30% 0);
        clip-path: inset(0 0 -30% 0);
        opacity: 1;
    }
}

@-webkit-keyframes rectMovement {
    0% {
        transform: translateX(0) rotate(0) translateY(-50%);
    }

    60% {
        opacity: 1;
    }

    100% {
        transform: translateX(calc(-48vh + -13vw)) rotate(12deg) translateY(-50%);
        opacity: 0;
    }
}

@keyframes rectMovement {
    0% {
        transform: translateX(0) rotate(0) translateY(-50%);
    }

    60% {
        opacity: 1;
    }

    100% {
        transform: translateX(calc(-48vh + -13vw)) rotate(12deg) translateY(-50%);
        opacity: 0;
    }
}

@media (max-height: 730px) {
    @-webkit-keyframes rectMovement {
        0% {
            transform: translateX(0) rotate(0) translateY(-30%);
        }

        60% {
            opacity: 1;
        }

        100% {
            transform: translateX(calc(-48vh + -13vw)) rotate(12deg) translateY(-30%);
            opacity: 0;
        }
    }

    @keyframes rectMovement {
        0% {
            transform: translateX(0) rotate(0) translateY(-30%);
        }

        60% {
            opacity: 1;
        }

        100% {
            transform: translateX(calc(-48vh + -13vw)) rotate(12deg) translateY(-30%);
            opacity: 0;
        }
    }
}

@-webkit-keyframes rectMovementFromRight {
    0% {
        transform: translateX(calc(48vh)) rotate(12deg) translateY(-50%);
        opacity: 0;
    }

    60% {
        opacity: 1;
    }

    100% {
        transform: translateX(0) rotate(0) translateY(-50%);
        opacity: 1;

        @media (max-height: 730px) {
            transform: translateX(0) rotate(0) translateY(-30%);
        }
    }
}

@keyframes rectMovementFromRight {
    0% {
        transform: translateX(calc(48vh)) rotate(12deg) translateY(-50%);
        opacity: 0;
    }

    60% {
        opacity: 1;
    }

    100% {
        transform: translateX(0) rotate(0) translateY(-50%);
        opacity: 1;

        @media (max-height: 730px) {
            transform: translateX(0) rotate(0) translateY(-30%);
        }
    }
}

@media (max-height: 730px) {
    @-webkit-keyframes rectMovementFromRight {
        0% {
            transform: translateX(calc(48vh)) rotate(12deg) translateY(-30%);
            opacity: 0;
        }

        60% {
            opacity: 1;
        }

        100% {
            transform: translateX(0) rotate(0) translateY(-30%);
            opacity: 1;
        }
    }

    @keyframes rectMovementFromRight {
        0% {
            transform: translateX(calc(48vh)) rotate(12deg) translateY(-30%);
            opacity: 0;
        }

        60% {
            opacity: 1;
        }

        100% {
            transform: translateX(0) rotate(0) translateY(-30%);
            opacity: 1;
        }
    }
}

@-webkit-keyframes rectMovementRight {
    0% {
        transform: translateX(calc(-48vh + -13vw)) rotate(12deg) translateY(-50%);
    }

    40% {
        opacity: 1;
    }

    100% {
        transform: translateX(0) rotate(0) translateY(-50%);
        opacity: 1;

        @media (max-height: 730px) {
            transform: translateX(0) rotate(0) translateY(-30%);
        }
    }
}

@keyframes rectMovementRight {
    0% {
        transform: translateX(calc(-48vh + -13vw)) rotate(12deg) translateY(-50%);
    }

    40% {
        opacity: 1;
    }

    100% {
        transform: translateX(0) rotate(0) translateY(-50%);
        opacity: 1;

        @media (max-height: 730px) {
            transform: translateX(0) rotate(0) translateY(-30%);
        }
    }
}

@media (max-height: 730px) {
    @-webkit-keyframes rectMovementRight {
        0% {
            transform: translateX(calc(-48vh + -13vw)) rotate(12deg) translateY(-30%);
        }

        40% {
            opacity: 1;
        }

        100% {
            transform: translateX(0) rotate(0) translateY(-30%);
            opacity: 1;
        }
    }

    @keyframes rectMovementRight {
        0% {
            transform: translateX(calc(-48vh + -13vw)) rotate(12deg) translateY(-30%);
        }

        40% {
            opacity: 1;
        }

        100% {
            transform: translateX(0) rotate(0) translateY(-30%);
            opacity: 1;
        }
    }
}

@-webkit-keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.slide-wrapper {
    opacity: 0;
    transition-delay: 1.4s;
    transition-duration: 0s;
    transition-property: opacity;
    will-change: opacity, transform;
}

.slide-wrapper:not(.active) {
    -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s;
    -webkit-animation-name: slideLeft;
    animation-name: slideLeft;
    -webkit-animation-duration: 0.9s;
    animation-duration: 0.9s;
    -webkit-animation-timing-function: cubic-bezier(0.18, 0.54, 0.52, 0.93);
    animation-timing-function: cubic-bezier(0.18, 0.54, 0.52, 0.93);
    pointer-events: none;
}

.slide-wrapper:not(.active) .slide-content-text>p,
.slide-wrapper:not(.active) .slide-side-text {
    -webkit-animation-name: cutTextUp;
    animation-name: cutTextUp;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
}

.slide-wrapper:not(.active) .slide-rect {
    -webkit-animation-name: rectMovement;
    animation-name: rectMovement;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-timing-function: ease;
    animation-timing-function: ease;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}

.slide-wrapper.active {
    transition-delay: 0s;
    opacity: 1;
}

.slide-wrapper.active .slide-content-text>p {
    opacity: 0;
    -webkit-animation-delay: 0.8s;
    animation-delay: 0.8s;
    -webkit-animation-name: cutTextDown;
    animation-name: cutTextDown;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-timing-function: ease;
    animation-timing-function: ease;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}

.slide-wrapper.active .slide-rect {
    opacity: 0;
    -webkit-animation-name: rectMovementFromRight;
    animation-name: rectMovementFromRight;
    -webkit-animation-duration: 0.45s;
    animation-duration: 0.45s;
    -webkit-animation-timing-function: ease;
    animation-timing-function: ease;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-delay: 0.9s;
    animation-delay: 0.9s;
}

.is-previous .slide-wrapper:not(.active) {
    -webkit-animation: none;
    animation: none;
}

.is-previous .slide-wrapper:not(.active) .slide-rect {
    -webkit-animation: none;
    animation: none;
}

.is-previous .slide-wrapper.active {
    transform: translateX(-100%);
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s;
    -webkit-animation-name: slideRight;
    animation-name: slideRight;
    -webkit-animation-duration: 0.8s;
    animation-duration: 0.8s;
    -webkit-animation-timing-function: cubic-bezier(0.18, 0.54, 0.52, 0.93);
    animation-timing-function: cubic-bezier(0.18, 0.54, 0.52, 0.93);
}

.is-previous .slide-wrapper.active .slide-rect {
    opacity: 0;
    -webkit-animation-name: rectMovementRight;
    animation-name: rectMovementRight;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-delay: 0.9s;
    animation-delay: 0.9s;
}

.first-load .slide-wrapper.active .slide-side-text,
.first-load .slide-wrapper.active .slide-content-cta,
.first-load .slide-wrapper.active .slide-rect,
.first-load .controls-container {
    opacity: 0;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
    -webkit-animation-duration: 0.3s;
    animation-duration: 0.3s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
}

.first-load .slide-wrapper.active .slide-content-text>p {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
    -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s;
    -webkit-animation-duration: 0.7s;
    animation-duration: 0.7s;
}

.container {
    width: 100%;
    background-color: #ffffff;

    .content {
        width: 86%;
        margin: 40px auto;
        display: flex;
        justify-content: space-between;

        .content_left {
            flex: .6;

            .content_title {
                border-bottom: 1px solid rgb(204, 204, 204);
                margin: 10px 0px;
                margin-bottom: 10px;

                h2 {
                    border-bottom: 2px solid rgb(13, 108, 191);
                    padding-bottom: 10px;
                    font-size: 24px;
                    background: -webkit-linear-gradient(135deg,
                            #0eaf6d,
                            #ff6ac6 25%,
                            #147b96 50%,
                            #e6d205 55%,
                            #2cc4e0 60%,
                            #8b2ce0 80%,
                            #ff6384 95%,
                            #08dfb4);
                    /* 文字颜色填充设置为透明 */
                    -webkit-text-fill-color: transparent;
                    /* 背景裁剪，即让文字使用背景色 */
                    background-clip: text;
                    /* 背景图放大一下，看着柔和一些 */
                    background-size: 200% 100%;
                    /* 应用动画flowCss 12秒速度 无限循环 线性匀速动画*/
                    animation: flowCss 12s infinite linear;
                }

                @keyframes flowCss {
                    0% {
                        /* 移动背景位置 */
                        background-position: 0 0;
                    }

                    100% {
                        background-position: -400% 0;
                    }
                }

                h2:hover {
                    animation: flowCss 4s infinite linear;
                }
            }

            ul {
                li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 140px;
                    border-bottom: 1px solid #f0f0f2;
                    padding: 10px;

                    // 封面
                    .article_cover {
                        width: 180px;
                        height: 100px;
                        overflow: hidden;
                        flex: .3;
                    }

                    // 内容
                    .article_content {
                        flex: .65;

                        h3,
                        p,
                        div {
                            margin: 2px 0;
                        }

                        .article_type_date {
                            display: flex;
                            justify-content: space-between;

                            p {
                                font-size: 14px;
                            }
                        }

                        .person {
                            display: flex;
                            justify-content: space-between;
                        }
                    }
                }

                li:hover {
                    background-color: #fafafa;
                }
            }
        }

        // 右边装饰
        .content_right {
            flex: 0.3;

            // 随机展示文章列表
            .random_list {
                li {
                    margin-bottom: 4px;
                    overflow: hidden;
                    /* 隐藏超出部分的文本内容 */
                    text-overflow: ellipsis;
                    /* 使用省略号表示被隐藏的文本内容 */
                    white-space: nowrap;

                    /* 防止文本换行 */
                    span {
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        margin-right: 8px;
                        color: #fff;
                        border-radius: 4px;
                    }

                    a {
                        display: inline-block;
                        height: 30px;
                        line-height: 30px;
                        color: #000;

                    }

                    a:hover {
                        color: red;
                    }
                }
            }
        }
    }
}
</style>