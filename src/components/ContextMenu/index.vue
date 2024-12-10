<template>
    <div>
        <div v-if="menuVisible" class="context-menu" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }"
            ref="contextMenu">
            <!-- 菜单项 -->
            <h3 style="color: #fff;text-align: center;margin: 10px 0;">我的菜单</h3>
            <ul>
                <li @click="handleMenuClick('个人中心')"><el-icon style="margin-right: 6px;">
                        <UserFilled />
                    </el-icon> 个人中心</li>
                <li @click="handleMenuClick('发布文章')"><el-icon style="margin-right: 6px;">
                        <EditPen />
                    </el-icon>发布文章</li>
                <li @click="handleMenuClick('聊天室')"><el-icon style="margin-right: 6px;">
                        <Comment />
                    </el-icon>聊天室</li>
                <li @click="handleMenuClick('回到首页')">
                    <el-icon style="margin-right: 6px;">
                        <HomeFilled />
                    </el-icon>回到首页
                </li>
                <li @click="handleMenuClick('刷新')">
                    <el-icon style="margin-right: 6px;">
                        <Loading />
                    </el-icon>刷新
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ElMessage } from 'element-plus';
const menuVisible = ref(false);
const menuTop = ref(0);
const menuLeft = ref(0)
const contextMenu: any = ref(null)
// 其他数据定义...
const openContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    const clientWidth = 220;
    const clientHeight = 260.67;
    const body = document.body;
    const documentWidth = body.offsetWidth
    const documentHeight = body.offsetHeight
    let menuX = event.pageX;
    let menuY = event.pageY;
    if (menuX + clientWidth > documentWidth) {
        menuX = documentWidth - clientWidth;
    }
    if (menuY + clientHeight > documentHeight) {
        menuY = documentHeight - clientHeight;
    }
    menuLeft.value = Math.max(0, menuX);
    menuTop.value = Math.max(0, menuY);
    menuVisible.value = true;
};
const handleMenuClick = (action: any) => {
    if (action == '个人中心' || action == '发布文章' || action == '聊天室') {
        if (!localStorage.getItem('token')) {
            return ElMessage.warning('请先登录');
        } else {
            if (action == '发布文章') {
                window.location.href = '/publishArticle';
            } else if (action == '聊天室') {
                window.location.href = '/ChatRoom/message';
            } else if (action == '个人中心') {
                window.location.href = '/PersonalCenter';
            }
        }
    } else if (action == '回到首页') {
        window.location.href = '/home';
    } else if (action == '刷新') {
        window.location.reload();
    }
    // 处理菜单项点击事件
    menuVisible.value = false;
}
const closeContextMenu = () => {
    menuVisible.value = false;
}
onMounted(() => {
    window.addEventListener('contextmenu', openContextMenu);
    document.addEventListener('click', closeContextMenu);
})
onUnmounted(() => {
    window.removeEventListener('contextmenu', openContextMenu);
    document.removeEventListener('click', closeContextMenu);
})
</script>
   
<style>
.context-menu {
    width: 220px;
    position: absolute;
    background-color: #040404;
    border-radius: 12px;
    border: 2px solid #4b5563;
    padding: 2px;
    box-sizing: border-box;
    z-index: 9999;
}

.context-menu:hover {
    border: 2px solid #ca8a04;
}

.context-menu ul {
    list-style: none;
    padding: 4px 8px;
    margin: 0;
}

.context-menu li {
    cursor: pointer;
    color: #fff;
    transition: all .3s;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    display: flex;
    align-items: center;
}

.context-menu li:hover {
    background-color: #2563eb;
    border-radius: 8px;
}
</style>