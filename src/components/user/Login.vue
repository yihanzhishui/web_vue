<template>
    <t-space style="width: 450px">
        <t-form :data="LOGIN" :rules="login_rules" ref="login_form" @submit="onLogin" :colon="true" :labelWidth="0"
            class="login_box" requiredMark>
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
                <div class="validate_code_box" @click="refresh_code_img()">
                    <t-image :src="validate_image" fit="cover" class="t_validate_image" shape="round" />
                </div>
            </t-form-item>
            <t-form-item>
                <t-space size="20px">
                    <t-button theme="default" variant="base" size="large" type="reset">重置</t-button>
                    <t-button :loading="is_loading" size="large" theme="primary" type="submit" block>登录</t-button>
                </t-space>
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
            validate_key: localStorage.validate_key,

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

    mounted() {
        // 组件被挂载时刷新验证码
        this.refresh_code_img();
    },

    methods: {
        // 登录
        async onLogin({ validateResult, firstError }) {
            // 表单验证
            if (validateResult === true) {
                this.is_loading = true;
                let that = this;
                await this.$http.post("login", {
                    account: this.LOGIN.account,
                    password: this.$md5(this.LOGIN.password), // 将密码加密
                    validateCode: this.LOGIN.validate_code,
                    validateKey: localStorage.validate_key,
                })
                    .then(function (res) {
                        // 请求成功
                        if (res.status === 200) {
                            if (res.data === '验证码错误' || res.data === '密码错误' || res.data === '用户未注册') {
                                that.refresh_code_img()
                                that.$message.error({ content: res.data });
                                that.is_loading = false;
                                return
                            }
                            that.$message.success({ content: "登录成功！" });
                            sessionStorage.user_id = res.headers.sid;
                            sessionStorage.token = res.headers.token;
                            sessionStorage.isDark = that.isDark; // 存储网页是否夜间模式
                            that.$router.push("/home");
                        }
                    })
                    .catch(function (error) {
                        // 请求失败的处理
                        that.$message.error({ content: "登陆出现错误！请稍后重试！" });
                        that.$router.replace('/403')
                    });
            } else {
                // 表单验证失败的处理
                console.log('Errors: ', validateResult);
                this.$message.warning(firstError);
            }
        },

        // 刷新验证码
        async refresh_code_img() {
            // 请求验证码
            let that = this;
            this.$http.get('/kaptcha')
                .then(res => {
                    // 更新验证码链接
                    that.validate_image = res.data.captcha;
                    // 存储validateKey
                    localStorage.validate_key = res.headers.validatekey;
                }).catch(error => {
                    that.$message.error('获取验证码出错！');
                    console.log(error)
                })
        },
    }
}
</script>

<style lang="less" scoped>
.login_box {
    margin-top: 20px;
}

.t_input_validate_code {
    width: 370px;
}

.t_validate_image {
    width: 80px;
    height: 40px;
}
</style>