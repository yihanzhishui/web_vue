<template>
    <t-layout>
        <t-header height="90px" class="t_header">
            <t-avatar class="t_avatar" image="https://tdesign.gtimg.com/site/avatar.jpg" />
            <span class="system_name">XXX系统</span>
            <t-button theme="danger" shape="round" variant="base">填充按钮</t-button>
        </t-header>
        <t-layout class="layout_body">
            <t-aside width="250px" class="t_aside">
                <t-menu theme="light" defaultValue="index" class="t_menu">
                    <t-menu-item value="index">
                        <template #icon>
                            <icon name="home" />
                        </template>
                        首页
                    </t-menu-item>
                    <t-menu-item value="query">
                        <template #icon>
                            <icon name="search" />
                        </template>
                        查询
                    </t-menu-item>
                    <t-menu-item value="book">
                        <template #icon>
                            <icon name="server" />
                        </template>
                        预约
                    </t-menu-item>
                    <t-menu-item value="mine">
                        <template #icon>
                            <icon name="user-circle" />
                        </template>
                        我的
                    </t-menu-item>
                </t-menu>
            </t-aside>
            <t-content>Content</t-content>
        </t-layout>
    </t-layout>
</template>

<script>

import { Icon } from 'tdesign-icons-vue';

export default {
    components: {
        Icon,
    },
}
</script>

<style lang="less" scoped>
.t-avatar {
    width: 80px;
    height: 80px;
}

.system_name {
    margin-left: 20px;
    font-size: 30px;
    font-weight: bold;
}

.t_aside {
    height: 100%;
}

.t_header {
    background-color: skyblue;
    line-height: 90px;
}

.t_avatar {
    margin: 0;
    padding: 0;
}

.t_menu {
    margin-right: 40px;
    background-color: rgb(206, 204, 234);
}
</style>