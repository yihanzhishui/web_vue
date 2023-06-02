<template>
    <t-card :title="title" header-bordered class="t_card_main">
        <template>
            <t-card :title="classroom" header-bordered>
                <t-table rowKey="index" :data="book_content" :columns="book_content_columns" :stripe="true" :bordered="true"
                    :hover="true" cellEmptyContent="-" resizable
                    :pagination="{ defaultPageSize: 10, defaultCurrent: 1, total: book_content.length }">
                    <template #operator="{ row }">
                        <t-button theme="primary" :disabled="isBtnDisabled(row.book_status)"
                            @click="book_dialog_visible = true">
                            预约
                        </t-button>
                        <BookDialog :row="row" :visible.sync="book_dialog_visible" :dialog_visible="book_dialog_visible"
                            @onCloseDialog="onCloseDialog" />
                    </template>
                </t-table>
            </t-card>
        </template>
    </t-card>
</template>

<script>


import BookDialog from '../Overview/BookDialog.vue';


export default {

    components: {
        BookDialog
    },

    data() {
        return {
            title: '预约',
            classroom: '教室名单',
            book_dialog_visible: false,
            value: 'first',

            // 表头
            book_content_columns: [
                { colKey: 'building', title: '楼栋' },
                { colKey: 'classroom', title: '教室' },
                { colKey: 'book_status', title: '空闲状态' },
                { colKey: 'operator', title: '操作' },
            ],

            // 表格内容
            book_content: [
                // { index: 1, building: '东区教学楼', classroom: 'E2B-202', book_status: '空闲', operator: true }
            ],
        }
    },

    methods: {
        //预约按钮是否可用
        isBtnDisabled(status) {
            return status === '空闲' ? false : true;
        },

        onCloseDialog(dialog_visible) {
            this.book_dialog_visible = dialog_visible;
        }
    }
};


</script>

<style lang="less" scoped>
.t_card_main {
    width: 100%;
    height: 100%;
}
</style>