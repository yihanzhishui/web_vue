<template>
    <t-card :title="title" header-bordered class="t_card_main">
        <template>
            <t-card :title="my_book" header-bordered>
                <!-- 我的预约-表格 -->
                <t-table rowKey="index" :data="my_book_content" :columns="my_book_columns" :stripe="true" :bordered="true"
                    :hover="true" cellEmptyContent="-" resizable
                    :pagination="{ defaultCurrent: 1, defaultPageSize: 3, total: my_book_content.length }">
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
                <t-table rowKey="index" :data="empty_room_content" :columns="empty_room_columns" :stripe="true"
                    :bordered="true" :hover="true" cellEmptyContent="-" resizable
                    :pagination="{ defaultCurrent: 1, defaultPageSize: 3, total: empty_room_content.length }">
                </t-table>
            </t-card>
            <t-card :title="recommend" header-bordered style="margin-top:20px">
                <!-- 推荐预约-表格 -->
                <t-table rowKey="index" :data="recommend_content" :columns="recommend_columns" :stripe="true"
                    :bordered="true" :hover="true" cellEmptyContent="-" resizable></t-table>
            </t-card>
        </template>
    </t-card>
</template>

<script>


export default {

    name: 'Overview',

    data() {
        return {
            title: '概览',
            my_book: '我的预约',
            empty_room: '空教室',
            recommend: '推荐预约',
            visible_cancel_book: false,
            // 表头
            my_book_columns: [
                { colKey: 'classroom', title: '教室' },
                { colKey: 'address', title: '地址' },
                { colKey: 'time', title: '预约时间段' },
                { colKey: 'operator', title: '操作' },
                // { colKey: 'visible_cancel_book', title: '是否显示', default: false },
            ],
            empty_room_columns: [
                { colKey: 'classroom', title: '教室' },
                { colKey: 'empty_status', title: '空闲状态' },
            ],
            recommend_columns: [
                { colKey: 'classroom', title: '教室' },
                { colKey: 'empty_status', title: '空闲状态' },
                { colKey: 'address', title: '地址' },
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
        // this.getRecomandBook();
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
                })
                .catch(function (error) {
                    // 请求失败的处理
                    that.$router.replace('/500')
                });;

        },


        // 获取推荐预约教室
        async getRecomandBook() {
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

        async cancelBook(row) {
            // 确认取消
            console.log(row)
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
                    that.$router.replace('/500')
                });


        },

        onCloseDialogCancel(visible_cancel_book) {
            this.visible_cancel_book = visible_cancel_book
        },
    }
};


</script>

<style lang="less" scoped>
.t_card_main {
    height: 100%;
}
</style>