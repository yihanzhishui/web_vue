<template>
    <t-dialog :visible.sync="local_visible" theme="default" header="预约" body="对话框内容" cancelBtn="取消" :confirmBtn="null"
        :onClose="onCloseDialog">
        <t-tabs :value="value" @change="(newValue) => (value = newValue)">
            <t-tab-panel value="first">
                <template #label>
                    明天
                </template>
                <t-table rowKey="index" :data="specific_book_content_one" :columns="specific_book_columns" :bordered="true"
                    :hover="true" cellEmptyContent="-" resizable>
                    <template #book_status="{ row }">
                        {{ row.book_status == false ? '是' : '否' }}
                    </template>
                    <template #operator="{ row }">
                        <t-button :disabled="row.book_status" @click="Book(row)">
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
                    <template #book_status="{ row }">
                        {{ row.book_status == false ? '是' : '否' }}
                    </template>
                    <template #operator="{ row }">
                        <t-button :disabled="row.book_status" @click="Book(row)">
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
                { colKey: 'classroom', title: '教室' },
                { colKey: 'time', title: '时间段' },
                { colKey: 'book_status', title: '空闲状态' },
                { colKey: 'operator', title: '操作' },
            ],
            specific_book_columns: [
                { colKey: 'classroom', title: '教室' },
                { colKey: 'time', title: '时间段' },
                { colKey: 'book_status', title: '是否可预约' },
                { colKey: 'operator', title: '操作' },
            ],

            specific_book_content_one: [
                { index: 1, time: '第1~2节', book_status: false, operator: '' },
                { index: 2, time: '第3~4节', book_status: false, operator: '' },
                { index: 3, time: '第5~6节', book_status: false, operator: '' },
                { index: 4, time: '第7~8节', book_status: false, operator: '' },
            ],

            specific_book_content_two: [
                { index: 1, time: '第1~2节', book_status: false, operator: '' },
                { index: 2, time: '第3~4节', book_status: false, operator: '' },
                { index: 3, time: '第5~6节', book_status: false, operator: '' },
                { index: 4, time: '第7~8节', book_status: false, operator: '' },
            ],
        }
    },

    methods: {
        async Book(row) {
            try {
                // 发送预约请求
                const res = await this.$http.post("addReservation", {
                    cid: this.row.cid,
                    sid: sessionStorage.user_id,
                    choice: row.index,
                    Idate: this.value === 'first' ? 1 : 2,
                });

                if (res.data === 1) {
                    this.$message.success("预约成功！")
                    this.getClassroomStatus();
                } else {
                    this.$message.error("预约失败！")
                }
                // 预约成功后更新行的状态
                this.row.book_status = true;
            } catch (error) {
                console.log(error);
                this.$message.error('预约教室失败，请稍后重试！');
            }
        },

        async getClassroomStatus() {
            try {
                // 发送获取教室状态的请求
                const res = await this.$http.post("whetherReserve", {
                    cid: this.row.cid
                });

                for (let i = 0; i < 4; i++) {
                    this.specific_book_content_one[i]['book_status'] = (res.data[i] == 0 ? false : true);
                }
                let t = res.data.splice(4, 7)
                for (let i = 0; i < 4; i++) {
                    this.specific_book_content_two[i]['book_status'] = (t[i] == 0 ? false : true);
                }
            } catch (error) {
                console.log(error);
                this.$message.error('获取教室状态失败，请稍后重试！');
            }
        },

        onCloseDialog() {
            this.local_visible = false;
            this.$emit('onCloseDialog', { visible: false, id: this.row.index });
        },
    },

    watch: {
        dialog_visible(newVal, oldVal) {
            if (newVal) {
                this.row = this.row
                this.getClassroomStatus();
            }
            this.local_visible = newVal;
        }
    },

}

</script>

<style lang="less" scoped></style>