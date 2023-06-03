<template>
    <t-layout class="t_layout_main">
        <t-header>
            <t-head-menu value="item1" height="120px">
                <img slot="logo" width="136" class="img_logo"
                    src="https://github.com/yihanzhishui/PicGo/blob/main/logo.png?raw=true" alt="logo" />
                <template #operations>
                    <t-switch size="large" :defaultValue="isDark" v-model="isDark" style="margin-right:10px"
                        :onChange="changeThemeMode" :label="['夜间', '白天']">
                    </t-switch>
                    <icon class="t-menu__operations-icon" name="logout" @click="logout_visible = true" />
                    <logout :visible.sync="logout_visible" @onCloseDialogLogout="onCloseDialogLogout" />
                </template>
            </t-head-menu>
        </t-header>
        <t-layout>
            <t-aside class="home_aside">
                <t-menu theme="light" :defaultValue="menu_items[default_value]" class="t_menu" height="550px" size="large">
                    <t-menu-item value="map" to="/map" class="t_menu_item" @click="changeDefaultItem(0)">
                        <icon slot="icon" name="image" />地图
                    </t-menu-item>
                    <t-menu-item value="overview" to="/overview" class="t_menu_item" @click="changeDefaultItem(1)">
                        <icon slot="icon" name="home" />首页
                    </t-menu-item>
                    <t-menu-item value="search" to="/search" class="t_menu_item" @click="changeDefaultItem(2)">
                        <icon slot="icon" name="search" />查询
                    </t-menu-item>
                    <t-menu-item value="book" to="/book" class="t_menu_item" @click="changeDefaultItem(3)">
                        <icon slot="icon" name="server" />预约
                    </t-menu-item>
                    <t-menu-item value="mine" to="/mine" class="t_menu_item" @click="changeDefaultItem(4)">
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
import Logout from '@/components/dialog/Logout.vue'

export default {
    components: {
        Icon,
        Logout,
    },
    data() {
        return {
            isDark: sessionStorage.isDark === null ? true : sessionStorage.isDark,
            logout_visible: false,
            default_value: sessionStorage.defaultItem == null ? 0 : sessionStorage.defaultItem,
            menu_items: ['map', 'overview', 'search', 'book', 'mine'],
        }
    },


    methods: {
        onCloseDialogLogout(logout_visible) {
            this.logout_visible = logout_visible;
        },

        changeDefaultItem(item) {
            sessionStorage.defaultItem = item;
        },

        // 切换暗色模式
        changeThemeMode() {
            sessionStorage.isDark = this.isDark;
            // 设置暗色模式
            this.isDark === true ? document.documentElement.setAttribute('theme-mode', 'dark') : document.documentElement.removeAttribute('theme-mode');
        },

    },
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

.img_logo {
    margin-left: 10px;
    zoom: 200%
}
</style>