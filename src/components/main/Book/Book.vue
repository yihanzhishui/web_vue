<template>
    <t-card :title="title" header-bordered class="t_card_main">
        <template>
            <t-card :title="classroom" header-bordered>
                <t-table rowKey="index" :data="book_content" :columns="book_content_columns" :bordered="true" :hover="true"
                    cellEmptyContent="-" resizable
                    :pagination="{ defaultPageSize: 10, defaultCurrent: 1, total: book_content.length }">

                    <template #book_status="{ row }">
                        <t-progress theme="plump" :color="row.color" :percentage="row.percentage" />
                    </template>

                    <template #operator="{ row }">
                        <t-button theme="primary" :disabled="isBtnDisabled(row)" :onClick="show">
                            预约
                            <BookDialog :row="row" v-if="row.visible" :dialog_visible="row.dialog_visible"
                                @onCloseDialog="onCloseDialog" />
                        </t-button>
                    </template>
                </t-table>
            </t-card>
        </template>
    </t-card>
</template>

<script>


import BookDialog from '@/components/dialog/BookDialog.vue';


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
                { colKey: 'people_number', title: '当前人数' },
                { colKey: 'operator', title: '操作' },
            ],

            // 表格内容
            book_content: [],
        }
    },

    mounted() {
        this.getAllClassroom()
    },

    methods: {
        //预约按钮是否可用
        isBtnDisabled(row) {
            console.log(row)
            return row.percentage === 100 ? true : false;
        },

        onCloseDialog(data) {
            this.book_content[data.id] = data.visible;
        },

        // 获取所有的教室
        async getAllClassroom() {
            let that = this;
            await this.$http.post("findAllClassroom")
                .then(res => {
                    // 请求成功
                    res.data.forEach(item => {
                        that.$http.post('queryOccupancy', {
                            date: that.formatDate(),
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
                        Object.assign(item, { dialog_visible: false })

                        that.book_content = res.data;
                    })
                })
                .catch(function (error) {
                    // 请求失败的处理
                    that.$message.error('获取信息失败, 请稍后重试！')
                    that.$router.replace('/403')
                });
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


        show(row) {
            // if (!row)
            // this.$message.error("点击了")
            console.log(row)
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