<template>
    <t-card :title="title" header-bordered class="t_card_main">
        <template>
            <t-card :title="title" hover-shadow class="t_card_box">
                <t-list stripe>
                    <t-list-item>昵称 : {{ user_info.nick_name }}</t-list-item>
                    <t-list-item>邮箱 : {{ user_info.email }}</t-list-item>
                    <t-list-item>账号 : {{ user_info.account }}</t-list-item>
                </t-list>
                <t-button variant="outline" theme="danger" class="logout_btn" @click="logout_visible = true">退出登录</t-button>
                <template #actions>
                    <a href="javascript:void(0)" style="line-height: 24px">修改密码</a>
                    <t-dialog theme="danger" header="警告" body="确定退出吗?" :visible.sync="logout_visible" @confirm="logout()"
                        cancelBtn="取消" />
                </template>
            </t-card>
        </template>
    </t-card>
</template>

<script>

export default {
    data() {
        return {
            title: '我的信息',
            user_info: {
                nick_name: '一寒止水',
                email: '321xxxxxx@qq.com',
                account: '132456798',
            },
            logout_visible: false,
        }
    },

    methods: {
        logout() {
            window.sessionStorage.clear();
            this.$router.push('/')
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