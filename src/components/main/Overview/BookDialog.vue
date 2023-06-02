<template>
    <t-dialog theme="default" :header="row.building + '-' + row.classroom" body="对话框内容" v-show="local_visible"
        cancelBtn="取消" :confirmBtn="null" :onClose="onCloseDialog">
        <t-tabs :value="value" @change="(newValue) => (value = newValue)">
            <t-tab-panel value="first">
                <template #label>
                    明天
                </template>
                <t-table rowKey="index" :data="specific_book_content_one" :columns="specific_book_columns" :bordered="true"
                    :hover="true" cellEmptyContent="-" resizable>
                    <template #operator="{ row }">
                        <t-button :disabled="specific_book_content_one[row.index - 1].book_status === '是' ? false : true"
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
                <t-table rowKey="index" :data="specific_book_content_two" :columns="specific_book_columns" :bordered="true"
                    :hover="true" cellEmptyContent="-" resizable>
                    <template #operator="{ row }">
                        <t-button :disabled="specific_book_content_two[row.index - 1].book_status === '是' ? false : true"
                            @click="Book(row)">
                            预约
                        </t-button>
                    </template>
                </t-table>
            </t-tab-panel>
        </t-tabs>
    </t-dialog>
</template>

<script>


export default {

    props: {
        dialog_visible: {
            type: Boolean,
            default: false
        },
        row: {
            type: Object,
            default: null
        }
    },

    data() {
        return {
            local_visible: false,
            value: 'first',
            room_time_info_columns: [
                { colKey: 'time', title: '时间段' },
                { colKey: 'book_status', title: '空闲状态' },
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
            ],
        }
    },

    methods: {
        async Book(row) {
            this.$message.success({ content: "预约成功", closeBtn: true });
            // const { data: res } = await this.$http.post("", {
            //     // username: LOGIN.account,
            //     // password: LOGIN.password,
            // });
            // if (res.meta.status === 400) {
            //     this.$message.error({ content: "预约失败", closeBtn: true });
            // } else if (res.meta.status === 200) {
            //     this.$message.success({ content: "预约成功", closeBtn: true });
            // }
        },

        onCloseDialog() {
            this.local_visible = false;
            this.$emit('onCloseDialog', false);
        },
    },

    watch: {
        dialog_visible(news, olds) {
            this.local_visible = news
        }
    },

}

</script>

<style lang="less" scoped></style>