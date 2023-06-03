<template>
    <t-card :title="title" header-bordered class="t_card_main">
        <template>
            <t-card :title="title" hover-shadow class="t_card_box">
                <t-list size="large">
                    <t-list-item>昵称 : {{ user_info.nick_name }}</t-list-item>
                    <t-list-item>账号 : {{ user_info.account }}</t-list-item>
                </t-list>
                <t-button variant="outline" theme="danger" class="logout_btn" @click="logout_visible = true">退出登录</t-button>
                <logout :visible.sync="logout_visible" @onCloseDialogLogout="onCloseDialogLogout" />
                <template #actions>
                    <t-link theme="primary" href="javascript:void(0)" target="_self" @click="update_visible = true">
                        <edit1-icon slot="prefix-icon"></edit1-icon>
                        修改密码
                    </t-link>
                    <update-password :visible.sync="update_visible" @onCloseDialogPwd="onCloseDialogPwd" />
                </template>
            </t-card>
        </template>
    </t-card>
</template>

<script>

import { Edit1Icon } from 'tdesign-icons-vue'
import UpdatePassword from '@/components/dialog/UpdatePassword.vue'
import Logout from '@/components/dialog/Logout.vue'

export default {
    name: 'Mine',
    components: {
        Edit1Icon,
        UpdatePassword,
        Logout,
    },
    data() {
        return {
            title: '我的信息',
            update_visible: false,
            logout_visible: false,
            user_info: {
                nick_name: '------',
                account: '------',

            },
            logout_visible: false,
        }
    },

    mounted() {
        this.getInfo()
    },

    methods: {

        // 获取用户信息
        async getInfo() {
            try {
                // 发送获取教室状态的请求
                const res = await this.$http.post("findStudentById", {
                    sid: sessionStorage.user_id
                });
                this.user_info['nick_name'] = res.data.sname;
                this.user_info['account'] = res.data.account;
            } catch (error) {
                console.log(error);
                this.$message.error('获取教室状态失败，请稍后重试！');
            }
        },


        onCloseDialogPwd(update_visible) {
            this.update_visible = update_visible;
        },

        onCloseDialogLogout(logout_visible) {
            this.logout_visible = logout_visible;
        },
    }
};
</script>

<style lang="less" scoped>
.t_card_main {
    height: 100%;
}

a {
    text-decoration: none;
}

.logout_btn {
    margin-top: 50px;
    align-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.t_card_box {
    width: 100%;
    height: 100%;
}
</style>