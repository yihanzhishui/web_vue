<template>
    <t-card :title="title" header-bordered class="t_card_main">
        <template>
            <t-card :title="classroom_name" header-bordered>
                <t-table rowKey="index" :data="book_content" :columns="book_content_columns" :bordered="true" :hover="true"
                    cellEmptyContent="-" resizable
                    :pagination="{ defaultPageSize: 10, defaultCurrent: 1, total: book_content.length }">
                    <template #book_status="{ row }">
                        <t-progress theme="line" :color="row.color" :percentage="row.percentage" />
                    </template>

                    <template #operator="{ row }">
                        <t-button theme="primary" :disabled="isBtnDisabled(row)" @click="showDialog(row)">
                            预约
                        </t-button>
                    </template>
                </t-table>
            </t-card>
        </template>

        <BookDialog :row="dialogRow" :dialog_visible="book_dialog_visible" @onCloseDialog="onCloseDialog"
            :visible.sync="book_dialog_visible" />
    </t-card>
</template>
  
<script>
import BookDialog from '@/components/dialog/BookDialog.vue';

export default {
    components: {
        BookDialog
    },
    name: 'Book',

    data() {
        return {
            title: '预约',
            classroom_name: '教室名单',
            book_dialog_visible: false,
            value: 'first',
            // 表头
            book_content_columns: [
                { colKey: 'building', title: '楼栋' },
                { colKey: 'classroom', title: '教室' },
                { colKey: 'book_status', title: '空闲状态' },
                { colKey: 'people_number', title: '当前人数' },
                { colKey: 'operator', title: '操作' },
            ],

            // 表格内容
            book_content: [],
            dialogRow: null, // 添加一个用于存储对话框中当前行的数据
        }
    },

    mounted() {
        this.getAllClassroom()
    },

    methods: {
        //预约按钮是否可用
        isBtnDisabled(row) {
            return row.percentage === 100 ? true : false;
        },

        onCloseDialog(data) {
            this.book_dialog_visible = data.visible; // 关闭对话框
            this.getClassroomStatus(this.dialogRow)
        },

        // 获取所有的教室
        async getAllClassroom() {
            try {
                const res = await this.$http.post("findAllClassroom");
                const bookContent = res.data.map(item => {
                    const bookItem = {
                        classroom: item.building + '-' + item.room || '',
                        dialog_visible: false,
                        cid: item.cid,
                        building: item.building,
                        people_number: item.people_number,
                        room: item.room,
                        picture: item.picture,
                    };
                    return this.getClassroomStatus(bookItem);
                });
                this.book_content = await Promise.all(bookContent);
            } catch (error) {
                console.log(error);
                this.$message.error('获取信息失败，请稍后重试！');
            }
        },

        // 获取格式化后的时间字符串
        formatDate() {
            let date = new Date();
            let year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate();
            let newTime = year + '-' + month + '-' + day;
            return newTime;
        },

        showDialog(row) {
            row['dialog_visible'] = true
            this.dialogRow = row; // 设置对话框中当前行的数据
            this.book_dialog_visible = row['dialog_visible']; // 打开对话框
        },

        // 获取教室空闲状态
        async getClassroomStatus(item) {
            try {
                const res = await this.$http.post('queryOccupancy', {
                    date: this.formatDate(),
                    cid: item.cid,
                });

                switch (res.data) {
                    case 1:
                        Object.assign(item, { color: '#0052d9' });
                        break;
                    case 2:
                        Object.assign(item, { color: '#078d5c' });
                        break;
                    case 3:
                        Object.assign(item, { color: '#ed7b2f' });
                        break;
                    case 4:
                        Object.assign(item, { color: '#c9353f' });
                        break;
                    default:
                        Object.assign(item, { color: '#eeeeee' });
                        break;
                }

                Object.assign(item, { percentage: (res.data * 100) / 4 });
                return item;
            } catch (error) {
                console.log(error);
                this.$message.error('获取教室状态失败，请稍后重试！');
                return item;
            }
        },
    },
};
</script>
  

<style lang="less" scoped>
.t_card_main {
    width: 100%;
    height: 100%;
}
</style>