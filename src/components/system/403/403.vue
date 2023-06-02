
<template>
    <!-- 其实是Forbidden，但这里表示一下出错的页面 -->
    <Result title="Other Error" tip="抱歉，访问出问题啦">
        <t-button @click="() => $router.go(-1)">返回上一级</t-button>
    </Result>
</template>
  
<script>
import Result from '@/components/system/result.vue';

export default {
    name: 'Result403',
    components: { Result },
};
</script>