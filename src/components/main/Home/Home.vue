<template>
    <t-layout class="t_layout_main">
        <t-header>
            <t-head-menu value="item1" height="120px">
                <img slot="logo" width="136" class="logo" src="https://tdesign.gtimg.com/site/baseLogo-light.png"
                    alt="logo" />
                <template #operations>
                    <t-switch size="large" defaultValue="true" v-model="theme_mode" style="margin-right:10px"
                        :onChange="changeThemeMode" :label="['暗', '明']">
                    </t-switch>
                    <icon class="t-menu__operations-icon" name="logout" @click="logout_visible = true" />
                    <logout :visible.sync="logout_visible" @onCloseDialogLogout="onCloseDialogLogout" />
                </template>
            </t-head-menu>
        </t-header>
        <t-layout>
            <t-aside class="home_aside">
                <t-menu theme="light" defaultValue="home" class="t_menu" height="550px" size="large">
                    <t-menu-item value="home" to="/overview" class="t_menu_item">
                        <icon slot="icon" name="home" />首页
                    </t-menu-item>
                    <t-menu-item value="search" to="/search" class="t_menu_item">
                        <icon slot="icon" name="search" />查询
                    </t-menu-item>
                    <t-menu-item value="book" to="/book" class="t_menu_item">
                        <icon slot="icon" name="server" />预约
                    </t-menu-item>
                    <t-menu-item value="mine" to="/mine" class="t_menu_item">
                        <icon slot="icon" name="user-circle" />我的
                    </t-menu-item>
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
import Logout from '@/components/main/Home/Logout.vue'

export default {
    components: {
        Icon,
        Logout,
    },
    data() {
        return {
            theme_mode: true,
            logout_visible: false,
        }
    },
    methods: {
        logout() {
            window.sessionStorage.clear();
            this.$router.push('/')
        },

        onCloseDialogLogout(logout_visible) {
            this.logout_visible = logout_visible;
        },

        // 切换暗色模式
        changeThemeMode() {
            // 设置暗色模式
            this.theme_mode === true ? document.documentElement.setAttribute('theme-mode', 'dark') : document.documentElement.removeAttribute('theme-mode');
        }
    }
}
</script>

<style lang="less" scoped>
.t_layout_main {
    height: 100%;
}

.t_menu {
    margin-right: 50px;
}

.home_aside {
    padding-top: 50px;
    border-top: 1px solid var(--component-border);
}
</style>