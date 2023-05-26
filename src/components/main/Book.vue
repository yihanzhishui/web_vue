<template>
    <t-card :title="title" header-bordered class="t_card_main">
        <template>
            <t-card :title="classroom" header-bordered>
                <t-table rowKey="index" :data="book_content" :columns="book_content_columns" :stripe="true" :bordered="true"
                    :hover="true" cellEmptyContent="-" resizable>
                    <template #operation="{ row }">
                        <t-link theme="primary" hover="color" @click="rehandleClickOp(row)">
                            {{ row.status === 0 ? '查看详情' : '再次申请' }}
                        </t-link>
                    </template>
                </t-table>
            </t-card>
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
            title: '预约',
            classroom: '教室名单',
            // 表头
            book_content_columns: [
                { colKey: 'building', title: '楼栋' },
                { colKey: 'classroom', title: '教室' },
                { colKey: 'book_status', title: '空闲状态' },
                { colKey: 'operator', title: '操作' },
            ],
            book_content: [
                { index: 1, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 2, building: '东教', classroom: 'E2B-666', book_status: '空闲', operator: true },
                { index: 3, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 4, building: '东教', classroom: 'E2B-666', book_status: '空闲', operator: true },
                { index: 5, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
            ]
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

.result_content {
    height: 100%;
}
</style>