<template>
    <t-space style="width: 450px">
        <t-form :data="LOGIN" :rules="login_rules" ref="login_form" @submit="onLogin" :colon="true" :labelWidth="0"
            class="login_box">
            <t-form-item name="account">
                <t-input size="large" clearable v-model="LOGIN.account" placeholder="请输入账户名" autocomplete="off">
                    <desktop-icon slot="prefix-icon"></desktop-icon>
                </t-input>
            </t-form-item>
            <t-form-item name="password">
                <t-input size="large" type="password" clearable v-model="LOGIN.password" placeholder="请输入密码"
                    autocomplete="off">
                    <lock-on-icon slot="prefix-icon"></lock-on-icon>
                </t-input>
            </t-form-item>
            <t-form-item name="validate_code">
                <t-input size="large" clearable v-model="LOGIN.validate_code" placeholder="请输入验证码" autocomplete="off"
                    class="t_input_validate_code">
                    <image-icon slot="prefix-icon"></image-icon>
                </t-input>
                <t-image :src="validate_image" fit="cover" class="t_validate_image" shape="round" />
            </t-form-item>
            <t-form-item>
                <t-button :loading="is_loading" size="large" theme="primary" type="submit" block>登录</t-button>
            </t-form-item>
        </t-form>
    </t-space>
</template>

<script>
import { Icon, DesktopIcon, LockOnIcon, MailIcon, UserIcon, ImageIcon } from 'tdesign-icons-vue';

export default {
    name: 'Login',

    props: {
        isDark: Boolean,
    },

    components: {
        Icon,
        DesktopIcon,
        LockOnIcon,
        MailIcon,
        UserIcon,
        ImageIcon,
    },
    data() {
        return {
            LOGIN: {
                account: '',
                password: '',
                validate_code: '',
            },
            is_loading: false,

            // 存储 token
            token: '',

            validate_image: 'https://tdesign.gtimg.com/demo/demo-image-1.png',

            // =========表单验证规则=========
            login_rules: {
                account: [
                    { required: true, message: '姓名必填', type: 'error', trigger: 'blur', },
                    { required: true, message: '姓名必填', type: 'error', trigger: 'blur', },
                    { whitespace: true, message: '姓名不能为空', trigger: 'blur', },
                    { min: 2, message: '至少需要两个字符，一个中文等于两个字符', type: 'warning', trigger: 'blur', },
                    { max: 10, message: '姓名字符长度超出', type: 'warning', trigger: 'blur', },
                ],
                password: [
                    { required: true, message: '密码必填', type: 'error', trigger: 'blur', },
                    { len: 6, message: '请输入 6 位密码', type: 'warning', trigger: 'blur', },
                ],
                validate_code: [{ required: true, message: '验证码必填', type: 'error', trigger: 'blur', },],
            },
        }
    },

    methods: {
        // 登录
        async onLogin({ validateResult, firstError }) {
            // =======================测试Start
            if (this.LOGIN.account === 'admin' && this.LOGIN.password === '123456' && this.LOGIN.validate_code === '1234') {
                // console.log(this.account);
                this.is_loading = true;
                this.token = '123';
                this.$message.success({ content: "登陆成功！" });
                // 登陆成功则跳转
                sessionStorage.isDark = this.isDark;
                // console.log(this.$md5(this.LOGIN.password));
                this.$router.push("/home");
            }
            // =======================测试End

            // if (validateResult === true) {
            //     const { data: res } = await this.$http.post("", {
            //         username: LOGIN.account,
            //         password: md5(LOGIN.password),
            //     });
            //     if (res.meta.status === 400) {
            //         this.$message.warning("用户名或密码错误！");
            //     } else if (res.meta.status === 200) {
            //         this.$message.success({ content: "登陆成功！", closeBtn: true });
            //         // 登陆成功则跳转
            //         this.is_loading = true;
            //         this.$router.push("/home");
            //     }
            // } else {
            //     console.log('Errors: ', validateResult);
            //     this.$message.warning(firstError);
            // }
        },
    }
}
</script>

<style lang="less" scoped>
.login_box {
    margin-top: 20px;
}

.t_input_validate_code {
    width: 380px;
}

.t_validate_image {
    width: 70px;
    height: 40px;
}
</style>