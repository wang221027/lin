<script lang="ts" setup>
import { onMounted, ref, reactive, computed } from 'vue';
import { updateUserInfo, getUserInfo, reqUserList } from "@/api/PersonalCenter"
import { useRouter } from 'vue-router';
const $router = useRouter();
import { ElMessage } from 'element-plus';
import { Edit, ChromeFilled } from '@element-plus/icons-vue'
import { reqBrowseArticle } from '@/api/ArticleHome';
import $bus from "@/utils/event-bus"
let userInfoData: any = ref([])
let isShow = ref(false)
const form = reactive({
    nickname: '',
    info: '',
    radio: '男'
})
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
// 获取用户信息
const getUserInfoData = async () => {
    const result = await getUserInfo(localStorage.getItem("username") as string)
    if (result.status === 200) {
        userInfoData.value = result.data;
        form.nickname = result.data[0].nickname;
        form.info = result.data[0].brief_introduction;
        form.radio = result.data[0].gender || '男';
        isShow.value = true;
    }
}
// 更新用户资料
const updateInfo = async () => {
    let username = localStorage.getItem("username") as string;
    let user_id = localStorage.getItem("user_id") as string;
    const result = await updateUserInfo(form.nickname, form.info, form.radio, username, user_id)
    if (result.status === 500) {
        return ElMessage.error('昵称已存在！')
    }
    if (result.status === 200) {
        localStorage.setItem("nickname", form.nickname)
        getUserInfoData()
        ElMessage.success('修改成功')
        dialogFormVisible.value = false
    }
}
const userList: any = ref([])
// 获取用户文章列表
const getUserList = async () => {
    let nickname = localStorage.getItem("nickname") as string;
    const result = await reqUserList(nickname)
    if (result.status === 200) {
        userList.value = result.data;
        articleSort(1)
    }
}
// 过滤出用户文章浏览量
const articleLook = computed(() => {
    let result: number = 0;
    if (userList.value.length === 0) {
        result = 0;
    } else {
        userList.value.forEach((item: any) => {
            if (item.browse_list && item.browse_list.length > 0) {
                result += item.browse_list.length;
            }
        })
    }
    return result;
})
// 过滤出用户文章点赞量
const articleLike = computed(() => {
    let result: number = 0;
    if (userList.value.length === 0) {
        result = 0;
    } else {
        userList.value.forEach((item: any) => {
            if (item.likeList && item.likeList.length > 0) {
                result += item.likeList.length;
            }
        })
    }
    return result;
})
// 过滤出用户文章总数
const userListLength = computed(() => {
    let result: number = 0;
    userList.value.length > 0 ? result = userList.value.length : result = 0;
    return result;
})
// 文章排序
let isNum = ref(0)
let isArticleShow = ref(false)
const articleSort = (num: number) => {
    isNum.value = num;
    if (num === 1) {
        userList.value.sort((a: any, b: any) => {
            return Number(b.id) - Number(a.id);
        });
    }
    if (num === 2) {
        userList.value.forEach((element: any) => {
            if (!element.browse_list) {
                element.browse_list = [];
            }
        });
        userList.value.sort((a: any, b: any) => {
            return b.browse_list.length - a.browse_list.length; // 按照降序排序
        });
    }
    if (num === 3) {
        userList.value.forEach((element: any) => {
            if (!element.likeList) {
                element.likeList = [];
            }
        });
        userList.value.sort((a: any, b: any) => {
            return b.likeList.length - a.likeList.length; // 按照降序排序
        });
    }
    userList.value.forEach((element: any) => {
        element.content = element.content.replace(/<[^>]+>/g, "");
    });
    isArticleShow.value = true
}
// 过滤出用户文章点赞量
const computedLike = computed(() => (item: any) => {
    item = item ? item : [];
    return item.length;
})
// 过滤出用户文章浏览量
const computedBrowse = computed(() => (item: any) => {
    item = item ? item : [];
    return item.length;
})
// 点击标题跳转至文章详情页且让浏览数量增加
const goArticleCover = async (id: number) => {
    const nickname = localStorage.getItem("nickname") as string;
    if (nickname) {
        await reqBrowseArticle(id, nickname)
    }
    $router.push({ name: 'articleCover', query: { articleId: id } })

}
// 退出登录
const quit = () => {
    $bus.emit("quit")
}
onMounted(() => {
    //获取用户信息
    getUserInfoData()
    //获取用户文章列表
    getUserList()
})
</script>
<template>
    <el-dialog v-model="dialogFormVisible" title="编辑资料" width="600" v-if="isShow">
        <el-form :model="form">
            <el-form-item label="昵称：" :label-width="formLabelWidth">
                <el-input v-model="form.nickname" autocomplete="off" />
            </el-form-item>
            <el-form-item label="性别：" :label-width="formLabelWidth">
                <div class="mb-2 flex items-center text-sm">
                    <el-radio-group v-model="form.radio" class="ml-4">
                        <el-radio value="男" size="large">男</el-radio>
                        <el-radio value="女" size="large">女</el-radio>
                    </el-radio-group>
                </div>
            </el-form-item>
            <el-form-item label="简介：" :label-width="formLabelWidth">
                <el-input v-model="form.info" style="width: 100%" :rows="4" type="textarea" placeholder="请尽情的描述自己吧！" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="updateInfo">
                    修改
                </el-button>
            </div>
        </template>
    </el-dialog>
    <section class="container">
        <div class="container_box">
            <div class="container_box_top">
                <div style="display: flex;" v-if="isShow">
                    <div class="container_box_top_pic"
                        :style="{ backgroundImage: userInfoData[0].user_pic ? `url(${userInfoData[0].user_pic})` : 'url(https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png)' }">
                    </div>
                    <div class="container_box_top_content">
                        <div style="display: flex;">
                            <User style="width: 20px;margin-right: 2px;" />
                            <p style="margin-right: 10px;">{{ userInfoData[0].nickname }}</p>
                            <span>性别:{{ userInfoData[0].gender || '未知' }}</span>
                        </div>
                        <div class="content_info">
                            个人简介：{{ userInfoData[0].brief_introduction || '您还没有设置个人简介~' }}
                        </div>
                    </div>
                </div>
                <div>
                    <el-button type="primary" round @click="dialogFormVisible = true;" :icon="Edit">编辑资料</el-button>
                    <el-button type="success" round :icon="ChromeFilled" @click="quit">退出登录</el-button>
                </div>
            </div>
            <div class="container_box_bar">
                <div class="container_box_left">
                    <div class="container_box_left_top">
                        <h2>原力等级</h2>
                        <el-divider />
                        <div class="container_box_left_top_box">
                            <div style="display: flex;justify-content: center;">
                                <div>当前等级<p>0</p>
                                </div>
                                <div>当前总分<p>10</p>
                                </div>
                                <div>当月<p>{{ userListLength }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container_box_left_bottom">
                        <h2>个人成就</h2>
                        <el-divider />
                        <div>
                            <p style="display: flex;align-items: center;">
                                <Star style="width: 18px;margin-right: 4px;color: red;" />获得 {{ articleLike }} 次点赞
                            </p>
                            <p style="display: flex;align-items: center;">
                                <TrophyBase style="width: 18px;margin-right: 4px;color: red;"></TrophyBase>内容获得 {{
                                    articleLook }} 次浏览
                            </p>
                            <p style="display: flex;align-items: center;">
                                <Flag style="width: 18px;margin-right: 4px;color: red;"></Flag>一共发布 {{ userListLength }} 篇文章
                            </p>
                        </div>
                    </div>
                </div>
                <el-empty :image-size="200" class="container_box_right" v-if="!userList || userList.length === 0" />
                <div class="container_box_right" v-if="userList && userList.length > 0">
                    <!-- 排序 -->
                    <div class="container_box_right_top">
                        <p :style="{ color: isNum === 1 ? 'red' : '' }" @click="articleSort(1)">
                            按最新时间排序<Sort style="width: 16px;margin-left: 2px;"></Sort>
                        </p>
                        <p :style="{ color: isNum === 2 ? 'red' : '' }" @click="articleSort(2)">
                            按访问量排序<Sort style="width: 16px;margin-left: 2px;"></Sort>
                        </p>
                        <p :style="{ color: isNum === 3 ? 'red' : '' }" @click="articleSort(3)">
                            按点赞量排序<Sort style="width: 16px;margin-left: 2px;"></Sort>
                        </p>
                    </div>
                    <!-- 文章列表 -->
                    <div class="container_box_right_content" v-if="isArticleShow">
                        <div class="container_box_right_content_box" v-for="item in userList" :key="item.id">
                            <div class="container_box_right_content_left" v-if="item.cover"
                                :style="{ backgroundImage: item.cover ? `url(${item.cover})` : 'none' }"></div>
                            <div class="container_box_right_content_right" :style="{ flex: item.cover ? .72 : 1 }">
                                <h3 @click="goArticleCover(item.id)">{{ item.title }}</h3>
                                <p @click="goArticleCover(item.id)" class="container_box_right_content_right_content">{{
                                    item.content }}</p>
                                <div>
                                    <span>{{ item.type }}</span>
                                    <p>发布博客:{{ item.time }}</p>
                                    <p>浏览:{{ computedBrowse(item.browse_list) }}</p>
                                    <p>点赞:{{ computedLike(item.likeList) }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer></Footer>
</template>
<style scoped lang='scss'>
.container {
    width: 100%;
    background-color: #f3f4f6;
    padding-top: 40px;
    min-height: calc(100vh - 60px);
    padding-bottom: 30px;
    margin-top: 60px;

    &_box {
        width: 90%;
        margin: 0 auto;
        position: relative;

        // 顶部信息
        &_top {
            background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
            display: flex;
            justify-content: space-between;
            padding: 10px 20px;
            padding-bottom: 30px;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            transition: all .3s;

            &_pic {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background-position: center;
                background-size: cover;
            }

            &_content {
                margin-left: 20px;

                .content_info {
                    color: #555666;
                }

                div {
                    margin-top: 14px;
                }
            }
        }

        &_top:hover {
            box-shadow: 0 5px 6px rgba(0, 0, 0, .22), 2px 2px 8px rgba(0, 0, 0, .04);
        }

        // 内容
        .container_box_bar {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;

            .container_box_left {
                flex: .3;

                &_top {
                    padding: 10px;
                    background-color: #fff;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

                    h2 {
                        font-size: 20px;
                        margin-left: 30px;
                        background: -webkit-linear-gradient(135deg,
                                #55ebac,
                                #ff6ac6 25%,
                                #51c4e1 50%,
                                #e6d205 55%,
                                #7ad3e3 60%,
                                #a65ee4 80%,
                                #ff6384 95%,
                                #2ae7c1);
                        /* 文字颜色填充设置为透明 */
                        -webkit-text-fill-color: transparent;
                        /* 背景裁剪，即让文字使用背景色 */
                        background-clip: text;
                        /* 背景图放大一下，看着柔和一些 */
                        background-size: 200% 100%;
                        /* 应用动画flowCss 12秒速度 无限循环 线性匀速动画*/
                        animation: flowCss 12s infinite linear;
                    }

                    &_box {
                        div {
                            div {
                                margin: 0 10px;
                                text-align: center;

                                p {
                                    margin-top: 4px;
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
                            }
                        }
                    }
                }

                .container_box_left_bottom {
                    padding: 10px;
                    margin-top: 20px;
                    background-color: #fff;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

                    h2 {
                        font-size: 20px;
                        margin-left: 30px;
                        background: -webkit-linear-gradient(135deg,
                                #55ebac,
                                #ff6ac6 25%,
                                #51c4e1 50%,
                                #e6d205 55%,
                                #7ad3e3 60%,
                                #a65ee4 80%,
                                #ff6384 95%,
                                #2ae7c1);
                        /* 文字颜色填充设置为透明 */
                        -webkit-text-fill-color: transparent;
                        /* 背景裁剪，即让文字使用背景色 */
                        background-clip: text;
                        /* 背景图放大一下，看着柔和一些 */
                        background-size: 200% 100%;
                        /* 应用动画flowCss 12秒速度 无限循环 线性匀速动画*/
                        animation: flowCss 12s infinite linear;
                    }

                    div {
                        display: flex;
                        flex-wrap: wrap;

                        p {
                            width: 100%;
                            margin: 6px 0;
                            margin-left: 30px;
                            padding-bottom: 10px;
                            font-size: 18px;
                            background: -webkit-linear-gradient(135deg,
                                    #55ebac,
                                    #ff6ac6 25%,
                                    #51c4e1 50%,
                                    #e6d205 55%,
                                    #7ad3e3 60%,
                                    #a65ee4 80%,
                                    #ff6384 95%,
                                    #2ae7c1);
                            /* 文字颜色填充设置为透明 */
                            -webkit-text-fill-color: transparent;
                            /* 背景裁剪，即让文字使用背景色 */
                            background-clip: text;
                            /* 背景图放大一下，看着柔和一些 */
                            background-size: 200% 100%;
                            /* 应用动画flowCss 12秒速度 无限循环 线性匀速动画*/
                            animation: flowCss 12s infinite linear;
                        }
                    }
                }
            }

            .container_box_right {
                flex: .68;
                background-color: #fff;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

                &_top {
                    display: flex;
                    border-bottom: 1px solid #ccc;
                    height: 30px;
                    padding-bottom: 10px;

                    p {
                        margin: 0 8px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        font-size: 16px;
                    }
                }

                &_content {
                    &_box {
                        margin: 8px 0;
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #ccc;
                        padding-bottom: 10px;
                        height: 120px;
                        align-items: center;
                    }

                    &_left {
                        flex: .26;
                        width: 180px;
                        height: 120px;
                        overflow: hidden;
                        background-position: center;
                        background-size: cover;
                        height: 90px;
                    }

                    &_right {

                        h3 {
                            display: inline-block;
                            font-size: 16px;
                            font-weight: 550;
                            cursor: pointer;
                        }

                        h3:hover {
                            color: red;
                        }

                        p {
                            margin: 8px 0;
                            cursor: pointer;
                        }

                        &_content {
                            width: 600px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        div {
                            display: flex;
                            align-items: center;

                            p {
                                font-size: 14px;
                                margin: 0 6px;
                            }

                            span {
                                display: block;
                                padding: 4px 10px;
                                background-color: #fcebea;
                                color: #e65349;
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>