<template>
    <t-card :title="title" header-bordered class="t_card_main">
        <template>
            <t-card :title="classroom" header-bordered>
                <t-table rowKey="index" :data="book_content" :columns="book_content_columns" :stripe="true" :bordered="true"
                    :hover="true" cellEmptyContent="-" resizable
                    :pagination="{ defaultPageSize: 5, defaultCurrent: 1, total: book_content.length }">
                    <template #operator="{ row }">
                        <t-button theme="primary" :disabled="isBtnDisabled(row.book_status)" @click="CheckRoomStatus(row)">
                            预约
                        </t-button>
                    </template>
                </t-table>
            </t-card>
        </template>
        <t-dialog theme="default" :header="classroom_name" body="对话框内容" :visible.sync="dialog_visible" cancelBtn="取消"
            :confirmBtn="null">
            <t-tabs :value="value" @change="(newValue) => (value = newValue)">
                <t-tab-panel value="first">
                    <template #label>
                        明天
                    </template>
                    <t-table rowKey="index" :data="specific_book_content_one" :columns="specific_book_columns"
                        :bordered="true" :hover="true" cellEmptyContent="-" resizable>
                        <template #operator="{ row }">
                            <t-button
                                :disabled="specific_book_content_one[row.index - 1].book_status === '是' ? false : true"
                                @click="Book(row)">
                                预约
                            </t-button>
                        </template>
                    </t-table>
                </t-tab-panel>
                <t-tab-panel value="second">
                    <template #label>
                        后天
                    </template>
                    <t-table rowKey="index" :data="specific_book_content_two" :columns="specific_book_columns"
                        :bordered="true" :hover="true" cellEmptyContent="-" resizable>
                        <template #operator="{ row }">
                            <t-button
                                :disabled="specific_book_content_two[row.index - 1].book_status === '是' ? false : true"
                                @click="Book(row)">
                                预约
                            </t-button>
                        </template>
                    </t-table>
                </t-tab-panel>
            </t-tabs>

        </t-dialog>
    </t-card>
</template>

<script>
import { message } from 'tdesign-vue';
export default {

    data() {
        return {
            title: '预约',
            classroom: '教室名单',
            dialog_visible: false,
            value: 'first',

            // 假设教室人数
            cr_num: 10,
            cr_con: 30,
            classroom_name: '',

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
                { index: 5, building: '六教', classroom: '6B-666', book_status: '忙', operator: true },
                { index: 6, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 7, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 8, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
                { index: 9, building: '六教', classroom: '6B-666', book_status: '空闲', operator: true },
            ],

            room_time_info_columns: [
                { colKey: 'time', title: '时间段' },
                { colKey: 'book_status', title: '空闲状态', },
                { colKey: 'operator', title: '操作' },
            ],

            specific_book_columns: [
                { colKey: 'time', title: '时间段' },
                { colKey: 'book_status', title: '是否预约' },
                { colKey: 'operator', title: '操作' },
            ],
            specific_book_content_one: [
                { index: 1, time: '第1~2节', book_status: '否', operator: true },
                { index: 2, time: '第3~4节', book_status: '否', operator: true },
                { index: 3, time: '第5~6节', book_status: '是', operator: true },
                { index: 4, time: '第7~8节', book_status: '否', operator: true },
            ],
            specific_book_content_two: [
                { index: 1, time: '第1~2节', book_status: '是', operator: true },
                { index: 2, time: '第3~4节', book_status: '否', operator: true },
                { index: 3, time: '第5~6节', book_status: '是', operator: true },
                { index: 4, time: '第7~8节', book_status: '否', operator: true },
            ]
        }
    },

    methods: {
        //预约按钮是否可用
        isBtnDisabled(status) {
            return status === '空闲' ? false : true;
        },
        // 查询当前点击教室的信息
        async CheckRoomStatus(row) {
            this.dialog_visible = true;
            this.classroom_name = this.getDialogTitle(row.index)
            const { data: res } = await this.$http.post("", {
                // username: LOGIN.account,
                // password: LOGIN.password,
            });
            if (res.meta.status === 400) {
                this.$message.error({ content: "获取数据失败", closeBtn: true });
            } else if (res.meta.status === 200) {
                this.$message.success({ content: "获取数据成功", closeBtn: true });
            }
        },
        getDialogTitle(index) {
            return this.book_content[index].building + "-" + this.book_content[index].classroom
        },

        async Book(row) {
            const { data: res } = await this.$http.post("", {
                // username: LOGIN.account,
                // password: LOGIN.password,
            });
            if (res.meta.status === 400) {
                this.$message.error({ content: "预约失败", closeBtn: true });
            } else if (res.meta.status === 200) {
                this.$message.success({ content: "预约成功", closeBtn: true });
            }
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