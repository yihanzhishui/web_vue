<template>
    <t-card :title="title" header-bordered class="t_card_main">
        <template>
            <t-card :title="classroom" header-bordered>
                <t-table rowKey="index" :data="book_content" :columns="book_content_columns" :stripe="true" :bordered="true"
                    :hover="true" cellEmptyContent="-" resizable
                    :pagination="{ defaultPageSize: 5, defaultCurrent: 1, total: book_content.length }">
                    <template #operator="{ row }">
                        <t-button theme="primary" size="small" :disabled="isBtnDisabled(row.book_status)"
                            @click="CheckRoomStatus(row)">
                            预约
                        </t-button>
                    </template>
                </t-table>
            </t-card>
        </template>
        <template>
            <t-dialog theme="success" header="成功" body="对话框内容" :visible="dialog_visible" @confirm="onConfirm()"
                cancelBtn="取消" />
        </template>
    </t-card>
</template>

<script>
export default {

    data() {
        return {
            title: '预约',
            classroom: '教室名单',
            dialog_visible: false,

            // 假设教室人数
            cr_num: 10,
            cr_con: 30,
            classroom_name: 'E2A110',

            // 表头
            book_content_columns: [
                { colKey: 'building', title: '楼栋' },
                { colKey: 'classroom', title: '教室' },
                { colKey: 'book_status', title: '空闲状态', },
                { colKey: 'operator', title: '操作' },
            ],

            book_content: [
                { index: 1, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 2, building: '东教', classroom: 'E2B-666', book_status: '空闲', operator: true },
                { index: 3, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 4, building: '东教', classroom: 'E2B-666', book_status: '空闲', operator: true },
                { index: 5, building: '六教', classroom: '6B-666', book_status: '忙', operator: true },
                { index: 6, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 7, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 8, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 9, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 10, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 11, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 12, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 13, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 14, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 15, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 16, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 17, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 18, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 19, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 20, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 21, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
            ],

            room_time_info_columns: [
                { colKey: 'time', title: '时间段' },
                {
                    colKey: 'book_status',
                    title: '空闲状态',
                },
                { colKey: 'operator', title: '操作' },
            ],
        }
    },

    methods: {
        //预约按钮是否可用
        isBtnDisabled(status) {
            return status === '空闲' ? false : true;
        },
        // 查询当前点击教室的信息
        CheckRoomStatus(row) {
            dialog_visible = true;
            let that = this;
            axios.post(this.url, {
                // 存放请求携带的参数
                // password: that.password
            }).then(function (res) {
                // 请求成功
                this.$message.success('登陆成功');
                // 成功过后跳转页面
            })
        }
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