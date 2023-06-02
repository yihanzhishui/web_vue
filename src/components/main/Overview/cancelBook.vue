<template>
    <t-dialog theme="warning" header="警告" body="确定取消预约吗?" cancelBtn="取消" @confirm="onConfirm()"
        v-show="local_cancel_visible" :onClose="onCloseDialogCancel">

    </t-dialog>
</template>

<script>
export default {
    name: 'CancelBook',

    props: {
        visible: Boolean
    },

    data() {
        return {
            local_cancel_visible: false,
        }
    },

    methods: {
        onCloseDialogCancel() {
            this.local_cancel_visible = false;
            this.$emit('onCloseDialogCancel', false);
        },

        logout() {
            window.sessionStorage.clear();
            this.$router.push('/')
        },

        onConfirm() {
            this.$emit('confirm', true)
        }
    },

    watch: {
        visible(news, olds) {
            this.local_cancel_visible = news
        }
    },
}
</script>

<style></style>