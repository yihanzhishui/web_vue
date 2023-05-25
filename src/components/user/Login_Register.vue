<template>
	<t-space direction="vertical" class="main_box">
		<t-tabs :value="value" :theme="theme" @change="(newValue) => (value = newValue)">
			<t-tab-panel value="login">
				<template #label>
					<icon name="login" style="margin-right: 4px" /> 登录
				</template>
				<template>
					<t-space style="width: 250px">
						<t-form :data="LoginFormData" :rules="login_rules" ref="login_form" @submit="onLogin" :colon="true"
							:labelWidth="0" class="login_box">
							<t-form-item name="account">
								<t-input clearable v-model="LoginFormData.account" placeholder="请输入账户名" autocomplete="off">
									<desktop-icon slot="prefix-icon"></desktop-icon>
								</t-input>
							</t-form-item>
							<t-form-item name="password">
								<t-input type="password" clearable v-model="LoginFormData.password" placeholder="请输入密码"
									autocomplete="off">
									<lock-on-icon slot="prefix-icon"></lock-on-icon>
								</t-input>
							</t-form-item>
							<t-form-item>
								<t-button theme="primary" type="submit" block>登录</t-button>
							</t-form-item>
						</t-form>
					</t-space>
				</template>
			</t-tab-panel>
			<t-tab-panel value="register">
				<template #label>
					<icon name="user-add" style="margin-right: 4px" /> 注册
				</template>
				<template>
					<t-space style="width: 250px">
						<t-form :data="RegisterFormData" :rules="register_rules" ref="register_form" @submit="onRegister"
							:colon="true" :labelWidth="0" class="login_box">
							<t-form-item name="account">
								<t-input clearable v-model="RegisterFormData.account" placeholder="请输入账户名"
									autocomplete="off">
									<desktop-icon slot="prefix-icon"></desktop-icon>
								</t-input>
							</t-form-item>
							<t-form-item name="password">
								<t-input type="password" clearable v-model="RegisterFormData.password" placeholder="请输入密码"
									autocomplete="off">
									<lock-on-icon slot="prefix-icon"></lock-on-icon>
								</t-input>
							</t-form-item>
							<t-form-item name="confirm_password">
								<t-input type="password" clearable v-model="RegisterFormData.confirm_password"
									placeholder="请确认密码" autocomplete="off">
									<lock-on-icon slot="prefix-icon"></lock-on-icon>
								</t-input>
							</t-form-item>
							<t-form-item name="email">
								<t-input clearable v-model="RegisterFormData.mail" placeholder="请输入邮箱" autocomplete="off">
									<mail-icon slot="prefix-icon"></mail-icon>
								</t-input>
							</t-form-item>
							<t-form-item name="nick_name">
								<t-input clearable v-model="RegisterFormData.nick_name" placeholder="请输入昵称"
									autocomplete="off">
									<user-icon slot="prefix-icon"></user-icon>
								</t-input>
							</t-form-item>
							<t-form-item>
								<t-button theme="primary" type="submit" block>注册</t-button>
							</t-form-item>
						</t-form>
					</t-space>
				</template>
			</t-tab-panel>
		</t-tabs>
	</t-space>
</template>
  
<script>
import { Icon, DesktopIcon, LockOnIcon, MailIcon, UserIcon } from 'tdesign-icons-vue';

const LOGIN = {
	account: '',
	password: '',
};

const REGISTER = {
	account: '',
	password: '',
	confirm_password: '',
	email: '',
	nick_name: ''
};

export default {
	components: {
		Icon,
		DesktopIcon,
		LockOnIcon,
		MailIcon,
		UserIcon
	},
	data() {
		return {
			theme: 'normal',
			value: 'first',
			LoginFormData: { ...LOGIN },
			RegisterFormData: { ...REGISTER },
			login_rules: {
				account: [
					{
						required: true,
						message: '姓名必填',
						type: 'error',
						trigger: 'blur',
					},
					// trigger 默认为 'change'
					{ required: true, message: '姓名必填', type: 'error' },
					{ whitespace: true, message: '姓名不能为空' },
					{
						min: 2,
						message: '至少需要两个字符，一个中文等于两个字符',
						type: 'warning',
						trigger: 'blur',
					},
					{
						max: 10,
						message: '姓名字符长度超出',
						type: 'warning',
						trigger: 'blur',
					},
				],
				password: [
					{ required: true, message: '密码必填', type: 'error' },
					{ len: 8, message: '请输入 8 位密码', type: 'warning' },
					{ pattern: /[A-Z]+/, message: '密码必须包含大写字母', type: 'warning' },
				],
			},
			register_rules: {
				account: [
					{
						required: true,
						message: '账号必填',
						type: 'error',
						trigger: 'blur',
					},
					// trigger 默认为 'change'
					{ required: true, message: '账号必填', type: 'error' },
					{ whitespace: true, message: '账号不能为空' },
					{
						min: 2,
						message: '至少需要两个字符，一个中文等于两个字符',
						type: 'warning',
						trigger: 'blur',
					},
					{
						max: 10,
						message: '账号字符长度超出',
						type: 'warning',
						trigger: 'blur',
					},
				],
				password: [
					{ required: true, message: '密码必填', type: 'error' },
					{ len: 8, message: '请输入 8 位密码', type: 'warning' },
					{ pattern: /[A-Z]+/, message: '密码必须包含大写字母', type: 'warning' },
				],
				confirm_password: [
					{ required: true, message: '确认密码必填', type: 'error' },
					{ validator: this.rePassword, message: '两次密码不一致' }
				],
				email: [
					{ required: true, message: '邮箱必填' },
					{ email: { ignore_max_length: true }, message: '请输入正确的邮箱地址' },
				],
				nick_name: [
					{ required: true, message: '昵称必填' },
					{
						min: 2,
						message: '至少需要两个字符，一个中文等于两个字符',
						type: 'warning',
						trigger: 'blur',
					},
					{
						max: 10,
						message: '姓名字符长度超出',
						type: 'warning',
						trigger: 'blur',
					},
				]
			},
		};
	},
	methods: {
		onLogin({ validateResult, firstError }) {
			if (validateResult === true) {
				this.$message.success('登陆成功');
			} else {
				console.log('Errors: ', validateResult);
				this.$message.warning(firstError);
			}
		},
		onRegister({ validateResult, firstError }) {
			if (validateResult === true) {
				this.$message.success('注册成功');
			} else {
				console.log('Errors: ', validateResult);
				this.$message.warning(firstError);
			}
		},
		// 自定义异步校验器
		rePassword(val) {
			if (this.RegisterFormData.password !== this.RegisterFormData.confirm_password) {
				return { result: false, message: '两次密码不一致', type: 'error' };
			}
			return { result: true, message: '', type: 'success' };
		},
	}
};
</script>

<style lang="less" scoped>
.main_box {
	width: 250px;
	position: absolute;
	display: flex;
	align-content: center;
	align-items: center;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.login_box {
	margin-top: 20px;
}

.register_box {
	margin-top: 20px;
}

.t-tab-panel {
	width: 250px;
}
</style>
  