<script setup lang='ts'>
import { onMounted, ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { ArticleCover, reqComment, reqComments } from "@/api/ArticleCover"
const $route = useRoute()
const $router = useRouter()
import htmlToPdf from "@/utils/htmlToPDF";
// 下载PDF
const downloadPDF = () => {
    htmlToPdf.getPdf(`林king支持`, "#printData");
};
// 引入 element-plus message信息提示
import { ElMessage } from "element-plus";
const articleId: any = ref()
import { GET_TOKEN } from '@/utils/user';
// 发表评论 
const avatarUrl = ref('')
// 默认头像
let defaultAvatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
// 存储用户发表评论的内容
let userComments: any = ref([])
// 用户评论是否显示
let isComment = ref(false)
let userNickName2: any = ref('')
const articleCoverId: any = ref('')
// 点击发布博文去发布文章路由
let goIssue = () => {
    $router.push({ name: 'publishArticle' })
}
// 评论
let formLabelAlign: { alias: string } = reactive({
    alias: "",
})
let articleData: any = ref({})
const getArticleData = async () => {
    if (!articleCoverId.value) return;
    const result = await ArticleCover(articleCoverId.value)
    console.log(result);

    if (result.status === 200) {
        articleData.value = result.data[0]
    }
}

let publish = async () => {
    if (!GET_TOKEN()) {
        return ElMessage({
            message: '登录后解锁评论功能！',
            type: 'error',
        })
    }
    if (formLabelAlign.alias == '') {
        return ElMessage({
            message: '内容不允许为空',
            type: "error",
        });
    }
    if (avatarUrl.value == 'undefined') {
        avatarUrl.value = defaultAvatar;
    }
    const results = await reqComment(formLabelAlign.alias, '0', avatarUrl.value, userNickName2.value, articleCoverId.value, '')
    if (results.status == 0) {
        ElMessage({
            message: '发表成功！',
            type: 'success',
        })
        // 更新数据 
        userComments.value = results.data;
        isComment.value = true;
        formLabelAlign.alias = ''
    }
}
// 获取所有评论
let getComments = async () => {
    const results = await reqComments()
    userComments.value = results.data;
    isComment.value = true;
}
// 回复评论
let isCreate = ref(true)
const addFormElement = (e: any) => {
    if (!GET_TOKEN()) {
        return ElMessage({
            message: '登录后解释评论功能！',
            type: 'error',
            offset: 180
        })
    }
    if (isCreate.value) {
        const html = `
            <div>
                <textarea cols="100" rows="7" class="comment-text"></textarea><br />
                <button class="cancel-btn" style="display: inline-block;width: 60px;height:30px;line-height: 30px;text-align: center;cursor: pointer;">取消</button>
                <button class="publish-btn" style="display: inline-block;width: 60px;height:30px;line-height: 30px;text-align: center;cursor: pointer;">发表</button>
            </div>
        `;
        e.target.insertAdjacentHTML('afterend', html);
    }
    isCreate.value = false;
    const cancelBtn = document.querySelector('.cancel-btn');
    const publishBtn = document.querySelector('.publish-btn')
    const commentText: HTMLTextAreaElement | null = document.querySelector(".comment-text") as HTMLTextAreaElement;
    cancelBtn?.addEventListener('click', () => {
        const formElement = cancelBtn?.parentElement;
        formElement?.remove();
        isCreate.value = true;
    });
    publishBtn?.addEventListener('click', async () => {
        if (commentText?.value == '') {
            return ElMessage({
                message: '内容不允许为空',
                type: "error",
                offset: 180,
            });
        }
        if (avatarUrl.value == 'undefined') {
            avatarUrl.value = defaultAvatar
        }
        const results = await reqComment(commentText?.value, '1', avatarUrl.value, userNickName2.value, articleCoverId.value, e.target.dataset.id, e.target.dataset.nickname)
        if (results.status == 0) {
            ElMessage({
                message: '发表成功！',
                type: 'success',
                offset: 180
            })
            // 更新数据 
            userComments.value = results.data;
            isComment.value = true;
            const formElement = cancelBtn?.parentElement;
            formElement?.remove();
            isCreate.value = true;
        }
    })
};
onMounted(() => {
    if ($route.query.id) {
        localStorage.setItem('articleId', $route.query.id as string)
    }
    if (localStorage.getItem('articleId')) {
        articleId.value = localStorage.getItem('articleId')
    }
    if (localStorage.getItem("user_pic")) {
        avatarUrl.value = localStorage.getItem("user_pic") as string
    }
    if ($route.query.articleId) {
        articleCoverId.value = $route.query.articleId
    }
    if (localStorage.getItem("nickname")) {
        userNickName2.value = localStorage.getItem("nickname")
    }
    // 获取所有评论
    getComments()
    getArticleData()
})
</script>
<template>
    <div class="container">
        <GoBack content="文章详情" width="86%"></GoBack>
        <!-- 主体内容 -->
        <div class="main">
            <!-- 左边内容 -->
            <div class="main_left">
                <div
                    style="background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);width: 100%;padding: 20px;display:flex;box-sizing: border-box;">
                    <!-- 用户头像 -->
                    <div style="width: 80px;height: 80px;">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                            v-if="articleData.cover == ''"></el-avatar>
                        <el-avatar v-if="articleData.cover != ''" :src="articleData.cover"></el-avatar>
                    </div>
                    <!-- 用户姓名 -->
                    <div class="top_content">
                        <h1 class="top_h1" v-if="articleData">用户昵称：{{ articleData.nickname }}</h1>
                    </div>
                </div>
                <!-- 左边发布博文背景 -->
                <div class="main_bg" @click="goIssue"></div>
            </div>
            <!-- 右边文章列表 -->
            <div class="main_right" v-if="articleData">
                <!-- 文章标题 -->
                <h1>{{ articleData.title }}</h1>
                <div></div>
                <!-- 文章内容 -->
                <p v-html="articleData.content" id="printData"></p>
                <!-- 文章类型 -->
                <span>文章类型：{{ articleData.type }}</span><br>
                <!-- 发布日期 -->
                <span>发布日期：{{ articleData.time }}</span>
                <!-- 分割线 -->
                <span class="hr"></span>
                <!-- 导出为pdf格式 -->
                <el-button @click="downloadPDF">将内容存储为pdf格式</el-button>
                <!-- 分割线 -->
                <span class="hr"></span>
                <!-- 评论 -->
                <div class="comment">
                    <el-form label-width="80px" :model="formLabelAlign">
                        <!-- 评论内容 -->
                        <el-form-item label="评论内容">
                            <el-input type="textarea" v-model.trim="formLabelAlign.alias"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <!-- 发表评论 -->
                            <el-button type="primary" @click="publish">发表</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 分割线 -->
                <span class="hr"></span>
                <!-- 展示评论 -->
                <div class="show_comments">
                    <div v-for="item in userComments" :key="item.id" v-if="isComment">
                        <div v-if="item.commentId == articleCoverId && item.isReply == 0">
                            <div class="demo-type" style="display: flex;">
                                <div>
                                    <el-avatar :src="item.avatarUrl" />
                                </div>
                                <div style="margin-left: 10px;font-size: 14px;">
                                    {{ item.nickname }}
                                </div>
                                <div style="font-size: 12px;color: #111;margin-left: 10px;margin-top: 4px;">
                                    {{ item.time }}
                                </div>
                            </div>
                            <div style="margin-left: 50px;transform: translateY(-20px);">
                                {{ item.alias }}
                            </div>
                            <div @click="addFormElement" class="reply" :data-id="item.id"
                                v-if="item.nickname != userNickName2" :data-nickname="item.nickname">回复</div>
                            <!-- 回复评论展示 -->
                            <div v-for="item2 in userComments" :key="item2.id" v-if="isComment" style="margin-left: 50px;">
                                <div
                                    v-if="item2.commentId == articleCoverId && item2.isReply == 1 && item.id == item2.userCommentId">
                                    <div class="demo-type" style="display: flex;">
                                        <div>
                                            <el-avatar :src="item2.avatarUrl" />
                                        </div>
                                        <div style="margin-left: 10px;font-size: 14px;">
                                            <span style="color: green;">{{ item2.nickname
                                            }}</span>&nbsp;&nbsp;回复&nbsp;&nbsp;<span style="color: salmon;">{{
    item2.otherUserNames == null ? item.nickname : item2.otherUserNames
}}</span>
                                        </div>
                                        <div style="font-size: 12px;color: #111;margin-left: 10px;margin-top: 4px;">
                                            {{ item2.time }}
                                        </div>
                                    </div>
                                    <div style="margin-left: 50px; transform: translateY(-20px);">
                                        {{ item2.alias }}
                                    </div>

                                    <div @click="addFormElement" class="reply" :data-id="item.id"
                                        v-if="item2.nickname != userNickName2" :data-nickname="item2.nickname">回复</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
// 容器
.container {
    width: 100%;
    margin-top: 100px;

    // 主体
    .main {
        width: 86%;
        display: flex;
        justify-content: space-between;
        margin: 20px auto;
        opacity: .8;

        .main_left {
            flex: 0.34;

            // 个人头像
            .el-avatar {
                width: 100px;
                height: 100px;
                border: 2px solid #ccc;
            }

            // 个人头像
            .el-avatar {
                width: 80px;
                height: 80px;
                border: 2px solid #ccc;
            }

            // 用户姓名
            .top_h1 {
                margin-left: 20px;
                margin-top: 10px;
                font-size: 20px;
            }

            // 左边发布博文背景
            .main_bg {
                background-color: #fff;
                width: 100%;
                padding: 20px;
                display: flex;
                box-sizing: border-box;
                margin-top: 20px;
                background: url(./images/bg_post.png) no-repeat;
                background-size: cover;
                height: 200px;
                cursor: pointer;
                transition: all .3s;
            }

            .main_bg:hover {
                box-shadow: 4px 8px 8px rgba(0, 0, 0, .3);
            }
        }

        // 右边文章列表
        .main_right {
            padding: 20px;
            flex: 0.65;
            border: 1px solid #ccc;
            box-sizing: border-box;

            // 回复
            .reply {
                display: inline-block;
                transform: translateY(-20px);
                margin-left: 8px;
                font-size: 14px;
                cursor: pointer;
            }

            h1 {
                font-size: 30px;
                margin: 10px 0;
            }

            p {
                margin: 10px 0;
                font-size: 20px;
            }

            span {
                font-size: 14px;
            }

            // 分割线
            .hr {
                display: block;
                width: 100%;
                height: 1px;
                background-color: #ccc;
                margin: 10px auto;
            }

            // 展示评论
        }
    }
}

// 响应式 1500px
@media screen and (max-width: 1500px) {

    // 主体
    .main {
        width: 1200px !important;
    }
}

// 1300px
@media screen and (max-width: 1300px) {

    // 主体
    .main {
        width: 1050px !important;
    }
}

// 1100px
@media screen and (max-width: 1100px) {

    // 主体
    .main {
        display: block !important;
        width: 900px !important;
    }

    // 发布博文
    .main_bg {
        display: none !important;
    }

    // 文章详情
    .main_right {
        margin-top: 20px;
    }
}

// 996px
@media screen and (max-width: 996px) {

    // 主体
    .main {
        width: 700px !important;
    }

    // 返回上一级
    .go_back {
        display: none;
    }
}

// 768px
@media screen and (max-width: 768px) {

    // 主体
    .main {
        width: 100vw !important;
    }

    .main_left {
        width: 100vw;
    }

    .main_right {
        width: 100vw;
    }
}
</style>