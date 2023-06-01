<template>
    <t-dialog theme="warning" header="修改密码" body="对话框内容" cancelBtn="取消" confirmBtn="修改" v-show="local_update_visible"
        :onClose="onCloseDialogPwd" :onConfirm="UpdatePassword">
        <t-space style="width: 380px">
            <t-form :data="UPDATE_PASSWORD_FORM" :rules="update_password_rules" ref="update_password_form" :colon="true"
                :labelWidth="0">
                <t-form-item name="old_password">
                    <t-input size="large" type="password" clearable v-model="UPDATE_PASSWORD_FORM.old_password"
                        placeholder="请输入新密码" autocomplete="off">
                        <lock-on-icon slot="prefix-icon"></lock-on-icon>
                    </t-input>
                </t-form-item>
                <t-form-item name="password">
                    <t-input size="large" type="password" clearable v-model="UPDATE_PASSWORD_FORM.password"
                        placeholder="请输入新密码" autocomplete="off">
                        <lock-on-icon slot="prefix-icon"></lock-on-icon>
                    </t-input>
                </t-form-item>
                <t-form-item name="confirm_password">
                    <t-input size="large" type="password" clearable v-model="UPDATE_PASSWORD_FORM.confirm_password"
                        placeholder="请确认新密码" autocomplete="off">
                        <lock-on-icon slot="prefix-icon"></lock-on-icon>
                    </t-input>
                </t-form-item>
            </t-form>
        </t-space>
    </t-dialog>
</template>

<script>
import { Icon, DesktopIcon, LockOnIcon, MailIcon, UserIcon, ImageIcon } from 'tdesign-icons-vue'

export default {
    name: 'UpdatePassword',

    components: {
        Icon,
        DesktopIcon,
        LockOnIcon,
        MailIcon,
        UserIcon,
        ImageIcon,
    },

    props: {
        visible: Boolean
    },

    data() {
        return {
            // 修改密码表单数据
            UPDATE_PASSWORD_FORM: {
                old_password: '',
                password: '',
                confirm_password: '',
            },

            local_update_visible: false,

            // 表单验证数据
            update_password_rules: {
                old_password: [
                    { required: true, message: '密码必填', type: 'error', trigger: 'blur', },
                    { len: 6, message: '请输入 6 位密码', type: 'warning', trigger: 'blur', },
                ],
                password: [
                    { required: true, message: '密码必填', type: 'error', trigger: 'blur', },
                    { len: 6, message: '请输入 6 位密码', type: 'warning', trigger: 'blur', },
                ],
                confirm_password: [
                    { required: true, message: '确认密码必填', type: 'error', trigger: 'blur', },
                    { validator: this.rePassword, message: '两次密码不一致', trigger: 'blur', }
                ],
            },
        }
    },

    methods: {

        onCloseDialogPwd() {
            this.local_update_visible = false;
            this.$emit('onCloseDialogPwd', false);
        },

        // 修改密码
        async UpdatePassword({ validateResult, firstError }) {
            if (validateResult === true) {
                const { data: res } = await this.$http.post("", {
                    // username: LOGIN.account,
                    // password: LOGIN.password,
                });
                if (res.meta.status === 400) {

                } else if (res.meta.status === 200) {
                    // 修改成功,关闭窗口
                    this.onCloseDialogPwd();
                }
            } else {
                console.log('Errors: ', validateResult);
                this.$message.warning(firstError);
            }
        },

        // 自定义异步校验器
        rePassword(val) {
            if (this.UPDATE_PASSWORD_FORM.password !== this.UPDATE_PASSWORD_FORM.confirm_password) {
                return { result: false, message: '两次密码不一致', type: 'error' };
            }

            if (this.UPDATE_PASSWORD_FORM.old_password !== this.UPDATE_PASSWORD_FORM.password) {
                return { result: false, message: '原密码与新密码不能相同', type: 'error' };
            }

            return { result: true, message: '', type: 'success' };
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