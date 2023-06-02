<template>
    <t-space style="width: 450px">
        <t-form :data="REGISTER" :rules="register_rules" ref="register_form" @submit="onRegister" :colon="true"
            :labelWidth="0" class="login_box">
            <t-form-item name="account">
                <t-input size="large" clearable v-model="REGISTER.account" placeholder="请输入账户名" autocomplete="off">
                    <desktop-icon slot="prefix-icon"></desktop-icon>
                </t-input>
            </t-form-item>
            <t-form-item name="password">
                <t-input size="large" type="password" clearable v-model="REGISTER.password" placeholder="请输入密码"
                    autocomplete="off">
                    <lock-on-icon slot="prefix-icon"></lock-on-icon>
                </t-input>
            </t-form-item>
            <t-form-item name="confirm_password">
                <t-input size="large" type="password" clearable v-model="REGISTER.confirm_password" placeholder="请确认密码"
                    autocomplete="off">
                    <lock-on-icon slot="prefix-icon"></lock-on-icon>
                </t-input>
            </t-form-item>
            <t-form-item name="nick_name">
                <t-input size="large" clearable v-model="REGISTER.nick_name" placeholder="请输入姓名" autocomplete="off">
                    <user-icon slot="prefix-icon"></user-icon>
                </t-input>
            </t-form-item>
            <t-form-item>
                <t-space size="20px">
                    <t-button theme="default" variant="base" size="large" type="reset">重置</t-button>
                    <t-button :loading="is_loading" size="large" theme="primary" type="submit" block>注册</t-button>
                </t-space>
            </t-form-item>
        </t-form>
    </t-space>
</template>

<script>
import { Icon, DesktopIcon, LockOnIcon, MailIcon, UserIcon, ImageIcon } from 'tdesign-icons-vue';

export default {
    name: 'Register',
    components: {
        Icon,
        DesktopIcon,
        LockOnIcon,
        MailIcon,
        UserIcon,
        ImageIcon
    },

    data() {
        return {
            REGISTER: {
                account: '',
                password: '',
                confirm_password: '',
                nick_name: '',
            },
            is_loading: false,

            register_rules: {
                account: [
                    { required: true, message: '姓名必填', type: 'error', trigger: 'blur', },
                    { whitespace: true, message: '姓名不能为空', trigger: 'blur', },
                    { min: 2, message: '至少需要两个字符，一个中文等于两个字符', type: 'warning', trigger: 'blur', },
                    { max: 10, message: '姓名字符长度超出', type: 'warning', trigger: 'blur', },
                ],

                password: [
                    { required: true, message: '密码必填', type: 'error', trigger: 'blur', },
                    { len: 6, message: '请输入 6 位密码', type: 'warning', trigger: 'blur', },
                ],

                confirm_password: [
                    { required: true, message: '确认密码必填', type: 'error', trigger: 'blur', },
                    { validator: this.rePassword, message: '两次密码不一致', trigger: 'blur', }
                ],

                nick_name: [
                    { required: true, message: '昵称必填', trigger: 'blur', type: 'error', },
                    { min: 2, message: '至少需要两个字符，一个中文等于两个字符', type: 'warning', trigger: 'blur', },
                    { max: 10, message: '姓名字符长度超出', type: 'warning', trigger: 'blur', },
                ],
            },
        }
    },


    methods: {
        async onRegister({ validateResult, firstError }) {
            // 注册
            let that = this;
            if (validateResult === true) {
                this.is_loading = true;
                await this.$http.post("/register", {
                    account: this.REGISTER.account,
                    password: this.$md5(this.REGISTER.password),
                    sname: this.REGISTER.nick_name,
                })
                    .then(function (res) {
                        // 请求成功
                        if (res.status === 200) {
                            that.is_loading = true;
                            that.$message.success({ content: "注册成功, 请返回登录!" });
                            that.is_loading = false;
                        }
                    })
                    .catch(function (error) {
                        // 请求失败的处理
                        console.log(error)
                        that.$message.error({ content: "注册出现错误！请稍后重试！" });
                        that.$router.replace('/403')
                    });
            } else {
                console.log('Errors: ', validateResult);
                this.$message.warning(firstError);
            }
        },

        // 自定义异步校验器
        rePassword(val) {
            if (this.REGISTER.password !== this.REGISTER.confirm_password) {
                return { result: false, message: '两次密码不一致', type: 'error' };
            }
            return { result: true, message: '', type: 'success' };
        },
    },

}
</script>

<style lang="less" scoped>
.login_box {
    margin-top: 20px;
}
</style>