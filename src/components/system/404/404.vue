<template>
    <Result title="404 Not Found" tip="抱歉，您访问的页面不存在" type="404">
        <t-button @click="() => $router.push('/home')">返回首页</t-button>
    </Result>
</template>
  
<script>
import Result from '@/components/system/result.vue';

export default {
    name: 'Result404',
    components: { Result },
};
</script>