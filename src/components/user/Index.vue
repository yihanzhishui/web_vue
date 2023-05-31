<template>
	<!-- https://www.tencent.com/img/index/menu_logo_hover.png -->
	<t-card bordered class="t_card">
		<template #actions>
			<t-switch size="large" :defaultValue="isDark" v-model="isDark" style="margin-right:10px"
				:onChange="changeThemeMode" :label="['夜间', '白天']">
			</t-switch>
		</template>
		<t-space style="width:100%; height:100%;display:flex" theme-mode="dark">
			<t-space>
				<t-space direction="vertical" align="start" class="header_box">
					<t-image src="@/assets/images/logoko.png" position="top" />
					<span class="header_title">{{ header_title }}</span>
				</t-space>
				<t-space direction="vertical" class="main_box">
					<t-tabs size="large" defaultValue="login" :value="value" @change="(newValue) => (value = newValue)">
						<!-- 登陆选项卡 -->
						<t-tab-panel value="login">
							<template #label>
								<icon name="login" style="margin-right: 4px" :isDark="isDark" /> 登录
							</template>
							<Login />
						</t-tab-panel>
						<!-- 注册选项卡 -->
						<t-tab-panel value="register">
							<template #label>
								<icon name="user-add" style="margin-right: 4px" /> 注册
							</template>
							<Register />
						</t-tab-panel>
					</t-tabs>
				</t-space>
			</t-space>
			<!-- 轮播图 -->
			<swiper-image />
		</t-space>
	</t-card>
</template>
  
<script>
import { Icon, DesktopIcon, UserIcon, } from 'tdesign-icons-vue';
import Login from '@/components/user/Login.vue'
import Register from '@/components/user/Register.vue'
import SwiperImage from './SwiperImage.vue';

export default {
	components: {
		Login,
		Register,
		SwiperImage,
		Icon,
	},
	data() {
		return {
			value: 'first',
			isDark: sessionStorage.isDark === null ? true : !sessionStorage.isDark,
			header_title: 'XXX 系统',
		};
	},

	mounted() {
		window.addEventListener('unload', this.handleUnload);
	},
	methods: {
		// 切换暗色模式
		changeThemeMode() {
			console.log("index:" + this.isDark)
			sessionStorage.isDark = this.isDark;
			// 设置暗色模式
			this.isDark === false ? document.documentElement.setAttribute('theme-mode', 'dark') : document.documentElement.removeAttribute('theme-mode');
		},

		handleUnload() {
			// 在页面已经被卸载时触发，可以在这里添加需要执行的逻辑
			sessionStorage.isDark = null;
		}
	}
};
</script>

<style lang="less" scoped>
.main_box {
	position: absolute;
	display: flex;
	align-content: center;
	align-items: center;
	top: 55%;
	left: 25%;
	transform: translate(-50%, -50%);
}

.header_title {
	font-size: 30px;
	font-weight: bold;
	margin-top: 20px;
}

.header_box {
	position: absolute;
	display: flex;
	align-content: center;
	align-items: center;
	top: 20%;
	left: 25%;
	transform: translate(-50%, -50%);
}

.t_card {
	width: 100%;
	height: 100%;
}
</style>
  