<template>
    <Result title="网络异常" tip="网络异常，请稍后再试" type="wifi">
        <div>
            <t-button @click="() => $router.push('/')">重新加载</t-button>
            <t-button theme="default" @click="() => $router.push('/home')">返回首页</t-button>
        </div>
    </Result>
</template>
  
<script>
import Result from '@/components/system/result.vue';

export default {
    name: 'ResultNetworkError',
    components: { Result },
};
</script>
<style lang="less" scoped>
@import '@/style/variables.less';

.t-button+.t-button {
    margin-left: var(--td-comp-margin-s);
}
</style>