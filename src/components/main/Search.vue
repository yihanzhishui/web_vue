<template>
    <t-card :title="title" header-bordered class="t_card_main">
        <template class="main_content">
            <t-layout class="result_content">
                <t-aside class="building">
                    <t-dropdown :options="buiding_options">
                        <t-button variant="outline">
                            <span class="dropdown__text">
                                请选择楼栋
                                <chevron-down-icon size="16" />
                            </span>
                        </t-button>
                    </t-dropdown>
                </t-aside>
                <t-layout>
                    <t-content>
                        <t-layout v-show="is_classromm_show">
                            <t-aside class="classroom">
                                <t-dropdown :options="classroom_options">
                                    <t-button variant="outline">
                                        <span class="dropdown__text">
                                            请选择教室
                                            <chevron-down-icon size="16" />
                                        </span>
                                    </t-button>
                                </t-dropdown>
                            </t-aside>
                            <t-layout>
                                <t-content>
                                    <!-- 查询结果 -->
                                    <t-card :cover="cover" title="查询" description="查询结果" class="result_card"
                                        v-show="is_result_show">
                                        <template #actions>
                                            <t-button variant="text" shape="square">
                                                预约
                                            </t-button>
                                        </template>
                                        <template #footer>
                                            <span style="font-size:20px;display:flex;margin-top:10px">教室空闲状态: {{
                                                classroom_info.class_empty_status }}</span>
                                            <span style="font-size:20px;display:flex;margin-top:10px">现有人数: {{
                                                classroom_info.now_people_num }}</span>
                                        </template>
                                    </t-card>
                                </t-content>
                            </t-layout>
                        </t-layout>
                    </t-content>
                </t-layout>
            </t-layout>
        </template>
    </t-card>
</template>

<script>
import { ChevronDownIcon, HeartIcon, ChatIcon, ShareIcon, MoreIcon, } from 'tdesign-icons-vue';
export default {
    components: {
        ChevronDownIcon,
        HeartIcon,
        ChatIcon,
        ShareIcon,
        MoreIcon,
    },
    data() {
        return {
            title: '查询',
            is_classromm_show: false,
            is_result_show: false,
            cover: 'https://tdesign.gtimg.com/site/source/card-demo.png',
            buiding_options: [
                { content: '东教', value: 1 },
                { content: '六教', value: 2 },
            ],
            classroom_options: [
                { content: '东教', value: 1 },
                { content: '六教', value: 2 },
            ],
            classroom_info: {
                address: '东教 E2B202',
                class_empty_status: '空闲',
                now_people_num: 90
            }
        }
    },

    methods: {
        // 测试数据

    }
};


</script>

<style lang="less" scoped>
.t_card_main {
    width: 100%;
    height: 100%;
}

.dropdown {
    &__text {
        display: inline-flex;
        align-items: center;

        .t-icon {
            margin-left: 8px;
        }
    }
}

.building {
    border-right: 1px;
}

.main_content {
    height: 100%;
}

.result_card {
    width: 100%;
    height: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.result_content {
    height: 100%;
}
</style>