<template >
    <t-layout class="t_layout_main">
        <t-header>
            <t-head-menu value="item1" height="120px">
                <img slot="logo" width="136" class="logo" src="https://www.tencent.com/img/index/menu_logo_hover.png"
                    alt="logo" />
                <template #operations>
                    <icon class="t-menu__operations-icon" name="logout" @click="logout_visible = true" />
                    <t-dialog theme="danger" header="警告" body="确定退出吗?" :visible.sync="logout_visible" @confirm="logout()"
                        cancelBtn="取消" />
                </template>
            </t-head-menu>
        </t-header>
        <t-layout>
            <t-aside style="border-top: 1px solid var(--component-border)">
                <t-menu theme="light" defaultValue="home" class="t_menu" height="550px">
                    <router-link to="/overview" class="router_link">
                        <t-menu-item value="home">
                            <icon slot="icon" name="home" />首页
                        </t-menu-item>
                    </router-link>
                    <router-link to="/search" class="router_link">
                        <t-menu-item value="search">
                            <icon slot="icon" name="search" />查询
                        </t-menu-item>
                    </router-link>
                    <router-link to="/book" class="router_link">
                        <t-menu-item value="book" class="router_link">
                            <icon slot="icon" name="server" />预约
                        </t-menu-item>
                    </router-link>
                    <router-link to="/mine" class="router_link">
                        <t-menu-item value="mine">
                            <icon slot="icon" name="user-circle" />我的
                        </t-menu-item>
                    </router-link>
                </t-menu>
            </t-aside>
            <t-layout>
                <t-content>
                    <!-- 路由占位符 -->
                    <router-view></router-view>
                </t-content>
            </t-layout>
        </t-layout>
    </t-layout>
</template>

<script>

import { Icon } from 'tdesign-icons-vue';

export default {
    components: {
        Icon,
    },
    data() {
        return {
            logout_visible: false,
        }
    },
    methods: {
        logout() {
            window.sessionStorage.clear();
            this.$router.push('/')
        },
    }
}
</script>

<style lang="less" scoped>
.t_layout_main {
    height: 100%;
}

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
    margin-right: 50px;
    background-color: rgb(206, 204, 234);
}

.router_link {
    text-decoration: none;
}
</style>