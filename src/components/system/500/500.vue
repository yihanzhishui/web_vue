<template>
    <Result title="500 Internal Server Error" type="500" tip="抱歉，服务器出错啦">
        <t-button @click="() => $router.push('/home')">返回首页</t-button>
    </Result>
</template>
  
<script>
import Result from '@/components/system/result.vue';

export default {
    name: 'Result500',
    components: { Result },
};
</script>
  