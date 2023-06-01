<template>
    <Result title="403 Forbidden" tip="抱歉，您无权限访问此页面">
        <t-button @click="() => $router.push('/home')">返回首页</t-button>
    </Result>
</template>
  
<script>
import Result from '@/components/result/index.vue';

export default {
    name: 'Result403',
    components: { Result },
};
</script>