<template>
    <t-dialog theme="danger" header="警告" body="确定退出吗?" cancelBtn="取消" @confirm="logout()" v-show="local_update_visible"
        :onClose="onCloseDialogLogout">

    </t-dialog>
</template>

<script>
export default {
    name: 'Logout',

    props: {
        visible: Boolean
    },

    data() {
        return {
            local_update_visible: false,
        }
    },

    methods: {
        onCloseDialogLogout() {
            this.local_update_visible = false;
            this.$emit('onCloseDialogLogout', false);
        },

        logout() {
            window.sessionStorage.clear();
            this.$router.push('/')
        },
    },

    watch: {
        visible(news, olds) {
            this.local_update_visible = news
        }
    },
}
</script>

<style></style>