<template>
    <t-dialog theme="warning" header="修改密码" body="对话框内容" :cancelBtn="null" :confirmBtn="null" v-show="local_update_visible"
        :onClose="onCloseDialogPwd">
        <t-space style="width: 400px">
            <t-form :data="UPDATE_PASSWORD_FORM" :rules="update_password_rules" ref="update_password_form" :colon="true"
                :labelWidth="0" @submit="UpdatePassword">

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
                <t-form-item>
                    <t-space size="20px">
                        <t-button theme="default" variant="base" size="large" type="reset" style="width:190px">重置</t-button>
                        <t-button size="large" theme="primary" type="submit" block style="width:190px">修改</t-button>
                    </t-space>
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
            old_password_validate_result: 1,

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
                await this.$http.post("/updateStudent", {
                    oldPassword: this.$md5(this.UPDATE_PASSWORD_FORM.old_password),
                    newPassword: this.$md5(this.UPDATE_PASSWORD_FORM.password),
                    reassurePassword: this.$md5(this.UPDATE_PASSWORD_FORM.confirm_password),
                    sid: sessionStorage.user_id,
                })
                    .then(res => {
                        // 请求成功
                        if (res.data === 1) {
                            this.$message.success("修改成功！请重新登录");
                            sessionStorage.clear()
                            this.$router.replace('/index')
                        } else if (res.data === 0) {
                            this.$message.error("修改失败！");
                        } else {
                            this.$message.error("原密码错误！");
                        }
                    })
                    .catch(error => {
                        // 请求失败的处理
                        console.log(error)
                        that.$message.error("修改密码失败！请重试");
                        that.$router.push('/403')
                    });
            } else {
                // 表单验证失败的处理
                console.log('Errors: ', validateResult);
                this.$message.warning(firstError);
            }
        },

        // 自定义异步校验器
        rePassword(val) {
            if (this.UPDATE_PASSWORD_FORM.password !== this.UPDATE_PASSWORD_FORM.confirm_password) {
                return { result: false, message: '两次密码不一致', type: 'error' };
            }

            if (this.UPDATE_PASSWORD_FORM.old_password === this.UPDATE_PASSWORD_FORM.password) {
                return { result: false, message: '原密码与新密码不能相同', type: 'error' };
            }

            return { result: true, message: '', type: 'success' };
        },
    },

    watch: {
        visible(news, olds) {
            this.local_update_visible = news
        },
    },
}
</script>

<style></style>