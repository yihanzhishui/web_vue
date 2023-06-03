<template>
    <t-card :title="title" header-bordered class="t_card_main">
        <template>
            <t-card :title="my_book" header-bordered>
                <!-- 我的预约-表格 -->
                <t-table rowKey="index" :data="my_book_content" :columns="my_book_columns" :bordered="true" :hover="true"
                    cellEmptyContent="-" resizable max-height="150" table-layout="fixed" size="small">

                    <template #operator="{ row }">
                        <t-popconfirm theme="warning" content="确认取消预约吗？" v-model="row.visible_cancel_book"
                            @confirm="cancelBook(row)">
                            <t-button theme="danger" size="small">
                                取消预约
                            </t-button>
                        </t-popconfirm>
                    </template>
                </t-table>
            </t-card>
            <t-card :title="empty_room" header-bordered style="margin-top:20px">
                <!-- 空教室-表格 -->
                <t-table rowKey="index" :data="empty_room_content" :columns="empty_room_columns" :bordered="true"
                    :hover="true" cellEmptyContent="-" resizable max-height="150" table-layout="fixed"
                    size="small"></t-table>
            </t-card>
            <t-card :title="recommend" header-bordered style="margin-top:20px">
                <!-- 推荐预约-表格 -->
                <t-table rowKey="index" :data="recommend_content" :columns="recommend_columns" :bordered="true"
                    :hover="true" cellEmptyContent="-" resizable max-height="150" table-layout="fixed" size="small">
                    <template #empty_status="{ row }">
                        <t-progress theme="line" :color="row.color" :percentage="row.percentage" />
                    </template>
                    <template #operator="{ row }">
                        <t-button theme="primary" @click="showDialog(row)" size="small">
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
import BookDialog from '@/components/dialog/BookDialog.vue'

export default {

    components: {
        BookDialog
    },
    name: 'Overview',

    data() {
        return {
            title: '概览',
            my_book: '我的预约',
            empty_room: '空教室',
            recommend: '推荐预约',
            book_dialog_visible: false,
            visible_cancel_book: false,
            dialogRow: null, // 添加一个用于存储对话框中当前行的数据
            // 表头
            my_book_columns: [
                { colKey: 'room', title: '教室' },
                { colKey: 'building', title: '地址' },
                { colKey: 'time', title: '预约时间段' },
                { colKey: 'operator', title: '操作' },
            ],
            empty_room_columns: [
                { colKey: 'building', title: '教学楼' },
                { colKey: 'classroom', title: '教室' },
                { colKey: 'people_number', title: '当前人数' },
            ],
            recommend_columns: [
                { colKey: 'classroom', title: '教室' },
                { colKey: 'building', title: '地址' },
                { colKey: 'empty_status', title: '空闲状态' },
                { colKey: 'people_number', title: '当前人数' },
                { colKey: 'operator', title: '操作' },

            ],
            // 表格内容
            my_book_content: [],
            empty_room_content: [],
            recommend_content: [],
        }
    },

    mounted() {
        this.getMyBook();
        this.getEmptyRoom();
        this.getRecomandBook();
    },

    methods: {
        // 获取我的预约表格数据
        async getMyBook() {
            let that = this;
            this.my_book_content.forEach(item => {
                Object.assign(item, { visible_cancel_book: false })
            });
            await this.$http.post("findReservationBySid", {
                sid: sessionStorage.user_id
            })
                .then(function (res) {
                    // 请求成功
                    that.my_book_content = res.data
                    let newDate = new Date()
                    res.data.forEach(item => {
                        newDate.setTime(item.date)
                        let date = newDate.toLocaleDateString()
                        switch (item.choice) {
                            case 1:
                                Object.assign(item, { time: date + ': 第1~2节' })
                                break;
                            case 2:
                                Object.assign(item, { time: date + ': 第3~4节' })
                                break;
                            case 3:
                                Object.assign(item, { time: date + ': 第5~6节' })
                                break;
                            case 4:
                                Object.assign(item, { time: date + ': 第7~8节' })
                                break;
                        }
                    })

                })
                .catch(function (error) {
                    // 请求失败的处理
                    that.$router.replace('/500')
                });
        },

        // 获取空教室数据
        async getEmptyRoom() {
            let that = this;
            await this.$http.post("queryEmpty")
                .then(function (res) {
                    // 请求成功
                    that.empty_room_content = res.data;
                    res.data.forEach(item => {
                        Object.assign(item, { classroom: item.building + '-' + item.room })
                    })
                })
                .catch(function (error) {
                    // 请求失败的处理
                    that.$router.replace('/403')
                });
        },

        // 获取推荐预约教室
        async getRecomandBook() {
            let that = this;
            await this.$http.post("recommend")
                .then(res => {
                    // 请求成功
                    that.recommend_content = res.data;
                    res.data.forEach(item => {
                        that.$http.post('queryOccupancy', {
                            date: that.formatDate(),
                            // date: '2023-5-27',
                            cid: item.cid
                        }).then(res => {
                            Object.assign(item, { percentage: (res.data * 100) / 4 });
                            switch (res.data) {
                                case 1:
                                    Object.assign(item, { color: '#0052d9' })
                                    break;
                                case 2:
                                    Object.assign(item, { color: '#078d5c' })
                                    break;
                                case 3:
                                    Object.assign(item, { color: '#ed7b2f' })
                                    break;
                                case 4:
                                    Object.assign(item, { color: '#c9353f' })
                                    break;
                                default:
                                    Object.assign(item, { color: '#eeeeee' })
                                    break;
                            }
                        })
                        Object.assign(item, { classroom: item.building + '-' + item.room })

                    })
                })
                .catch(function (error) {
                    // 请求失败的处理
                    that.$router.replace('/403')
                });
        },

        async cancelBook(row) {
            // 确认取消
            let that = this;

            await this.$http.post("deleteReservation", {
                rid: row.rid
            })
                .then(function (res) {
                    if (res.data === 1) {
                        that.getMyBook()
                        that.$message.success("操作成功！");
                    } else {
                        that.$message.error("操作失败！")
                    }
                })
                .catch(function (error) {
                    // 请求失败的处理
                    that.$router.replace('/403')
                });

        },

        onCloseDialogCancel(visible_cancel_book) {
            this.visible_cancel_book = visible_cancel_book
        },

        onCloseDialog(data) {
            this.book_dialog_visible = data.visible
            this.getRecomandBook()
            this.getMyBook()
        },

        // 获取格式化后的时间字符串
        formatDate() {
            let date = new Date();
            let year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate()
            let newTime = year + '-' + month + '-' + day
            return newTime;
        },

        showDialog(row) {
            row['dialog_visible'] = true
            this.dialogRow = row; // 设置对话框中当前行的数据
            this.book_dialog_visible = row['dialog_visible']; // 打开对话框
        },
    }
};


</script>

<style lang="less" scoped>
.t_card_main {
    height: 100%;
}
</style>